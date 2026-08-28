import { useQuery } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { fetchQna } from '@/api/qna'
import { PageHero } from '@/components/common/PageHero'
import { Seo } from '@/components/common/Seo'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Field, TextInput } from '@/components/ui/Form'
import { Icon } from '@/components/ui/Icon'
import { ErrorState, LoadingState } from '@/components/ui/States'
import { formatDate } from '@/utils/format'

/** Phase 2에서 POST /api/v1/qna/{id}/verify 로 대체할 임시 확인값 */
const DUMMY_PASSWORD = '1234'

export default function QnaDetailPage() {
  const { id } = useParams()
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['qna', 'detail', id],
    queryFn: () => fetchQna(Number(id)),
    enabled: !!id,
  })

  const onVerify = (e: FormEvent) => {
    e.preventDefault()
    if (password === DUMMY_PASSWORD) {
      setUnlocked(true)
      setError('')
    } else {
      setError('비밀번호가 일치하지 않습니다.')
    }
  }

  const locked = !!data?.isSecret && !unlocked

  return (
    <>
      <Seo title="온라인 문의" path={`/qna/${id}`} noIndex />
      <PageHero title="온라인 문의" breadcrumbs={[{ label: '온라인 문의', to: '/qna' }, { label: '상세' }]} />

      <section className="py-12 lg:py-20">
        <Container>
          {isLoading && <LoadingState />}
          {isError && <ErrorState message="게시글을 찾을 수 없습니다." />}

          {data && locked && (
            <Card className="mx-auto max-w-md p-8 text-center">
              <Icon name="lock" size={36} className="mx-auto text-ink-400" />
              <h1 className="mt-4 text-xl">비밀글입니다</h1>
              <p className="mt-2 text-ink-600">작성 시 입력하신 비밀번호를 입력해 주세요.</p>
              <form onSubmit={onVerify} className="mt-6 space-y-4 text-left">
                <Field label="비밀번호" htmlFor="qna-password" error={error}>
                  <TextInput
                    id="qna-password"
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    value={password}
                    invalid={!!error}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="숫자 4자리"
                  />
                </Field>
                <Button type="submit" fullWidth>
                  확인
                </Button>
              </form>
              {/* 개발용 안내 — Phase 2 연동 시 제거 */}
              <p className="mt-4 text-sm text-ink-400">개발용 임시 비밀번호: {DUMMY_PASSWORD}</p>
            </Card>
          )}

          {data && !locked && (
            <article className="mx-auto max-w-4xl">
              <header className="border-b-2 border-ink-800 pb-6">
                <div className="flex items-center gap-2">
                  {data.isSecret && <Icon name="lock" size={20} className="text-ink-400" />}
                  <h1 className="text-2xl leading-snug sm:text-3xl">{data.question}</h1>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-base text-ink-500">
                  <span>{data.name}</span>
                  <time dateTime={data.createdAt}>{formatDate(data.createdAt)}</time>
                </div>
              </header>

              <div className="py-8 leading-8 text-ink-700">{data.question}</div>

              {data.answer ? (
                <Card className="bg-brand-50 p-7">
                  <div className="flex items-center gap-2 text-brand-700">
                    <Icon name="chat" size={22} />
                    <h2 className="text-lg">센터 답변</h2>
                    {data.answeredAt && (
                      <time dateTime={data.answeredAt} className="text-base font-normal text-ink-500">
                        {formatDate(data.answeredAt)}
                      </time>
                    )}
                  </div>
                  <p className="mt-4 leading-8 text-ink-700">{data.answer}</p>
                </Card>
              ) : (
                <Card className="bg-ink-50 p-7 text-center text-ink-600">
                  아직 답변이 등록되지 않았습니다. 확인 후 빠르게 답변드리겠습니다.
                </Card>
              )}

              <div className="mt-10 flex justify-center">
                <ButtonLink to="/qna" variant="outline">
                  목록으로
                </ButtonLink>
              </div>
            </article>
          )}
        </Container>
      </section>
    </>
  )
}
