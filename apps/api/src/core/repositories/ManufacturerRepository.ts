import { injectable } from 'inversify'
import Manufacturer, { IManufacturer } from '../models/Manufacturer'
import { FilterQuery, PopulateOptions } from 'mongoose'
import { type IManufacturerRepository } from '@/src/core/interfaces/repositories/IManufacturerRepository'

@injectable()
export class ManufacturerRepository implements IManufacturerRepository {
  async create(data: Partial<IManufacturer>): Promise<IManufacturer> {
    return Manufacturer.create(data)
  }

  async find(query: FilterQuery<IManufacturer>): Promise<IManufacturer[]> {
    return Manufacturer.find(query).exec()
  }

  async findAllAndPopulateUsers(
    page: number = 1,
    limit: number = 10,
    sort?: string,
    order?: 'asc' | 'desc'
  ): Promise<IManufacturer[]> {
    let queryBuilder = Manufacturer.find({})
      .populate({
        path: 'userIds',
        select: '_id firstName lastName email'
      } as PopulateOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)

    if (sort) {
      queryBuilder = queryBuilder.sort({ [sort]: order === 'desc' ? -1 : 1 })
    }
    return queryBuilder.exec()
  }

  async countAll(query?: FilterQuery<IManufacturer>): Promise<number> {
    return Manufacturer.countDocuments(query)
  }
}
