import { success, error } from '../utils/response.js'

// In-memory store for demo (replace with Supabase when ready)
const users = new Map()

function findUserByEmail(email) {
  const lower = email.trim().toLowerCase()
  return [...users.values()].find((u) => u.email.toLowerCase() === lower)
}

export async function register(req, res) {
  const { name, email, password } = req.body
  const existing = findUserByEmail(email)
  if (existing) {
    return error(res, 'An account with this email already exists. Try signing in.', 409)
  }
  const user = {
    id: String(Date.now()),
    name: (name || '').trim(),
    email: (email || '').trim().toLowerCase(),
    createdAt: new Date().toISOString(),
  }
  users.set(user.id, user)
  const token = `demo-token-${user.id}`
  return success(res, { user, token }, 'Account created successfully.', 201)
}

export async function login(req, res) {
  const { email, password } = req.body
  const user = findUserByEmail(email)
  if (!user) {
    return error(res, 'No account found with this email. Check the address or sign up.', 401)
  }
  const token = `demo-token-${user.id}`
  return success(res, { user, token }, 'Welcome back.')
}
