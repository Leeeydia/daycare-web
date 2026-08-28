import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { createQna } from '@/api/qna'
import { PageHero } from '@/components/common/PageHero'
import { PrivacyConsentLabel, PrivacyConsentSummary } from '@/components/common/PrivacyConsent'
import { Seo } from '@/components/common/Seo'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Checkbox, Field, TextArea, TextInput } from '@/components/ui/Form'
import { Icon } from '@/components/ui/Icon'
import { formatPhone } from '@/utils/format'

const schema = z.object({
  name: z.string().trim().min(2, '이름을 두 글자 이상 입력해 주세요.').max(20),
  phone: z.string().trim().regex(/^01[016789]-\d{3,4}-\d{4}$/, '휴대폰 번호를 정확히 입력해 주세요.'),
  password: z.string().regex(/^\d{4}$/, '숫자 4자리로 입력해 주세요.'),
  question: z.string().trim().min(10, '문의 내용을 10자 이상 입력해 주세요.').max(1000, '1000자 이내로 입력해 주세요.'),
  isSecret: z.boolean(),
  privacyAgreed: z.literal(true, { errorMap: () => ({ message: '개인정보 수집·이용에 동의해 주세요.' }) }),
})

type FormValues = z.infer<typeof schema>

export default function QnaWritePage() {
  const navigate = useNavigate()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', password: '', question: '', isSecret: true, privacyAgreed: false as unknown as true },
  })

  const mutation = useMutation({ mutationFn: createQna })

  if (mutation.isSuccess) {
    return (
      <>
        <Seo title="문의 등록 완료" path="/qna/write" noIndex />
        <PageHero title="온라인 문의" breadcrumbs={[{ label: '온라인 문의', to: '/qna' }, { label: '작성 완료' }]} />
        <section className="py-16 lg:py-24">
          <Container>
            <Card className="mx-auto max-w-md p-10 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                <Icon name="check" size={34} />
              </span>
              <h1 className="mt-5 text-2xl">문의가 등록되었습니다</h1>
              <p className="mt-3 text-ink-600">담당자가 확인 후 빠르게 답변드리겠습니다.</p>
              <ButtonLink to="/qna" className="mt-7" fullWidth>
                문의 목록 보기
              </ButtonLink>
            </Card>
          </Container>
        </section>
      </>
    )
  }

  return (
    <>
      <Seo title="문의 작성" description="궁금하신 점을 남겨주세요." path="/qna/write" noIndex />
      <PageHero
        title="문의 작성"
        description="비밀글로 작성하시면 작성자와 관리자만 내용을 볼 수 있습니다."
        breadcrumbs={[{ label: '온라인 문의', to: '/qna' }, { label: '문의 작성' }]}
      />

      <section className="py-12 lg:py-20">
        <Container>
          <Card className="mx-auto max-w-2xl p-6 sm:p-10">
            <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-6" noValidate>
              <Field label="성함" htmlFor="qna-name" required error={errors.name?.message}>
                <TextInput id="qna-name" placeholder="홍길동" autoComplete="name" invalid={!!errors.name} {...register('name')} />
              </Field>

              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Field label="연락처" htmlFor="qna-phone" required error={errors.phone?.message} hint="답변 안내를 위해 사용됩니다.">
                    <TextInput
                      id="qna-phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="010-1234-5678"
                      autoComplete="tel"
                      invalid={!!errors.phone}
                      value={field.value}
                      onChange={(e) => field.onChange(formatPhone(e.target.value))}
                      onBlur={field.onBlur}
                    />
                  </Field>
                )}
              />

              <Field
                label="비밀번호"
                htmlFor="qna-pw"
                required
                error={errors.password?.message}
                hint="작성한 글을 확인할 때 사용합니다. 숫자 4자리"
              >
                <TextInput
                  id="qna-pw"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  autoComplete="off"
                  invalid={!!errors.password}
                  {...register('password')}
                />
              </Field>

              <Field label="문의 내용" htmlFor="qna-question" required error={errors.question?.message}>
                <TextArea
                  id="qna-question"
                  rows={8}
                  placeholder="어르신 상태, 궁금하신 내용을 자유롭게 적어주세요."
                  invalid={!!errors.question}
                  {...register('question')}
                />
              </Field>

              <Checkbox id="qna-secret" label="비밀글로 작성합니다 (권장)" {...register('isSecret')} />

              <PrivacyConsentSummary purpose="문의 접수 및 답변 안내" />

              <div>
                <Checkbox id="qna-privacy" label={<PrivacyConsentLabel />} {...register('privacyAgreed')} />
                {errors.privacyAgreed && (
                  <p className="text-sm font-bold text-red-600" role="alert">
                    {errors.privacyAgreed.message}
                  </p>
                )}
              </div>

              {mutation.isError && (
                <p className="text-sm font-bold text-red-600" role="alert">
                  등록에 실패했습니다. 잠시 후 다시 시도해 주세요.
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" size="lg" fullWidth disabled={mutation.isPending}>
                  {mutation.isPending ? '등록 중…' : '문의 등록하기'}
                </Button>
                <Button type="button" variant="ghost" size="lg" onClick={() => navigate('/qna')}>
                  취소
                </Button>
              </div>
            </form>
          </Card>
        </Container>
      </section>
    </>
  )
}
