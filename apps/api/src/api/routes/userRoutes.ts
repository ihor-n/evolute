import { Router } from 'express'
import { container } from '@/src/infrastructure/di/container'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { type IUserController, type IStatisticsController } from '@/src/core/interfaces'

const router = Router()
const userController = container.get<IUserController>(TOKENS.UserController)
const statisticsController = container.get<IStatisticsController>(TOKENS.StatisticsController)

router.get('/', userController.getUsers)
router.get('/statistics', statisticsController.getUserStatistics)

export default router
