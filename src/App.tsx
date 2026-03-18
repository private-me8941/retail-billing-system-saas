import { useState } from 'react'

// Layout
import AppLayout from './components/AppLayout'
import ToastContainer from './components/ToastContainer'

// Auth pages
import LoginPage          from './pages/LoginPage'
import RegisterPage       from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

// App pages
import DashboardPage    from './pages/DashboardPage'
import CategoriesPage   from './pages/CategoriesPage'
import ItemsPage        from './pages/ItemsPage'
import BillingPage      from './pages/BillingPage'
import BillHistoryPage  from './pages/BillHistoryPage'

// Hooks, types, constants
import { useToast }          from './hooks/useToast'
import { DUMMY_CATEGORIES, DUMMY_ITEMS, DUMMY_BILLS } from './constants'
import type { AuthView, AppPage, Category, Item, Bill } from './types'

// ─────────────────────────────────────────────
// App — root component
// ─────────────────────────────────────────────

export default function App() {
  // ── Auth state ──
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authView, setAuthView]     = useState<AuthView>('login')

  // ── Navigation ──
  const [page, setPage] = useState<AppPage>('dashboard')

  // ── Data state (swap with API calls later) ──
  const [categories, setCategories] = useState<Category[]>(DUMMY_CATEGORIES)
  const [items, setItems]           = useState<Item[]>(DUMMY_ITEMS)
  const [bills, setBills]           = useState<Bill[]>(DUMMY_BILLS)

  // ── Global toast ──
  const { toasts, showToast } = useToast()

  const handleLogout = () => {
    setIsLoggedIn(false)
    setAuthView('login')
    setPage('dashboard')
  }

  // ── Auth screens ──
  if (!isLoggedIn) {
    return (
      <>
        {authView === 'login'    && <LoginPage          onLogin={() => setIsLoggedIn(true)} onNavigate={setAuthView} />}
        {authView === 'register' && <RegisterPage       onNavigate={setAuthView} />}
        {authView === 'forgot'   && <ForgotPasswordPage onNavigate={setAuthView} />}
        <ToastContainer toasts={toasts} />
      </>
    )
  }

  // ── Main app ──
  return (
    <AppLayout page={page} setPage={setPage} onLogout={handleLogout}>
      {page === 'dashboard'  && (
        <DashboardPage
          bills={bills}
          items={items}
          categories={categories}
          setPage={setPage}
        />
      )}
      {page === 'categories' && (
        <CategoriesPage
          categories={categories}
          setCategories={setCategories}
          showToast={showToast}
        />
      )}
      {page === 'items' && (
        <ItemsPage
          items={items}
          setItems={setItems}
          categories={categories}
          showToast={showToast}
        />
      )}
      {page === 'billing' && (
        <BillingPage
          items={items}
          setBills={setBills}
          showToast={showToast}
        />
      )}
      {page === 'history' && (
        <BillHistoryPage bills={bills} />
      )}

      <ToastContainer toasts={toasts} />
    </AppLayout>
  )
}
