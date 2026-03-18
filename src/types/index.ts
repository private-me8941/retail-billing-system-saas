// ─────────────────────────────────────────────
// Global TypeScript Types
// ─────────────────────────────────────────────

export type AuthView = 'login' | 'register' | 'forgot'
export type AppPage = 'dashboard' | 'categories' | 'items' | 'billing' | 'history'

export interface Category {
  id: number
  categoryName: string
  description: string
}

export interface Item {
  id: number
  itemName: string
  price: number
  quantity: number
  categoryName: string
  image: string
}

export interface BillItem {
  itemName: string
  qty: number
  price: number
}

export interface Bill {
  billId: number
  date: string
  totalAmount: number
  items: BillItem[]
}

export interface CartItem extends Item {
  qty: number
}

export interface ToastItem {
  id: number
  msg: string
  type: 'success' | 'error' | 'info'
}
