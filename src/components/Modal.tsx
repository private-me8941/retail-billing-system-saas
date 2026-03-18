import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
  title: string
  onClose: () => void
  children: ReactNode
  maxWidth?: string
}

export default function Modal({ title, onClose, children, maxWidth = '480px' }: Props) {
  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white border border-ink-100 rounded-3xl p-7 w-full animate-fade-up max-h-[90vh] overflow-y-auto shadow-card-lg"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-ink-50 border border-ink-200 text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition-colors cursor-pointer">
            <X size={15} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
