import type { ReactNode } from 'react'

export function Card({
  children,
  className = '',
  hoverable = false,
}: {
  children: ReactNode
  className?: string
  hoverable?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border border-ink-200 bg-white shadow-card ${
        hoverable ? 'transition-shadow duration-200 hover:shadow-lift' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
