import { useState, type ReactNode } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import type { AppPage } from '../types'

interface Props {
  page: AppPage
  setPage: (p: AppPage) => void
  onLogout: () => void
  children: ReactNode
}

export default function AppLayout({ page, setPage, onLogout, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar page={page} setPage={setPage} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 md:ml-[248px]">
        <Navbar page={page} onMenuClick={() => setSidebarOpen(true)} onLogout={onLogout} />
        <main className="flex-1 p-5 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
