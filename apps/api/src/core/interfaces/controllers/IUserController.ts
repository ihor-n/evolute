import { type Request, type Response, type NextFunction } from 'express'

export interface IUserController {
  getUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
