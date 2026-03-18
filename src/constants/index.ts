import type { Category, Item, Bill } from '../types'

// ─────────────────────────────────────────────
// DUMMY DATA — constants.ts
// Replace these with real API responses later.
// ─────────────────────────────────────────────

export const DUMMY_CATEGORIES: Category[] = [
  { id: 1, categoryName: 'Beverages', description: 'Cold & hot drinks' },
  { id: 2, categoryName: 'Snacks',    description: 'Chips, nuts & bites' },
  { id: 3, categoryName: 'Dairy',     description: 'Milk, cheese & more' },
  { id: 4, categoryName: 'Bakery',    description: 'Fresh breads & cakes' },
]

export const DUMMY_ITEMS: Item[] = [
  {
    id: 1,
    itemName: 'Coke',
    price: 40,
    quantity: 50,
    categoryName: 'Beverages',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300&q=80',
  },
  {
    id: 2,
    itemName: 'Pepsi Can',
    price: 35,
    quantity: 40,
    categoryName: 'Beverages',
    image: 'https://images.unsplash.com/photo-1629203851122-3726555cf519?w=300&q=80',
  },
  {
    id: 3,
    itemName: 'Lays Chips',
    price: 20,
    quantity: 80,
    categoryName: 'Snacks',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80',
  },
  {
    id: 4,
    itemName: 'Oreo Pack',
    price: 30,
    quantity: 60,
    categoryName: 'Snacks',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80',
  },
  {
    id: 5,
    itemName: 'Milk Packet',
    price: 55,
    quantity: 30,
    categoryName: 'Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80',
  },
  {
    id: 6,
    itemName: 'Bread Loaf',
    price: 45,
    quantity: 25,
    categoryName: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80',
  },
]

export const DUMMY_BILLS: Bill[] = [
  {
    billId: 101,
    totalAmount: 150,
    date: '2026-03-18',
    items: [
      { itemName: 'Coke',       qty: 2, price: 40 },
      { itemName: 'Lays Chips', qty: 1, price: 20 },
      { itemName: 'Oreo Pack',  qty: 1, price: 30 },
    ],
  },
  {
    billId: 102,
    totalAmount: 225,
    date: '2026-03-17',
    items: [
      { itemName: 'Pepsi Can',  qty: 3, price: 35 },
      { itemName: 'Bread Loaf', qty: 2, price: 45 },
    ],
  },
  {
    billId: 103,
    totalAmount: 110,
    date: '2026-03-16',
    items: [
      { itemName: 'Milk Packet', qty: 2, price: 55 },
    ],
  },
  {
    billId: 104,
    totalAmount: 340,
    date: '2026-03-15',
    items: [
      { itemName: 'Coke',       qty: 4, price: 40 },
      { itemName: 'Oreo Pack',  qty: 2, price: 30 },
      { itemName: 'Lays Chips', qty: 3, price: 20 },
    ],
  },
  {
    billId: 105,
    totalAmount: 180,
    date: '2026-03-14',
    items: [
      { itemName: 'Bread Loaf',  qty: 2, price: 45 },
      { itemName: 'Milk Packet', qty: 1, price: 55 },
      { itemName: 'Pepsi Can',   qty: 1, price: 35 },
    ],
  },
]

// ─────────────────────────────────────────────
// APP CONSTANTS
// ─────────────────────────────────────────────

export const TAX_RATE = 0.05  // 5%

export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80'

export const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard',    icon: 'LayoutDashboard' },
  { id: 'categories', label: 'Categories',   icon: 'Tag' },
  { id: 'items',      label: 'Items',        icon: 'Package' },
  { id: 'billing',    label: 'Billing',      icon: 'ShoppingCart' },
  { id: 'history',    label: 'Bill History', icon: 'FileText' },
] as const
