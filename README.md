# 🛒 RetailPOS — Billing System Frontend

A complete **React + TypeScript + Tailwind CSS** retail billing system.  
Built as a BCA final year project. Light theme, professional fonts, clean architecture.

---

api chat: https://chatgpt.com/share/69bafabd-9f28-8009-8b84-dfccd77de736

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure your API base URL
cp .env.example .env
# Edit .env → set VITE_API_BASE_URL=http://localhost:8080

# 3. Start dev server
npm run dev
```

Open **http://localhost:5173**  
Demo login: any email + any password

---

## 🔑 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Your Spring Boot backend URL | `http://localhost:8080` |

Create a `.env` file in the project root:
```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 📁 Project Structure

```
src/
├── App.tsx                      ← Root component (wires all pages)
├── main.tsx                     ← Entry point
├── index.css                    ← Tailwind + global styles
│
├── constants/
│   └── index.ts                 ← ⭐ ALL dummy data lives here
│
├── types/
│   └── index.ts                 ← TypeScript interfaces
│
├── hooks/
│   └── useToast.ts              ← Toast notification hook
│
├── utils/
│   └── helpers.ts               ← formatCurrency, tax, date utils
│
├── services/
│   └── api.ts                   ← Axios calls (commented, ready to activate)
│
├── components/
│   ├── AppLayout.tsx            ← Main shell (sidebar + navbar)
│   ├── AuthLayout.tsx           ← Split-screen auth wrapper
│   ├── Sidebar.tsx              ← Left navigation panel
│   ├── Navbar.tsx               ← Top header bar
│   ├── StatCard.tsx             ← Dashboard summary card
│   ├── Modal.tsx                ← Reusable modal overlay
│   ├── EmptyState.tsx           ← Empty list placeholder
│   ├── FormInput.tsx            ← FormInput + FormSelect
│   └── ToastContainer.tsx       ← Toast notifications
│
└── pages/
    ├── LoginPage.tsx
    ├── RegisterPage.tsx
    ├── ForgotPasswordPage.tsx
    ├── DashboardPage.tsx
    ├── CategoriesPage.tsx
    ├── ItemsPage.tsx            ← Grid + List view
    ├── BillingPage.tsx          ← POS-style cart interface
    └── BillHistoryPage.tsx      ← Bills table + detail modal
```

---

## 🔌 Connecting Your Spring Boot API

All API functions are pre-written in `src/services/api.ts` — just uncomment them.

**Step-by-step:**

1. Open `src/services/api.ts` → uncomment the entire axios block
2. In each page file, find the `// ── SWAP:` comment
3. Uncomment the API call lines below it
4. Delete the `setTimeout(...)` dummy block below those lines
5. Done — your real API is connected!

**Example (CategoriesPage.tsx):**
```ts
// Before (dummy):
setTimeout(() => { setCategories(...); }, 600)

// After (real API):
addCategory(form)
  .then((res) => setCategories((p) => [...p, res.data]))
  .catch(() => showToast('Failed', 'error'))
  .finally(() => setLoading(false))
```

---

## 🎨 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Styling |
| Vite | 5 | Build tool |
| Axios | 1.6 | HTTP client (pre-configured) |
| Lucide React | 0.363 | Icons |
| Plus Jakarta Sans | — | Body font |
| Playfair Display | — | Display / heading font |

---

## 📸 Pages

| Page | Description |
|------|-------------|
| Login | Email + password with split illustration panel |
| Register | New account creation |
| Forgot Password | Email + new password reset |
| Dashboard | Stats, recent bills, quick actions |
| Categories | Add/delete product categories |
| Items | Grid/list view, add products |
| Billing | POS-style cart → generate bill |
| Bill History | All bills + detail modal |
