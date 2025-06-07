'use client'

import React from 'react'
import { IUserWithScore } from '@/types'

interface UserEngagementScoresTableProps {
  users: IUserWithScore[]
}

export const UserEngagementScoresTable: React.FC<UserEngagementScoresTableProps> = ({ users }) => {
  if (users.length === 0) {
    return <p className="text-gray-500">No users found.</p>
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">User Engagement Scores</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-right">Engagement Score</th>
              <th className="py-3 px-6 text-left">Engagement Level</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user: IUserWithScore) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {user.firstName} {user.lastName}
                </td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-right">{user.engagementScore.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">{user.engagementLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
