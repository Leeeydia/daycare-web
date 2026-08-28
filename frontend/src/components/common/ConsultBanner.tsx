import { site } from '@/config/site'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Container } from '@/components/ui/Container'

/** 모든 페이지 하단에 공통으로 들어가는 상담 유도 배너 */
export function ConsultBanner() {
  return (
    <section className="bg-gradient-to-br from-brand-600 to-brand-700 py-14 text-white lg:py-20" aria-labelledby="consult-banner-title">
      <Container className="text-center">
        <p className="text-base font-bold text-brand-100">상담은 언제나 무료입니다</p>
        <h2 id="consult-banner-title" className="mt-3 text-2xl leading-snug text-white sm:text-3xl lg:text-4xl">
          어르신께 맞는 하루,
          <br className="sm:hidden" /> 먼저 편하게 물어보세요
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-brand-50 sm:text-lg">
          장기요양등급이 없으셔도 괜찮습니다. 등급 신청부터 이용 방법까지 하나하나 안내해 드립니다.
        </p>

        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
          <ButtonLink to="/consult" size="lg" className="bg-white text-brand-700 hover:bg-brand-50" fullWidth>
            <Icon name="document" size={22} /> 온라인 상담 신청
          </ButtonLink>
          <ButtonLink
            to={site.telHref}
            size="lg"
            className="border-2 border-white bg-transparent text-white hover:bg-white/10"
            fullWidth
          >
            <Icon name="phone" size={22} /> {site.tel}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
