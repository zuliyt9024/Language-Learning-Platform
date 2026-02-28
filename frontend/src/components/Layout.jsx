import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/Button'
import { useAuth } from '../context/AuthContext'
import { cn } from '../utils/cn'

export default function Layout({ children }) {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/98 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-[4.25rem] flex items-center justify-between max-w-6xl">
          <Link
            to="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors tracking-tight"
          >
            Language Learning
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            <Link to="/"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Home</Button></Link>
            <Link to="/lessons"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Lessons</Button></Link>
            <Link to="/flashcards"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Flashcards</Button></Link>
            <Link to="/scenarios"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Scenarios</Button></Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Dashboard</Button></Link>
                <Link to="/progress"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Progress</Button></Link>
                <Link to="/goals"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Goals</Button></Link>
                <Link to="/profile" className="text-sm text-muted-foreground pl-3 ml-1 border-l border-border truncate max-w-[120px] hover:text-foreground transition-colors" title={user?.email}>
                  {user?.name || user?.email}
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="ml-2">Log out</Button>
              </>
            ) : (
              <>
                <Link to="/login"><Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Sign in</Button></Link>
                <Link to="/signup"><Button size="sm" className="rounded-full px-5">Get started</Button></Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2.5 rounded-lg hover:bg-muted transition-colors"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">{mobileOpen ? 'Close' : 'Menu'}</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div
            className={cn(
              'md:hidden border-t bg-card px-4 py-3 flex flex-col gap-1 animate-toast-in'
            )}
          >
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Home</Button>
            </Link>
            <Link to="/lessons" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Lessons</Button>
            </Link>
            <Link to="/flashcards" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Flashcards</Button>
            </Link>
            <Link to="/scenarios" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Scenarios</Button>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                </Link>
                <Link to="/progress" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Progress</Button>
                </Link>
                <Link to="/goals" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Goals</Button>
                </Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Profile</Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Sign in</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full justify-start">Get started</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      <main id="main-content" className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-10 max-w-6xl" tabIndex={-1}>
        {children}
      </main>

      <footer className="border-t border-border bg-slate-50 dark:bg-slate-900/50 mt-auto" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Main footer grid */}
          <div className="py-12 sm:py-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Brand column - spans more on mobile */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-2">
              <Link to="/" className="inline-block">
                <span className="text-xl font-bold text-primary tracking-tight">Language Learning</span>
              </Link>
              <p className="text-sm text-muted-foreground mt-3 max-w-sm leading-relaxed">
                Free lessons, quizzes, and flashcards. Learn at your own pace and build a daily habit.
              </p>
            </div>
            {/* Product */}
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/lessons" className="text-muted-foreground hover:text-primary transition-colors">Lessons</Link></li>
                <li><Link to="/flashcards" className="text-muted-foreground hover:text-primary transition-colors">Flashcards</Link></li>
                <li><Link to="/progress" className="text-muted-foreground hover:text-primary transition-colors">Progress</Link></li>
                <li><Link to="/goals" className="text-muted-foreground hover:text-primary transition-colors">Daily Goals</Link></li>
              </ul>
            </div>
            {/* Company */}
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">Sign in</Link></li>
                <li><Link to="/signup" className="text-muted-foreground hover:text-primary transition-colors">Get started</Link></li>
              </ul>
            </div>
            {/* Legal / Support */}
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          {/* Bottom bar */}
          <div className="py-5 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Language Learning Platform. All rights reserved.</p>
            <p className="sm:order-last">Made for learners everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
