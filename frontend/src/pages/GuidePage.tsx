import { dailySchedule, feeTable, processSteps } from '@/api/dummyData'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { Icon } from '@/components/ui/Icon'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { site } from '@/config/site'
import { formatWon } from '@/utils/format'

const targets = [
  { title: '장기요양 1~5등급', desc: '등급 판정을 받으신 어르신은 바로 이용하실 수 있습니다.' },
  { title: '인지지원등급', desc: '치매 진단을 받으신 어르신도 주간보호 이용이 가능합니다.' },
  { title: '등급이 없으신 경우', desc: '등급 신청 절차부터 함께 안내해 드립니다. 먼저 상담해 주세요.' },
]

const transportInfo = [
  { title: '집 앞까지 모십니다', desc: '아침·저녁으로 어르신 댁 앞에서 안전하게 모시고 이동합니다.' },
  { title: '리프트 차량 운행', desc: '거동이 불편하신 어르신을 위해 승하차를 도와드립니다.' },
  { title: '보호자 알림', desc: '승차·하차 시 보호자님께 연락드려 안심하실 수 있도록 합니다.' },
  { title: '운행 지역', desc: '센터 인근 지역을 중심으로 운행하며, 자세한 범위는 상담 시 안내드립니다.' },
]

export default function GuidePage() {
  return (
    <>
      <Seo
        title="이용안내"
        description="이용 대상, 하루 일과표, 송영 서비스, 등급별 이용요금을 안내합니다."
        path="/guide"
      />
      <PageHero
        title="이용안내"
        description="누가, 어떻게, 얼마에 이용할 수 있는지 한눈에 정리했습니다."
        breadcrumbs={[{ label: '이용안내' }]}
      />

      {/* 이용 대상 */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="TARGET" title="이런 어르신이 이용하실 수 있습니다" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {targets.map((target, i) => (
              <FadeIn as="li" key={target.title} delay={i * 0.1}>
                <Card className="h-full p-7">
                  <Icon name="check" size={28} className="text-brand-600" />
                  <h3 className="mt-4 text-xl">{target.title}</h3>
                  <p className="mt-2.5 leading-7 text-ink-600">{target.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </ul>

          <Card className="mt-8 flex flex-col items-start gap-4 bg-brand-50 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg">운영 시간</h3>
              <p className="mt-2 text-ink-700">
                {site.hours.weekday} · {site.hours.saturday} · {site.hours.holiday}
              </p>
              <p className="mt-1 text-base text-ink-500">{site.hours.note}</p>
            </div>
            <ButtonLink to={site.telHref} variant="outline" size="sm" className="shrink-0">
              <Icon name="phone" size={20} /> 전화 문의
            </ButtonLink>
          </Card>
        </Container>
      </section>

      {/* 이용 절차 */}
      <section id="flow" className="scroll-mt-24 bg-ink-50 py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="PROCESS" title="이용 절차" description="상담부터 이용 시작까지 보통 1~2주가 걸립니다." />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <FadeIn as="li" key={step.step} delay={i * 0.1}>
                <Card className="h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">
                    {step.step}
                  </span>
                  <h3 className="mt-5 text-lg">{step.title}</h3>
                  <p className="mt-2.5 leading-7 text-ink-600">{step.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </ol>
        </Container>
      </section>

      {/* 하루 일과표 */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="DAILY" title="하루 일과표" description="요일과 어르신 상태에 따라 일부 조정될 수 있습니다." />
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-ink-200">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">센터 하루 일과표</caption>
              <thead className="bg-ink-800 text-white">
                <tr>
                  <th scope="col" className="w-40 px-4 py-4 text-base sm:w-52 sm:px-6">
                    시간
                  </th>
                  <th scope="col" className="px-4 py-4 text-base sm:px-6">
                    활동
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200 bg-white">
                {dailySchedule.map((row) => (
                  <tr key={row.time}>
                    <th scope="row" className="px-4 py-5 align-top text-base font-bold text-brand-700 sm:px-6">
                      {row.time}
                    </th>
                    <td className="px-4 py-5 sm:px-6">
                      <p className="font-bold text-ink-900">{row.title}</p>
                      <p className="mt-1 text-base text-ink-600">{row.desc}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 송영 서비스 */}
      <section className="bg-sage-50 py-16 lg:py-24">
        <Container>
          <SectionTitle eyebrow="TRANSPORT" title="송영(차량) 서비스" description="등원과 하원 모두 센터 차량으로 모십니다." />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {transportInfo.map((item, i) => (
              <FadeIn as="li" key={item.title} delay={(i % 2) * 0.1}>
                <Card className="flex h-full items-start gap-4 p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
                    <Icon name="bus" size={24} />
                  </span>
                  <div>
                    <h3 className="text-lg">{item.title}</h3>
                    <p className="mt-2 leading-7 text-ink-600">{item.desc}</p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </ul>
        </Container>
      </section>

      {/* 이용요금 */}
      <section id="fee" className="scroll-mt-24 py-16 lg:py-24">
        <Container>
          <SectionTitle
            eyebrow="FEE"
            title="등급별 이용요금 안내"
            description={`${feeTable.noticeYear}년 기준 예시 금액입니다. 정확한 금액은 상담 시 안내해 드립니다.`}
          />

          <div className="mt-12 overflow-x-auto rounded-2xl border border-ink-200">
            <table className="w-full min-w-[720px] border-collapse text-center">
              <caption className="sr-only">장기요양 등급별 1일 이용요금 및 본인부담금 비교표</caption>
              <thead className="bg-ink-800 text-white">
                <tr>
                  <th scope="col" rowSpan={2} className="px-4 py-4 text-base">
                    등급
                  </th>
                  <th scope="col" rowSpan={2} className="px-4 py-4 text-base">
                    1일 수가
                  </th>
                  <th scope="col" colSpan={4} className="border-b border-white/20 px-4 py-3 text-base">
                    본인부담금 (1일 기준)
                  </th>
                </tr>
                <tr className="bg-ink-700">
                  <th scope="col" className="px-4 py-3 text-base font-normal">
                    일반 15%
                  </th>
                  <th scope="col" className="px-4 py-3 text-base font-normal">
                    감경 9%
                  </th>
                  <th scope="col" className="px-4 py-3 text-base font-normal">
                    감경 6%
                  </th>
                  <th scope="col" className="px-4 py-3 text-base font-normal">
                    수급자 0%
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200 bg-white">
                {feeTable.rows.map((row) => (
                  <tr key={row.grade} className="even:bg-ink-50">
                    <th scope="row" className="px-4 py-4 font-bold text-brand-700">
                      {row.grade}
                    </th>
                    <td className="px-4 py-4 text-ink-700">{formatWon(row.daily)}</td>
                    <td className="px-4 py-4 font-bold text-ink-900">{formatWon(row.normal)}</td>
                    <td className="px-4 py-4 text-ink-700">{formatWon(row.reduced40)}</td>
                    <td className="px-4 py-4 text-ink-700">{formatWon(row.reduced60)}</td>
                    <td className="px-4 py-4 text-ink-700">0원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mx-auto mt-6 max-w-4xl space-y-2 rounded-2xl bg-brand-50 p-6 text-base text-ink-700">
            {feeTable.notes.map((note) => (
              <li key={note} className="flex items-start gap-2">
                <Icon name="info" size={20} className="mt-1 shrink-0 text-brand-600" />
                <span>{note}</span>
              </li>
            ))}
            <li className="flex items-start gap-2 font-bold text-brand-800">
              <Icon name="info" size={20} className="mt-1 shrink-0" />
              <span>본 표는 {feeTable.noticeYear}년 기준 예시이며, 실제 금액은 고시 변경에 따라 달라질 수 있습니다.</span>
            </li>
          </ul>

          <div className="mt-10 text-center">
            <ButtonLink to="/guide/grade" variant="outline">
              장기요양등급이 무엇인가요? <Icon name="arrowRight" size={20} />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
