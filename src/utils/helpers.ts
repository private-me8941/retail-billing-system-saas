import { FALLBACK_IMAGE as FB, TAX_RATE } from '../constants'

// ─────────────────────────────────────────────
// utils/helpers.ts
// ─────────────────────────────────────────────

/** Re-export for convenience */
export const FALLBACK_IMAGE = FB

/** Format a number as Indian Rupee currency string */
export const formatCurrency = (amount: number): string =>
  `₹${amount.toLocaleString('en-IN')}`

/** Apply tax and return the total */
export const applyTax = (subtotal: number): number =>
  Math.round(subtotal * (1 + TAX_RATE))

/** Compute only the tax amount */
export const getTax = (subtotal: number): number =>
  Math.round(subtotal * TAX_RATE)

/** Handle broken image URLs gracefully */
export const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = FB
}

/** Generate a unique ID (for dummy data creation) */
export const generateId = (): number =>
  Date.now() + Math.floor(Math.random() * 1000)

/** Get today's date as YYYY-MM-DD */
export const today = (): string =>
  new Date().toISOString().split('T')[0]

/** Capitalize first letter */
export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1)
