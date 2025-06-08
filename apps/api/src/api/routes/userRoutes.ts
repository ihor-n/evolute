import { Router } from 'express'
import { UserController } from '@/src/api/controllers/UserController'
import { StatisticsController } from '@/src/api/controllers/StatisticsController'

const router = Router()
const userController = new UserController()
const statisticsController = new StatisticsController()

router.get('/', userController.getUsers)
router.get('/statistics', statisticsController.getUserStatistics)

export default router
