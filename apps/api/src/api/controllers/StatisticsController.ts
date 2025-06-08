import { Request, Response, NextFunction } from 'express'
import { injectable, inject } from 'inversify'
import { type IStatisticsService } from '@/src/core/interfaces'
import { TOKENS } from '@/src/infrastructure/di/tokens'

@injectable()
export class StatisticsController {
  constructor(@inject(TOKENS.StatisticsService) private service: IStatisticsService) {}

  getUserStatistics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 10
      const statistics = await this.service.getUserStatistics(page, limit)
      res.json(statistics)
    } catch (error) {
      next(error)
    }
  }
}
