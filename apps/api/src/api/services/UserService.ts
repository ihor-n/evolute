import { type FilterQuery } from 'mongoose'
import { UserRepository } from '@/src/core/repositories/UserRepository'
import { type IUser } from '@/src/core/models/User'
import { type GetFilters } from '@repo/dto'
import { inject, injectable } from 'inversify'
import { TOKENS } from '@/src/infrastructure/di/tokens'

@injectable()
export class UserService {
  constructor(@inject(TOKENS.UserRepository) private userRepository: UserRepository) {}

  async getUsers(
    filters: GetFilters,
    search: string | undefined,
    page: number,
    limit: number,
    sort?: string,
    order?: 'asc' | 'desc'
  ): Promise<{ users: IUser[]; total: number; page: number; limit: number }> {
    const query: FilterQuery<IUser> = {}
    const regexFilterColumns: (keyof GetFilters & keyof IUser)[] = ['firstName', 'email', 'company']

    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        const filterKey = key as keyof GetFilters
        const value = filters[filterKey]
        if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
          continue
        }

        if (regexFilterColumns.includes(filterKey) && typeof value === 'string') {
          query[filterKey as keyof IUser] = { $regex: value.trim(), $options: 'i' }
        } else {
          query[filterKey as keyof IUser] = value
        }
      }
    }

    if (search && search.trim() !== '') {
      const trimmedSearch = search.trim()
      query.$or = [
        { firstName: { $regex: trimmedSearch, $options: 'i' } },
        { lastName: { $regex: trimmedSearch, $options: 'i' } },
        { email: { $regex: trimmedSearch, $options: 'i' } },
        { company: { $regex: trimmedSearch, $options: 'i' } },
        { department: { $regex: trimmedSearch, $options: 'i' } },
        { jobTitle: { $regex: trimmedSearch, $options: 'i' } }
      ]
    }

    const users = await this.userRepository.find(query, page, limit, sort, order)
    const total = await this.userRepository.count(query)
    return { users, total, page, limit }
  }
}
