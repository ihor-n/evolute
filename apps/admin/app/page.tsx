'use client'

import React, { useEffect, useState } from 'react'
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

const ITEMS_PER_PAGE = 10

export default function UserManagementPage() {
  const [usersData, setUsersData] = useState<IUsersApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  // TODO: Add state for more advanced filters

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

  const handleSearchSubmit = () => {
    setAppliedSearchTerm(searchTerm)
    setCurrentPage(1)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const totalPages = usersData ? Math.ceil(usersData.total / usersData.limit) : 0

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    if (usersData && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className="container max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
      {/* TODO: Add Filters and Search Bar here */}
      {isLoading && <p className="text-blue-500">Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
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
      {/* TODO: Add more advanced Filters here */}
      {usersData && (
        <UserTable users={usersData.users} onSort={handleSort} sortColumn={sortColumn} sortDirection={sortDirection} />
      )}
      {usersData && usersData.total > 0 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousPage}
                href="#" // Add href prop
                // The 'href' is typically for navigation, but onClick handles state change.
                // For non-navigation, ensure it's clear this is an action.
                // Consider disabling via className if `disabled` prop isn't directly supported or styled by default.
                className={currentPage === 1 || isLoading ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="px-4 py-2 text-sm text-gray-700">
                Page {usersData.page} of {totalPages} (Total: {usersData.total} users)
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                href="#" // Add href prop
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
