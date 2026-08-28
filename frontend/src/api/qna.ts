import { USE_DUMMY, client, delay } from './client'
import { qnaList } from './dummyData'
import type { Page, Qna, QnaRequest } from './types'

/** 문의 목록 — Phase 2: GET /api/v1/qna?page&size */
export async function fetchQnaList(page = 0, size = 10): Promise<Page<Qna>> {
  if (USE_DUMMY) {
    await delay()
    return {
      content: qnaList.slice(page * size, page * size + size),
      page,
      size,
      totalElements: qnaList.length,
      totalPages: Math.max(1, Math.ceil(qnaList.length / size)),
    }
  }
  const { data } = await client.get<Page<Qna>>('/qna', { params: { page, size } })
  return data
}

/** 문의 상세 — Phase 2: GET /api/v1/qna/{id} (비밀글은 비밀번호 확인 API 별도) */
export async function fetchQna(id: number): Promise<Qna> {
  if (USE_DUMMY) {
    await delay()
    const found = qnaList.find((q) => q.id === id)
    if (!found) throw new Error('요청하신 게시글을 찾을 수 없습니다.')
    return found
  }
  const { data } = await client.get<Qna>(`/qna/${id}`)
  return data
}

/** 문의 등록 — Phase 2: POST /api/v1/qna */
export async function createQna(payload: QnaRequest): Promise<{ id: number }> {
  if (USE_DUMMY) {
    await delay(600)
    return { id: Date.now() }
  }
  const { data } = await client.post<{ id: number }>('/qna', payload)
  return data
}
