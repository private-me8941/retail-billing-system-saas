import { Package, Tag, ReceiptText, BarChart3, ArrowRight, ShoppingCart } from 'lucide-react'
import StatCard from '../components/StatCard'
import type { Bill, Category, Item, AppPage } from '../types'
import { formatCurrency } from '../utils/helpers'

interface Props {
  bills: Bill[]
  items: Item[]
  categories: Category[]
  setPage: (p: AppPage) => void
}

export default function DashboardPage({ bills, items, categories, setPage }: Props) {
  const totalRevenue = bills.reduce((s, b) => s + b.totalAmount, 0)

  return (
    <div className="flex flex-col gap-6">

      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-ink-100 shadow-card" style={{ minHeight: 172 }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80)', opacity: 0.07 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fff 60%, #fef3c7 100%)' }} />
        <div className="relative p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <span className="inline-block text-xs font-bold text-brand-500 uppercase tracking-widest mb-3 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
              Welcome back, Admin
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 leading-tight mb-2">
              Today's Overview
            </h2>
            <p className="text-ink-500 text-sm max-w-md">
              {bills.length} bills generated. Store is running smoothly!
            </p>
          </div>
          <button className="btn-primary flex-shrink-0 !px-6" onClick={() => setPage('billing')}>
            <ShoppingCart size={15} />
            New Bill
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package}     label="Total Items"      value={items.length}           sub="Across all categories" color="#f97316" bgColor="#fff7ed" trend="+8%" />
        <StatCard icon={Tag}         label="Categories"       value={categories.length}       sub="Product categories"    color="#8b5cf6" bgColor="#f5f3ff" trend="+2%" />
        <StatCard icon={ReceiptText} label="Bills Generated"  value={bills.length}           sub="All time"              color="#16a34a" bgColor="#f0fdf4" trend="+15%" />
        <StatCard icon={BarChart3}   label="Total Revenue"    value={formatCurrency(totalRevenue)} sub="Cumulative"       color="#2563eb" bgColor="#eff6ff" trend="+21%" />
      </div>

      {/* Recent bills + Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-5 items-start">
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="section-title">Recent Bills</h3>
            <button className="btn-ghost !text-xs !px-3 !py-1.5" onClick={() => setPage('history')}>View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-ink-100">
                  <th className="th-cell rounded-tl-lg">Bill ID</th>
                  <th className="th-cell">Date</th>
                  <th className="th-cell">Amount</th>
                  <th className="th-cell rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {bills.slice(0, 5).map((b) => (
                  <tr key={b.billId} className="table-row">
                    <td className="td-cell font-mono font-semibold text-brand-600">#{b.billId}</td>
                    <td className="td-cell text-ink-500">{b.date}</td>
                    <td className="td-cell font-semibold text-ink-800">{formatCurrency(b.totalAmount)}</td>
                    <td className="td-cell"><span className="badge badge-green">Paid</span></td>
                  </tr>
                ))}
                {bills.length === 0 && (
                  <tr><td colSpan={4} className="td-cell text-center text-ink-300 py-8">No bills yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex flex-col gap-3">
          {([
            { label: 'Add Item',      page: 'items'      as AppPage, Icon: Package,      color: '#f97316', bg: '#fff7ed' },
            { label: 'Add Category',  page: 'categories' as AppPage, Icon: Tag,          color: '#8b5cf6', bg: '#f5f3ff' },
            { label: 'New Bill',      page: 'billing'    as AppPage, Icon: ShoppingCart, color: '#16a34a', bg: '#f0fdf4' },
          ]).map(({ label, page, Icon, color, bg }) => (
            <button
              key={label}
              onClick={() => setPage(page)}
              className="card-hover flex items-center gap-3 cursor-pointer text-left !p-4"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                <Icon size={16} style={{ color }} />
              </div>
              <span className="text-sm font-semibold text-ink-700">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
