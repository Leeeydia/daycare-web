import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { Icon } from '@/components/ui/Icon'

/**
 * 모바일 하단 고정 3버튼: 전화 / 카카오톡 채널 / 상담신청.
 * 데스크톱에서는 우측 하단 세로 버튼으로 표시한다.
 */
export function FloatingButtons() {
  return (
    <>
      {/* 모바일 */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-ink-200 bg-white shadow-[0_-4px_16px_-6px_rgba(46,41,33,0.2)] lg:hidden">
        <a href={site.telHref} className="flex min-h-[64px] flex-col items-center justify-center gap-1 text-ink-800">
          <Icon name="phone" size={24} />
          <span className="text-sm font-bold">전화상담</span>
        </a>
        <a
          href={site.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[64px] flex-col items-center justify-center gap-1 border-x border-ink-200 text-ink-800"
        >
          <Icon name="chat" size={24} />
          <span className="text-sm font-bold">카카오톡</span>
        </a>
        <Link to="/consult" className="flex min-h-[64px] flex-col items-center justify-center gap-1 bg-brand-600 text-white">
          <Icon name="document" size={24} />
          <span className="text-sm font-bold">상담신청</span>
        </Link>
      </div>

      {/* 데스크톱 */}
      <div className="fixed bottom-8 right-6 z-40 hidden flex-col gap-3 lg:flex">
        <a
          href={site.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE500] text-[#191600] shadow-lift transition-transform hover:scale-105"
          aria-label="카카오톡 채널로 문의하기"
        >
          <Icon name="chat" size={26} />
        </a>
        <a
          href={site.telHref}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-600 text-white shadow-lift transition-transform hover:scale-105"
          aria-label={`대표전화 ${site.tel}`}
        >
          <Icon name="phone" size={26} />
        </a>
        <Link
          to="/consult"
          className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-brand-600 text-white shadow-lift transition-transform hover:scale-105"
          aria-label="무료상담 신청하기"
        >
          <Icon name="document" size={26} />
        </Link>
      </div>
    </>
  )
}
