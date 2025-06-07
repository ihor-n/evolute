'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { fetchUserStatistics } from '@/lib/api'
import { IUserStatisticsResponse } from '@/types'
import { UserEngagementScoresTable, UserDemographicInsightsTable } from '@/components'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from '@/components/ui'

const SCORES_PER_PAGE = 10

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<IUserStatisticsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentScoresPage, setCurrentScoresPage] = useState(1)

  const loadStatistics = useCallback(async (pageToLoad: number) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchUserStatistics(pageToLoad, SCORES_PER_PAGE)
      setStatistics(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStatistics(currentScoresPage)
  }, [currentScoresPage, loadStatistics])

  const paginatedScores = statistics?.usersWithScores || []

  const totalScoresPages = statistics?.totalUsers ? Math.ceil(statistics.totalUsers / SCORES_PER_PAGE) : 0

  const handleScoresPreviousPage = () => {
    setCurrentScoresPage(prev => Math.max(prev - 1, 1))
  }

  const handleScoresNextPage = () => {
    if (currentScoresPage < totalScoresPages) {
      setCurrentScoresPage(prev => prev + 1)
    }
  }

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
                    onClick={handleScoresPreviousPage}
                    href="#"
                    className={currentScoresPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-4 py-2 text-sm text-gray-700">
                    Page {currentScoresPage} of {totalScoresPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={handleScoresNextPage}
                    href="#"
                    className={currentScoresPage === totalScoresPages ? 'pointer-events-none opacity-50' : ''}
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
