import { Request, Response, NextFunction } from 'express'
import { StatisticsService } from '@/src/services/StatisticsService'
import UserRepository from '@/src/repositories/UserRepository'

const statisticsService = new StatisticsService(UserRepository)

export class StatisticsController {
  async getUserStatistics(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 10
      const statistics = await statisticsService.getUserStatistics(page, limit)
      res.json(statistics)
    } catch (error) {
      next(error)
    }
  }
}
