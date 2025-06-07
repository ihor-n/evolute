'use client'

import * as React from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked' | 'type'> {
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
  defaultChecked?: boolean
  id: string
  className?: string
  inputClassName?: string
  labelClassName?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      inputClassName,
      labelClassName,
      onCheckedChange,
      checked: controlledChecked,
      defaultChecked,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false)

    const isControlled = controlledChecked !== undefined
    const currentChecked = isControlled ? controlledChecked : internalChecked

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newCheckedState = event.target.checked
      if (!isControlled) {
        setInternalChecked(newCheckedState)
      }
      if (onCheckedChange) {
        onCheckedChange(newCheckedState)
      }
    }

    return (
      <div className={cn('inline-flex items-center', className)}>
        <input
          type="checkbox"
          ref={ref}
          id={id}
          checked={currentChecked}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={handleChange}
          disabled={disabled}
          className={cn('peer sr-only', inputClassName)}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            'flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border transition-colors',
            'border-slate-300 ring-offset-white',
            'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-slate-400 peer-focus-visible:ring-offset-2',
            disabled ? 'cursor-not-allowed opacity-50' : '',
            currentChecked ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-transparent',
            labelClassName
          )}
        >
          {currentChecked && <Check className="h-3.5 w-3.5" />}
        </label>
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
