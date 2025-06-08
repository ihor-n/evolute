import { Request, Response, NextFunction } from 'express'
import { UserService } from '@/src/api/services/UserService'
import UserRepository from '@/src/core/repositories/UserRepository'

const userService = new UserService(UserRepository)

export class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, limit = 10, search, sort, order, ...filters } = req.query
      const result = await userService.getUsers(
        filters as Record<string, unknown>,
        search as string | undefined,
        Number(page),
        Number(limit),
        sort as string | undefined,
        order as 'asc' | 'desc' | undefined
      )
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}
