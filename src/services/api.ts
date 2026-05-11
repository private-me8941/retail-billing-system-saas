// ─────────────────────────────────────────────
// services/api.ts
//
// Base URL is read from .env → VITE_API_BASE_URL
// All API functions are COMMENTED OUT by default.
//
// HOW TO ACTIVATE:
//   1. Set VITE_API_BASE_URL in your .env file
//   2. Uncomment the axios block below
//   3. In each page, find // ── SWAP: and follow it
// ─────────────────────────────────────────────

import axios from "axios"

// import axios from 'axios'
//
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Auto-attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  // ❌ Skip token for public routes
  const publicRoutes = ['/register', '/login']

  if (token && !publicRoutes.some(route => config.url?.includes(route))) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})//
// ── AUTH ──────────────────────────────────────
//
export const registerUser = async (data: {
  name: string; email: string; password: string
}) => API.post('/register', data)

export const loginUser = async (data: {
  email: string; password: string
}) => API.post('/login', data)
//
// export const forgotPassword = async (data: {
//   email: string; newPassword: string
// }) => API.post('/auth/forgot-password', data)
//
// ── CATEGORIES ────────────────────────────────
//
export const getCategories = async () =>
  API.get('/categories')

export const addCategory = async (data: {
   categoryName: string; description: string
 }) => API.post('/admin/category', data)

export const deleteCategory = async (id: number) =>
  API.delete(`/admin/category/${id}`)

// ── ITEMS ─────────────────────────────────────
//
export const getItems = async () =>
  API.get('/items')

export const addItem = async (data: {
  itemName: string; price: number; quantity: number; categoryId: number
}) => API.post('/admin/item', data)

export const deleteItem = async (id: number) =>
  API.delete(`/admin/item/${id}`)
//
// ── BILLS ─────────────────────────────────────
//
export const createBill = async (data: {
  items: { itemName: string; qty: number; price: number }[]
  // totalAmount: number
}) => API.post('/bill', data)

export const getBills = async () =>
  API.get('/bills')

export const getBillById = async (id: number) =>
  API.get(`/bills/${id}`)

export {} // keep module valid until uncommented
