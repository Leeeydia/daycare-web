import { USE_DUMMY, client, delay } from './client'
import { galleryPosts } from './dummyData'
import type { GalleryPost, Page } from './types'

/** 활동앨범 목록 — Phase 2: GET /api/v1/gallery?category&page&size */
export async function fetchGallery(category?: string, page = 0, size = 12): Promise<Page<GalleryPost>> {
  if (USE_DUMMY) {
    await delay()
    const all = category ? galleryPosts.filter((g) => g.programCategory === category) : galleryPosts
    return {
      content: all.slice(page * size, page * size + size),
      page,
      size,
      totalElements: all.length,
      totalPages: Math.max(1, Math.ceil(all.length / size)),
    }
  }
  const { data } = await client.get<Page<GalleryPost>>('/gallery', { params: { category, page, size } })
  return data
}

/** 활동앨범 상세 — Phase 2: GET /api/v1/gallery/{id} */
export async function fetchGalleryPost(id: number): Promise<GalleryPost> {
  if (USE_DUMMY) {
    await delay()
    const found = galleryPosts.find((g) => g.id === id)
    if (!found) throw new Error('요청하신 게시글을 찾을 수 없습니다.')
    return found
  }
  const { data } = await client.get<GalleryPost>(`/gallery/${id}`)
  return data
}
