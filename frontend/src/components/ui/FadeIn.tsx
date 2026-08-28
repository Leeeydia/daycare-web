import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/** 스크롤 진입 시 순차 등장. prefers-reduced-motion을 존중해 애니메이션을 끈다. */
export function FadeIn({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  if (reduce) return <div className={className}>{children}</div>

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  )
}
