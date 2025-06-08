import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IExperience {
  yearsInIndustry: number
  expertise: string[]
  certifications: string[]
}

const ExperienceSchema: Schema = new Schema<IExperience>(
  {
    yearsInIndustry: { type: Number },
    expertise: [{ type: String }],
    certifications: [{ type: String }]
  },
  { _id: false }
)

export interface IAddress {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

interface IPreferences {
  language: string
  timezone: string
  communicationChannel: string
}

export interface IDemographics {
  ageRange: string
  gender: string
  education: string
}

const DemographicsSchema: Schema = new Schema<IDemographics>(
  {
    ageRange: { type: String },
    gender: { type: String },
    education: { type: String }
  },
  { _id: false }
)

interface IWorkHistory {
  currentPosition: string
  previousPositions: string[]
  industrySpecialization: string[]
}

interface IResponseQuality {
  avgCompletionRate: number
  avgResponseLength: number
  thoughtfulnessScore: number
}

interface IEngagementHistory {
  month: string
  surveysCompleted: number
  responseTime: number
}

interface IActivityMetrics {
  loginFrequency: number
  sessionDuration: number
  featuresUsed: string[]
  lastLoginStreak: number
}

interface IFeedbackProvided {
  platformFeedback: number
  surveyFeedback: number
  featureRequests: number
}

interface IParticipation {
  surveysCompleted: number
  surveysInvited: number
  lastResponseDate?: Date
  responseRate: number
  avgResponseTime: number
  responseQuality: IResponseQuality
  engagementHistory: IEngagementHistory[]
  activityMetrics: IActivityMetrics
  feedbackProvided: IFeedbackProvided
}

const AddressSchema: Schema = new Schema<IAddress>(
  {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String }
  },
  { _id: false }
)

export interface IUser extends Document {
  _id: Types.ObjectId
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
  joinedAt: Date
  lastActive?: Date
  metadata?: Record<string, any>
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    company: String,
    department: String,
    role: String,
    jobTitle: String,
    experience: ExperienceSchema,
    preferences: Schema.Types.Mixed,
    demographics: DemographicsSchema,
    workHistory: Schema.Types.Mixed,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    participation: Schema.Types.Mixed,
    address: AddressSchema,
    joinedAt: { type: Date, default: Date.now },
    lastActive: Date,
    metadata: Schema.Types.Mixed
  },
  { timestamps: true }
)

export default mongoose.model<IUser>('User', UserSchema)
