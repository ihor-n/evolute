import { type IUser } from '@/src/core/models/User'
import { type GetFilters } from '@repo/dto'

export interface IUserService {
  getUsers(
    filters: GetFilters,
    search: string | undefined,
    page: number,
    limit: number,
    sort?: string,
    order?: 'asc' | 'desc'
  ): Promise<{ users: IUser[]; total: number; page: number; limit: number }>
}
