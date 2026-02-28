import { cn } from '../../utils/cn'

const buttonVariants = {
  default:
    'bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98] transition-all duration-200',
  outline:
    'border-2 border-border bg-background hover:bg-accent hover:border-primary/30 hover:text-accent-foreground active:scale-[0.98] transition-all duration-200',
  ghost: 'hover:bg-accent hover:text-accent-foreground active:scale-[0.98] transition-all duration-200',
  destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98] transition-all duration-200',
  link: 'text-primary underline-offset-4 hover:underline',
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}) {
  const sizeClasses = {
    default: 'h-11 px-6 py-2.5 text-sm rounded-xl',
    sm: 'h-9 rounded-lg px-4 text-sm',
    lg: 'h-12 rounded-xl px-8 text-base font-semibold',
    icon: 'h-10 w-10 rounded-xl',
  }
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        buttonVariants[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
}
