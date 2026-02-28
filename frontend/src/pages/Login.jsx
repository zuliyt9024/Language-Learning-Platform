import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Spinner } from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import api from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser } = useAuth()
  const { success, error: showError } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [sessionExpired, setSessionExpired] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSessionExpired(params.get('expired') === '1')
  }, [location.search])

  const validate = () => {
    const next = {}
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email'
    if (!form.password) next.password = 'Password is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setErrors({})
    try {
      const { data } = await api.post('/auth/login', form)
      if (data.success && data.data?.token) {
        localStorage.setItem('token', data.data.token)
        setUser(data.data.user)
        const redirectTo = location.state?.from?.pathname || '/dashboard'
        success(redirectTo === '/dashboard' ? 'Welcome back! Redirecting to your dashboard.' : 'Welcome back! Taking you where you left off.')
        navigate(redirectTo, { replace: true })
      } else {
        showError(data.message || 'Login failed. Please try again.')
      }
    } catch (err) {
      const msg = err.userMessage || err.response?.data?.message || err.response?.data?.error || 'Something went wrong. Please try again.'
      showError(msg)
      if (err.response?.data?.errors) setErrors(err.response.data.errors || {})
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[28rem] mx-auto py-10 px-4">
      <Card className="shadow-card border-2 border-border/80">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to continue your learning journey and pick up where you left off.
          </CardDescription>
          {sessionExpired && (
            <p className="text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400 rounded-md p-3 mt-2">
              Your session expired. Please sign in again.
            </p>
          )}
        </CardHeader>
        <CardContent className="pt-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-email" required>Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                error={errors.email}
                disabled={loading}
              />
              {errors.email && (
                <p id="input-error" className="text-sm text-destructive">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password" required>Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                error={errors.password}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
