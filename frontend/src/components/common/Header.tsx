import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_ITEMS, site } from '@/config/site'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-card' : 'border-b border-ink-100'}`}
    >
      {/* 데스크톱 상단 안내줄 */}
      <div className="hidden bg-ink-800 text-white lg:block">
        <div className="container flex h-10 items-center justify-end gap-6 text-sm">
          <span className="flex items-center gap-1.5">
            <Icon name="clock" size={16} /> {site.hours.weekday}
          </span>
          <a href={site.telHref} className="flex items-center gap-1.5 font-bold hover:underline">
            <Icon name="phone" size={16} /> {site.tel}
          </a>
        </div>
      </div>

      <div className="container flex h-[68px] items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label={`${site.name} 홈으로`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Icon name="heart" size={22} />
          </span>
          <span className="text-lg font-bold leading-tight text-ink-900 sm:text-xl">{site.shortName}</span>
        </Link>

        {/* 데스크톱 GNB */}
        <nav className="hidden lg:block" aria-label="주 메뉴">
          <ul className="flex items-center">
            {NAV_ITEMS.map((item) => (
              <li key={item.path} className="group relative">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex h-20 items-center px-4 text-lg font-bold transition-colors ${
                      isActive ? 'text-brand-700' : 'text-ink-800 hover:text-brand-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
                {'children' in item && item.children && (
                  <ul className="invisible absolute left-0 top-full w-52 rounded-xl border border-ink-100 bg-white py-2 opacity-0 shadow-lift transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <Link
                          to={child.path}
                          className="block px-4 py-2.5 text-base text-ink-700 hover:bg-brand-50 hover:text-brand-700"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink to="/consult" size="sm" className="hidden sm:inline-flex">
            무료상담 신청
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            className="flex h-12 w-12 items-center justify-center rounded-xl text-ink-800 hover:bg-ink-100 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} size={28} />
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[68px] z-50 overflow-y-auto bg-white lg:hidden">
          <nav className="container py-4" aria-label="모바일 주 메뉴">
            <ul className="divide-y divide-ink-100">
              {NAV_ITEMS.map((item) => (
                <li key={item.path} className="py-1">
                  <Link to={item.path} className="flex min-h-[56px] items-center justify-between text-xl font-bold text-ink-900">
                    {item.label}
                    <Icon name="chevronRight" size={20} className="text-ink-400" />
                  </Link>
                  {'children' in item && item.children && (
                    <ul className="mb-3 space-y-1 pl-1">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <Link to={child.path} className="flex min-h-[44px] items-center text-base text-ink-600">
                            · {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3 pb-24">
              <ButtonLink to="/consult" size="lg" fullWidth>
                무료상담 신청하기
              </ButtonLink>
              <ButtonLink to={site.telHref} variant="outline" size="lg" fullWidth>
                <Icon name="phone" size={22} /> {site.tel}
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
