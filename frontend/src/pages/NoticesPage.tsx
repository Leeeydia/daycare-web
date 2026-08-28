import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchNotices } from '@/api/notice'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/States'
import { formatDate } from '@/utils/format'

export default function NoticesPage() {
  const [page, setPage] = useState(0)
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['notices', page],
    queryFn: () => fetchNotices(page, 10),
  })

  return (
    <>
      <Seo title="공지사항" description="센터 운영 일정과 소식을 알려드립니다." path="/notices" />
      <PageHero title="공지사항" description="센터 운영 일정과 소식을 알려드립니다." breadcrumbs={[{ label: '알림마당' }, { label: '공지사항' }]} />

      <section className="py-12 lg:py-20">
        <Container>
          {isLoading && <LoadingState />}
          {isError && <ErrorState onRetry={() => refetch()} />}
          {!isLoading && !isError && (data?.content.length ?? 0) === 0 && <EmptyState message="등록된 공지가 없습니다." />}

          {data && data.content.length > 0 && (
            <ul className="divide-y divide-ink-200 border-t-2 border-ink-800">
              {data.content.map((notice) => (
                <li key={notice.id}>
                  <Link
                    to={`/notices/${notice.id}`}
                    className="flex min-h-[80px] flex-col justify-center gap-1.5 py-5 transition-colors hover:bg-brand-50 sm:flex-row sm:items-center sm:gap-4 sm:px-2"
                  >
                    <div className="flex flex-1 items-center gap-3">
                      {notice.pinned && <Badge>공지</Badge>}
                      <span className="text-lg font-bold text-ink-900 group-hover:text-brand-700">{notice.title}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-4 text-base text-ink-500">
                      <time dateTime={notice.createdAt}>{formatDate(notice.createdAt)}</time>
                      <span>조회 {notice.viewCount}</span>
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
