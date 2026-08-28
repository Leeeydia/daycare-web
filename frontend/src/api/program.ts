import { USE_DUMMY, client, delay } from './client'
import { programs } from './dummyData'
import type { Program } from './types'

/** 프로그램 목록 — Phase 2: GET /api/v1/programs */
export async function fetchPrograms(): Promise<Program[]> {
  if (USE_DUMMY) {
    await delay()
    return [...programs].sort((a, b) => a.sortOrder - b.sortOrder)
  }
  const { data } = await client.get<Program[]>('/programs')
  return data
}
