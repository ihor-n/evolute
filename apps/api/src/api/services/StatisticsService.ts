import mongoose from 'mongoose'
import { injectable, inject } from 'inversify'
import { type IUserStatisticsResponse, type IUserWithScore, type IDemographicInsight } from '@repo/dto'
import { type IUserRepository, type IStatisticsService } from '@/src/core/interfaces'
import { TOKENS } from '@/src/infrastructure/di/tokens'

interface UserStatisticsFacetOutput {
  usersWithScores: IUserWithScore[]
  demographicInsights: IDemographicInsight[]
  totalUsers: { count: number }[]
}

@injectable()
export class StatisticsService implements IStatisticsService {
  constructor(@inject(TOKENS.UserRepository) private repository: IUserRepository) {}

  async getUserStatistics(page: number = 1, limit: number = 10): Promise<IUserStatisticsResponse> {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const ninetyDaysAgo = new Date()
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

    const pipeline: mongoose.PipelineStage[] = [
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
                engagementLevels: { $push: '$engagementLevel' }
              }
            },
            {
              $addFields: {
                engagementLevelCounts: {
                  $reduce: {
                    input: '$engagementLevels',
                    initialValue: { 'Highly Engaged': 0, 'Moderately Engaged': 0, 'Low Engagement': 0 },
                    in: {
                      $cond: {
                        if: { $eq: ['$$this', 'Highly Engaged'] },
                        then: {
                          $mergeObjects: ['$$value', { 'Highly Engaged': { $add: ['$$value.Highly Engaged', 1] } }]
                        },
                        else: {
                          $cond: {
                            if: { $eq: ['$$this', 'Moderately Engaged'] },
                            then: {
                              $mergeObjects: [
                                '$$value',
                                { 'Moderately Engaged': { $add: ['$$value.Moderately Engaged', 1] } }
                              ]
                            },
                            else: {
                              $mergeObjects: ['$$value', { 'Low Engagement': { $add: ['$$value.Low Engagement', 1] } }]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            { $project: { engagementLevels: 0 } }
          ],
          totalUsers: [{ $count: 'count' }]
        }
      }
    ]

    const result = await this.repository.aggregate<UserStatisticsFacetOutput>(pipeline)

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
