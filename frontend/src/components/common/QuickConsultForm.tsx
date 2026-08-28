import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createConsult } from '@/api/consult'
import { Button } from '@/components/ui/Button'
import { Checkbox, Field, TextInput } from '@/components/ui/Form'
import { Icon } from '@/components/ui/Icon'
import { PrivacyConsentLabel, PrivacyConsentSummary } from './PrivacyConsent'
import { formatPhone } from '@/utils/format'

const schema = z.object({
  name: z.string().trim().min(2, '이름을 두 글자 이상 입력해 주세요.').max(20, '이름이 너무 깁니다.'),
  phone: z
    .string()
    .trim()
    .regex(/^01[016789]-\d{3,4}-\d{4}$/, '휴대폰 번호를 정확히 입력해 주세요. (예: 010-1234-5678)'),
  privacyAgreed: z.literal(true, { errorMap: () => ({ message: '개인정보 수집·이용에 동의해 주세요.' }) }),
})

type FormValues = z.infer<typeof schema>

/** 이름 + 연락처만 받는 10초 간편상담 폼 */
export function QuickConsultForm({ compact = false }: { compact?: boolean }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', privacyAgreed: false as unknown as true },
  })

  const mutation = useMutation({
    mutationFn: createConsult,
    onSuccess: () => reset(),
  })

  if (mutation.isSuccess) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-700">
          <Icon name="check" size={30} />
        </span>
        <h3 className="mt-4 text-xl">상담 신청이 접수되었습니다</h3>
        <p className="mt-2 text-ink-600">담당자가 확인 후 빠르게 연락드리겠습니다.</p>
        <Button variant="outline" className="mt-6" onClick={() => mutation.reset()}>
          다시 신청하기
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className={`rounded-2xl bg-white shadow-card ${compact ? 'p-6' : 'p-6 sm:p-8'}`}
      noValidate
    >
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl">10초 간편상담</h3>
        <p className="mt-1.5 text-ink-600">이름과 연락처만 남겨주시면 담당자가 전화드립니다.</p>
      </div>

      <div className="space-y-4">
        <Field label="어르신 또는 보호자 성함" htmlFor="quick-name" required error={errors.name?.message}>
          <TextInput
            id="quick-name"
            placeholder="홍길동"
            autoComplete="name"
            invalid={!!errors.name}
            {...register('name')}
          />
        </Field>

        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <Field label="연락처" htmlFor="quick-phone" required error={errors.phone?.message}>
              <TextInput
                id="quick-phone"
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

        <PrivacyConsentSummary purpose="상담 신청 확인 및 회신" />

        <div>
          <Checkbox id="quick-privacy" label={<PrivacyConsentLabel />} {...register('privacyAgreed')} />
          {errors.privacyAgreed && (
            <p className="text-sm font-bold text-red-600" role="alert">
              {errors.privacyAgreed.message}
            </p>
          )}
        </div>
      </div>

      {mutation.isError && (
        <p className="mt-4 text-sm font-bold text-red-600" role="alert">
          신청에 실패했습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요.
        </p>
      )}

      <Button type="submit" size="lg" fullWidth className="mt-6" disabled={mutation.isPending}>
        {mutation.isPending ? '신청 중…' : '무료 상담 신청하기'}
      </Button>
    </form>
  )
}
