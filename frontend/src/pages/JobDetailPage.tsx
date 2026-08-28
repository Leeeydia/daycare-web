import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchJob } from '@/api/job'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ErrorState, LoadingState } from '@/components/ui/States'
import { formatDate } from '@/utils/format'

export default function JobDetailPage() {
  const { id } = useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobs', 'detail', id],
    queryFn: () => fetchJob(Number(id)),
    enabled: !!id,
  })

  return (
    <>
      <Seo title={data?.title ?? '채용 공고'} path={`/jobs/${id}`} />
      <PageHero title="채용 공고" breadcrumbs={[{ label: '채용·구직', to: '/jobs' }, { label: data?.title ?? '상세' }]} />

      <section className="py-12 lg:py-20">
        <Container>
          {isLoading && <LoadingState />}
          {isError && <ErrorState message="공고를 찾을 수 없습니다." />}

          {data && (
            <article className="mx-auto max-w-4xl">
              <header className="border-b-2 border-ink-800 pb-6">
                <div className="flex flex-wrap items-center gap-2">
                  {data.isOpen ? <Badge tone="brand">모집중</Badge> : <Badge tone="muted">마감</Badge>}
                  <Badge tone="neutral">{data.workType}</Badge>
                </div>
                <h1 className="mt-3 text-2xl leading-snug sm:text-3xl">{data.title}</h1>
                <time dateTime={data.createdAt} className="mt-2 block text-base text-ink-500">
                  등록일 {formatDate(data.createdAt)}
                </time>
              </header>

              <dl className="mt-8 grid gap-4 rounded-2xl bg-ink-50 p-6 sm:grid-cols-3">
                <div>
                  <dt className="text-base font-bold text-ink-500">모집 직종</dt>
                  <dd className="mt-1 text-lg font-bold text-ink-900">{data.position}</dd>
                </div>
                <div>
                  <dt className="text-base font-bold text-ink-500">고용 형태</dt>
                  <dd className="mt-1 text-lg font-bold text-ink-900">{data.workType}</dd>
                </div>
                <div>
                  <dt className="text-base font-bold text-ink-500">급여</dt>
                  <dd className="mt-1 text-lg font-bold text-ink-900">{data.payInfo}</dd>
                </div>
              </dl>

              <div className="prose-basic py-8 text-ink-700" dangerouslySetInnerHTML={{ __html: data.content }} />

              <div className="mt-8 flex flex-col justify-center gap-3 border-t border-ink-200 pt-8 sm:flex-row">
                <ButtonLink to="/jobs" variant="outline">
                  목록으로
                </ButtonLink>
                {data.isOpen && (
                  <ButtonLink to="/jobs/apply" size="md">
                    이 공고에 지원하기
                  </ButtonLink>
                )}
              </div>
            </article>
          )}
        </Container>
      </section>
    </>
  )
}
