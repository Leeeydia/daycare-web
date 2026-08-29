import { useState } from 'react'
import { facilities } from '@/api/dummyData'
import { KakaoMap } from '@/components/common/KakaoMap'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { Icon } from '@/components/ui/Icon'
import { Lightbox } from '@/components/ui/Lightbox'
import { Photo } from '@/components/ui/Photo'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { site } from '@/config/site'

const history = [
  { year: '2024', items: ['센터 설립 및 장기요양기관 지정'] },
  { year: '2025', items: ['인지활동형 프로그램 운영 개시', '송영 차량 2대 증차'] },
  { year: '2026', items: ['보호자 소통 서비스 도입', '옥상 정원 조성'] },
]

const visions = [
  { icon: 'heart', title: '존중', desc: '어르신을 한 사람의 어른으로 존중하며, 남아 있는 능력을 먼저 살핍니다.' },
  { icon: 'shield', title: '안전', desc: '낙상·감염·응급 상황 대응 절차를 문서화하고 정기적으로 훈련합니다.' },
  { icon: 'chat', title: '소통', desc: '어르신의 하루를 보호자님과 투명하게 공유합니다.' },
] as const

const staff = [
  { role: '센터장', name: site.business.ceoName, desc: '사회복지사 1급 · 요양보호사' },
  { role: '사회복지사', name: '○○○', desc: '케어플랜 수립 및 프로그램 총괄' },
  { role: '간호(조무)사', name: '○○○', desc: '건강 체크 · 복약 관리' },
  { role: '요양보호사', name: '○○○', desc: '일상생활 지원 및 활동 보조' },
]

export default function AboutPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const facilityImages = facilities.map((f) => f.name)

  return (
    <>
      <Seo
        title="센터소개"
        description={`${site.name}의 인사말과 시설, 오시는 길을 안내합니다.`}
        path="/about"
      />
      <PageHero
        title="센터소개"
        description="어르신의 하루를 함께 만드는 사람들과 공간을 소개합니다."
        breadcrumbs={[{ label: '센터소개' }]}
      />

      {/* 인사말 */}
      <section id="greeting" className="scroll-mt-24 py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <Photo src="센터장 인사말 사진" alt="센터장 인사말" className="aspect-[4/3]" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-base font-bold uppercase tracking-widest text-brand-600">GREETING</p>
              <h2 className="mt-3 text-2xl leading-snug sm:text-3xl">
                모시는 마음으로,
                <br />
                하루를 준비합니다
              </h2>
              <div className="mt-6 space-y-4 leading-8 text-ink-700">
                <p>
                  안녕하십니까. {site.name}를 찾아주셔서 감사합니다.
                </p>
                <p>
                  부모님을 모시는 일은 사랑만으로는 버거울 때가 있습니다. 하루 종일 곁을 지키기 어려운 보호자님의
                  마음을 잘 알고 있기에, 저희는 어르신이 안전하고 즐겁게 지내실 수 있는 하루를 준비합니다.
                </p>
                <p>
                  어르신이 지금 할 수 있는 일을 최대한 오래 지켜드리는 것, 그리고 그 하루를 보호자님과 나누는 것.
                  저희가 가장 중요하게 생각하는 두 가지입니다. 언제든 편하게 문을 두드려 주십시오.
                </p>
                <p className="pt-2 text-lg font-bold text-ink-900">센터장 {site.business.ceoName} 드림</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 비전 */}
      <section className="bg-sage-50 py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="VISION" title="저희가 지키는 세 가지" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {visions.map((vision, i) => (
              <FadeIn as="li" key={vision.title} delay={i * 0.1}>
                <Card className="h-full p-8 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
                    <Icon name={vision.icon} size={30} />
                  </span>
                  <h3 className="mt-5 text-xl">{vision.title}</h3>
                  <p className="mt-3 leading-7 text-ink-600">{vision.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </ul>
        </Container>
      </section>

      {/* 연혁 */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="HISTORY" title="센터가 걸어온 길" />
          <ol className="mx-auto mt-12 max-w-2xl space-y-8 border-l-2 border-brand-200 pl-8">
            {history.map((entry) => (
              <FadeIn as="li" key={entry.year} className="relative">
                <span className="absolute -left-[41px] top-1.5 flex h-4 w-4 rounded-full border-4 border-brand-500 bg-white" />
                <p className="text-xl font-bold text-brand-700">{entry.year}</p>
                <ul className="mt-2 space-y-1.5 text-ink-700">
                  {entry.items.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </ol>
        </Container>
      </section>

      {/* 시설안내 */}
      <section id="facility" className="scroll-mt-24 bg-ink-50 py-16 lg:py-24">
        <Container>
          <SectionTitle
            eyebrow="FACILITY"
            title="시설 안내"
            description="사진을 누르시면 크게 보실 수 있습니다."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, i) => (
              <FadeIn as="li" key={facility.name} delay={(i % 3) * 0.08}>
                <button type="button" onClick={() => setLightboxIndex(i)} className="group w-full text-left">
                  <Photo src={facility.name} alt={facility.name} />
                  <h3 className="mt-3 text-lg group-hover:text-brand-700">{facility.name}</h3>
                  <p className="mt-1 text-base text-ink-600">{facility.desc}</p>
                </button>
              </FadeIn>
            ))}
          </ul>
        </Container>
      </section>

      {/* 직원 소개 */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="STAFF" title="함께하는 사람들" description="자격을 갖춘 전문 인력이 어르신을 돌봅니다." />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((member, i) => (
              <FadeIn as="li" key={member.role} delay={i * 0.08}>
                <Card className="h-full overflow-hidden text-center" hoverable>
                  <Photo src={`${member.role} 사진`} alt={member.role} className="aspect-square" rounded="rounded-none" />
                  <div className="p-5">
                    <p className="text-sm font-bold text-brand-600">{member.role}</p>
                    <p className="mt-1 text-lg font-bold text-ink-900">{member.name}</p>
                    <p className="mt-2 text-base text-ink-600">{member.desc}</p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </ul>
        </Container>
      </section>

      {/* 오시는 길 */}
      <section id="location" className="scroll-mt-24 bg-ink-50 py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="LOCATION" title="오시는 길" />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <KakaoMap />
            <div className="space-y-6">
              <div>
                <h3 className="flex items-center gap-2 text-lg">
                  <Icon name="mapPin" size={22} className="text-brand-600" /> 주소
                </h3>
                <p className="mt-2 text-ink-700">{site.address.full}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => navigator.clipboard?.writeText(site.address.full)}
                >
                  <Icon name="copy" size={20} /> 주소 복사하기
                </Button>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-lg">
                  <Icon name="bus" size={22} className="text-brand-600" /> 대중교통
                </h3>
                <ul className="mt-2 space-y-1.5 text-ink-700">
                  {site.address.transport.map((item) => (
                    <li key={item.type}>
                      <span className="font-bold">{item.type}</span> {item.desc}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-lg">
                  <Icon name="info" size={22} className="text-brand-600" /> 주차
                </h3>
                <p className="mt-2 text-ink-700">{site.address.parking}</p>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-lg">
                  <Icon name="phone" size={22} className="text-brand-600" /> 대표전화
                </h3>
                <a href={site.telHref} className="mt-2 block text-2xl font-bold text-brand-700">
                  {site.tel}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={facilityImages}
          index={lightboxIndex}
          title={facilities[lightboxIndex].name}
          onClose={() => setLightboxIndex(null)}
          onMove={setLightboxIndex}
        />
      )}
    </>
  )
}
