import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-300 text-base disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
