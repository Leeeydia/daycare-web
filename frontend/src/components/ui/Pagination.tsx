type Props = { page: number; totalPages: number; onChange: (page: number) => void }

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i)

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="페이지 이동">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 0}
        className="min-h-[44px] min-w-[44px] rounded-lg border border-ink-200 px-3 font-bold disabled:opacity-40"
      >
        이전
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={`min-h-[44px] min-w-[44px] rounded-lg border px-3 font-bold ${
            p === page ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-200 hover:bg-ink-100'
          }`}
        >
          {p + 1}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages - 1}
        className="min-h-[44px] min-w-[44px] rounded-lg border border-ink-200 px-3 font-bold disabled:opacity-40"
      >
        다음
      </button>
    </nav>
  )
}
