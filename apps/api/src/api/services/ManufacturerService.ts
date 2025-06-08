import { type IUserRepository } from '@/src/core/interfaces/repositories/IUserRepository'
import { type IManufacturerRepository } from '@/src/core/interfaces/repositories/IManufacturerRepository'
import { type IManufacturer } from '@/src/core/models/Manufacturer'
import { type IUser as IDtoUser, type IManufacturersResponse, type IManufacturerWithUsersForList } from '@repo/dto'
import { inject, injectable } from 'inversify'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { type IManufacturerService } from '@/src/core/interfaces/services/IManufacturerService'

@injectable()
export class ManufacturerService implements IManufacturerService {
  constructor(
    @inject(TOKENS.UserRepository) private userRepository: IUserRepository,
    @inject(TOKENS.ManufacturerRepository) private manufacturerRepository: IManufacturerRepository
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
