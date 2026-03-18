import { useState } from 'react'
import { Plus, Minus, Trash2, Search, ShoppingCart, ReceiptText, Package } from 'lucide-react'
import EmptyState from '../components/EmptyState'
import { handleImgError, formatCurrency, applyTax, getTax, today, generateId } from '../utils/helpers'
import type { Item, Bill, CartItem } from '../types'

interface Props {
  items: Item[]
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void
}

export default function BillingPage({ items, setBills, showToast }: Props) {
  const [cart, setCart]     = useState<CartItem[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const filtered = items.filter((i) => i.itemName.toLowerCase().includes(search.toLowerCase()))
  const subtotal  = cart.reduce((s, c) => s + c.price * c.qty, 0)
  const tax       = getTax(subtotal)
  const total     = applyTax(subtotal)

  const addToCart = (item: Item) => {
    setCart((p) => {
      const ex = p.find((c) => c.id === item.id)
      if (ex) return p.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...p, { ...item, qty: 1 }]
    })
  }

  const updateQty = (id: number, delta: number) =>
    setCart((p) => p.map((c) => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c))

  const removeFromCart = (id: number) => setCart((p) => p.filter((c) => c.id !== id))

  const generateBill = () => {
    if (cart.length === 0) { showToast('Cart is empty', 'error'); return }
    setLoading(true)

    const newBill: Bill = {
      billId: generateId() % 9000 + 1000,
      date: today(),
      totalAmount: total,
      items: cart.map((c) => ({ itemName: c.itemName, qty: c.qty, price: c.price })),
    }

    // ── SWAP: uncomment to use real API ──
    // createBill({ items: newBill.items, totalAmount: newBill.totalAmount })
    //   .then((res) => { setBills((p) => [res.data, ...p]); setCart([]); showToast(`Bill #${res.data.billId} generated!`) })
    //   .catch(() => showToast('Failed to generate bill', 'error'))
    //   .finally(() => setLoading(false))

    setTimeout(() => {
      setBills((p) => [newBill, ...p])
      setCart([])
      setLoading(false)
      showToast(`Bill #${newBill.billId} generated! ${formatCurrency(total)}`)
    }, 800)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5" style={{ height: 'calc(100vh - 112px)', minHeight: 520 }}>

      {/* LEFT — Products */}
      <div className="flex flex-col gap-3 overflow-hidden">
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
          <input className="form-input pl-10" placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Product grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 content-start pr-1">
          {filtered.length === 0 ? (
            <div className="col-span-full">
              <EmptyState icon={Package} title="No products found" />
            </div>
          ) : (
            filtered.map((item) => (
              <div key={item.id} className="item-card group" onClick={() => addToCart(item)}>
                <div className="h-[112px] overflow-hidden bg-ink-50">
                  <img src={item.image} alt={item.itemName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={handleImgError} />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm text-ink-900 truncate mb-2">{item.itemName}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-brand-500 text-base">{formatCurrency(item.price)}</span>
                    <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center shadow-brand flex-shrink-0">
                      <Plus size={13} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT — Cart */}
      <div className="card flex flex-col overflow-hidden">
        {/* Cart header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-ink-100">
          <h3 className="section-title flex items-center gap-2">
            <ShoppingCart size={16} className="text-brand-500" />
            Cart
            {cart.length > 0 && <span className="badge badge-orange text-[11px] ml-1">{cart.length}</span>}
          </h3>
          {cart.length > 0 && (
            <button className="text-xs text-red-500 font-semibold bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-red-100 transition-colors" onClick={() => setCart([])}>
              Clear all
            </button>
          )}
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-2">
          {cart.length === 0 ? (
            <EmptyState icon={ShoppingCart} title="Cart is empty" description="Click any product to add it" />
          ) : (
            cart.map((c) => (
              <div key={c.id} className="flex items-center gap-2.5 bg-ink-50 rounded-xl p-2.5 border border-ink-100">
                <img src={c.image} alt={c.itemName} className="w-11 h-11 rounded-lg object-cover flex-shrink-0 border border-ink-100" onError={handleImgError} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-ink-800 truncate">{c.itemName}</p>
                  <p className="text-xs text-brand-500 font-bold mt-0.5">{formatCurrency(c.price)} × {c.qty}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button className="w-6 h-6 rounded-md bg-white border border-ink-200 flex items-center justify-center cursor-pointer hover:bg-ink-100 transition-colors" onClick={() => updateQty(c.id, -1)}>
                    <Minus size={10} className="text-ink-500" />
                  </button>
                  <span className="text-xs font-bold text-ink-800 w-5 text-center">{c.qty}</span>
                  <button className="w-6 h-6 rounded-md bg-white border border-ink-200 flex items-center justify-center cursor-pointer hover:bg-ink-100 transition-colors" onClick={() => updateQty(c.id, 1)}>
                    <Plus size={10} className="text-ink-500" />
                  </button>
                  <button className="w-6 h-6 rounded-md bg-red-50 border border-red-100 flex items-center justify-center cursor-pointer hover:bg-red-100 transition-colors ml-0.5" onClick={() => removeFromCart(c.id)}>
                    <Trash2 size={10} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bill summary */}
        <div className="border-t border-ink-100 pt-4 mt-3">
          <div className="bg-ink-50 rounded-xl p-3.5 mb-4 flex flex-col gap-2 border border-ink-100">
            <div className="flex justify-between text-sm text-ink-500">
              <span>Subtotal</span><span className="font-medium text-ink-700">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-ink-500">
              <span>GST (5%)</span><span className="font-medium text-ink-700">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-ink-200">
              <span className="font-display font-bold text-ink-900">Total</span>
              <span className="font-display font-bold text-xl text-brand-500">{formatCurrency(total)}</span>
            </div>
          </div>
          <button
            className="btn-primary w-full !py-3 text-base"
            onClick={generateBill}
            disabled={loading || cart.length === 0}
            style={{ opacity: cart.length === 0 ? 0.5 : 1 }}
          >
            <ReceiptText size={17} />
            {loading ? 'Generating…' : 'Generate Bill'}
          </button>
        </div>
      </div>
    </div>
  )
}
