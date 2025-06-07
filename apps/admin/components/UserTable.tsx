'use client'

import React from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { IUser } from '@/types'
import { Button } from '@/components/ui'

export type SortDirection = 'asc' | 'desc'
export type SortableColumn = 'firstName' | 'email' | 'company' | 'status' | 'joinedAt'

interface UserTableProps {
  users: IUser[]
  onSort: (column: SortableColumn) => void
  sortColumn?: SortableColumn | null
  sortDirection?: SortDirection
  // TODO: Add props for filtering, selection
}

export const UserTable: React.FC<UserTableProps> = ({ users, onSort, sortColumn, sortDirection }) => {
  if (users.length === 0) {
    return <p className="text-gray-500">No users found.</p>
  }

  return (
    <section className="mb-8" aria-labelledby="user-table-caption">
      <p id="user-table-caption" className="sr-only">
        A table displaying user information including name, email, company, status, and join date. Column headers are
        sortable.
      </p>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              {/* TODO: Add checkbox for multi-select header here */}
              {[
                { key: 'firstName', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'company', label: 'Company' },
                { key: 'status', label: 'Status' },
                { key: 'joinedAt', label: 'Joined At' }
              ].map(header => (
                <th key={header.key} className="py-3 px-6 text-left">
                  <Button
                    variant="ghost"
                    onClick={() => onSort(header.key as SortableColumn)}
                    className={`px-0 py-0 h-auto hover:bg-gray-300 ${sortColumn === header.key ? 'text-blue-600' : ''}`}
                    aria-label={`Sort by ${header.label}${sortColumn === header.key ? ` (${sortDirection === 'asc' ? 'ascending' : 'descending'})` : ''}`}
                    aria-pressed={sortColumn === header.key}
                  >
                    {header.label}
                    {sortColumn === header.key ? (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ArrowDown className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                    )}
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map(user => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                {/* TODO: Add checkbox for row selection here */}
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {user.firstName} {user.lastName}
                </td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.company || 'N/A'}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${user.status === 'active' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{new Date(user.joinedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
