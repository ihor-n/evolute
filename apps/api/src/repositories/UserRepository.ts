import User, { IUser } from '../models/User'
import { FilterQuery, PipelineStage } from 'mongoose'

export class UserRepository {
  async find(
    query: FilterQuery<IUser>,
    page: number = 1,
    limit: number = 10,
    sort?: string,
    order?: 'asc' | 'desc'
  ): Promise<IUser[]> {
    let queryBuilder = User.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)

    if (sort) {
      queryBuilder = queryBuilder.sort({ [sort]: order === 'desc' ? -1 : 1 })
    }

    return queryBuilder.exec()
  }

  async count(query: FilterQuery<IUser>): Promise<number> {
    return User.countDocuments(query)
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).exec()
  }

  async findByIds(ids: string[]): Promise<IUser[]> {
    return User.find({ _id: { $in: ids } }).exec()
  }

  async aggregate(pipeline: PipelineStage[]): Promise<any[]> {
    return User.aggregate(pipeline).allowDiskUse(true).exec()
  }
}

export default new UserRepository()
