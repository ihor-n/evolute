import { type IManufacturer } from '@/src/core/models/Manufacturer'
import { type IManufacturersResponse } from '@repo/dto'

export interface IManufacturerService {
  addUsersToNewManufacturer(
    userIds: string[],
    manufacturerData: Omit<Partial<IManufacturer>, 'userIds'>
  ): Promise<IManufacturer>

  getManufacturersWithDetails(
    page: number,
    limit: number,
    sort?: string,
    order?: 'asc' | 'desc'
  ): Promise<IManufacturersResponse>
}
