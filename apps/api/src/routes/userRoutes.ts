import { Router } from 'express'
import { UserController } from '../controllers/UserController'

const router = Router()
const userController = new UserController()

router.get('/', userController.getUsers)
router.get('/statistics', userController.getUserStatistics)
// Note: addUsersToNewManufacturer is typically a manufacturer-related endpoint.
// It's handled in UserController for now as per current service structure but might be better in a ManufacturerController.

export default router
