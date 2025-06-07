'use client'

import React, { useEffect, useState } from 'react'
import { fetchUserStatistics } from '@/lib/api'
import { IUserStatisticsResponse } from '@/types'
import { UserEngagementScoresTable, UserDemographicInsightsTable } from '@/components'

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<IUserStatisticsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchUserStatistics()
        setStatistics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    loadStatistics()
  }, [])

  return (
    <div className="container max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Engagement Statistics</h1>
      {isLoading && <p className="text-blue-500 p-4">Loading statistics...</p>}
      {error && <p className="text-red-500 p-4">Error: {error}</p>}
      {statistics && <UserDemographicInsightsTable insights={statistics.demographicInsights} />}
      {statistics && <UserEngagementScoresTable users={statistics.usersWithScores} />}
    </div>
  )
}
