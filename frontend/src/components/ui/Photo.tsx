import { Icon } from './Icon'

/**
 * 사진 자리표시 컴포넌트.
 * src가 '/' 또는 'http'로 시작하면 실제 이미지, 그 외에는 라벨을 표시하는 그라데이션 자리표시로 렌더링한다.
 * 실제 시설/활동 사진을 받으면 src에 경로만 넣으면 된다.
 */
const palettes = [
  'from-brand-200 to-brand-400',
  'from-sage-200 to-sage-400',
  'from-amber-200 to-orange-300',
  'from-emerald-200 to-teal-300',
  'from-rose-200 to-pink-300',
  'from-sky-200 to-indigo-300',
]

function hash(text: string) {
  let h = 0
  for (let i = 0; i < text.length; i += 1) h = (h * 31 + text.charCodeAt(i)) % 9973
  return h
}

type Props = {
  src?: string | null
  alt: string
  className?: string
  eager?: boolean
  rounded?: string
}

export function Photo({ src, alt, className = 'aspect-[4/3]', eager = false, rounded = 'rounded-2xl' }: Props) {
  const isReal = !!src && (src.startsWith('/') || src.startsWith('http'))

  if (isReal) {
    return (
      <img
        src={src as string}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        className={`${className} ${rounded} w-full object-cover`}
      />
    )
  }

  const label = src || alt
  const palette = palettes[hash(label) % palettes.length]

  return (
    <div
      role="img"
      aria-label={`${label} 사진 준비 중`}
      className={`${className} ${rounded} flex w-full flex-col items-center justify-center gap-2 bg-gradient-to-br ${palette} p-4 text-center`}
    >
      <Icon name="image" size={32} className="text-white/80" />
      <span className="text-sm font-bold text-white drop-shadow-sm sm:text-base">{label}</span>
    </div>
  )
}
