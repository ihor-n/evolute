import { Router } from 'express'
import userRoutes from './userRoutes'
import manufacturerRoutes from './manufacturerRoutes'

const router = Router()

router.use('/users', userRoutes)
router.use('/manufacturers', manufacturerRoutes)

export default router
