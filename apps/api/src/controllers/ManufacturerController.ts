import { Request, Response, NextFunction } from 'express'
import { ManufacturerService } from '@/src/services/ManufacturerService'
import ManufacturerRepository from '@/src/repositories/ManufacturerRepository'
import UserRepository from '@/src/repositories/UserRepository'

const manufacturerService = new ManufacturerService(ManufacturerRepository, UserRepository)

export class ManufacturerController {
  async addUsersToNewManufacturer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userIds, ...manufacturerData } = req.body
      if (!userIds || !Array.isArray(userIds) || userIds.length === 0 || !manufacturerData.name) {
        res.status(400).json({ message: 'Missing required fields: userIds and manufacturer name' })
        return
      }
      const manufacturer = await manufacturerService.addUsersToNewManufacturer(userIds, manufacturerData)
      res.status(201).json(manufacturer)
    } catch (error) {
      next(error)
    }
  }

  async getManufacturers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, limit = 10, sort, order } = req.query
      const result = await manufacturerService.getManufacturersWithDetails(
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
