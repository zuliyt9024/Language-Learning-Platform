import { useState } from 'react'

// Fallback when any image fails to load (single reliable Unsplash photo)
const FALLBACK_SRC = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80'

/**
 * Responsive image with lazy loading and fallback so images always work.
 */
export function Image({
  src,
  alt,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  onError,
  ...props
}) {
  const [failed, setFailed] = useState(false)
  const displaySrc = failed || !src ? FALLBACK_SRC : src

  const handleError = (e) => {
    if (!failed) setFailed(true)
    onError?.(e)
  }

  return (
    <img
      src={displaySrc}
      alt={alt ?? ''}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      className={`block w-full h-full object-cover ${className}`}
      {...props}
    />
  )
}

/** Wrapper that reserves aspect-ratio to prevent layout shift */
export function ImageBox({ aspectRatio = '16/10', children, className = '' }) {
  return (
    <div
      className={`overflow-hidden bg-muted ${className}`}
      style={{ aspectRatio: aspectRatio.replace('/', ' / ') }}
    >
      {children}
    </div>
  )
}
