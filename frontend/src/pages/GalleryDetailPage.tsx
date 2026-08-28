import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Pagination as SwiperPagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import { fetchGalleryPost } from '@/api/gallery'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Lightbox } from '@/components/ui/Lightbox'
import { Photo } from '@/components/ui/Photo'
import { ErrorState, LoadingState } from '@/components/ui/States'
import { formatDate } from '@/utils/format'

export default function GalleryDetailPage() {
  const { id } = useParams()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['gallery', 'detail', id],
    queryFn: () => fetchGalleryPost(Number(id)),
    enabled: !!id,
  })

  return (
    <>
      <Seo title={data?.title ?? '활동앨범'} path={`/gallery/${id}`} />
      <PageHero
        title="활동앨범"
        breadcrumbs={[{ label: '활동앨범', to: '/gallery' }, { label: data?.title ?? '상세' }]}
      />

      <section className="py-12 lg:py-20">
        <Container>
          {isLoading && <LoadingState />}
          {isError && <ErrorState message="게시글을 찾을 수 없습니다." />}

          {data && (
            <article className="mx-auto max-w-4xl">
              <header className="border-b border-ink-200 pb-6">
                <span className="text-base font-bold text-brand-600">{data.programCategory}</span>
                <h1 className="mt-2 text-2xl sm:text-3xl">{data.title}</h1>
                <time dateTime={data.createdAt} className="mt-2 block text-ink-500">
                  {formatDate(data.createdAt)}
                </time>
              </header>

              <div className="mt-8">
                <Swiper
                  modules={[SwiperPagination]}
                  pagination={{ clickable: true }}
                  spaceBetween={16}
                  className="!pb-12"
                >
                  {data.images.map((image, i) => (
                    <SwiperSlide key={image}>
                      <button type="button" onClick={() => setLightboxIndex(i)} className="block w-full">
                        <Photo src={image} alt={`${data.title} ${i + 1}번째 사진`} className="aspect-[4/3]" />
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <p className="mt-4 leading-8 text-ink-700">{data.description}</p>

              <div className="mt-12 flex justify-center">
                <ButtonLink to="/gallery" variant="outline">
                  목록으로
                </ButtonLink>
              </div>
            </article>
          )}

          {!isLoading && !data && !isError && (
            <div className="text-center">
              <Link to="/gallery" className="font-bold text-brand-700 underline">
                목록으로 돌아가기
              </Link>
            </div>
          )}
        </Container>
      </section>

      {data && lightboxIndex !== null && (
        <Lightbox
          images={data.images}
          index={lightboxIndex}
          title={data.title}
          onClose={() => setLightboxIndex(null)}
          onMove={setLightboxIndex}
        />
      )}
    </>
  )
}
