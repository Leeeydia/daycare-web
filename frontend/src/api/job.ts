import { USE_DUMMY, client, delay } from './client'
import { jobPostings } from './dummyData'
import type { JobPosting } from './types'

/** 채용공고 목록 — Phase 2: GET /api/v1/jobs */
export async function fetchJobs(): Promise<JobPosting[]> {
  if (USE_DUMMY) {
    await delay()
    return [...jobPostings].sort((a, b) => Number(b.isOpen) - Number(a.isOpen) || b.id - a.id)
  }
  const { data } = await client.get<JobPosting[]>('/jobs')
  return data
}

/** 채용공고 상세 — Phase 2: GET /api/v1/jobs/{id} */
export async function fetchJob(id: number): Promise<JobPosting> {
  if (USE_DUMMY) {
    await delay()
    const found = jobPostings.find((j) => j.id === id)
    if (!found) throw new Error('요청하신 공고를 찾을 수 없습니다.')
    return found
  }
  const { data } = await client.get<JobPosting>(`/jobs/${id}`)
  return data
}
