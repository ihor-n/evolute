import { Router } from 'express'
import { UserController } from '../controllers/UserController'

const router = Router()
const userController = new UserController()

router.post('/', userController.addUsersToNewManufacturer)
router.get('/', userController.getManufacturers)

export default router
