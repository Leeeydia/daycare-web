import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { site } from '@/config/site'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="페이지를 찾을 수 없습니다" noIndex />
      <PageHero title="페이지를 찾을 수 없습니다" breadcrumbs={[{ label: '404' }]} />

      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <Icon name="info" size={48} className="mx-auto text-brand-500" />
            <h2 className="mt-5 text-2xl">주소가 잘못되었거나 삭제된 페이지입니다</h2>
            <p className="mt-3 leading-8 text-ink-600">
              찾으시는 내용이 있으시면 전화로 문의해 주세요.
              <br />
              <a href={site.telHref} className="font-bold text-brand-700 underline">
                {site.tel}
              </a>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <ButtonLink to="/">홈으로 가기</ButtonLink>
              <ButtonLink to="/consult" variant="outline">
                무료상담 신청
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
