import { Link } from 'react-router-dom'
import { site } from '@/config/site'

/** 폼 하단 개인정보 수집·이용 동의 안내 문구 (체크박스 라벨로 사용) */
export function PrivacyConsentLabel() {
  return (
    <>
      <strong className="font-bold text-ink-900">[필수]</strong> 개인정보 수집·이용에 동의합니다.{' '}
      <Link to="/privacy" className="font-bold text-brand-700 underline underline-offset-2">
        전문 보기
      </Link>
    </>
  )
}

/** 동의 체크박스 위에 붙는 수집 항목 요약 박스 */
export function PrivacyConsentSummary({ purpose }: { purpose: string }) {
  return (
    <div className="rounded-xl bg-ink-50 p-4 text-sm leading-6 text-ink-600">
      <p>
        <span className="font-bold text-ink-800">수집 항목</span> 이름, 연락처, 문의 내용
      </p>
      <p>
        <span className="font-bold text-ink-800">수집 목적</span> {purpose}
      </p>
      <p>
        <span className="font-bold text-ink-800">보유 기간</span> 수집일로부터 {site.privacyRetentionMonths}개월 후 파기
      </p>
      <p className="mt-2">동의를 거부하실 수 있으나, 이 경우 상담 회신이 어렵습니다.</p>
    </div>
  )
}
