import { cn } from '../../utils/cn'

const styles = {
  success: 'bg-green-600 text-white border-green-700',
  error: 'bg-destructive text-destructive-foreground border-red-800',
  info: 'bg-primary text-primary-foreground border-primary/80',
}

export function Toast({ message, type = 'info', onClose }) {
  return (
    <div
      role="alert"
      className={cn(
        'pointer-events-auto rounded-2xl border px-5 py-3.5 shadow-card-hover flex items-center justify-between gap-3 animate-toast-in',
        styles[type]
      )}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 rounded p-1 opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Dismiss"
      >
        <span aria-hidden>×</span>
      </button>
    </div>
  )
}
