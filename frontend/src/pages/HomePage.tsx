import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Autoplay, EffectFade, Navigation, Pagination as SwiperPagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { fetchGallery } from '@/api/gallery'
import { fetchNotices } from '@/api/notice'
import { fetchPrograms } from '@/api/program'
import { processSteps, strengths } from '@/api/dummyData'
import { QuickConsultForm } from '@/components/common/QuickConsultForm'
import { Seo } from '@/components/common/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { site } from '@/config/site'
import { formatDate } from '@/utils/format'

const heroSlides = [
  {
    label: '히어로 이미지 1 — 어르신 프로그램 활동',
    eyebrow: '주간보호(데이케어) 센터',
    title: ['내 부모님처럼,', '하루를 정성으로'],
    desc: '아침에 모시고, 저녁에 안전하게 모셔다 드립니다. 그 사이의 하루를 저희가 함께합니다.',
  },
  {
    label: '히어로 이미지 2 — 인지활동 프로그램',
    eyebrow: '치매 예방 인지 프로그램',
    title: ['오늘 하루가', '기억으로 남도록'],
    desc: '작업치료사와 함께하는 회상요법·인지자극 활동으로 남아 있는 기능을 지켜드립니다.',
  },
  {
    label: '히어로 이미지 3 — 송영 차량',
    eyebrow: '안전한 송영 서비스',
    title: ['댁 앞까지', '편안하게 모십니다'],
    desc: '리프트 차량으로 승하차를 돕고, 보호자님께는 도착 알림을 드립니다.',
  },
]

export default function HomePage() {
  const noticesQuery = useQuery({ queryKey: ['notices', 0, 3], queryFn: () => fetchNotices(0, 3) })
  const galleryQuery = useQuery({ queryKey: ['gallery', 'home'], queryFn: () => fetchGallery(undefined, 0, 4) })
  const programsQuery = useQuery({ queryKey: ['programs'], queryFn: fetchPrograms })

  return (
    <>
      <Seo />

      {/* 히어로 캐러셀 */}
      <section aria-label="센터 소개 슬라이드" className="relative">
        <Swiper
          modules={[Autoplay, EffectFade, SwiperPagination, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          navigation
          a11y={{ prevSlideMessage: '이전 슬라이드', nextSlideMessage: '다음 슬라이드' }}
          className="h-[520px] sm:h-[560px] lg:h-[640px]"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={slide.eyebrow}>
              <div className="relative h-full w-full">
                <Photo src={slide.label} alt={slide.label} className="h-full" rounded="rounded-none" eager={i === 0} />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 via-ink-900/55 to-ink-900/20" />
                <Container className="absolute inset-0 flex flex-col justify-center">
                  <div className="max-w-2xl text-white">
                    <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold backdrop-blur sm:text-base">
                      {slide.eyebrow}
                    </p>
                    <h1 className="text-3xl leading-tight text-white sm:text-5xl lg:text-6xl">
                      {slide.title[0]}
                      <br />
                      {slide.title[1]}
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-8 text-white/90 sm:text-lg">{slide.desc}</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <ButtonLink to="/consult" size="lg">
                        무료상담 신청하기
                      </ButtonLink>
                      <ButtonLink
                        to={site.telHref}
                        variant="onBrandOutline"
                        size="lg"
                        className="backdrop-blur"
                      >
                        <Icon name="phone" size={22} /> {site.tel}
                      </ButtonLink>
                    </div>
                  </div>
                </Container>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 간편상담 — 메인 상단 가까이 배치 */}
      <section className="bg-ink-50 py-12 lg:py-16" aria-labelledby="quick-consult-title">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,460px)] lg:items-center">
            <div>
              <h2 id="quick-consult-title" className="text-2xl leading-snug sm:text-3xl lg:text-4xl">
                무엇부터 해야 할지
                <br />
                막막하셨다면
              </h2>
              <p className="mt-4 text-ink-600 sm:text-lg">
                장기요양등급 신청부터 센터 이용까지, 처음이신 보호자님도 어렵지 않게 시작하실 수 있도록 전화로 하나씩
                안내해 드립니다. 상담은 <strong className="font-bold text-brand-700">무료</strong>이며, 이용을 결정하지
                않으셔도 괜찮습니다.
              </p>
              <ul className="mt-6 space-y-3">
                {['등급이 없어도 신청 방법부터 안내', '방문 전 전화 상담만으로도 충분', '상담 내용은 외부에 공개되지 않습니다'].map(
                  (text) => (
                    <li key={text} className="flex items-start gap-2 text-ink-700">
                      <Icon name="check" size={22} className="mt-1 shrink-0 text-brand-600" />
                      <span>{text}</span>
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-7 rounded-2xl border-2 border-dashed border-brand-200 bg-white p-5">
                <p className="text-base text-ink-600">전화가 더 편하시면</p>
                <a href={site.telHref} className="mt-1 flex items-center gap-2 text-2xl font-bold text-brand-700 sm:text-3xl">
                  <Icon name="phone" size={28} /> {site.tel}
                </a>
                <p className="mt-1 text-sm text-ink-500">{site.hours.weekday} · {site.hours.saturday}</p>
              </div>
            </div>

            <QuickConsultForm />
          </div>
        </Container>
      </section>

      {/* 센터 강점 */}
      <section className="py-16 lg:py-24" aria-labelledby="strength-title">
        <Container>
          <SectionTitle
            eyebrow="WHY US"
            title={<span id="strength-title">{site.name}가 다른 이유</span>}
            description="어르신의 하루와 보호자님의 마음, 두 가지를 함께 살핍니다."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((item, i) => (
              <FadeIn as="li" key={item.title} delay={i * 0.1}>
                <Card className="h-full p-7" hoverable>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                    <Icon name={item.icon as IconName} size={28} />
                  </span>
                  <h3 className="mt-5 text-xl">{item.title}</h3>
                  <p className="mt-3 leading-7 text-ink-600">{item.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </ul>
        </Container>
      </section>

      {/* 프로그램 미리보기 */}
      <section className="bg-sage-50 py-16 lg:py-24" aria-labelledby="program-preview-title">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              align="left"
              eyebrow="PROGRAM"
              title={<span id="program-preview-title">하루를 채우는 프로그램</span>}
              description="인지·신체·정서 영역을 골고루 자극하는 활동을 요일별로 운영합니다."
            />
            <ButtonLink to="/programs" variant="outline" size="sm" className="shrink-0">
              전체 프로그램 보기 <Icon name="arrowRight" size={20} />
            </ButtonLink>
          </div>

          <div className="mt-10">
            <Swiper
              modules={[SwiperPagination]}
              spaceBetween={20}
              pagination={{ clickable: true }}
              breakpoints={{ 0: { slidesPerView: 1.15 }, 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 4 } }}
              className="!pb-12"
            >
              {(programsQuery.data ?? []).map((program) => (
                <SwiperSlide key={program.id}>
                  <Card className="h-full overflow-hidden" hoverable>
                    <Photo src={program.imageUrl} alt={program.name} rounded="rounded-none" />
                    <div className="p-5">
                      <span className="text-sm font-bold text-brand-600">{program.category}</span>
                      <h3 className="mt-1.5 text-lg">{program.name}</h3>
                      <p className="mt-2 line-clamp-2 text-base text-ink-600">{program.description}</p>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Container>
      </section>

      {/* 이용 절차 */}
      <section className="py-16 lg:py-24" aria-labelledby="process-title">
        <Container>
          <SectionTitle
            eyebrow="PROCESS"
            title={<span id="process-title">이용까지 4단계면 충분합니다</span>}
            description="복잡해 보이는 절차, 담당자가 전화로 함께 진행해 드립니다."
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <FadeIn as="li" key={step.step} delay={i * 0.1} className="relative">
                <Card className="h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">
                    {step.step}
                  </span>
                  <h3 className="mt-5 text-lg">{step.title}</h3>
                  <p className="mt-2.5 leading-7 text-ink-600">{step.desc}</p>
                </Card>
                {i < processSteps.length - 1 && (
                  <Icon
                    name="chevronRight"
                    size={24}
                    className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-brand-300 lg:block"
                  />
                )}
              </FadeIn>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <ButtonLink to="/guide" variant="outline">
              이용안내 자세히 보기 <Icon name="arrowRight" size={20} />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* 공지 + 활동앨범 */}
      <section className="bg-ink-50 py-16 lg:py-24" aria-labelledby="board-title">
        <Container>
          <h2 id="board-title" className="sr-only">
            공지사항과 활동앨범
          </h2>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl">공지사항</h3>
                <Link to="/notices" className="text-base font-bold text-brand-700 hover:underline">
                  더보기
                </Link>
              </div>
              <ul className="mt-5 divide-y divide-ink-200 border-t-2 border-ink-800">
                {(noticesQuery.data?.content ?? []).map((notice) => (
                  <li key={notice.id}>
                    <Link to={`/notices/${notice.id}`} className="flex min-h-[72px] items-center justify-between gap-4 py-4">
                      <span className="line-clamp-1 font-bold text-ink-800">
                        {notice.pinned && <span className="mr-2 text-brand-600">[공지]</span>}
                        {notice.title}
                      </span>
                      <time dateTime={notice.createdAt} className="shrink-0 text-sm text-ink-500">
                        {formatDate(notice.createdAt)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl">활동앨범</h3>
                <Link to="/gallery" className="text-base font-bold text-brand-700 hover:underline">
                  더보기
                </Link>
              </div>
              <ul className="mt-5 grid grid-cols-2 gap-4">
                {(galleryQuery.data?.content ?? []).map((post) => (
                  <li key={post.id}>
                    <Link to={`/gallery/${post.id}`} className="group block">
                      <Photo src={post.images[0]} alt={post.title} className="aspect-square" />
                      <p className="mt-2.5 line-clamp-1 font-bold text-ink-800 group-hover:text-brand-700">{post.title}</p>
                      <time dateTime={post.createdAt} className="text-sm text-ink-500">
                        {formatDate(post.createdAt)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
