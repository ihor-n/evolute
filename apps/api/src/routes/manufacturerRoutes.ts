import { Router } from 'express'
import { UserController } from '../controllers/UserController' // Re-using for now

const router = Router()
const userController = new UserController() // Or a dedicated ManufacturerController

// Endpoint to add multiple users to a new manufacturer
router.post('/', userController.addUsersToNewManufacturer)

export default router
