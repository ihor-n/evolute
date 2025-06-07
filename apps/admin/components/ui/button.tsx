import * as React from 'react'

import { cn } from '@/lib/utils'

export const buttonBaseStyles =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer'

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  default: 'bg-slate-900 text-white hover:bg-slate-900/90',
  destructive: 'bg-red-600 text-white hover:bg-red-600/90',
  outline: 'border border-slate-300 text-slate-700 hover:bg-slate-100',
  secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-200/80',
  ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
  link: 'text-blue-600 underline-offset-4 hover:underline'
}

export const buttonSizeStyles: Record<ButtonSize, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10'
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const combinedClassName = cn(buttonBaseStyles, buttonVariantStyles[variant], buttonSizeStyles[size], className)

    return <button className={combinedClassName} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button }
