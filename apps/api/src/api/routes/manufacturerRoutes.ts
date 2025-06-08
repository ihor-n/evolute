import { Router } from 'express'
import { container } from '@/src/infrastructure/di/container'
import { type IManufacturerController } from '@/src/core/interfaces'
import { TOKENS } from '@/src/infrastructure/di/tokens'

const router = Router()
const manufacturerController = container.get<IManufacturerController>(TOKENS.ManufacturerController)

router.post('/', manufacturerController.addUsersToNewManufacturer)
router.get('/', manufacturerController.getManufacturers)

export default router
