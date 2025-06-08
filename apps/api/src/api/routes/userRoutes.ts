import { Router } from 'express'
import { UserController } from '@/src/api/controllers/UserController'
import { StatisticsController } from '@/src/api/controllers/StatisticsController'
import { container } from '@/src/infrastructure/di/container'
import { TOKENS } from '@/src/infrastructure/di/tokens'

const router = Router()
const userController = container.get<UserController>(TOKENS.UserController)
const statisticsController = container.get<StatisticsController>(TOKENS.StatisticsController)

router.get('/', userController.getUsers)
router.get('/statistics', statisticsController.getUserStatistics)

export default router
