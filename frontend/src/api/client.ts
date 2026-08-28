import axios from 'axios'
import type { ApiResponse } from './types'

/**
 * 공통 axios 인스턴스.
 * 개발 서버에서는 vite proxy가 /api → http://localhost:8080 으로 전달한다.
 */
export const client = axios.create({
  baseURL: '/api/v1',
  timeout: 10_000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

/** { success, data, error } 래퍼를 벗겨 data만 반환 */
client.interceptors.response.use((res) => {
  const body = res.data as ApiResponse<unknown>
  if (body && typeof body === 'object' && 'success' in body) {
    if (!body.success) {
      throw new Error(body.error?.message ?? '요청을 처리하지 못했습니다.')
    }
    res.data = body.data
  }
  return res
})

/** Phase 2 백엔드 연동 전까지 더미 데이터를 사용한다 */
export const USE_DUMMY = true

export const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))
