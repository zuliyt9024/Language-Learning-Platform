import { error } from '../utils/response.js'

export function optionalAuth(req, res, next) {
  const auth = req.headers.authorization
  if (auth?.startsWith('Bearer ')) {
    const token = auth.slice(7)
    const match = token.match(/^demo-token-(.+)$/)
    if (match) req.userId = match[1]
  }
  next()
}

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) {
    return error(res, 'Please sign in to continue.', 401)
  }
  const token = auth.slice(7)
  const match = token.match(/^demo-token-(.+)$/)
  if (!match) {
    return error(res, 'Invalid session. Please sign in again.', 401)
  }
  req.userId = match[1]
  next()
}
