'use client'

import React from 'react'
import { type IUser, type UserStatus } from '@repo/dto'
import { Button, Checkbox, Input, Select, Option } from '@/components/ui'
import { SortableColumn, SortDirection } from '@/lib/api'
import { SortIndicator } from '@/components'

interface UserTableProps {
  users: IUser[]
  onSort: (column: SortableColumn) => void
  filters: Partial<Record<SortableColumn, string>>
  onFilterChange: (column: SortableColumn, value: string) => void
  sortColumn?: SortableColumn | null
  sortDirection?: SortDirection
  selectedUserIds: string[]
  onSelectedUserIdsChange: (selectedIds: string[]) => void
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onSort,
  filters = {},
  onFilterChange,
  sortColumn,
  sortDirection,
  selectedUserIds,
  onSelectedUserIdsChange
}) => {
  const handleSelectAllChange = (isChecked: boolean) => {
    if (isChecked) {
      onSelectedUserIdsChange(users.filter(user => !!user).map(user => user._id))
    } else if (!isChecked) {
      onSelectedUserIdsChange([])
    }
  }

  const handleSelectRow = (userId: string, checked: boolean) => {
    if (checked) {
      onSelectedUserIdsChange([...selectedUserIds, userId])
    } else {
      onSelectedUserIdsChange(selectedUserIds.filter(id => id !== userId))
    }
  }
  return (
    <section className="mb-8" aria-labelledby="user-table-caption">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">
                <Checkbox
                  id="select-all-users"
                  onCheckedChange={handleSelectAllChange}
                  checked={users.length > 0 && selectedUserIds.length === users.length}
                  aria-label="Select all users on this page"
                />
              </th>
              <th className="py-3 px-6 text-left">
                <Button
                  variant="ghost"
                  onClick={() => onSort('firstName')}
                  className={`px-0 py-0 h-auto hover:bg-gray-300 ${sortColumn === 'firstName' ? 'text-blue-600' : ''}`}
                  aria-label={`Sort by Name${sortColumn === 'firstName' ? ` (${sortDirection === 'asc' ? 'ascending' : 'descending'})` : ''}`}
                  aria-pressed={sortColumn === 'firstName'}
                >
                  Name
                  <SortIndicator columnKey="firstName" activeSortColumn={sortColumn} sortDirection={sortDirection} />
                </Button>
              </th>
              <th className="py-3 px-6 text-left">
                <Button
                  variant="ghost"
                  onClick={() => onSort('email')}
                  className={`px-0 py-0 h-auto hover:bg-gray-300 ${sortColumn === 'email' ? 'text-blue-600' : ''}`}
                  aria-label={`Sort by Email${sortColumn === 'email' ? ` (${sortDirection === 'asc' ? 'ascending' : 'descending'})` : ''}`}
                  aria-pressed={sortColumn === 'email'}
                >
                  Email
                  <SortIndicator columnKey="email" activeSortColumn={sortColumn} sortDirection={sortDirection} />
                </Button>
              </th>
              <th className="py-3 px-6 text-left">
                <Button
                  variant="ghost"
                  onClick={() => onSort('company')}
                  className={`px-0 py-0 h-auto hover:bg-gray-300 ${sortColumn === 'company' ? 'text-blue-600' : ''}`}
                  aria-label={`Sort by Company${sortColumn === 'company' ? ` (${sortDirection === 'asc' ? 'ascending' : 'descending'})` : ''}`}
                  aria-pressed={sortColumn === 'company'}
                >
                  Company
                  <SortIndicator columnKey="company" activeSortColumn={sortColumn} sortDirection={sortDirection} />
                </Button>
              </th>
              <th className="py-3 px-6 text-left">
                <Button
                  variant="ghost"
                  onClick={() => onSort('status')}
                  className={`px-0 py-0 h-auto hover:bg-gray-300 ${sortColumn === 'status' ? 'text-blue-600' : ''}`}
                  aria-label={`Sort by Status${sortColumn === 'status' ? ` (${sortDirection === 'asc' ? 'ascending' : 'descending'})` : ''}`}
                  aria-pressed={sortColumn === 'status'}
                >
                  Status
                  <SortIndicator columnKey="status" activeSortColumn={sortColumn} sortDirection={sortDirection} />
                </Button>
              </th>
              <th className="py-3 px-6 text-left">
                <Button
                  variant="ghost"
                  onClick={() => onSort('joinedAt')}
                  className={`px-0 py-0 h-auto hover:bg-gray-300 ${sortColumn === 'joinedAt' ? 'text-blue-600' : ''}`}
                  aria-label={`Sort by Joined At${sortColumn === 'joinedAt' ? ` (${sortDirection === 'asc' ? 'ascending' : 'descending'})` : ''}`}
                  aria-pressed={sortColumn === 'joinedAt'}
                >
                  Joined At
                  <SortIndicator columnKey="joinedAt" activeSortColumn={sortColumn} sortDirection={sortDirection} />
                </Button>
              </th>
            </tr>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-2 px-6"></th>
              <th className="py-2 px-6 text-left">
                <Input
                  type="text"
                  placeholder="Filter Name..."
                  value={filters.firstName || ''}
                  onChange={e => onFilterChange('firstName', e.target.value)}
                  aria-label="Filter by Name"
                />
              </th>
              <th className="py-2 px-6 text-left">
                <Input
                  type="text"
                  placeholder="Filter Email..."
                  value={filters.email || ''}
                  onChange={e => onFilterChange('email', e.target.value)}
                  aria-label="Filter by Email"
                />
              </th>
              <th className="py-2 px-6 text-left">
                <Input
                  type="text"
                  placeholder="Filter Company..."
                  value={filters.company || ''}
                  onChange={e => onFilterChange('company', e.target.value)}
                  aria-label="Filter by Company"
                />
              </th>
              <th className="py-2 px-6 text-left">
                <Select
                  value={filters.status || ''}
                  onChange={e => onFilterChange('status', e.target.value)}
                  aria-label="Filter by Status"
                >
                  <Option value="">All</Option>
                  {(['active', 'inactive'] as UserStatus[]).map(optVal => (
                    <Option key={optVal} value={optVal}>
                      {optVal.charAt(0).toUpperCase() + optVal.slice(1)}
                    </Option>
                  ))}
                </Select>
              </th>
              <th className="py-2 px-6 text-left"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map(user => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  <Checkbox
                    id={`select-user-${user._id}`}
                    checked={selectedUserIds.includes(user._id)}
                    onCheckedChange={checked => handleSelectRow(user._id, !!checked)}
                    aria-label={`Select user ${user.firstName} ${user.lastName}`}
                  />
                </td>
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
UserTable.displayName = 'UserTable'
