import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({ eyebrow, title, description, align = 'center', className = '' }: Props) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-base font-bold uppercase tracking-widest text-brand-600">{eyebrow}</p>
      )}
      <h2 className="text-2xl leading-snug sm:text-3xl lg:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-ink-600 sm:text-lg">{description}</p>}
    </div>
  )
}
