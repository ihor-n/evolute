import { Router } from 'express'
import { ManufacturerController } from '@/src/controllers/ManufacturerController'

const router = Router()
const manufacturerController = new ManufacturerController()

router.post('/', manufacturerController.addUsersToNewManufacturer)
router.get('/', manufacturerController.getManufacturers)

export default router
