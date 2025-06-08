import { Request, Response, NextFunction } from 'express'
import { UserService } from '@/src/services/UserService'
import UserRepository from '@/src/repositories/UserRepository'
import ManufacturerRepository from '@/src/repositories/ManufacturerRepository'

const userService = new UserService(UserRepository, ManufacturerRepository)

export class StatisticsController {
  async getUserStatistics(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 10
      const statistics = await userService.getUserStatistics(page, limit)
      res.json(statistics)
    } catch (error) {
      next(error)
    }
  }
}
