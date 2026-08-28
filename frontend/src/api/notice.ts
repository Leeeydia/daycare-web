import { USE_DUMMY, client, delay } from './client'
import { notices } from './dummyData'
import type { Notice, Page } from './types'

const sorted = () =>
  [...notices].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.createdAt.localeCompare(a.createdAt))

/** 공지 목록 — Phase 2: GET /api/v1/notices?page&size */
export async function fetchNotices(page = 0, size = 10): Promise<Page<Notice>> {
  if (USE_DUMMY) {
    await delay()
    const all = sorted()
    return {
      content: all.slice(page * size, page * size + size),
      page,
      size,
      totalElements: all.length,
      totalPages: Math.max(1, Math.ceil(all.length / size)),
    }
  }
  const { data } = await client.get<Page<Notice>>('/notices', { params: { page, size } })
  return data
}

/** 공지 상세 — Phase 2: GET /api/v1/notices/{id} (조회수 증가) */
export async function fetchNotice(id: number): Promise<Notice> {
  if (USE_DUMMY) {
    await delay()
    const found = notices.find((n) => n.id === id)
    if (!found) throw new Error('요청하신 게시글을 찾을 수 없습니다.')
    return found
  }
  const { data } = await client.get<Notice>(`/notices/${id}`)
  return data
}
