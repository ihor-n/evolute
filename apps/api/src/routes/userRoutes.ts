import { Router } from 'express'
import { UserController } from '@/src/controllers/UserController'

const router = Router()
const userController = new UserController()

router.get('/', userController.getUsers)
router.get('/statistics', userController.getUserStatistics)

export default router
