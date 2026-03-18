import type { ReactNode } from 'react'
import { ReceiptText } from 'lucide-react'

interface Props {
  children: ReactNode
  title: string
  subtitle: string
  bgImage: string
}

export default function AuthLayout({ children, title, subtitle, bgImage }: Props) {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left illustration */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center relative overflow-hidden bg-ink-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900/95 to-ink-800/80" />
        <div className="relative z-10 flex flex-col items-center text-center px-12 max-w-lg">
          <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center mb-8 shadow-brand">
            <ReceiptText size={30} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-4 leading-snug">
            RetailPOS
          </h1>
          <p className="text-ink-400 text-[15px] leading-relaxed">
            A complete Point-of-Sale & billing management system for modern retail stores.
          </p>
          <div className="mt-10 flex flex-wrap gap-2.5 justify-center">
            {['Smart Billing', 'Inventory Tracking', 'Analytics', 'Bill History'].map((f) => (
              <span key={f} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/15">
                {f}
              </span>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-3 gap-8 text-center w-full">
            {[['500+', 'Stores'], ['99.9%', 'Uptime'], ['24/7', 'Support']].map(([v, l]) => (
              <div key={l}>
                <p className="font-display font-bold text-2xl text-brand-400">{v}</p>
                <p className="text-xs text-ink-500 mt-1 font-medium">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-ink-50">
        <div className="w-full max-w-[420px] animate-fade-up">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 md:hidden">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
              <ReceiptText size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-ink-900">RetailPOS</span>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl p-8 shadow-card-lg border border-ink-100">
            <h2 className="font-display font-bold text-2xl text-ink-900 mb-1.5">{title}</h2>
            <p className="text-sm text-ink-400 font-medium mb-7">{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
