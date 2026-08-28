import { gradeGuide } from '@/api/dummyData'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { Icon } from '@/components/ui/Icon'
import { SectionTitle } from '@/components/ui/SectionTitle'

const applySteps = [
  {
    step: 1,
    title: '등급 신청',
    desc: '국민건강보험공단 지사 방문, 우편·팩스, 또는 노인장기요양보험 홈페이지에서 신청합니다. 가족이 대리 신청할 수 있습니다.',
  },
  { step: 2, title: '방문 조사', desc: '공단 직원이 댁으로 방문해 어르신의 심신 상태를 조사합니다. 보호자가 함께 계시는 것이 좋습니다.' },
  { step: 3, title: '의사소견서 제출', desc: '공단에서 안내하는 기간 내에 주치의 소견서를 제출합니다.' },
  { step: 4, title: '등급 판정', desc: '등급판정위원회에서 심의해 등급을 결정하며, 보통 신청일로부터 30일 정도 걸립니다.' },
  { step: 5, title: '장기요양인정서 수령', desc: '인정서와 표준장기이용계획서를 받으면 센터 이용 계약이 가능합니다.' },
]

const faq = [
  {
    q: '등급 신청에 필요한 서류가 있나요?',
    a: '신분증과 장기요양인정 신청서가 기본이며, 대리 신청 시 가족관계증명서 등이 필요할 수 있습니다. 자세한 내용은 상담 시 안내해 드립니다.',
  },
  {
    q: '등급이 나오지 않으면 이용할 수 없나요?',
    a: '장기요양급여는 등급이 있어야 이용할 수 있습니다. 다만 등급 재신청이나 다른 지원 제도를 안내해 드릴 수 있으니 편하게 문의해 주세요.',
  },
  { q: '신청 비용이 드나요?', a: '등급 신청 자체는 무료입니다. 의사소견서 발급 비용은 일부 본인 부담이 있을 수 있습니다.' },
  { q: '센터에서 신청을 도와주시나요?', a: '네. 신청 방법 안내부터 필요한 서류 준비까지 담당자가 전화로 도와드립니다.' },
]

export default function GradeGuidePage() {
  return (
    <>
      <Seo
        title="장기요양등급 가이드"
        description="장기요양등급이란 무엇인지, 어떻게 신청하는지 처음부터 안내합니다."
        path="/guide/grade"
      />
      <PageHero
        title="장기요양등급 가이드"
        description="등급이 무엇인지, 어떻게 신청하는지 처음이신 분도 알기 쉽게 정리했습니다."
        breadcrumbs={[{ label: '이용안내', to: '/guide' }, { label: '장기요양등급 가이드' }]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl sm:text-3xl">장기요양등급이란?</h2>
            <div className="mt-5 space-y-4 leading-8 text-ink-700">
              <p>
                노인장기요양보험은 65세 이상 어르신 또는 65세 미만이라도 치매·뇌혈관질환 등 노인성 질병을 가진 분 중
                혼자 일상생활을 하기 어려운 분께 요양 서비스를 지원하는 제도입니다.
              </p>
              <p>
                국민건강보험공단의 조사와 심의를 거쳐 <strong className="font-bold text-ink-900">1등급부터 5등급, 인지지원등급</strong>
                까지 판정을 받으면, 그 등급에 따라 주간보호센터·방문요양 등 서비스를 급여로 이용하실 수 있습니다.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-4xl overflow-x-auto rounded-2xl border border-ink-200">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <caption className="sr-only">장기요양등급별 판정 기준</caption>
              <thead className="bg-ink-800 text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 text-base">등급</th>
                  <th scope="col" className="px-5 py-4 text-base">장기요양인정점수</th>
                  <th scope="col" className="px-5 py-4 text-base">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200 bg-white">
                {gradeGuide.map((row) => (
                  <tr key={row.grade} className="even:bg-ink-50">
                    <th scope="row" className="whitespace-nowrap px-5 py-4 font-bold text-brand-700">
                      {row.grade}
                    </th>
                    <td className="whitespace-nowrap px-5 py-4 text-ink-700">{row.score}</td>
                    <td className="px-5 py-4 text-ink-700">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="bg-ink-50 py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="HOW TO APPLY" title="등급 신청 방법" description="신청부터 판정까지 보통 30일 정도 걸립니다." />
          <ol className="mx-auto mt-12 max-w-3xl space-y-4">
            {applySteps.map((step, i) => (
              <FadeIn as="li" key={step.step} delay={i * 0.06}>
                <Card className="flex items-start gap-5 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-lg">{step.title}</h3>
                    <p className="mt-2 leading-7 text-ink-600">{step.desc}</p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </ol>

          <Card className="mx-auto mt-8 max-w-3xl bg-brand-50 p-6">
            <p className="flex items-start gap-2 text-ink-700">
              <Icon name="info" size={22} className="mt-0.5 shrink-0 text-brand-600" />
              <span>
                문의처: 국민건강보험공단 <strong className="font-bold">1577-1000</strong> · 노인장기요양보험
                (www.longtermcare.or.kr)
              </span>
            </p>
          </Card>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="FAQ" title="자주 묻는 질문" />
          <ul className="mx-auto mt-12 max-w-3xl space-y-4">
            {faq.map((item) => (
              <li key={item.q}>
                <details className="group rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-ink-900">
                    <span>Q. {item.q}</span>
                    <Icon name="chevronDown" size={22} className="shrink-0 text-ink-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 leading-8 text-ink-700">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <ButtonLink to="/consult" size="lg">
              등급 신청부터 상담받기
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
