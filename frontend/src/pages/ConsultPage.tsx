import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createConsult } from '@/api/consult'
import { processSteps } from '@/api/dummyData'
import { PageHero } from '@/components/common/PageHero'
import { PrivacyConsentLabel, PrivacyConsentSummary } from '@/components/common/PrivacyConsent'
import { Seo } from '@/components/common/Seo'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Checkbox, Field, Select, TextArea, TextInput } from '@/components/ui/Form'
import { Icon } from '@/components/ui/Icon'
import { site } from '@/config/site'
import { formatPhone } from '@/utils/format'

const schema = z.object({
  name: z.string().trim().min(2, '이름을 두 글자 이상 입력해 주세요.').max(20),
  phone: z.string().trim().regex(/^01[016789]-\d{3,4}-\d{4}$/, '휴대폰 번호를 정확히 입력해 주세요. (예: 010-1234-5678)'),
  hasGrade: z.enum(['있음', '없음', '모름']),
  memo: z.string().trim().max(1000, '1000자 이내로 입력해 주세요.').optional(),
  privacyAgreed: z.literal(true, { errorMap: () => ({ message: '개인정보 수집·이용에 동의해 주세요.' }) }),
})

type FormValues = z.infer<typeof schema>

export default function ConsultPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', hasGrade: '모름', memo: '', privacyAgreed: false as unknown as true },
  })

  const mutation = useMutation({ mutationFn: createConsult })

  return (
    <>
      <Seo
        title="무료 상담 신청"
        description="어르신 상황에 맞는 이용 방법을 무료로 안내해 드립니다. 이름과 연락처만 남겨주세요."
        path="/consult"
      />
      <PageHero
        title="무료 상담 신청"
        description="남겨주신 연락처로 담당자가 전화드려 자세히 안내해 드립니다."
        breadcrumbs={[{ label: '무료 상담 신청' }]}
      />

      <section className="py-12 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,560px)]">
            {/* 안내 영역 */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl">상담은 이렇게 진행됩니다</h2>
                <ol className="mt-6 space-y-4">
                  {processSteps.map((step) => (
                    <li key={step.step} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700">
                        {step.step}
                      </span>
                      <div>
                        <p className="font-bold text-ink-900">{step.title}</p>
                        <p className="mt-1 text-base text-ink-600">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <Card className="bg-brand-50 p-6">
                <p className="text-base text-ink-600">전화 상담이 더 편하시면</p>
                <a href={site.telHref} className="mt-1 flex items-center gap-2 text-2xl font-bold text-brand-700 sm:text-3xl">
                  <Icon name="phone" size={28} /> {site.tel}
                </a>
                <p className="mt-2 text-base text-ink-600">
                  {site.hours.weekday}
                  <br />
                  {site.hours.saturday} · {site.hours.holiday}
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-2 text-lg">
                  <Icon name="shield" size={22} className="text-sage-600" /> 안심하고 남겨주세요
                </h3>
                <ul className="mt-3 space-y-2 text-base text-ink-600">
                  <li>· 상담 내용은 상담 목적 외에 사용하지 않습니다.</li>
                  <li>· 수집한 개인정보는 {site.privacyRetentionMonths}개월 후 파기합니다.</li>
                  <li>· 이용을 결정하지 않으셔도 전혀 부담 없습니다.</li>
                </ul>
              </Card>
            </div>

            {/* 폼 영역 */}
            <div>
              {mutation.isSuccess ? (
                <Card className="p-10 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <Icon name="check" size={34} />
                  </span>
                  <h2 className="mt-5 text-2xl">상담 신청이 접수되었습니다</h2>
                  <p className="mt-3 leading-8 text-ink-600">
                    담당자가 확인 후 남겨주신 연락처로 전화드리겠습니다.
                    <br />
                    급하신 경우 {site.tel}로 연락 주세요.
                  </p>
                  <ButtonLink to="/" className="mt-7" fullWidth>
                    홈으로 돌아가기
                  </ButtonLink>
                </Card>
              ) : (
                <Card className="p-6 sm:p-8">
                  <h2 className="text-2xl">상담 신청서</h2>
                  <p className="mt-2 text-ink-600">필수 항목만 채우셔도 신청됩니다.</p>

                  <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="mt-6 space-y-6" noValidate>
                    <Field label="어르신 또는 보호자 성함" htmlFor="consult-name" required error={errors.name?.message}>
                      <TextInput id="consult-name" placeholder="홍길동" autoComplete="name" invalid={!!errors.name} {...register('name')} />
                    </Field>

                    <Controller
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <Field label="연락처" htmlFor="consult-phone" required error={errors.phone?.message}>
                          <TextInput
                            id="consult-phone"
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
                      label="장기요양등급 보유 여부"
                      htmlFor="consult-grade"
                      error={errors.hasGrade?.message}
                      hint="모르셔도 괜찮습니다. 상담 시 함께 확인해 드립니다."
                    >
                      <Select id="consult-grade" invalid={!!errors.hasGrade} {...register('hasGrade')}>
                        <option value="있음">등급 있음</option>
                        <option value="없음">등급 없음</option>
                        <option value="모름">잘 모르겠음</option>
                      </Select>
                    </Field>

                    <Field label="문의 내용" htmlFor="consult-memo" error={errors.memo?.message} hint="선택 항목입니다.">
                      <TextArea
                        id="consult-memo"
                        rows={5}
                        placeholder="어르신 상태나 궁금하신 점을 편하게 적어주세요."
                        invalid={!!errors.memo}
                        {...register('memo')}
                      />
                    </Field>

                    <PrivacyConsentSummary purpose="상담 신청 확인 및 회신" />

                    <div>
                      <Checkbox id="consult-privacy" label={<PrivacyConsentLabel />} {...register('privacyAgreed')} />
                      {errors.privacyAgreed && (
                        <p className="text-sm font-bold text-red-600" role="alert">
                          {errors.privacyAgreed.message}
                        </p>
                      )}
                    </div>

                    {mutation.isError && (
                      <p className="text-sm font-bold text-red-600" role="alert">
                        신청에 실패했습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요.
                      </p>
                    )}

                    <Button type="submit" size="lg" fullWidth disabled={mutation.isPending}>
                      {mutation.isPending ? '신청 중…' : '무료 상담 신청하기'}
                    </Button>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
