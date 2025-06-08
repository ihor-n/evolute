import { type Request, type Response, type NextFunction } from 'express'

export interface IStatisticsController {
  getUserStatistics: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
