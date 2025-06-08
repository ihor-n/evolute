import { type IDemographics } from './user'

export interface IUserWithScore {
  _id: string
  firstName: string
  lastName: string
  email: string
  engagementScore: number
  engagementLevel: 'Highly Engaged' | 'Moderately Engaged' | 'Low Engagement'
  demographics?: IDemographics
}

export interface IDemographicInsight {
  _id: {
    ageRange?: string
    gender?: string
    education?: string
  }
  averageEngagementScore: number
  count: number
  engagementLevelCounts: Record<'Highly Engaged' | 'Moderately Engaged' | 'Low Engagement', number>
}

export interface IUserStatisticsResponse {
  usersWithScores: IUserWithScore[]
  demographicInsights: IDemographicInsight[]
  totalUsers: number
  page: number
  limit: number
}
