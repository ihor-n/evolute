import { Router } from 'express'
import { ManufacturerController } from '@/src/api/controllers/ManufacturerController'
import { container } from '@/src/infrastructure/di/container'
import { TOKENS } from '@/src/infrastructure/di/tokens'

const router = Router()
const manufacturerController = container.get<ManufacturerController>(TOKENS.ManufacturerController)

router.post('/', manufacturerController.addUsersToNewManufacturer)
router.get('/', manufacturerController.getManufacturers)

export default router
