import type { LucideIcon } from 'lucide-react'

interface Props {
  icon: LucideIcon
  label: string
  value: string | number
  sub?: string
  color: string
  bgColor: string
  trend?: string
}

export default function StatCard({ icon: Icon, label, value, sub, color, bgColor, trend }: Props) {
  return (
    <div className="card-hover animate-fade-up">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: bgColor }}>
          <Icon size={20} style={{ color }} />
        </div>
        {trend && (
          <span className="badge badge-green text-[11px]">{trend}</span>
        )}
      </div>
      <p className="font-display font-bold text-3xl text-ink-900 leading-none mb-1.5">{value}</p>
      <p className="text-sm text-ink-500 font-medium">{label}</p>
      {sub && <p className="text-xs text-ink-300 mt-1">{sub}</p>}
    </div>
  )
}
