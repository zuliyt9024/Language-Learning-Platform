import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'
import { getProgress } from '../services/progressService'
import { getGoals } from '../services/goalsService'

function getInitials(name, email) {
  if (name && typeof name === 'string') {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    if (parts[0]) return parts[0].slice(0, 2).toUpperCase()
  }
  if (email && typeof email === 'string') return email.slice(0, 2).toUpperCase()
  return '?'
}

export default function Profile() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [progress, goals] = await Promise.all([
          getProgress().catch(() => ({})),
          getGoals().catch(() => ({})),
        ])
        if (!cancelled) {
          setStats({
            completed: progress?.completedLessonIds?.length ?? 0,
            streak: goals?.streak ?? progress?.streak ?? 0,
            xp: progress?.xp ?? 0,
            minutesToday: goals?.minutesToday ?? 0,
            dailyGoal: goals?.dailyGoalMinutes ?? 10,
            badges: progress?.badges ?? [],
          })
        }
      } catch (_) {
        if (!cancelled) setStats({ completed: 0, streak: 0, xp: 0, minutesToday: 0, dailyGoal: 10, badges: [] })
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  if (!user) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <p className="text-muted-foreground mb-4">Please sign in to view your profile.</p>
        <Link to="/login"><Button>Sign in</Button></Link>
      </div>
    )
  }

  const displayName = user?.name || user?.email || 'Learner'
  const initials = getInitials(user?.name, user?.email)

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Profile header */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
        <div className="h-32 sm:h-40 bg-gradient-to-br from-primary via-primary to-violet-600" />
        <div className="relative px-6 sm:px-8 pb-8 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-card border-4 border-background shadow-lg flex items-center justify-center text-3xl sm:text-4xl font-bold text-primary shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">{displayName}</h1>
              {user?.email && (
                <p className="text-muted-foreground text-sm sm:text-base mt-0.5 truncate">{user.email}</p>
              )}
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/20">
                Language learner
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/15 to-primary/5 border-primary/20">
            <CardContent className="pt-5 pb-5">
              <p className="text-2xl font-bold text-primary">🔥 {stats?.streak ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Day streak</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">★ {stats?.xp ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Total XP</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-2xl font-bold">{stats?.completed ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Lessons done</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <p className="text-2xl font-bold">{stats?.minutesToday ?? 0}/{stats?.dailyGoal ?? 10}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Today (min)</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Badges - always show; empty state when none earned */}
      {!loading && (
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Achievements you've earned</CardDescription>
          </CardHeader>
          <CardContent>
            {(stats?.badges ?? []).length === 0 ? (
              <div className="text-center py-8 rounded-xl bg-muted/50 border border-dashed border-border">
                <p className="text-muted-foreground text-sm mb-2">No badges yet.</p>
                <p className="text-muted-foreground text-xs max-w-sm mx-auto">
                  Complete a lesson, pass a quiz, meet your daily goal, or review flashcards to earn badges.
                </p>
                <Link to="/lessons" className="inline-block mt-4">
                  <Button variant="outline" size="sm">Start learning</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(stats.badges ?? []).map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors"
                    title={b.description}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-lg" aria-hidden>
                      🏅
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{b.name}</p>
                      {b.description && (
                        <p className="text-xs text-muted-foreground truncate">{b.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
          <CardDescription>Jump back into learning</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-3">
          <Link to="/dashboard">
            <Button variant="outline" className="w-full justify-start">Dashboard</Button>
          </Link>
          <Link to="/progress">
            <Button variant="outline" className="w-full justify-start">Progress</Button>
          </Link>
          <Link to="/goals">
            <Button variant="outline" className="w-full justify-start">Daily goals</Button>
          </Link>
          <Link to="/lessons">
            <Button variant="outline" className="w-full justify-start">Lessons</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
