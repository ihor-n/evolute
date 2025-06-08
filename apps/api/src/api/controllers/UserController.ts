import { Request, Response, NextFunction } from 'express'
import { injectable, inject } from 'inversify'
import { type IUserService, type IUserController } from '@/src/core/interfaces'
import { TOKENS } from '@/src/infrastructure/di/tokens'

@injectable()
export class UserController implements IUserController {
  constructor(@inject(TOKENS.UserService) private userService: IUserService) {}

  getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 10, search, sort, order, ...filters } = req.query
      const result = await this.userService.getUsers(
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
