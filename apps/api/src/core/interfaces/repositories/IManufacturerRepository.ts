import { type IManufacturer } from '@/src/core/models/Manufacturer'
import { type FilterQuery } from 'mongoose'

export interface IManufacturerRepository {
  create(data: Partial<IManufacturer>): Promise<IManufacturer>

  find(query: FilterQuery<IManufacturer>): Promise<IManufacturer[]>

  findAllAndPopulateUsers(
    page?: number,
    limit?: number,
    sort?: string,
    order?: 'asc' | 'desc'
  ): Promise<IManufacturer[]>
  countAll(query?: FilterQuery<IManufacturer>): Promise<number>
}
