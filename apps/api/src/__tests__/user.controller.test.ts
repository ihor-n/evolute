import mongoose from 'mongoose'
import supertest from 'supertest'
import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { createServer } from '@/src/server'
import { UserService as ActualUserService } from '@/src/api/services/UserService'
import { type IUser } from '@/src/core/models/User'
import { type GetFilters } from '@repo/dto'
import { UserRepository } from '@/src/core/repositories/UserRepository'

jest.mock('@/src/api/services/UserService')

const MockedUserServiceConstructor = ActualUserService as jest.MockedClass<typeof ActualUserService>

const app = createServer()

describe('UserController Endpoints', () => {
  let mockGetUsers: jest.Mock<
    (
      filters: GetFilters,
      search: string | undefined,
      page: number,
      limit: number,
      sort?: string,
      order?: 'asc' | 'desc'
    ) => Promise<{ users: IUser[]; total: number; page: number; limit: number }>
  >

  beforeEach(() => {
    if (MockedUserServiceConstructor.mock.instances.length === 0) {
      new MockedUserServiceConstructor(undefined as unknown as UserRepository)
    }
    const userServiceInstance = MockedUserServiceConstructor.mock.instances[0]

    mockGetUsers = jest.fn()
    userServiceInstance.getUsers = mockGetUsers
  })

  describe('GET /api/users', () => {
    it('should return a list of users and 200 status with default pagination', async () => {
      const mockUserId = new mongoose.Types.ObjectId()
      const mockUser = {
        _id: mockUserId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        status: 'active',
        joinedAt: new Date()
      } as IUser

      const serviceResponsePayload = {
        users: [mockUser],
        total: 1,
        page: 1,
        limit: 10
      }
      mockGetUsers.mockResolvedValue(serviceResponsePayload)

      const expectedHttpResponseBody = {
        ...serviceResponsePayload,
        users: serviceResponsePayload.users.map(u => ({
          ...u,
          _id: u._id.toString(),
          joinedAt: u.joinedAt.toISOString()
        }))
      }

      await supertest(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).toEqual(expectedHttpResponseBody)
          expect(mockGetUsers).toHaveBeenCalledWith({}, undefined, 1, 10, undefined, undefined)
        })
    })
  })
})
