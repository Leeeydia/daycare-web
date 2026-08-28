import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchGallery } from '@/api/gallery'
import type { ProgramCategory } from '@/api/types'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { Icon } from '@/components/ui/Icon'
import { Pagination } from '@/components/ui/Pagination'
import { Photo } from '@/components/ui/Photo'
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/States'
import { formatDate } from '@/utils/format'

const CATEGORIES: (ProgramCategory | '전체')[] = ['전체', '인지활동', '신체활동', '여가활동', '정서지원', '일상생활']

export default function GalleryPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('전체')
  const [page, setPage] = useState(0)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['gallery', category, page],
    queryFn: () => fetchGallery(category === '전체' ? undefined : category, page, 9),
  })

  return (
    <>
      <Seo title="활동앨범" description="센터에서 진행한 프로그램과 행사 사진을 소개합니다." path="/gallery" />
      <PageHero
        title="활동앨범"
        description="어르신들이 보내신 하루하루를 사진으로 담았습니다."
        breadcrumbs={[{ label: '활동앨범' }]}
      />

      <section className="py-12 lg:py-20">
        <Container>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => {
                  setCategory(item)
                  setPage(0)
                }}
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
          {!isLoading && !isError && (data?.content.length ?? 0) === 0 && <EmptyState message="등록된 사진이 없습니다." />}

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(data?.content ?? []).map((post, i) => (
              <FadeIn as="li" key={post.id} delay={(i % 3) * 0.08}>
                <Link to={`/gallery/${post.id}`} className="group block">
                  <div className="relative">
                    <Photo src={post.images[0]} alt={post.title} />
                    {post.images.length > 1 && (
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-ink-900/70 px-2.5 py-1 text-sm font-bold text-white">
                        <Icon name="image" size={16} /> {post.images.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="text-sm font-bold text-brand-600">{post.programCategory}</span>
                    <h2 className="mt-1 text-lg group-hover:text-brand-700">{post.title}</h2>
                    <time dateTime={post.createdAt} className="text-base text-ink-500">
                      {formatDate(post.createdAt)}
                    </time>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </ul>

          <Pagination page={page} totalPages={data?.totalPages ?? 1} onChange={setPage} />
        </Container>
      </section>
    </>
  )
}
