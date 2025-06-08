import { type IUserSummaryForManufacturer } from './user'

export interface IContactPerson {
  name: string
  email: string
  phone: string
}

export interface IManufacturerResponse {
  _id: string
  name: string
  industry: string
  userIds: string[]
  contactPerson: IContactPerson
}

export interface CreateManufacturerPayload {
  name: string
  industry: string
  contactPerson: {
    name: string
    email: string
    phone: string
  }
  userIds: string[]
}

export interface IManufacturerWithUsersForList {
  _id: string
  name: string
  industry: string
  userIds: IUserSummaryForManufacturer[]
  contactPerson?: {
    name?: string
    email?: string
    phone?: string
  }
}

export interface IManufacturersResponse {
  manufacturers: IManufacturerWithUsersForList[]
  total: number
  page: number
  limit: number
}
