import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  required?: boolean
}

export function FormInput({ label, required, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="form-label">
        {label} {required && <span className="text-brand-500">*</span>}
      </label>
      <input className="form-input" {...props} />
    </div>
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export function FormSelect({ label, options, placeholder = 'Select…', ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="form-label">{label}</label>
      <select className="form-input" {...props}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
