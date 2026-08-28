import type { ReactNode } from 'react'

type Tone = 'brand' | 'sage' | 'neutral' | 'muted'

const toneClass: Record<Tone, string> = {
  brand: 'bg-brand-100 text-brand-800',
  sage: 'bg-sage-100 text-sage-800',
  neutral: 'bg-ink-100 text-ink-700',
  muted: 'bg-ink-200 text-ink-600',
}

export function Badge({ children, tone = 'brand' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${toneClass[tone]}`}>
      {children}
    </span>
  )
}
