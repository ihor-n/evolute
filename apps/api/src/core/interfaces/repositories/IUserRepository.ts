import { type IUser } from '@/src/core/models/User'
import { type FilterQuery, type PipelineStage } from 'mongoose'

export interface IUserRepository {
  find(
    query: FilterQuery<IUser>,
    page?: number,
    limit?: number,
    sort?: string,
    order?: 'asc' | 'desc'
  ): Promise<IUser[]>

  count(query: FilterQuery<IUser>): Promise<number>

  findById(id: string): Promise<IUser | null>

  findByIds(ids: string[]): Promise<IUser[]>

  aggregate<T>(pipeline: PipelineStage[]): Promise<T[]>
}
