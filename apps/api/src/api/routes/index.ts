import { Router } from 'express'
import userRoutes from '@/src/api/routes/userRoutes'
import manufacturerRoutes from '@/src/api/routes/manufacturerRoutes'

const router = Router()

router.use('/users', userRoutes)
router.use('/manufacturers', manufacturerRoutes)

export default router
