import { Router } from 'express'
import { container } from '@/src/infrastructure/di/container'
import { TOKENS } from '@/src/infrastructure/di/tokens'
import { type IManufacturerController } from '@/src/core/interfaces'

const router = Router()
const manufacturerController = container.get<IManufacturerController>(TOKENS.ManufacturerController)

router.post('/', manufacturerController.addUsersToNewManufacturer)
router.get('/', manufacturerController.getManufacturers)

export default router
