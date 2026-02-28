import axios from 'axios'

// In dev, use relative /api so Vite proxy forwards to backend; otherwise use env or default
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'http://localhost:3000/api')

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('language-learning-user')
      window.dispatchEvent(new CustomEvent('auth:logout'))
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login?expired=1'
      }
      return Promise.reject(err)
    }
    const message = err.response?.data?.message || err.response?.data?.error
    if (message && typeof message === 'string') {
      err.userMessage = message
    } else if (err.code === 'ECONNABORTED' || err.message === 'Network Error') {
      err.userMessage = "We couldn't connect. Please check your internet and try again."
    } else {
      err.userMessage = 'Something went wrong. Please try again.'
    }
    return Promise.reject(err)
  }
)

export default api
