'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { type IManufacturersResponse, type IManufacturerWithUsersForList } from '@repo/dto'
import { fetchManufacturers } from '@/lib/api'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from '@/components/ui'
import { ContactPerson } from '@/components'

const ITEMS_PER_PAGE = 10

export default function ManufacturersPage() {
  const [data, setData] = useState<IManufacturersResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isInitialSyncComplete, setIsInitialSyncComplete] = useState<boolean>(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)
    setCurrentPage(pageFromUrl)
    setIsInitialSyncComplete(true)
  }, [searchParams])

  useEffect(() => {
    const loadManufacturers = async () => {
      if (!isInitialSyncComplete) {
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const result = await fetchManufacturers(currentPage, ITEMS_PER_PAGE)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadManufacturers()
  }, [currentPage, isInitialSyncComplete])

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0

  return (
    <div className="container max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manufacturers</h1>

      {isLoading && <p className="p-4 text-blue-500">Loading manufacturers...</p>}
      {error && <p className="p-4 text-red-500">Error: {error}</p>}

      {data && (
        <div className="space-y-6">
          {data.manufacturers.map((manufacturer: IManufacturerWithUsersForList) => (
            <div key={manufacturer._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-700">{manufacturer.name}</h2>
              <p className="text-sm text-gray-500 mb-1">Industry: {manufacturer.industry}</p>
              <ContactPerson contact={manufacturer.contactPerson} />
              <h3 className="text-lg font-medium text-gray-600 mt-3 mb-2">Associated Users:</h3>
              {manufacturer.userIds && manufacturer.userIds.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 pl-4">
                  {manufacturer.userIds.map(user => (
                    <li key={user._id} className="text-sm text-gray-600">
                      {user.firstName} {user.lastName} ({user.email})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No users associated with this manufacturer.</p>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  currentPage > 1
                    ? `?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: String(currentPage - 1) }).toString()}`
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
                    ? `?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: String(currentPage + 1) }).toString()}`
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

      {data && !isLoading && !data.manufacturers.length && <p className="p-4 text-gray-500">No manufacturers found.</p>}
    </div>
  )
}
