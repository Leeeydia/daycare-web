import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchNotice } from '@/api/notice'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ErrorState, LoadingState } from '@/components/ui/States'
import { formatDate } from '@/utils/format'

export default function NoticeDetailPage() {
  const { id } = useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notices', 'detail', id],
    queryFn: () => fetchNotice(Number(id)),
    enabled: !!id,
  })

  return (
    <>
      <Seo title={data?.title ?? '공지사항'} path={`/notices/${id}`} />
      <PageHero
        title="공지사항"
        breadcrumbs={[{ label: '공지사항', to: '/notices' }, { label: data?.title ?? '상세' }]}
      />

      <section className="py-12 lg:py-20">
        <Container>
          {isLoading && <LoadingState />}
          {isError && <ErrorState message="게시글을 찾을 수 없습니다." />}

          {data && (
            <article className="mx-auto max-w-4xl">
              <header className="border-b-2 border-ink-800 pb-6">
                <h1 className="text-2xl leading-snug sm:text-3xl">{data.title}</h1>
                <div className="mt-3 flex flex-wrap gap-4 text-base text-ink-500">
                  <time dateTime={data.createdAt}>{formatDate(data.createdAt)}</time>
                  <span>조회 {data.viewCount}</span>
                </div>
              </header>

              {/* 관리자 에디터로 작성한 HTML — Phase 4에서 서버 측 sanitize 적용 예정 */}
              <div
                className="prose-basic min-h-[200px] py-8 text-ink-700"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />

              <div className="mt-8 flex justify-center border-t border-ink-200 pt-8">
                <ButtonLink to="/notices" variant="outline">
                  목록으로
                </ButtonLink>
              </div>
            </article>
          )}
        </Container>
      </section>
    </>
  )
}
