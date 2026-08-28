import { USE_DUMMY, client, delay } from './client'
import { currentMealPlan } from './dummyData'
import type { MealPlan } from './types'

/** 이번 주 식단 — Phase 2: GET /api/v1/meals/current */
export async function fetchCurrentMeal(): Promise<MealPlan> {
  if (USE_DUMMY) {
    await delay()
    return currentMealPlan
  }
  const { data } = await client.get<MealPlan>('/meals/current')
  return data
}
