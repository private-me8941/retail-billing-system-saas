import { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { FormInput } from '../components/FormInput'
import ToastContainer from '../components/ToastContainer'
import { useToast } from '../hooks/useToast'
import type { AuthView } from '../types'

interface Props { onNavigate: (v: AuthView) => void }

export default function ForgotPasswordPage({ onNavigate }: Props) {
  const [form, setForm]     = useState({ email: '', newPassword: '' })
  const [loading, setLoading] = useState(false)
  const { toasts, showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.newPassword) { showToast('Please fill all fields', 'error'); return }
    setLoading(true)

    // ── SWAP: uncomment to use real API ──
    // try {
    //   await forgotPassword(form)
    //   showToast('Password updated!')
    //   setTimeout(() => onNavigate('login'), 1500)
    // } catch { showToast('Update failed', 'error') }
    // finally { setLoading(false) }

    setTimeout(() => {
      setLoading(false)
      showToast('Password updated successfully!')
      setTimeout(() => onNavigate('login'), 1500)
    }, 900)
  }

  return (
    <AuthLayout title="Reset password" subtitle="Enter your email and choose a new password" bgImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput label="Registered Email" type="email"    placeholder="admin@retail.com" value={form.email}       onChange={(e) => setForm({ ...form, email: e.target.value })}       required />
        <FormInput label="New Password"     type="password" placeholder="••••••••"         value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} required />

        <button type="submit" className="btn-primary w-full !py-3 !text-[15px] mt-1" disabled={loading}>
          {loading ? 'Updating…' : 'Update Password →'}
        </button>

        <p className="text-center">
          <button type="button" onClick={() => onNavigate('login')} className="text-xs text-ink-400 bg-transparent border-0 cursor-pointer hover:text-ink-600 transition-colors">
            ← Back to Login
          </button>
        </p>
      </form>
      <ToastContainer toasts={toasts} />
    </AuthLayout>
  )
}
