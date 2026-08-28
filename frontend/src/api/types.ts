/** 백엔드 도메인 모델과 1:1 대응하는 프론트 타입 (Phase 2에서 API 응답과 그대로 매칭) */

export type ApiResponse<T> = {
  success: boolean
  data: T | null
  error: { code: string; message: string } | null
}

export type Page<T> = {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export type ProgramCategory = '인지활동' | '신체활동' | '여가활동' | '정서지원' | '일상생활'

export type Program = {
  id: number
  name: string
  description: string
  imageUrl: string | null
  category: ProgramCategory
  effects: string[]
  sortOrder: number
}

export type Notice = {
  id: number
  title: string
  content: string
  pinned: boolean
  viewCount: number
  createdAt: string
}

export type GalleryPost = {
  id: number
  title: string
  description: string
  images: string[]
  programCategory: ProgramCategory
  createdAt: string
}

export type Qna = {
  id: number
  name: string
  question: string
  answer: string | null
  answeredAt: string | null
  isSecret: boolean
  createdAt: string
}

export type WorkType = '정규직' | '계약직' | '시간제' | '대체인력'

export type JobPosting = {
  id: number
  title: string
  position: string
  workType: WorkType
  payInfo: string
  content: string
  isOpen: boolean
  createdAt: string
}

export type MealPlan = {
  weekStartDate: string
  weekEndDate: string
  imageUrl: string | null
  days: { day: string; date: string; lunch: string[]; snack: string }[]
}

/** 상담 신청 — 간편/상세 폼 공용 */
export type ConsultRequest = {
  name: string
  phone: string
  hasGrade?: '있음' | '없음' | '모름'
  memo?: string
  privacyAgreed: boolean
}

export type JobApplicationRequest = {
  name: string
  phone: string
  hasCertificate: boolean
  preferredWorkType: WorkType
  memo?: string
  privacyAgreed: boolean
}

export type QnaRequest = {
  name: string
  phone: string
  password: string
  question: string
  isSecret: boolean
  privacyAgreed: boolean
}
