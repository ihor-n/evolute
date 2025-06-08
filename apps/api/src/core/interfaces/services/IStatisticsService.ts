import { type IUserStatisticsResponse } from '@repo/dto'

export interface IStatisticsService {
  getUserStatistics(page?: number, limit?: number): Promise<IUserStatisticsResponse>
}
