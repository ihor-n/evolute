'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { fetchUserStatistics } from '@/lib/api'
import { type IUserStatisticsResponse } from '@repo/dto'
import { UserEngagementScoresTable, UserDemographicInsightsTable } from '@/components'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from '@/components/ui'

const SCORES_PER_PAGE = 10

export default function StatisticsPage() {
  const searchParams = useSearchParams()

  const [data, setData] = useState<IUserStatisticsResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isInitialSyncComplete, setIsInitialSyncComplete] = useState<boolean>(false)

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10)

    setCurrentPage(page)
    setIsInitialSyncComplete(true)
  }, [searchParams])

  useEffect(() => {
    const loadStatistics = async () => {
      if (!isInitialSyncComplete) {
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchUserStatistics(currentPage, SCORES_PER_PAGE)
        setData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadStatistics()
  }, [currentPage, isInitialSyncComplete])

  const paginatedScores = data?.usersWithScores || []
  const totalPages = data?.totalUsers ? Math.ceil(data.totalUsers / SCORES_PER_PAGE) : 0

  return (
    <div className="container max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Engagement Statistics</h1>
      {isLoading && <p className="text-blue-500 p-4">Loading statistics...</p>}
      {error && <p className="text-red-500 p-4">Error: {error}</p>}

      {data && data.totalUsers > 0 && (
        <>
          <UserEngagementScoresTable users={paginatedScores} />
          {totalPages > 1 && (
            <Pagination className="mt-6">
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
                      currentPage === totalPages || isLoading || totalPages === 0
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
      {data && !isLoading && data.totalUsers === 0 && (
        <p className="text-gray-500 p-4">No user engagement scores to display.</p>
      )}
      {data && data.demographicInsights && <UserDemographicInsightsTable insights={data.demographicInsights} />}
    </div>
  )
}
