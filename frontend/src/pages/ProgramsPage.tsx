import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchPrograms } from '@/api/program'
import type { ProgramCategory } from '@/api/types'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { Photo } from '@/components/ui/Photo'
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/States'

const CATEGORIES: (ProgramCategory | '전체')[] = ['전체', '인지활동', '신체활동', '여가활동', '정서지원', '일상생활']

export default function ProgramsPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('전체')
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['programs'], queryFn: fetchPrograms })

  const programs = (data ?? []).filter((p) => category === '전체' || p.category === category)

  return (
    <>
      <Seo
        title="프로그램"
        description="인지활동, 신체활동, 여가활동, 정서지원 등 어르신 맞춤 프로그램을 소개합니다."
        path="/programs"
      />
      <PageHero
        title="프로그램"
        description="어르신의 남아 있는 기능을 지키기 위해 영역별로 균형 있게 운영합니다."
        breadcrumbs={[{ label: '프로그램' }]}
      />

      <section className="py-12 lg:py-20">
        <Container>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="프로그램 카테고리">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                onClick={() => setCategory(item)}
                className={`min-h-[44px] rounded-full border-2 px-5 text-base font-bold transition-colors ${
                  category === item
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-ink-200 bg-white text-ink-700 hover:border-brand-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {isLoading && <LoadingState />}
          {isError && <ErrorState onRetry={() => refetch()} />}
          {!isLoading && !isError && programs.length === 0 && <EmptyState message="해당 카테고리의 프로그램이 없습니다." />}

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, i) => (
              <FadeIn as="li" key={program.id} delay={(i % 3) * 0.08}>
                <Card className="h-full overflow-hidden" hoverable>
                  <Photo src={program.imageUrl} alt={program.name} rounded="rounded-none" />
                  <div className="p-6">
                    <Badge tone={program.category === '인지활동' ? 'brand' : 'sage'}>{program.category}</Badge>
                    <h2 className="mt-3 text-xl">{program.name}</h2>
                    <p className="mt-2.5 leading-7 text-ink-600">{program.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {program.effects.map((effect) => (
                        <li key={effect} className="rounded-lg bg-ink-100 px-2.5 py-1 text-sm text-ink-600">
                          #{effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
