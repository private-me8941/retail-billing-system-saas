import type { LucideIcon } from 'lucide-react'

interface Props {
  icon: LucideIcon
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export default function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-ink-50 border border-ink-200 flex items-center justify-center">
        <Icon size={28} className="text-ink-300" />
      </div>
      <div>
        <p className="text-ink-500 font-semibold text-sm">{title}</p>
        {description && <p className="text-ink-300 text-xs mt-1">{description}</p>}
      </div>
      {action && (
        <button className="btn-primary text-xs !px-4 !py-2" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  )
}
