import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchJobs } from '@/api/job'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { Icon } from '@/components/ui/Icon'
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/States'
import { formatDate } from '@/utils/format'

export default function JobsPage() {
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['jobs'], queryFn: fetchJobs })

  return (
    <>
      <Seo title="채용·구직" description="함께 일하실 요양보호사, 사회복지사를 모십니다." path="/jobs" />
      <PageHero
        title="채용·구직"
        description="어르신의 하루를 함께 만들어갈 분을 찾습니다. 공고가 없어도 구직 신청은 언제든 가능합니다."
        breadcrumbs={[{ label: '채용·구직' }]}
      />

      <section className="py-12 lg:py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl">채용 공고</h2>
            <ButtonLink to="/jobs/apply" size="sm">
              구직 신청하기
            </ButtonLink>
          </div>

          {isLoading && <LoadingState />}
          {isError && <ErrorState onRetry={() => refetch()} />}
          {!isLoading && !isError && (data?.length ?? 0) === 0 && <EmptyState message="현재 진행 중인 공고가 없습니다." />}

          <ul className="mt-8 space-y-5">
            {(data ?? []).map((job, i) => (
              <FadeIn as="li" key={job.id} delay={i * 0.06}>
                <Link to={`/jobs/${job.id}`} className="block">
                  <Card className="p-6 sm:p-7" hoverable>
                    <div className="flex flex-wrap items-center gap-2">
                      {job.isOpen ? <Badge tone="brand">모집중</Badge> : <Badge tone="muted">마감</Badge>}
                      <Badge tone="neutral">{job.workType}</Badge>
                      <Badge tone="neutral">{job.position}</Badge>
                    </div>
                    <h3 className="mt-3 text-xl">{job.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-base text-ink-600">
                      <span className="flex items-center gap-1.5">
                        <Icon name="document" size={18} className="text-ink-400" /> {job.payInfo}
                      </span>
                      <time dateTime={job.createdAt} className="flex items-center gap-1.5">
                        <Icon name="calendar" size={18} className="text-ink-400" /> {formatDate(job.createdAt)}
                      </time>
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </ul>

          <Card className="mt-12 flex flex-col items-start gap-4 bg-sage-50 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl">지금 맞는 공고가 없으신가요?</h2>
              <p className="mt-2 text-ink-600">구직 신청을 남겨주시면 자리가 생길 때 먼저 연락드립니다.</p>
            </div>
            <ButtonLink to="/jobs/apply" variant="secondary" className="shrink-0">
              구직 신청하기
            </ButtonLink>
          </Card>
        </Container>
      </section>
    </>
  )
}
