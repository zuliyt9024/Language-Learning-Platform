import { cn } from '../../utils/cn'

/**
 * Marketing service card: icon/emoji, title, short description.
 * @param {string} icon - Emoji or icon placeholder (e.g. "🌐")
 * @param {string} title - Card title
 * @param {string} description - Short description
 * @param {string} [className] - Additional CSS classes
 */
export function ServiceCard({ icon, title, description, className }) {
  return (
    <article
      className={cn(
        'rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm',
        'transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5',
        'flex flex-col items-center text-center sm:items-start sm:text-left',
        className
      )}
    >
      <div
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-primary/10 flex items-center justify-center text-2xl sm:text-3xl mb-4 shrink-0"
        aria-hidden
      >
        {icon}
      </div>
      <h3 className="font-bold text-foreground text-lg sm:text-xl mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
        {description}
      </p>
    </article>
  )
}
