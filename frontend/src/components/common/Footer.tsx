import { Link } from 'react-router-dom'
import { NAV_ITEMS, site } from '@/config/site'
import { Icon } from '@/components/ui/Icon'

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50 pb-28 pt-14 lg:pb-14">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Icon name="heart" size={22} />
              </span>
              <span className="text-xl font-bold text-ink-900">{site.name}</span>
            </div>
            <p className="mt-4 text-base leading-7 text-ink-600">{site.slogan}</p>
            <dl className="mt-5 space-y-1.5 text-base text-ink-600">
              <div className="flex gap-2">
                <dt className="sr-only">주소</dt>
                <dd className="flex items-start gap-2">
                  <Icon name="mapPin" size={20} className="mt-0.5 shrink-0 text-ink-400" />
                  {site.address.full}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="sr-only">대표전화</dt>
                <dd className="flex items-center gap-2">
                  <Icon name="phone" size={20} className="shrink-0 text-ink-400" />
                  <a href={site.telHref} className="font-bold text-ink-800 hover:underline">
                    {site.tel}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="sr-only">운영시간</dt>
                <dd className="flex items-start gap-2">
                  <Icon name="clock" size={20} className="mt-0.5 shrink-0 text-ink-400" />
                  <span>
                    {site.hours.weekday} / {site.hours.saturday}
                    <br />
                    {site.hours.holiday}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <nav aria-label="푸터 메뉴">
            <h2 className="text-base font-bold text-ink-900">바로가기</h2>
            <ul className="mt-4 space-y-2.5 text-base text-ink-600">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-brand-700 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/consult" className="hover:text-brand-700 hover:underline">
                  무료상담 신청
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-base font-bold text-ink-900">기관 정보</h2>
            {/* TODO(운영 전): 사업자 등록 후 실제 정보로 교체 */}
            <ul className="mt-4 space-y-2 text-base text-ink-600">
              <li>기관명 {site.business.companyName}</li>
              <li>대표자 {site.business.ceoName}</li>
              <li>사업자등록번호 {site.business.registrationNumber}</li>
              <li>장기요양기관기호 {site.business.institutionNumber}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-500">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <Link to="/privacy" className="text-base font-bold text-ink-700 underline underline-offset-4">
            개인정보처리방침
          </Link>
        </div>
      </div>
    </footer>
  )
}
