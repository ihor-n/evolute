import { type Request, type Response, type NextFunction } from 'express'

export interface IManufacturerController {
  addUsersToNewManufacturer: (req: Request, res: Response, next: NextFunction) => Promise<void>
  getManufacturers: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
