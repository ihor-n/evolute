'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { UserTable } from '@/components/UserTable'
import { fetchUsers, SortDirection, SortableColumn } from '@/lib/api'
import { IUsersApiResponse } from '@/types'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  // PaginationEllipsis
  Input,
  Button
} from '@/components/ui'
import { useRouter, useSearchParams } from 'next/navigation'

const ITEMS_PER_PAGE = 10

export default function UserManagementPage() {
  const [usersData, setUsersData] = useState<IUsersApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('') // For the input field
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10)
    const search = searchParams.get('search') || ''
    const sortCol = searchParams.get('sort') as SortableColumn | null
    const sortDir = (searchParams.get('order') as SortDirection) || 'asc'

    setCurrentPage(page)
    setSearchTerm(search)
    setAppliedSearchTerm(search)
    setSortColumn(sortCol)
    setSortDirection(sortDir)
  }, [searchParams])

  const updateUrlQueryParams = useCallback(
    (params: { page?: number; search?: string; sort?: SortableColumn | null; order?: SortDirection }) => {
      const newParams = new URLSearchParams(searchParams.toString())
      if (params.page !== undefined) newParams.set('page', String(params.page))
      if (params.search !== undefined) {
        if (params.search) newParams.set('search', params.search)
        else newParams.delete('search')
      }
      if (params.sort !== undefined) {
        if (params.sort) newParams.set('sort', params.sort)
        else newParams.delete('sort')
      }
      if (params.order !== undefined) newParams.set('order', params.order)

      router.push(`?${newParams.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchUsers(currentPage, ITEMS_PER_PAGE, appliedSearchTerm, sortColumn, sortDirection)
        setUsersData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setUsersData(null)
      } finally {
        setIsLoading(false)
      }
    }
    loadUsers()
  }, [currentPage, appliedSearchTerm, sortColumn, sortDirection])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = () => {
    updateUrlQueryParams({ search: searchTerm, page: 1 })
  }

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

  return (
    <div className="container max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
      {/* TODO: Add Filters and Search Bar here */}
      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder="Search users (name, email, company)..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border-gray-300 md:w-1/3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          onKeyDown={e => e.key === 'Enter' && handleSearchSubmit()}
        />
        <Button onClick={handleSearchSubmit} variant="default">
          Search
        </Button>
      </div>
      {isLoading && <p className="text-blue-500">Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {/* TODO: Add more advanced Filters here */}
      {usersData && (
        <UserTable users={usersData.users} onSort={handleSort} sortColumn={sortColumn} sortDirection={sortDirection} />
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
      {/* TODO: Add "Add to Manufacturer" button/modal trigger here */}
    </div>
  )
}
