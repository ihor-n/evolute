import { Router } from 'express'
import { container } from '@/src/infrastructure/di/container'
import { type IUserController, type IStatisticsController } from '@/src/core/interfaces'
import { TOKENS } from '@/src/infrastructure/di/tokens'

const router = Router()
const userController = container.get<IUserController>(TOKENS.UserController)
const statisticsController = container.get<IStatisticsController>(TOKENS.StatisticsController)

router.get('/', userController.getUsers)
router.get('/statistics', statisticsController.getUserStatistics)

export default router
