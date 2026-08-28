import { Icon } from './Icon'

export function LoadingState({ label = '불러오는 중입니다…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink-500" role="status">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-ink-200 border-t-brand-600" />
      <p className="text-base">{label}</p>
    </div>
  )
}

export function ErrorState({
  message = '내용을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
  onRetry,
}: {
  message?: string
  onRetry?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center" role="alert">
      <Icon name="info" size={36} className="text-brand-600" />
      <p className="text-ink-700">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="min-h-[44px] rounded-lg border-2 border-brand-600 px-5 font-bold text-brand-700">
          다시 시도
        </button>
      )}
    </div>
  )
}

export function EmptyState({ message = '등록된 내용이 없습니다.' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink-500">
      <Icon name="document" size={36} className="text-ink-300" />
      <p>{message}</p>
    </div>
  )
}
