import Manufacturer, { IManufacturer } from '../models/Manufacturer'
import { FilterQuery } from 'mongoose'

export class ManufacturerRepository {
  async create(data: Partial<IManufacturer>): Promise<IManufacturer> {
    return Manufacturer.create(data)
  }

  async find(query: FilterQuery<IManufacturer>): Promise<IManufacturer[]> {
    return Manufacturer.find(query).exec()
  }
}

export default new ManufacturerRepository()
