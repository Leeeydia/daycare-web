import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'kakao' | 'onBrand' | 'onBrandOutline'
type Size = 'sm' | 'md' | 'lg'

const variantClass: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-card',
  secondary: 'bg-sage-600 text-white hover:bg-sage-700 shadow-card',
  outline: 'border-2 border-brand-600 text-brand-700 bg-white hover:bg-brand-50',
  ghost: 'text-ink-700 hover:bg-ink-100',
  kakao: 'bg-[#FEE500] text-[#191600] hover:brightness-95 shadow-card',
  // 브랜드 컬러 배경 위에 얹는 버튼. className으로 색을 덮어쓰면 유틸리티 우선순위가
  // 어긋나 글자가 배경에 묻힐 수 있으므로 반드시 이 variant를 쓴다.
  onBrand: 'bg-white text-brand-700 hover:bg-brand-50 shadow-card',
  onBrandOutline: 'border-2 border-white bg-white/10 text-white hover:bg-white/20',
}

// 44px 이상 터치 영역 확보 (고령 보호자 사용성)
const sizeClass: Record<Size, string> = {
  sm: 'min-h-[44px] px-4 text-base',
  md: 'min-h-[52px] px-6 text-lg',
  lg: 'min-h-[60px] px-8 text-lg sm:text-xl',
}

type BaseProps = {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'

function cls({ variant = 'primary', size = 'md', fullWidth, className = '' }: BaseProps) {
  return `${base} ${variantClass[variant]} ${sizeClass[size]} ${fullWidth ? 'w-full' : ''} ${className}`
}

export function Button({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cls({ variant, size, fullWidth, className, children })} {...rest}>
      {children}
    </button>
  )
}

export function ButtonLink({
  to,
  variant,
  size,
  fullWidth,
  className,
  children,
}: BaseProps & { to: string }) {
  const style = cls({ variant, size, fullWidth, className, children })
  const isExternal = /^(https?:|tel:|mailto:)/.test(to)

  if (isExternal) {
    return (
      <a href={to} className={style} target={to.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={style}>
      {children}
    </Link>
  )
}
