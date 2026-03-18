import { useState, useCallback } from 'react'
import type { ToastItem } from '../types'

// ─────────────────────────────────────────────
// useToast — global toast notification hook
// ─────────────────────────────────────────────

interface UseToastReturn {
  toasts: ToastItem[]
  showToast: (msg: string, type?: ToastItem['type']) => void
}

const TOAST_DURATION = 3000

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback(
    (msg: string, type: ToastItem['type'] = 'success') => {
      const id = Date.now()
      setToasts((prev) => [...prev, { id, msg, type }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, TOAST_DURATION)
    },
    [],
  )

  return { toasts, showToast }
}
