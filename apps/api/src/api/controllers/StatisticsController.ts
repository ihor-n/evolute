import { Request, Response, NextFunction } from 'express'
import { StatisticsService } from '@/src/api/services/StatisticsService'
import { injectable, inject } from 'inversify'
import { TOKENS } from '@/src/infrastructure/di/tokens'

@injectable()
export class StatisticsController {
  constructor(@inject(TOKENS.StatisticsService) private statisticsService: StatisticsService) {}

  getUserStatistics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 10
      const statistics = await this.statisticsService.getUserStatistics(page, limit)
      res.json(statistics)
    } catch (error) {
      next(error)
    }
  }
}
