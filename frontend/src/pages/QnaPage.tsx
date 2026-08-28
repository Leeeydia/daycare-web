import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchQnaList } from '@/api/qna'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/States'
import { formatDate } from '@/utils/format'

export default function QnaPage() {
  const [page, setPage] = useState(0)
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['qna', page],
    queryFn: () => fetchQnaList(page, 10),
  })

  return (
    <>
      <Seo title="온라인 문의" description="궁금하신 점을 남겨주시면 담당자가 답변드립니다." path="/qna" />
      <PageHero
        title="온라인 문의"
        description="궁금하신 점을 남겨주시면 담당자가 확인 후 답변드립니다. 급하시면 전화 주세요."
        breadcrumbs={[{ label: '알림마당' }, { label: '온라인 문의' }]}
      />

      <section className="py-12 lg:py-20">
        <Container>
          <div className="flex justify-end">
            <ButtonLink to="/qna/write" size="sm">
              문의 작성하기
            </ButtonLink>
          </div>

          {isLoading && <LoadingState />}
          {isError && <ErrorState onRetry={() => refetch()} />}
          {!isLoading && !isError && (data?.content.length ?? 0) === 0 && <EmptyState message="등록된 문의가 없습니다." />}

          {data && data.content.length > 0 && (
            <ul className="mt-6 divide-y divide-ink-200 border-t-2 border-ink-800">
              {data.content.map((qna) => (
                <li key={qna.id}>
                  <Link
                    to={`/qna/${qna.id}`}
                    className="flex min-h-[80px] flex-col justify-center gap-2 py-5 transition-colors hover:bg-brand-50 sm:flex-row sm:items-center sm:gap-4 sm:px-2"
                  >
                    <div className="flex flex-1 items-center gap-2">
                      {qna.isSecret && <Icon name="lock" size={20} className="shrink-0 text-ink-400" />}
                      <span className="line-clamp-1 text-lg font-bold text-ink-900">
                        {qna.isSecret ? '비밀글입니다.' : qna.question}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 text-base text-ink-500">
                      {qna.answer ? <Badge tone="sage">답변완료</Badge> : <Badge tone="muted">답변대기</Badge>}
                      <span>{qna.name}</span>
                      <time dateTime={qna.createdAt}>{formatDate(qna.createdAt)}</time>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Pagination page={page} totalPages={data?.totalPages ?? 1} onChange={setPage} />
        </Container>
      </section>
    </>
  )
}
