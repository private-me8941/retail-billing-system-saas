import { Menu, Bell, LogOut } from 'lucide-react'
import type { AppPage } from '../types'

const PAGE_TITLES: Record<AppPage, string> = {
  dashboard:  'Dashboard',
  categories: 'Categories',
  items:      'Items',
  billing:    'New Bill',
  history:    'Bill History',
}

interface Props {
  page: AppPage
  onMenuClick: () => void
  onLogout: () => void
}

export default function Navbar({ page, onMenuClick, onLogout }: Props) {
  return (
    <header className="sticky top-0 h-16 bg-white/90 backdrop-blur-md border-b border-ink-100 flex items-center px-5 gap-3 z-30 shadow-sm">
      <button className="btn-ghost !px-2.5 !py-2 md:hidden" onClick={onMenuClick}>
        <Menu size={18} />
      </button>

      <h1 className="page-title flex-1">{PAGE_TITLES[page]}</h1>

      <button className="btn-ghost !px-2.5 !py-2 relative">
        <Bell size={17} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 border-2 border-white" />
      </button>

      <button className="btn-ghost text-ink-500 text-xs" onClick={onLogout}>
        <LogOut size={15} />
        <span className="hidden sm:block">Logout</span>
      </button>
    </header>
  )
}
