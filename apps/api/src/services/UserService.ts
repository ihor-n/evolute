import { UserRepository } from '../repositories/UserRepository'
import { ManufacturerRepository } from '../repositories/ManufacturerRepository'
import { type IUser } from '../models/User'
import { type IManufacturer } from '../models/Manufacturer'
import mongoose, { type FilterQuery } from 'mongoose'

export class UserService {
  private userRepository: UserRepository
  private manufacturerRepository: ManufacturerRepository

  constructor(userRepository: UserRepository, manufacturerRepository: ManufacturerRepository) {
    this.userRepository = userRepository
    this.manufacturerRepository = manufacturerRepository
  }

  async getUsers(
    filters: Record<string, any>,
    search: string | undefined,
    page: number,
    limit: number,
    sort?: string,
    order?: 'asc' | 'desc'
  ): Promise<{ users: IUser[]; total: number; page: number; limit: number }> {
    const query: FilterQuery<IUser> = { ...filters }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { jobTitle: { $regex: search, $options: 'i' } }
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
    // const users = await this.userRepository.findByIds(userIds);
    // if (users.length !== userIds.length) {
    //   throw new Error('One or more users not found');
    // }

    const objectUserIds = userIds.map(id => new mongoose.Types.ObjectId(id))
    return await this.manufacturerRepository.create({
      ...manufacturerData,
      userIds: objectUserIds
    })
  }

  async getUserStatistics(page: number = 1, limit: number = 10): Promise<any> {
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

    const result = await this.userRepository.aggregate(pipeline)

    if (result && result.length > 0) {
      const data = result[0]
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
