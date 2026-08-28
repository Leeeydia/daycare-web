import { USE_DUMMY, client, delay } from './client'
import type { ConsultRequest, JobApplicationRequest } from './types'

/** 상담 신청 — 간편/상세 폼 공용. Phase 2: POST /api/v1/consults */
export async function createConsult(payload: ConsultRequest): Promise<{ id: number }> {
  if (USE_DUMMY) {
    await delay(600)
    return { id: Date.now() }
  }
  const { data } = await client.post<{ id: number }>('/consults', payload)
  return data
}

/** 구직 신청 — Phase 2: POST /api/v1/job-applications */
export async function createJobApplication(payload: JobApplicationRequest): Promise<{ id: number }> {
  if (USE_DUMMY) {
    await delay(600)
    return { id: Date.now() }
  }
  const { data } = await client.post<{ id: number }>('/job-applications', payload)
  return data
}
