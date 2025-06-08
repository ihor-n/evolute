import { UserRepository } from '@/src/core/repositories/UserRepository'
import { ManufacturerRepository } from '@/src/core/repositories/ManufacturerRepository'
import { type IManufacturer } from '@/src/core/models/Manufacturer'
import { type IUser as IDtoUser, type IManufacturersResponse, type IManufacturerWithUsersForList } from '@repo/dto'
import { inject, injectable } from 'inversify'
import { TOKENS } from '@/src/infrastructure/di/tokens'

@injectable()
export class ManufacturerService {
  constructor(
    @inject(TOKENS.UserRepository) private userRepository: UserRepository,
    @inject(TOKENS.ManufacturerRepository) private manufacturerRepository: ManufacturerRepository
  ) {}

  async addUsersToNewManufacturer(
    userIds: string[],
    manufacturerData: Omit<Partial<IManufacturer>, 'userIds'>
  ): Promise<IManufacturer> {
    if (!userIds || userIds.length === 0) {
      throw new Error('User IDs must be provided to add to a new manufacturer.')
    }
    const users = await this.userRepository.findByIds(userIds)
    if (users.length !== userIds.length) {
      const foundUserIds = users.map(user => user._id.toString())
      const notFoundIds = userIds.filter(id => !foundUserIds.includes(id))
      throw new Error(`One or more users not found: ${notFoundIds.join(', ')}. Please provide valid user IDs.`)
    }

    return this.manufacturerRepository.create({
      ...manufacturerData,
      userIds: users.map(user => user._id)
    })
  }

  async getManufacturersWithDetails(
    page: number,
    limit: number,
    sort?: string,
    order?: 'asc' | 'desc'
  ): Promise<IManufacturersResponse> {
    const manufacturers = await this.manufacturerRepository.findAllAndPopulateUsers(page, limit, sort, order)
    const total = await this.manufacturerRepository.countAll()

    const manufacturersWithUsers = manufacturers.map(m => ({
      ...m.toObject(),
      userIds: m.userIds as unknown as IDtoUser[]
    })) as IManufacturerWithUsersForList[]

    return { manufacturers: manufacturersWithUsers, total, page, limit }
  }
}
