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

  const [statistics, setStatistics] = useState<IUserStatisticsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isInitialSyncComplete, setIsInitialSyncComplete] = useState(false)

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
        setStatistics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    loadStatistics()
  }, [currentPage, isInitialSyncComplete])

  const paginatedScores = statistics?.usersWithScores || []
  const totalScoresPages = statistics?.totalUsers ? Math.ceil(statistics.totalUsers / SCORES_PER_PAGE) : 0

  return (
    <div className="container max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Engagement Statistics</h1>
      {isLoading && <p className="text-blue-500 p-4">Loading statistics...</p>}
      {error && <p className="text-red-500 p-4">Error: {error}</p>}

      {statistics && statistics.totalUsers > 0 && (
        <>
          <UserEngagementScoresTable users={paginatedScores} />
          {totalScoresPages > 1 && (
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
                    Page {currentPage} of {totalScoresPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href={
                      currentPage < totalScoresPages
                        ? `?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: String(currentPage + 1) }).toString()}`
                        : '#'
                    }
                    className={
                      currentPage === totalScoresPages || isLoading || totalScoresPages === 0
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
      {statistics && !isLoading && statistics.totalUsers === 0 && (
        <p className="text-gray-500 p-4">No user engagement scores to display.</p>
      )}
      {statistics && statistics.demographicInsights && (
        <UserDemographicInsightsTable insights={statistics.demographicInsights} />
      )}
    </div>
  )
}
