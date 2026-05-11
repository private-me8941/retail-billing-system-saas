import { useState } from 'react'
import { Plus, Search, Package, Trash2 } from 'lucide-react'
import { FormInput, FormSelect } from '../components/FormInput'
import EmptyState from '../components/EmptyState'
import { handleImgError, formatCurrency } from '../utils/helpers'
import { FALLBACK_IMAGE } from '../constants'
import type { Item, Category } from '../types'
import { addItem, deleteItem } from '../services/api'

interface Props {
  items: Item[]
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
  categories: Category[]
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void
}

type ViewMode = 'grid' | 'list'

export default function ItemsPage({ items, setItems, categories, showToast }: Props) {
  const [form, setForm] = useState({ itemName: '', price: '', quantity: '', categoryId: '' })
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState<ViewMode>('grid')
  const [search, setSearch] = useState('')

  const filtered = items.filter((i) =>
    i.itemName.toLowerCase().includes(search.toLowerCase()) ||
    i.categoryName.toLowerCase().includes(search.toLowerCase()),
  )

  const handleAdd = () => {
    if (!form.itemName.trim() || !form.price) { showToast('Item name and price are required', 'error'); return }
    setLoading(true)

    addItem({ ...form, price: +form.price, quantity: +form.quantity || 0 , categoryId: +form.categoryId })
      .then((res) => {
        setItems((p) => [...p, res.data])
        setForm({ itemName: '', price: '', quantity: '', categoryId: '' })
        showToast('Item added successfully!')
      })
      .catch(() => showToast('Failed to add item', 'error'))
      .finally(() => setLoading(false))
  }

  const handleDelete = (id: number) => {
    deleteItem(id)
      .then(() => {
        setItems((p) => p.filter((i) => i.id !== id))
        showToast('Item deleted')
      })
      .catch(() => showToast('Failed to delete item', 'error'))
  }

  // Categories are passed from App.tsx (already fetched after login)
  const categoryOptions = categories.map((c) => ({ value: String(c.id), label: c.categoryName }))

  return (
    <div className="flex flex-col gap-6">

      {/* Add form */}
      <div className="card animate-fade-up">
        <h3 className="section-title mb-1">Add New Item</h3>
        <p className="text-xs text-ink-400 mb-5">Add a product to your store inventory</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 items-end">
          <FormInput
            label="Item Name"
            placeholder="e.g. Coke"
            value={form.itemName}
            onChange={(e) => setForm({ ...form, itemName: e.target.value })}
            required
          />
          <FormInput
            label="Price (₹)"
            type="number"
            placeholder="40"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <FormInput
            label="Quantity"
            type="number"
            placeholder="50"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <FormSelect
            label="Category"
            options={categoryOptions}
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          />
          <button className="btn-primary w-full" onClick={handleAdd} disabled={loading}>
            <Plus size={15} />{loading ? 'Adding…' : 'Add Item'}
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            className="form-input pl-10"
            placeholder="Search items or categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 bg-white border border-ink-200 rounded-xl p-1">
          <button
            className={view === 'grid' ? 'btn-primary !px-3.5 !py-1.5 !text-xs !rounded-lg' : '!px-3.5 !py-1.5 text-xs text-ink-400 rounded-lg hover:text-ink-700 border-0 bg-transparent cursor-pointer font-medium'}
            onClick={() => setView('grid')}
          >⊞ Grid</button>
          <button
            className={view === 'list' ? 'btn-primary !px-3.5 !py-1.5 !text-xs !rounded-lg' : '!px-3.5 !py-1.5 text-xs text-ink-400 rounded-lg hover:text-ink-700 border-0 bg-transparent cursor-pointer font-medium'}
            onClick={() => setView('list')}
          >≡ List</button>
        </div>
        <span className="badge badge-blue">{filtered.length} items</span>
      </div>

      {/* Grid view */}
      {view === 'grid' && (
        filtered.length === 0 ? (
          <EmptyState icon={Package} title="No items found" description="Try a different search or add a new item" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((item) => (
              <div key={item.id} className="item-card animate-fade-up">
                <div className="relative h-[148px] overflow-hidden bg-ink-50">
                  <img
                    src={item.image ?? FALLBACK_IMAGE}
                    alt={item.itemName}
                    className="w-full h-full object-cover"
                    onError={handleImgError}
                  />
                  <div className="absolute top-2 right-2">
                    <span className="badge badge-green text-[10px]">In Stock</span>
                  </div>
                </div>
                <div className="p-3.5">
                  <p className="font-semibold text-sm text-ink-900 mb-1 truncate">{item.itemName}</p>
                  <p className="text-xs text-ink-400 mb-3">{item.categoryName || 'Uncategorized'} · Qty {item.quantity}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-display font-bold text-lg text-brand-500">{formatCurrency(item.price)}</p>
                    <button className="btn-danger !px-2 !py-1" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* List view */}
      {view === 'list' && (
        <div className="card animate-fade-up">
          {filtered.length === 0 ? (
            <EmptyState icon={Package} title="No items found" />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-ink-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-ink-100">
                    <th className="th-cell">Item</th>
                    <th className="th-cell">Category</th>
                    <th className="th-cell">Price</th>
                    <th className="th-cell">Quantity</th>
                    <th className="th-cell">Status</th>
                    <th className="th-cell">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} className="table-row">
                      <td className="td-cell">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.image ?? FALLBACK_IMAGE}
                            alt={item.itemName}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-ink-100"
                            onError={handleImgError}
                          />
                          <span className="font-semibold text-ink-800">{item.itemName}</span>
                        </div>
                      </td>
                      <td className="td-cell text-ink-500">{item.categoryName || '—'}</td>
                      <td className="td-cell font-semibold text-brand-500">{formatCurrency(item.price)}</td>
                      <td className="td-cell text-ink-500">{item.quantity}</td>
                      <td className="td-cell"><span className="badge badge-green">In Stock</span></td>
                      <td className="td-cell">
                        <button className="btn-danger" onClick={() => handleDelete(item.id)}>
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}