import { cn } from '../../utils/cn'

/**
 * Reusable section wrapper with consistent spacing and optional title.
 * @param {string} id - Section id for anchor links
 * @param {string} [title] - Optional section heading
 * @param {string} [subtitle] - Optional subtitle below the title
 * @param {string} [className] - Additional CSS classes
 * @param {React.ReactNode} children - Section content
 */
export function Section({ id, title, subtitle, className, children }) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 sm:py-20 md:py-24 scroll-mt-20',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {(title || subtitle) && (
          <header className="text-center mb-10 sm:mb-12 md:mb-14">
            {title && (
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="section-subtitle mt-2 max-w-xl mx-auto text-base sm:text-lg">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
