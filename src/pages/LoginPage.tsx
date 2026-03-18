import { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { FormInput } from '../components/FormInput'
import ToastContainer from '../components/ToastContainer'
import { useToast } from '../hooks/useToast'
import type { AuthView } from '../types'
import { loginUser } from '@/services/api'

interface Props {
  onLogin: () => void
  onNavigate: (v: AuthView) => void
}

export default function LoginPage({ onLogin, onNavigate }: Props) {
  const [form, setForm]     = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { toasts, showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) { showToast('Please fill all fields', 'error'); return }
    setLoading(true)

    // ── SWAP: uncomment to use real API ──
    try {
      const res = await loginUser(form)
      localStorage.setItem('token', res.data.token)
      onLogin()
    } catch {
      showToast('Invalid credentials', 'error')
    } finally {
      setLoading(false)
    }

    setTimeout(() => { setLoading(false); onLogin() }, 900)
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your RetailPOS account" bgImage="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput label="Email address" type="email" placeholder="admin@retail.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <FormInput label="Password" type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />

        <button type="submit" className="btn-primary w-full !py-3 !text-[15px] mt-1" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In →'}
        </button>

        <p className="text-center text-sm text-ink-400 mt-1">
          Don't have an account?{' '}
          <button type="button" onClick={() => onNavigate('register')} className="text-brand-500 font-semibold bg-transparent border-0 cursor-pointer hover:text-brand-600">
            Register
          </button>
        </p>
        <p className="text-center">
          <button type="button" onClick={() => onNavigate('forgot')} className="text-xs text-ink-300 bg-transparent border-0 cursor-pointer hover:text-ink-500 transition-colors">
            Forgot password?
          </button>
        </p>
      </form>
      <ToastContainer toasts={toasts} />
    </AuthLayout>
  )
}
