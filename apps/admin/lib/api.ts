import {
  type IUsersApiResponse,
  type IUserStatisticsResponse,
  type IManufacturer,
  type CreateManufacturerPayload
} from '@repo/dto'

const API_BASE_URL = 'http://localhost:5001/api'

export type SortDirection = 'asc' | 'desc'
export type SortableColumn = 'firstName' | 'email' | 'company' | 'status' | 'joinedAt'

export async function fetchUsers(
  page = 1,
  limit = 10,
  sortColumn: SortableColumn | null = null,
  sortDirection: SortDirection = 'asc',
  filters: Partial<Record<SortableColumn, string>> = {}
): Promise<IUsersApiResponse> {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit)
  })

  if (sortColumn) {
    queryParams.append('sort', sortColumn)
    queryParams.append('order', sortDirection)
  }

  for (const key in filters) {
    if (filters[key as SortableColumn]) {
      queryParams.append(key, filters[key as SortableColumn]!)
    }
  }

  const response = await fetch(`${API_BASE_URL}/users?${queryParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

export async function addUsersToNewManufacturer(payload: CreateManufacturerPayload): Promise<IManufacturer> {
  const response = await fetch(`${API_BASE_URL}/manufacturers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to add users to new manufacturer')
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
