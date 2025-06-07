'use client'

import React from 'react'
import { IDemographicInsight } from '@/types'

interface UserDemographicInsightsTableProps {
  insights: IDemographicInsight[]
}

export const UserDemographicInsightsTable: React.FC<UserDemographicInsightsTableProps> = ({ insights }) => {
  if (insights.length === 0) {
    return <p className="text-gray-500">No insights found.</p>
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Demographic Insights</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Demographic Group</th>
              <th className="py-3 px-6 text-right">Avg. Engagement Score</th>
              <th className="py-3 px-6 text-right">User Count</th>
              <th className="py-3 px-6 text-left">Engagement Distribution</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {insights.map((insight: IDemographicInsight, index: number) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  {insight._id.ageRange || 'N/A'} | {insight._id.gender || 'N/A'} | {insight._id.education || 'N/A'}
                </td>
                <td className="py-3 px-6 text-right">{insight.averageEngagementScore.toFixed(2)}</td>
                <td className="py-3 px-6 text-right">{insight.count}</td>
                <td className="py-3 px-6 text-left">
                  <div className="text-xs">
                    <div>Highly: {insight.engagementLevelCounts['Highly Engaged']}</div>
                    <div>Moderately: {insight.engagementLevelCounts['Moderately Engaged']}</div>
                    <div>Low: {insight.engagementLevelCounts['Low Engagement']}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
UserDemographicInsightsTable.displayName = 'UserDemographicInsightsTable'
