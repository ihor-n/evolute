// Mirroring backend IUser for frontend usage
// We can pick only the fields needed for display or interaction

export interface IExperience {
  yearsInIndustry: number
  expertise: string[]
  certifications: string[]
}

export interface IPreferences {
  language: string
  timezone: string
  communicationChannel: string
}

export interface IDemographics {
  ageRange: string
  gender: string
  education: string
}

export interface IWorkHistory {
  currentPosition: string
  previousPositions: string[]
  industrySpecialization: string[]
}

export interface IResponseQuality {
  avgCompletionRate: number
  avgResponseLength: number
  thoughtfulnessScore: number
}

export interface IEngagementHistory {
  month: string
  surveysCompleted: number
  responseTime: number
}

export interface IActivityMetrics {
  loginFrequency: number
  sessionDuration: number
  featuresUsed: string[]
  lastLoginStreak: number
}

export interface IFeedbackProvided {
  platformFeedback: number
  surveyFeedback: number
  featureRequests: number
}

export interface IParticipation {
  surveysCompleted: number
  surveysInvited: number
  lastResponseDate?: string // Date as string for easier serialization
  responseRate: number
  avgResponseTime: number
  responseQuality: IResponseQuality
  engagementHistory: IEngagementHistory[]
  activityMetrics: IActivityMetrics
  feedbackProvided: IFeedbackProvided
}

export interface IAddress {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface IUser {
  _id: string // ObjectId typically represented as string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  department?: string
  role?: string
  jobTitle?: string
  experience?: IExperience
  preferences?: IPreferences
  demographics?: IDemographics
  workHistory?: IWorkHistory
  status: 'active' | 'inactive'
  participation?: IParticipation
  address?: IAddress
  joinedAt: string // Date as string
  lastActive?: string // Date as string
  metadata?: Record<string, any>
  createdAt?: string
  updatedAt?: string
}

export interface IUsersApiResponse {
  users: IUser[]
  total: number
  page: number
  limit: number
}

export interface IUserWithScore {
  _id: string
  firstName: string
  lastName: string
  email: string
  engagementScore: number
  engagementLevel: 'Highly Engaged' | 'Moderately Engaged' | 'Low Engagement'
  demographics?: IDemographics // Optional, as it might not always be present or complete
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
}
