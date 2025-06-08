import mongoose, { type FilterQuery } from 'mongoose'
import { UserRepository } from '@/src/repositories/UserRepository'
import { ManufacturerRepository } from '@/src/repositories/ManufacturerRepository'
import { type IUser } from '@/src/models/User'
import { type IManufacturer } from '@/src/models/Manufacturer'
import {
  type IUserStatisticsResponse,
  type IUser as IDtoUser,
  type IManufacturersResponse,
  type IManufacturerWithUsersForList,
  type IUserWithScore,
  type IDemographicInsight
} from '@repo/dto'

export interface GetFilters {
  firstName?: string
  lastName?: string
  email?: string
  company?: string
  department?: string
  jobTitle?: string
  status?: 'active' | 'inactive'
}

interface UserStatisticsFacetOutput {
  usersWithScores: IUserWithScore[]
  demographicInsights: IDemographicInsight[]
  totalUsers: { count: number }[]
}

export class UserService {
  private userRepository: UserRepository
  private manufacturerRepository: ManufacturerRepository

  constructor(userRepository: UserRepository, manufacturerRepository: ManufacturerRepository) {
    this.userRepository = userRepository
    this.manufacturerRepository = manufacturerRepository
  }

  async getUsers(
    filters: GetFilters,
    search: string | undefined,
    page: number,
    limit: number,
    sort?: string,
    order?: 'asc' | 'desc'
  ): Promise<{ users: IUser[]; total: number; page: number; limit: number }> {
    const query: FilterQuery<IUser> = {}
    const regexFilterColumns: (keyof GetFilters & keyof IUser)[] = ['firstName', 'email', 'company']

    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        const filterKey = key as keyof GetFilters
        const value = filters[filterKey]
        if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
          continue
        }

        if (regexFilterColumns.includes(filterKey) && typeof value === 'string') {
          query[filterKey as keyof IUser] = { $regex: value.trim(), $options: 'i' }
        } else {
          query[filterKey as keyof IUser] = value
        }
      }
    }

    if (search && search.trim() !== '') {
      const trimmedSearch = search.trim()
      query.$or = [
        { firstName: { $regex: trimmedSearch, $options: 'i' } },
        { lastName: { $regex: trimmedSearch, $options: 'i' } },
        { email: { $regex: trimmedSearch, $options: 'i' } },
        { company: { $regex: trimmedSearch, $options: 'i' } },
        { department: { $regex: trimmedSearch, $options: 'i' } },
        { jobTitle: { $regex: trimmedSearch, $options: 'i' } }
      ]
    }

    const users = await this.userRepository.find(query, page, limit, sort, order)
    const total = await this.userRepository.count(query)
    return { users, total, page, limit }
  }

  async addUsersToNewManufacturer(
    userIds: string[],
    manufacturerData: Omit<Partial<IManufacturer>, 'userIds'>
  ): Promise<IManufacturer> {
    if (!userIds || userIds.length === 0) {
      throw new Error('User IDs must be provided to add to a new manufacturer.')
    }
    const users = await this.userRepository.findByIds(userIds)
    if (users.length !== userIds.length) {
      const foundUserIds = users.map(user => user._id.toString())
      const notFoundIds = userIds.filter(id => !foundUserIds.includes(id))
      throw new Error(`One or more users not found: ${notFoundIds.join(', ')}. Please provide valid user IDs.`)
    }

    return await this.manufacturerRepository.create({
      ...manufacturerData,
      userIds: users.map(user => user._id)
    })
  }

  async getManufacturersWithDetails(
    page: number,
    limit: number,
    sort?: string,
    order?: 'asc' | 'desc'
  ): Promise<IManufacturersResponse> {
    const manufacturers = await this.manufacturerRepository.findAllAndPopulateUsers(page, limit, sort, order)
    const total = await this.manufacturerRepository.countAll()

    const manufacturersWithUsers = manufacturers.map(m => ({
      ...m.toObject(),
      userIds: m.userIds as unknown as IDtoUser[]
    })) as IManufacturerWithUsersForList[]

    return {
      manufacturers: manufacturersWithUsers,
      total,
      page,
      limit
    }
  }

  async getUserStatistics(page: number = 1, limit: number = 10): Promise<IUserStatisticsResponse> {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const ninetyDaysAgo = new Date()
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)
    const pipeline: mongoose.PipelineStage[] = [
      // { $match: { status: 'active' } },
      {
        $addFields: {
          responseRateScore: { $multiply: [{ $ifNull: ['$participation.responseRate', 0] }, 20] },
          activityScore: {
            $switch: {
              branches: [
                { case: { $gte: [{ $ifNull: ['$lastActive', new Date(0)] }, sevenDaysAgo] }, then: 30 },
                { case: { $gte: [{ $ifNull: ['$lastActive', new Date(0)] }, thirtyDaysAgo] }, then: 20 },
                { case: { $gte: [{ $ifNull: ['$lastActive', new Date(0)] }, ninetyDaysAgo] }, then: 10 }
              ],
              default: 0
            }
          },
          completionScore: {
            $cond: {
              if: { $gt: [{ $ifNull: ['$participation.surveysInvited', 0] }, 0] },
              then: {
                $multiply: [
                  { $divide: [{ $ifNull: ['$participation.surveysCompleted', 0] }, '$participation.surveysInvited'] },
                  30
                ]
              },
              else: 0
            }
          },
          qualityScore: { $multiply: [{ $ifNull: ['$participation.responseQuality.thoughtfulnessScore', 0] }, 2] }
        }
      },
      {
        $addFields: {
          engagementScore: {
            $add: ['$responseRateScore', '$activityScore', '$completionScore', '$qualityScore']
          }
        }
      },
      {
        $addFields: {
          engagementLevel: {
            $switch: {
              branches: [
                { case: { $gt: ['$engagementScore', 70] }, then: 'Highly Engaged' },
                { case: { $gt: ['$engagementScore', 40] }, then: 'Moderately Engaged' }
              ],
              default: 'Low Engagement'
            }
          }
        }
      },
      {
        $facet: {
          usersWithScores: [
            {
              $project: { firstName: 1, lastName: 1, email: 1, engagementScore: 1, engagementLevel: 1, demographics: 1 }
            },
            // { $sort: { engagementScore: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit }
          ],
          demographicInsights: [
            {
              $group: {
                _id: {
                  ageRange: '$demographics.ageRange',
                  gender: '$demographics.gender',
                  education: '$demographics.education'
                },
                averageEngagementScore: { $avg: '$engagementScore' },
                count: { $sum: 1 },
                engagementLevels: {
                  $push: '$engagementLevel'
                }
              }
            },
            {
              $addFields: {
                engagementLevelCounts: {
                  $reduce: {
                    input: '$engagementLevels',
                    initialValue: { 'Highly Engaged': 0, 'Moderately Engaged': 0, 'Low Engagement': 0 },
                    in: {
                      $cond: [
                        { $eq: ['$$this', 'Highly Engaged'] },
                        {
                          $mergeObjects: ['$$value', { 'Highly Engaged': { $add: ['$$value.Highly Engaged', 1] } }]
                        },
                        {
                          $cond: [
                            { $eq: ['$$this', 'Moderately Engaged'] },
                            {
                              $mergeObjects: [
                                '$$value',
                                { 'Moderately Engaged': { $add: ['$$value.Moderately Engaged', 1] } }
                              ]
                            },
                            {
                              $mergeObjects: ['$$value', { 'Low Engagement': { $add: ['$$value.Low Engagement', 1] } }]
                            }
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            },
            { $project: { engagementLevels: 0 } } // Remove the temporary array
          ],
          totalUsers: [{ $count: 'count' }]
        }
      }
    ]

    const result = await this.userRepository.aggregate<UserStatisticsFacetOutput>(pipeline)

    if (result && result.length > 0) {
      const data: UserStatisticsFacetOutput = result[0]
      return {
        usersWithScores: data.usersWithScores || [],
        demographicInsights: data.demographicInsights || [],
        totalUsers: data.totalUsers && data.totalUsers.length > 0 ? data.totalUsers[0].count : 0,
        page,
        limit
      }
    }
    return { usersWithScores: [], demographicInsights: [], totalUsers: 0, page, limit }
  }
}
