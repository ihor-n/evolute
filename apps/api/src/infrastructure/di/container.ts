import { Container } from 'inversify'
import { TOKENS } from '@/src/infrastructure/di/tokens'

import { UserRepository } from '@/src/core/repositories/UserRepository'
import { ManufacturerRepository } from '@/src/core/repositories/ManufacturerRepository'

import { UserService } from '@/src/api/services/UserService'
import { ManufacturerService } from '@/src/api/services/ManufacturerService'
import { StatisticsService } from '@/src/api/services/StatisticsService'

import { UserController } from '@/src/api/controllers/UserController'
import { ManufacturerController } from '@/src/api/controllers/ManufacturerController'
import { StatisticsController } from '@/src/api/controllers/StatisticsController'

const container = new Container()

container.bind<UserRepository>(TOKENS.UserRepository).to(UserRepository).inSingletonScope()
container.bind<ManufacturerRepository>(TOKENS.ManufacturerRepository).to(ManufacturerRepository).inSingletonScope()

container.bind<UserService>(TOKENS.UserService).to(UserService).inTransientScope()
container.bind<ManufacturerService>(TOKENS.ManufacturerService).to(ManufacturerService).inTransientScope()
container.bind<StatisticsService>(TOKENS.StatisticsService).to(StatisticsService).inTransientScope()

container.bind<UserController>(TOKENS.UserController).to(UserController).inTransientScope()
container.bind<ManufacturerController>(TOKENS.ManufacturerController).to(ManufacturerController).inTransientScope()
container.bind<StatisticsController>(TOKENS.StatisticsController).to(StatisticsController).inTransientScope()

export { container }
