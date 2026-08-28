import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { forwardRef } from 'react'

const controlBase =
  'w-full rounded-xl border-2 border-ink-200 bg-white px-4 py-3 text-lg text-ink-900 placeholder:text-ink-400 transition-colors focus:border-brand-500 disabled:bg-ink-100'

type FieldProps = {
  label: string
  htmlFor?: string
  required?: boolean
  error?: string
  hint?: ReactNode
  children: ReactNode
}

export function Field({ label, htmlFor, required, error, hint, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-base font-bold text-ink-800">
        {label}
        {required && <span className="ml-1 text-brand-600" aria-hidden="true">*</span>}
        {required && <span className="sr-only">(필수)</span>}
      </label>
      {children}
      {hint && !error && <p className="text-sm text-ink-500">{hint}</p>}
      {error && (
        <p className="text-sm font-bold text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(
  ({ className = '', invalid, ...rest }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={`${controlBase} ${invalid ? 'border-red-400' : ''} ${className}`}
      {...rest}
    />
  ),
)
TextInput.displayName = 'TextInput'

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }>(
  ({ className = '', invalid, rows = 5, ...rest }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={`${controlBase} resize-y ${invalid ? 'border-red-400' : ''} ${className}`}
      {...rest}
    />
  ),
)
TextArea.displayName = 'TextArea'

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }>(
  ({ className = '', invalid, children, ...rest }, ref) => (
    <select ref={ref} aria-invalid={invalid || undefined} className={`${controlBase} ${invalid ? 'border-red-400' : ''} ${className}`} {...rest}>
      {children}
    </select>
  ),
)
Select.displayName = 'Select'

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { label: ReactNode }>(
  ({ label, id, className = '', ...rest }, ref) => (
    <label htmlFor={id} className={`flex min-h-[44px] cursor-pointer items-start gap-3 ${className}`}>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="mt-1 h-6 w-6 shrink-0 cursor-pointer rounded border-2 border-ink-300 text-brand-600 focus:ring-brand-400"
        {...rest}
      />
      <span className="text-base leading-7 text-ink-700">{label}</span>
    </label>
  ),
)
Checkbox.displayName = 'Checkbox'
