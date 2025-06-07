import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import UserRepository from '../repositories/UserRepository'
import ManufacturerRepository from '../repositories/ManufacturerRepository'

const userService = new UserService(UserRepository, ManufacturerRepository)

export class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search, sort, order, ...filters } = req.query
      const result = await userService.getUsers(
        filters as Record<string, any>,
        search as string | undefined,
        Number(page),
        Number(limit),
        sort as string | undefined,
        order as 'asc' | 'desc' | undefined
      )
      res.json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: (error as Error).message })
    }
  }

  async getUserStatistics(req: Request, res: Response): Promise<void> {
    try {
      const statistics = await userService.getUserStatistics()
      res.json(statistics[0]) // The aggregation returns an array with one element
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user statistics', error: (error as Error).message })
    }
  }

  async addUsersToNewManufacturer(req: Request, res: Response): Promise<void> {
    try {
      const { userIds, ...manufacturerData } = req.body
      if (!userIds || !Array.isArray(userIds) || userIds.length === 0 || !manufacturerData.name) {
        res.status(400).json({ message: 'Missing required fields: userIds and manufacturer name' })
        return
      }
      const manufacturer = await userService.addUsersToNewManufacturer(userIds, manufacturerData)
      res.status(201).json(manufacturer)
    } catch (error) {
      res.status(500).json({ message: 'Error creating manufacturer', error: (error as Error).message })
    }
  }
}
