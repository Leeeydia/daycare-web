/** 화면 표시/입력 보조 유틸 */

/** 클래스명 조합 */
export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ')

/** 입력 중인 휴대폰 번호에 자동으로 하이픈을 넣는다. (010-1234-5678) */
export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length < 4) return digits
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

/** 이름 가운데 글자 마스킹 (홍길동 → 홍*동) — 목록 노출용 */
export function maskName(name: string) {
  if (name.length <= 1) return name
  if (name.length === 2) return `${name[0]}*`
  return `${name[0]}${'*'.repeat(name.length - 2)}${name[name.length - 1]}`
}

/** 2026-03-12T09:00:00 → 2026.03.12 */
export function formatDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`
}

/** 78970 → 78,970원 */
export const formatWon = (value: number) => `${value.toLocaleString('ko-KR')}원`
