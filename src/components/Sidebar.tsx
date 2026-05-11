import { LayoutDashboard, Tag, Package, ShoppingCart, FileText, ChevronRight, ReceiptText, X } from 'lucide-react'
import type { AppPage } from '../types'

const NAV_ITEMS = [
  { id: 'dashboard'  as AppPage, label: 'Dashboard',    Icon: LayoutDashboard },
  { id: 'categories' as AppPage, label: 'Categories',   Icon: Tag },
  { id: 'items'      as AppPage, label: 'Items',        Icon: Package },
  { id: 'billing'    as AppPage, label: 'Billing',      Icon: ShoppingCart },
  { id: 'history'    as AppPage, label: 'Bill History', Icon: FileText },
]

interface Props {
  page: AppPage
  setPage: (p: AppPage) => void
  open: boolean
  onClose: () => void
}

export default function Sidebar({ page, setPage, open, onClose }: Props) {
  const handleNav = (id: AppPage) => { setPage(id); onClose() }

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm" onClick={onClose} />}

      <aside className={`
        fixed top-0 left-0 h-screen w-[248px] z-50 flex flex-col
        bg-white border-r border-ink-100 shadow-card-md
        transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-ink-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-brand">
              <ReceiptText size={18} className="text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-[15px] text-ink-900 leading-none">RetailPOS</p>
              <p className="text-[10px] text-ink-400 mt-0.5 font-medium tracking-wide">BILLING SYSTEM</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-ink-400 hover:text-ink-700 p-1 rounded-lg hover:bg-ink-50">
            <X size={17} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto flex flex-col gap-0.5">
          <p className="text-[10px] font-bold text-ink-300 uppercase tracking-[0.12em] px-2 pb-3">
            Main Menu
          </p>
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => handleNav(id)} className={`nav-item ${page === id ? 'active' : ''}`}>
              <Icon size={16} />
              <span>{label}</span>
              {page === id && <ChevronRight size={13} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-ink-100">
          <div className="flex items-center gap-2.5 bg-ink-50 rounded-xl px-3 py-2.5 border border-ink-100">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              A
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink-800 truncate">Admin </p>
              <p className="text-[11px] text-ink-400 truncate">admin@retail.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
