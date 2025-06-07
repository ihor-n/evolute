'use client'

import React from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { SortableColumn, SortDirection } from '@/lib/api'

interface SortIndicatorProps {
  columnKey: SortableColumn
  activeSortColumn?: SortableColumn | null
  sortDirection?: SortDirection
}

export const SortIndicator: React.FC<SortIndicatorProps> = ({ columnKey, activeSortColumn, sortDirection }) => {
  if (activeSortColumn !== columnKey) {
    return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
  }
  if (sortDirection === 'asc') {
    return <ArrowUp className="ml-2 h-4 w-4" />
  }
  return <ArrowDown className="ml-2 h-4 w-4" />
}
SortIndicator.displayName = 'SortIndicator'
