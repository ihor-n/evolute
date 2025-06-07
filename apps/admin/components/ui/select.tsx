'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

const Option = React.forwardRef<HTMLOptionElement, React.ComponentProps<'option'>>(({ children, ...props }, ref) => {
  return (
    <option ref={ref} {...props}>
      {children}
    </option>
  )
})
Option.displayName = 'Option'

const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<'select'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-300 text-base disabled:cursor-not-allowed disabled:opacity-50',
          'w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500',
          'appearance-none',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = 'Select'

export { Select, Option }
