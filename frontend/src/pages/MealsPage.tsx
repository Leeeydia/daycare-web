import { useQuery } from '@tanstack/react-query'
import { fetchCurrentMeal } from '@/api/meal'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/States'

export default function MealsPage() {
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['meals', 'current'], queryFn: fetchCurrentMeal })

  return (
    <>
      <Seo title="주간 식단표" description="영양사가 작성한 이번 주 식단을 안내합니다." path="/meals" />
      <PageHero
        title="주간 식단표"
        description="영양사가 어르신 건강 상태를 고려해 매주 식단을 구성합니다."
        breadcrumbs={[{ label: '알림마당' }, { label: '주간 식단표' }]}
      />

      <section className="py-12 lg:py-20">
        <Container>
          {isLoading && <LoadingState />}
          {isError && <ErrorState onRetry={() => refetch()} />}
          {!isLoading && !isError && !data && <EmptyState message="등록된 식단이 없습니다." />}

          {data && (
            <>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="flex items-center gap-2 text-xl sm:text-2xl">
                  <Icon name="calendar" size={26} className="text-brand-600" />
                  {data.weekStartDate} ~ {data.weekEndDate}
                </h2>
                <p className="text-base text-ink-500">식단은 재료 수급 상황에 따라 변경될 수 있습니다.</p>
              </div>

              {data.imageUrl ? (
                <div className="mt-8">
                  <Photo src={data.imageUrl} alt="주간 식단표 이미지" className="aspect-[4/3]" />
                </div>
              ) : (
                <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                  {data.days.map((day) => (
                    <li key={day.day}>
                      <Card className="flex h-full flex-col p-6">
                        <div className="flex items-baseline gap-2 border-b border-ink-200 pb-3">
                          <span className="text-2xl font-bold text-brand-700">{day.day}</span>
                          <span className="text-base text-ink-500">{day.date}</span>
                        </div>
                        <div className="mt-4 flex-1">
                          <h3 className="text-base font-bold text-ink-800">점심</h3>
                          <ul className="mt-2 space-y-1 text-ink-700">
                            {day.lunch.map((menu) => (
                              <li key={menu}>· {menu}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-4 rounded-xl bg-sage-50 p-3">
                          <h3 className="text-base font-bold text-sage-800">간식</h3>
                          <p className="mt-1 text-ink-700">{day.snack}</p>
                        </div>
                      </Card>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  )
}
