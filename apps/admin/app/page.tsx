'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { UserTable, AddManufacturerModal } from '@/components'
import { fetchUsers, SortDirection, SortableColumn, addUsersToNewManufacturer } from '@/lib/api'
import { type IUsersApiResponse, type CreateManufacturerPayload } from '@repo/dto'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  Button
} from '@/components/ui'
import { useRouter, useSearchParams } from 'next/navigation'

const ITEMS_PER_PAGE = 10

export default function UserManagementPage() {
  const [usersData, setUsersData] = useState<IUsersApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [filters, setFilters] = useState<Partial<Record<SortableColumn, string>>>({})
  const [isInitialSyncComplete, setIsInitialSyncComplete] = useState(false)
  const [isAddManufacturerModalOpen, setIsAddManufacturerModalOpen] = useState(false)
  const [isSubmittingManufacturer, setIsSubmittingManufacturer] = useState(false)
  const [submitManufacturerError, setSubmitManufacturerError] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10)
    const sortCol = searchParams.get('sort') as SortableColumn | null
    const sortDir = (searchParams.get('order') as SortDirection) || 'asc'
    const currentFilters: Partial<Record<SortableColumn, string>> = {}

    searchParams.forEach((value, key) => {
      if (key.startsWith('filter_')) {
        currentFilters[key.replace('filter_', '') as SortableColumn] = value
      }
    })

    setCurrentPage(page)
    setSortColumn(sortCol)
    setSortDirection(sortDir)
    setSelectedUserIds([])
    setFilters(currentFilters)
    setIsInitialSyncComplete(true)
  }, [searchParams])

  const updateUrlQueryParams = useCallback(
    (params: {
      page?: number
      sort?: SortableColumn | null
      order?: SortDirection
      filters?: Partial<Record<SortableColumn, string>>
    }) => {
      const newParams = new URLSearchParams(searchParams.toString())
      if (params.page !== undefined) newParams.set('page', String(params.page))
      if (params.sort !== undefined) {
        if (params.sort) newParams.set('sort', params.sort)
        else newParams.delete('sort')
      }
      if (params.order !== undefined) newParams.set('order', params.order)
      if (params.filters !== undefined) {
        searchParams.forEach((_, key) => {
          if (key.startsWith('filter_')) newParams.delete(key)
        })
        for (const key in params.filters) {
          if (params.filters[key as SortableColumn])
            newParams.set(`filter_${key}`, params.filters[key as SortableColumn]!)
        }
      }

      router.push(`?${newParams.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  useEffect(() => {
    const loadUsers = async () => {
      if (!isInitialSyncComplete) {
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchUsers(currentPage, ITEMS_PER_PAGE, sortColumn, sortDirection, filters)
        setUsersData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setUsersData(null)
      } finally {
        setSelectedUserIds([])
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [isInitialSyncComplete, currentPage, sortColumn, sortDirection, filters])

  const totalPages = usersData ? Math.ceil(usersData.total / usersData.limit) : 0

  const handleSort = (column: SortableColumn) => {
    let newSortDirection: SortDirection = 'asc'
    if (sortColumn === column) {
      newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      newSortDirection = 'asc'
    }
    updateUrlQueryParams({ sort: column, order: newSortDirection })
  }

  const handleSelectedUserIdsChange = (newSelectedIds: string[]) => {
    setSelectedUserIds(newSelectedIds)
  }

  const handleFilterChange = (column: SortableColumn, value: string) => {
    const newFilters = { ...filters, [column]: value }
    if (!value) delete newFilters[column]
    updateUrlQueryParams({ filters: newFilters, page: 1 })
  }

  const handleOpenAddManufacturerModal = () => {
    if (selectedUserIds.length > 0) {
      setSubmitManufacturerError(null)
      setIsAddManufacturerModalOpen(true)
    }
  }

  const handleCreateManufacturerSubmit = async (manufacturerData: Omit<CreateManufacturerPayload, 'userIds'>) => {
    if (selectedUserIds.length === 0) {
      setSubmitManufacturerError('No users selected.')
      return
    }
    setIsSubmittingManufacturer(true)
    setSubmitManufacturerError(null)
    try {
      const payload: CreateManufacturerPayload = { ...manufacturerData, userIds: selectedUserIds }
      await addUsersToNewManufacturer(payload)
      setIsAddManufacturerModalOpen(false)
      setSelectedUserIds([]) // Clear selection
      // Optionally: show success message or refetch data if needed
    } catch (err) {
      setSubmitManufacturerError(err instanceof Error ? err.message : 'Failed to create manufacturer')
    } finally {
      setIsSubmittingManufacturer(false)
    }
  }

  return (
    <div className="container max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
      <div className="mb-4 flex gap-2">
        {selectedUserIds.length > 0 && (
          <Button onClick={handleOpenAddManufacturerModal} variant="secondary" className="ml-auto">
            Add {selectedUserIds.length} User(s) to Manufacturer
          </Button>
        )}
      </div>
      {isLoading && <p className="text-blue-500">Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {usersData && (
        <UserTable
          users={usersData.users}
          onSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          selectedUserIds={selectedUserIds}
          onSelectedUserIdsChange={handleSelectedUserIdsChange}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}
      {isAddManufacturerModalOpen && (
        <AddManufacturerModal
          isOpen={isAddManufacturerModalOpen}
          onClose={() => setIsAddManufacturerModalOpen(false)}
          onSubmit={handleCreateManufacturerSubmit}
          selectedUserCount={selectedUserIds.length}
          isLoading={isSubmittingManufacturer}
          error={submitManufacturerError}
        />
      )}
      {usersData && usersData.total > 0 && usersData.total > ITEMS_PER_PAGE && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  currentPage > 1
                    ? `?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: String(currentPage - 1) })}`
                    : '#'
                }
                className={currentPage === 1 || isLoading ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="px-4 py-2 text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? `?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: String(currentPage + 1) })}`
                    : '#'
                }
                className={
                  currentPage === totalPages || isLoading || totalPages === 0 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
