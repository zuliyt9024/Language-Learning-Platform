import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'language-learning-user'

const AuthContext = createContext(null)

function loadStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (_) {}
  return null
}

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(loadStoredUser)

  useEffect(() => {
    const onLogout = () => setUserState(null)
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const setUser = (u) => setUserState(u)

  const logout = () => {
    setUserState(null)
    localStorage.removeItem('token')
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = {
    user,
    setUser,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
