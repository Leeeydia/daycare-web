import { Outlet } from 'react-router-dom'
import { ConsultBanner } from './ConsultBanner'
import { FloatingButtons } from './FloatingButtons'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollToTop } from './ScrollToTop'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-3 focus:text-white"
      >
        본문으로 바로가기
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <ConsultBanner />
      <Footer />
      <FloatingButtons />
    </div>
  )
}
