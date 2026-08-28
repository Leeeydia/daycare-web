import { useCallback, useEffect } from 'react'
import { Icon } from './Icon'
import { Photo } from './Photo'

type Props = {
  images: string[]
  index: number
  title?: string
  onClose: () => void
  onMove: (next: number) => void
}

/** 이미지 확대 보기. ESC/좌우 방향키 지원, 배경 스크롤 잠금. */
export function Lightbox({ images, index, title, onClose, onMove }: Props) {
  const move = useCallback(
    (delta: number) => onMove((index + delta + images.length) % images.length),
    [index, images.length, onMove],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [move, onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-ink-900/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? '사진 크게 보기'}
    >
      <div className="flex items-center justify-between text-white">
        <p className="text-lg font-bold">
          {title} <span className="text-white/70">({index + 1}/{images.length})</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-white/15"
        >
          <Icon name="close" size={28} />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center gap-2 sm:gap-6">
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="이전 사진"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <Icon name="arrowLeft" />
          </button>
        )}
        <div className="max-h-[75vh] w-full max-w-3xl">
          <Photo src={images[index]} alt={title ?? '활동 사진'} className="aspect-[4/3]" eager />
        </div>
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="다음 사진"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <Icon name="arrowRight" />
          </button>
        )}
      </div>
    </div>
  )
}
