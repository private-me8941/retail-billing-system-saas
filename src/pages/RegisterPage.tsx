import { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { FormInput } from '../components/FormInput'
import ToastContainer from '../components/ToastContainer'
import { useToast } from '../hooks/useToast'
import type { AuthView } from '../types'

interface Props { onNavigate: (v: AuthView) => void }

export default function RegisterPage({ onNavigate }: Props) {
  const [form, setForm]     = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { toasts, showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { showToast('Please fill all fields', 'error'); return }
    setLoading(true)

    // ── SWAP: uncomment to use real API ──
    // try {
    //   await registerUser(form)
    //   showToast('Account created! Please login.')
    //   setTimeout(() => onNavigate('login'), 1500)
    // } catch {
    //   showToast('Registration failed', 'error')
    // } finally { setLoading(false) }

    setTimeout(() => {
      setLoading(false)
      showToast('Account created! Please login.')
      setTimeout(() => onNavigate('login'), 1500)
    }, 900)
  }

  return (
    <AuthLayout title="Create account" subtitle="Join RetailPOS to manage your store" bgImage="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=900&q=80">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput label="Full Name"      type="text"     placeholder="John Doe"        value={form.name}     onChange={(e) => setForm({ ...form, name: e.target.value })}     required />
        <FormInput label="Email address"  type="email"    placeholder="john@store.com"  value={form.email}    onChange={(e) => setForm({ ...form, email: e.target.value })}    required />
        <FormInput label="Password"       type="password" placeholder="••••••••"        value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />

        <button type="submit" className="btn-primary w-full !py-3 !text-[15px] mt-1" disabled={loading}>
          {loading ? 'Creating account…' : 'Create Account →'}
        </button>

        <p className="text-center text-sm text-ink-400">
          Already have an account?{' '}
          <button type="button" onClick={() => onNavigate('login')} className="text-brand-500 font-semibold bg-transparent border-0 cursor-pointer hover:text-brand-600">
            Login
          </button>
        </p>
      </form>
      <ToastContainer toasts={toasts} />
    </AuthLayout>
  )
}
