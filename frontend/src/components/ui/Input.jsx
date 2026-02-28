import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Input = forwardRef(function Input(
  { className, type = 'text', error, ...props },
  ref
) {
  return (
    <input
      type={type}
      ref={ref}
      aria-invalid={!!error}
      aria-describedby={error ? 'input-error' : undefined}
      className={cn(
        'flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm ring-offset-background transition-colors',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary/30',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-destructive focus-visible:ring-destructive',
        className
      )}
      {...props}
    />
  )
})
