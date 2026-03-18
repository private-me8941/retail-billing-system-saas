import { CheckCircle, AlertCircle, Info } from 'lucide-react'
import type { ToastItem } from '../types'

interface Props { toasts: ToastItem[] }

const CONFIG: Record<ToastItem['type'], { cls: string; Icon: typeof CheckCircle }> = {
  success: { cls: 'bg-white border-green-200 text-green-700 shadow-lg shadow-green-100', Icon: CheckCircle },
  error:   { cls: 'bg-white border-red-200   text-red-600   shadow-lg shadow-red-100',   Icon: AlertCircle },
  info:    { cls: 'bg-white border-blue-200  text-blue-700  shadow-lg shadow-blue-100',  Icon: Info },
}

export default function ToastContainer({ toasts }: Props) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((t) => {
        const { cls, Icon } = CONFIG[t.type]
        return (
          <div key={t.id} className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-semibold min-w-[260px] animate-slide-in pointer-events-auto ${cls}`}>
            <Icon size={16} />
            {t.msg}
          </div>
        )
      })}
    </div>
  )
}
