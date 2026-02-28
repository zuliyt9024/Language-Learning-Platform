import axios from "axios"

// ✅ Backend URL (Render production)
const PROD_API = "https://language-learning-platform-ikc9.onrender.com/api"

// ✅ In development use Vite proxy (/api)
// ✅ In production use Render backend
const API_BASE_URL = import.meta.env.DEV ? "/api" : PROD_API

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
})

// ✅ Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ✅ Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔐 Auto logout on 401
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("language-learning-user")
      window.dispatchEvent(new CustomEvent("auth:logout"))

      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login?expired=1"
      }
    }

    // 🌐 Friendly error messages
    if (error.code === "ECONNABORTED" || error.message === "Network Error") {
      error.userMessage =
        "We couldn't connect to the server. Please try again."
    } else {
      error.userMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again."
    }

    return Promise.reject(error)
  }
)

export default api