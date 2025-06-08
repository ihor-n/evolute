import { Request, Response, NextFunction } from 'express'
import { injectable, inject } from 'inversify'
import { type IManufacturerService, type IManufacturerController } from '@/src/core/interfaces'
import { TOKENS } from '@/src/infrastructure/di/tokens'

@injectable()
export class ManufacturerController implements IManufacturerController {
  constructor(@inject(TOKENS.ManufacturerService) private manufacturerService: IManufacturerService) {}

  addUsersToNewManufacturer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userIds, ...manufacturerData } = req.body
      if (!userIds || !Array.isArray(userIds) || userIds.length === 0 || !manufacturerData.name) {
        res.status(400).json({ message: 'Missing required fields: userIds and manufacturer name' })
        return
      }
      const manufacturer = await this.manufacturerService.addUsersToNewManufacturer(userIds, manufacturerData)
      res.status(201).json(manufacturer)
    } catch (error) {
      next(error)
    }
  }

  getManufacturers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 10, sort, order } = req.query
      const result = await this.manufacturerService.getManufacturersWithDetails(
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
