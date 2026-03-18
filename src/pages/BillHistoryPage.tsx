import { useState } from 'react'
import { Eye, Search, ReceiptText, TrendingUp, BarChart3 } from 'lucide-react'
import Modal from '../components/Modal'
import EmptyState from '../components/EmptyState'
import StatCard from '../components/StatCard'
import { formatCurrency, getTax } from '../utils/helpers'
import type { Bill } from '../types'

function BillDetailModal({ bill, onClose }: { bill: Bill; onClose: () => void }) {
  const subtotal = bill.items.reduce((s, i) => s + i.price * i.qty, 0)
  const tax      = getTax(subtotal)

  return (
    <Modal title={`Bill #${bill.billId}`} onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-ink-400 font-medium">{bill.date}</p>
        <span className="badge badge-green">Paid</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-ink-100 mb-5">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-ink-100">
              <th className="th-cell">Item</th>
              <th className="th-cell text-center">Qty</th>
              <th className="th-cell text-right">Price</th>
              <th className="th-cell text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {bill.items.map((item, i) => (
              <tr key={i} className="table-row">
                <td className="td-cell font-medium text-ink-800">{item.itemName}</td>
                <td className="td-cell text-center text-ink-500">{item.qty}</td>
                <td className="td-cell text-right text-ink-500">{formatCurrency(item.price)}</td>
                <td className="td-cell text-right font-semibold text-ink-800">{formatCurrency(item.price * item.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-ink-50 border border-ink-100 rounded-xl p-4 flex flex-col gap-2.5">
        <div className="flex justify-between text-sm text-ink-500">
          <span>Subtotal</span><span className="text-ink-700 font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-ink-500">
          <span>GST (5%)</span><span className="text-ink-700 font-medium">{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between pt-2.5 border-t border-ink-200">
          <span className="font-display font-bold text-ink-900">Total</span>
          <span className="font-display font-bold text-lg text-brand-500">{formatCurrency(bill.totalAmount)}</span>
        </div>
      </div>
    </Modal>
  )
}

interface Props { bills: Bill[] }

export default function BillHistoryPage({ bills }: Props) {
  const [selected, setSelected] = useState<Bill | null>(null)
  const [search, setSearch]     = useState('')

  const filtered     = bills.filter((b) => String(b.billId).includes(search) || b.date.includes(search))
  const totalRevenue = bills.reduce((s, b) => s + b.totalAmount, 0)
  const avgBill      = bills.length ? Math.round(totalRevenue / bills.length) : 0

  return (
    <div className="flex flex-col gap-6">

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard icon={ReceiptText} label="Total Bills"    value={bills.length}              color="#f97316" bgColor="#fff7ed" />
        <StatCard icon={TrendingUp}  label="Total Revenue"  value={formatCurrency(totalRevenue)} color="#16a34a" bgColor="#f0fdf4" />
        <StatCard icon={BarChart3}   label="Avg Bill Size"  value={formatCurrency(avgBill)}    color="#2563eb" bgColor="#eff6ff" />
      </div>

      {/* Table */}
      <div className="card animate-fade-up">
        <div className="flex items-center gap-3 flex-wrap mb-5">
          <div className="flex-1">
            <h3 className="section-title">All Bills</h3>
            <p className="text-xs text-ink-400 mt-0.5">Complete billing history</p>
          </div>
          <div className="relative w-56">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
            <input className="form-input pl-8 !text-xs" placeholder="Search by ID or date…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={ReceiptText} title="No bills found" description="Generate your first bill from the Billing page" />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-ink-100">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-ink-100">
                  <th className="th-cell">Bill ID</th>
                  <th className="th-cell">Date</th>
                  <th className="th-cell">Items</th>
                  <th className="th-cell">Amount</th>
                  <th className="th-cell">Status</th>
                  <th className="th-cell">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.billId} className="table-row">
                    <td className="td-cell font-mono font-bold text-brand-600">#{b.billId}</td>
                    <td className="td-cell text-ink-500">{b.date}</td>
                    <td className="td-cell text-ink-500">{b.items.length} items</td>
                    <td className="td-cell font-semibold text-ink-800">{formatCurrency(b.totalAmount)}</td>
                    <td className="td-cell"><span className="badge badge-green">Paid</span></td>
                    <td className="td-cell">
                      <button
                        className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={() => setSelected(b)}
                      >
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && <BillDetailModal bill={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
