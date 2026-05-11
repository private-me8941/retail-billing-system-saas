import { useState } from 'react'
import { Plus, Trash2, Tag } from 'lucide-react'
import { FormInput } from '../components/FormInput'
import EmptyState from '../components/EmptyState'
import type { Category } from '../types'
import { addCategory, deleteCategory } from '../services/api'

interface Props {
  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void
}

export default function CategoriesPage({ categories, setCategories, showToast }: Props) {
  const [form, setForm] = useState({ categoryName: '', description: '' })
  const [loading, setLoading] = useState(false)

  const handleAdd = () => {
    if (!form.categoryName.trim()) { showToast('Category name is required', 'error'); return }
    setLoading(true)

    addCategory(form)
      .then((res) => {
        setCategories((p) => [...p, res.data])
        setForm({ categoryName: '', description: '' })
        showToast('Category added successfully!')
      })
      .catch(() => showToast('Failed to add category', 'error'))
      .finally(() => setLoading(false))
  }

  const handleDelete = (id: number) => {
    deleteCategory(id)
      .then(() => {
        setCategories((p) => p.filter((c) => c.id !== id))
        showToast('Category deleted')
      })
      .catch(() => showToast('Failed to delete category', 'error'))
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Add form */}
      <div className="card animate-fade-up">
        <h3 className="section-title mb-1">Add New Category</h3>
        <p className="text-xs text-ink-400 mb-5">Create a product category to organize your inventory</p>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
          <FormInput
            label="Category Name"
            placeholder="e.g. Beverages"
            value={form.categoryName}
            onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
            required
          />
          <FormInput
            label="Description"
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button className="btn-primary whitespace-nowrap" onClick={handleAdd} disabled={loading}>
            <Plus size={15} />
            {loading ? 'Adding…' : 'Add Category'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card animate-fade-up">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="section-title">All Categories</h3>
            <p className="text-xs text-ink-400 mt-0.5">Manage your product categories</p>
          </div>
          <span className="badge badge-orange">{categories.length} total</span>
        </div>

        {categories.length === 0 ? (
          <EmptyState icon={Tag} title="No categories yet" description="Add your first category using the form above" />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-ink-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-ink-100">
                  <th className="th-cell">#</th>
                  <th className="th-cell">Category Name</th>
                  <th className="th-cell">Description</th>
                  <th className="th-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c, i) => (
                  <tr key={c.id} className="table-row">
                    <td className="td-cell text-ink-300 font-medium">{i + 1}</td>
                    <td className="td-cell">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                          <Tag size={13} className="text-brand-500" />
                        </div>
                        <span className="font-semibold text-ink-800">{c.categoryName}</span>
                      </div>
                    </td>
                    <td className="td-cell text-ink-400">{c.description || '—'}</td>
                    <td className="td-cell">
                      <button className="btn-danger" onClick={() => handleDelete(c.id)}>
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
    </div>
  )
}