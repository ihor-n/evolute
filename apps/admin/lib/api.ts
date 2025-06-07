import { IUsersApiResponse, IUserStatisticsResponse } from '../types'

const API_BASE_URL = 'http://localhost:5001/api'
export type SortDirection = 'asc' | 'desc'
export type SortableColumn = 'firstName' | 'email' | 'company' | 'status' | 'joinedAt'

export async function fetchUsers(
  page = 1,
  limit = 10,
  search = '',
  sortColumn: SortableColumn | null = null,
  sortDirection: SortDirection = 'asc'
): Promise<IUsersApiResponse> {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit)
  })
  if (search) {
    queryParams.append('search', search)
  }
  if (sortColumn) {
    queryParams.append('sort', sortColumn)
    queryParams.append('order', sortDirection)
  }
  const response = await fetch(`${API_BASE_URL}/users?${queryParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

export async function fetchUserStatistics(page: number = 1, limit: number = 10): Promise<IUserStatisticsResponse> {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit)
  })
  const response = await fetch(`${API_BASE_URL}/users/statistics?${queryParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user statistics')
  }
  return response.json()
}
