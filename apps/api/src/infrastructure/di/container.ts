import { Container } from 'inversify'
import { TOKENS } from '@/src/infrastructure/di/tokens'

import { UserRepository } from '@/src/core/repositories/UserRepository'
import { ManufacturerRepository } from '@/src/core/repositories/ManufacturerRepository'
import {
  type IManufacturerRepository,
  type IUserRepository,
  type IUserService,
  type IManufacturerService,
  type IStatisticsService,
  type IUserController,
  type IManufacturerController,
  type IStatisticsController
} from '@/src/core/interfaces'

import { UserService } from '@/src/api/services/UserService'
import { ManufacturerService } from '@/src/api/services/ManufacturerService'
import { StatisticsService } from '@/src/api/services/StatisticsService'

import { UserController } from '@/src/api/controllers/UserController'
import { ManufacturerController } from '@/src/api/controllers/ManufacturerController'
import { StatisticsController } from '@/src/api/controllers/StatisticsController'

const container = new Container()

container.bind<IUserRepository>(TOKENS.UserRepository).to(UserRepository).inSingletonScope()
container.bind<IManufacturerRepository>(TOKENS.ManufacturerRepository).to(ManufacturerRepository).inSingletonScope()

container.bind<IUserService>(TOKENS.UserService).to(UserService).inTransientScope()
container.bind<IManufacturerService>(TOKENS.ManufacturerService).to(ManufacturerService).inTransientScope()
container.bind<IStatisticsService>(TOKENS.StatisticsService).to(StatisticsService).inTransientScope()

container.bind<IUserController>(TOKENS.UserController).to(UserController).inTransientScope()
container.bind<IManufacturerController>(TOKENS.ManufacturerController).to(ManufacturerController).inTransientScope()
container.bind<IStatisticsController>(TOKENS.StatisticsController).to(StatisticsController).inTransientScope()

export { container }
