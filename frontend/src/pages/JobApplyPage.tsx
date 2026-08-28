import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createJobApplication } from '@/api/consult'
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
  phone: z.string().trim().regex(/^01[016789]-\d{3,4}-\d{4}$/, '휴대폰 번호를 정확히 입력해 주세요.'),
  hasCertificate: z.boolean(),
  preferredWorkType: z.enum(['정규직', '계약직', '시간제', '대체인력']),
  memo: z.string().trim().max(1000, '1000자 이내로 입력해 주세요.').optional(),
  privacyAgreed: z.literal(true, { errorMap: () => ({ message: '개인정보 수집·이용에 동의해 주세요.' }) }),
})

type FormValues = z.infer<typeof schema>

export default function JobApplyPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      hasCertificate: false,
      preferredWorkType: '정규직',
      memo: '',
      privacyAgreed: false as unknown as true,
    },
  })

  const mutation = useMutation({ mutationFn: createJobApplication })

  return (
    <>
      <Seo title="구직 신청" description="함께 일하실 분의 신청을 기다립니다." path="/jobs/apply" />
      <PageHero
        title="구직 신청"
        description="간단한 정보만 남겨주시면 담당자가 연락드립니다."
        breadcrumbs={[{ label: '채용·구직', to: '/jobs' }, { label: '구직 신청' }]}
      />

      <section className="py-12 lg:py-20">
        <Container>
          {mutation.isSuccess ? (
            <Card className="mx-auto max-w-md p-10 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                <Icon name="check" size={34} />
              </span>
              <h2 className="mt-5 text-2xl">구직 신청이 접수되었습니다</h2>
              <p className="mt-3 leading-8 text-ink-600">
                담당자가 확인 후 연락드리겠습니다.
                <br />
                문의는 {site.tel}로 부탁드립니다.
              </p>
              <ButtonLink to="/jobs" className="mt-7" fullWidth>
                채용 공고 보기
              </ButtonLink>
            </Card>
          ) : (
            <Card className="mx-auto max-w-2xl p-6 sm:p-10">
              <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="space-y-6" noValidate>
                <Field label="성함" htmlFor="job-name" required error={errors.name?.message}>
                  <TextInput id="job-name" placeholder="홍길동" autoComplete="name" invalid={!!errors.name} {...register('name')} />
                </Field>

                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <Field label="연락처" htmlFor="job-phone" required error={errors.phone?.message}>
                      <TextInput
                        id="job-phone"
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

                <Field label="희망 근무 형태" htmlFor="job-worktype" required error={errors.preferredWorkType?.message}>
                  <Select id="job-worktype" invalid={!!errors.preferredWorkType} {...register('preferredWorkType')}>
                    <option value="정규직">정규직</option>
                    <option value="계약직">계약직</option>
                    <option value="시간제">시간제</option>
                    <option value="대체인력">대체인력</option>
                  </Select>
                </Field>

                <Checkbox id="job-cert" label="요양보호사 등 관련 자격증을 보유하고 있습니다." {...register('hasCertificate')} />

                <Field label="경력·희망사항" htmlFor="job-memo" error={errors.memo?.message} hint="선택 항목입니다.">
                  <TextArea
                    id="job-memo"
                    rows={5}
                    placeholder="근무 가능 요일, 경력 등을 적어주시면 상담에 도움이 됩니다."
                    invalid={!!errors.memo}
                    {...register('memo')}
                  />
                </Field>

                <PrivacyConsentSummary purpose="구직 신청 확인 및 채용 절차 안내" />

                <div>
                  <Checkbox id="job-privacy" label={<PrivacyConsentLabel />} {...register('privacyAgreed')} />
                  {errors.privacyAgreed && (
                    <p className="text-sm font-bold text-red-600" role="alert">
                      {errors.privacyAgreed.message}
                    </p>
                  )}
                </div>

                {mutation.isError && (
                  <p className="text-sm font-bold text-red-600" role="alert">
                    신청에 실패했습니다. 잠시 후 다시 시도해 주세요.
                  </p>
                )}

                <Button type="submit" size="lg" fullWidth disabled={mutation.isPending}>
                  {mutation.isPending ? '신청 중…' : '구직 신청하기'}
                </Button>
              </form>
            </Card>
          )}
        </Container>
      </section>
    </>
  )
}
