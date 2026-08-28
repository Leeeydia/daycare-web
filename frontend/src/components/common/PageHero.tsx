import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'

type Crumb = { label: string; to?: string }

/** 서브 페이지 상단 타이틀 영역 + 브레드크럼 */
export function PageHero({
  title,
  description,
  breadcrumbs = [],
}: {
  title: string
  description?: string
  breadcrumbs?: Crumb[]
}) {
  return (
    <section className="border-b border-ink-100 bg-brand-50 py-10 lg:py-16">
      <Container>
        <nav aria-label="현재 위치" className="mb-3">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-500">
            <li>
              <Link to="/" className="hover:text-brand-700">
                홈
              </Link>
            </li>
            {breadcrumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-1">
                <Icon name="chevronRight" size={14} className="text-ink-300" />
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-brand-700">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-bold text-ink-700">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-3xl lg:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-3xl text-ink-600 sm:text-lg">{description}</p>}
      </Container>
    </section>
  )
}
