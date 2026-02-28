import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { Image, ImageBox } from '../components/ui/Image'
import { useAuth } from '../context/AuthContext'
import { getProgress } from '../services/progressService'
import { getGoals } from '../services/goalsService'
import { IMAGES } from '../utils/constants'

export default function Dashboard() {
  const { user } = useAuth()
  const displayName = user?.name || user?.email || 'there'
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const defaults = {
      completed: 0,
      streak: 0,
      minutesToday: 0,
      dailyGoal: 10,
    }
    async function load() {
      try {
        const [progress, goals] = await Promise.all([
          getProgress().catch(() => ({ completedLessonIds: [], streak: 0, quizScores: {}, xp: 0, badges: [], milestones: [] })),
          getGoals().catch(() => ({ streak: 0, minutesToday: 0, dailyGoalMinutes: 10 })),
        ])
        if (!cancelled) {
          setStats({
            completed: progress?.completedLessonIds?.length ?? 0,
            streak: goals?.streak ?? progress?.streak ?? 0,
            minutesToday: goals?.minutesToday ?? 0,
            dailyGoal: goals?.dailyGoalMinutes ?? 10,
            xp: progress?.xp ?? 0,
            badges: progress?.badges ?? [],
            milestones: progress?.milestones ?? [],
          })
        }
      } catch (_) {
        if (!cancelled) setStats(defaults)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const progressPct = stats?.dailyGoal
    ? Math.min(100, Math.round((stats.minutesToday / stats.dailyGoal) * 100))
    : 0

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section>
        <h1 className="section-title text-2xl">Hi, {displayName}</h1>
        <p className="section-subtitle">
          Here's your learning overview. Pick an activity below to continue.
        </p>
      </section>

      {loading ? (
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/15 to-primary/5 border-primary/20 shadow-lg shadow-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">🔥 {stats?.streak ?? 0}</p>
              <p className="text-xs text-muted-foreground">days in a row</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Lessons done</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats?.completed ?? 0}</p>
              <p className="text-xs text-muted-foreground">completed</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-500/15 to-amber-600/5 border-amber-500/20 shadow-lg shadow-amber-500/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">XP</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">★ {stats?.xp ?? 0}</p>
              <p className="text-xs text-muted-foreground">earn more by practicing</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats?.minutesToday ?? 0} min</p>
              <p className="text-xs text-muted-foreground">of {stats?.dailyGoal ?? 10} min goal</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Goal progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{progressPct}%</p>
            </CardContent>
          </Card>
        </div>
      )}

      {!loading && stats && stats.completed === 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle>Get started</CardTitle>
            <CardDescription>
              Complete your first lesson and quiz to start building your streak and see your progress here.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Link to="/lessons">
              <Button className="w-full sm:w-auto">Start your first lesson</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/lessons">
          <Card className="h-full overflow-hidden card-hover group">
            <ImageBox aspectRatio="16/10" className="img-card-group rounded-t-xl">
              <Image src={IMAGES.lessons} alt="Browse lessons and quizzes" className="img-card rounded-t-xl" />
            </ImageBox>
            <CardHeader>
              <CardTitle className="text-lg">Lessons & quizzes</CardTitle>
              <CardDescription>Vocabulary, grammar, and more</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="outline" className="w-full">Browse lessons</Button>
            </CardContent>
          </Card>
        </Link>
        <Link to="/goals">
          <Card className="h-full overflow-hidden card-hover group">
            <ImageBox aspectRatio="16/10" className="img-card-group rounded-t-xl">
              <Image src={IMAGES.goals} alt="Set daily goals and streaks" className="img-card rounded-t-xl" />
            </ImageBox>
            <CardHeader>
              <CardTitle className="text-lg">Daily goal & streak</CardTitle>
              <CardDescription>Set your goal and track your streak</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="outline" className="w-full">Set daily goal</Button>
            </CardContent>
          </Card>
        </Link>
        <Link to="/progress">
          <Card className="h-full overflow-hidden card-hover group">
            <ImageBox aspectRatio="16/10" className="img-card-group rounded-t-xl">
              <Image src={IMAGES.progress} alt="View your learning progress" className="img-card rounded-t-xl" />
            </ImageBox>
            <CardHeader>
              <CardTitle className="text-lg">Your progress</CardTitle>
              <CardDescription>Streaks, milestones, and stats</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="outline" className="w-full">View progress</Button>
            </CardContent>
          </Card>
        </Link>
        <Link to="/scenarios">
          <Card className="h-full overflow-hidden card-hover group">
            <ImageBox aspectRatio="16/10" className="img-card-group rounded-t-xl">
              <Image src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80" alt="Conversation scenarios" className="img-card rounded-t-xl" />
            </ImageBox>
            <CardHeader>
              <CardTitle className="text-lg">Scenarios</CardTitle>
              <CardDescription>Real-world dialogues: restaurant, travel, meetings</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="outline" className="w-full">Practice scenarios</Button>
            </CardContent>
          </Card>
        </Link>
      </section>

      {(stats?.badges?.length > 0 || stats?.milestones?.length > 0) && (
        <section className="space-y-6">
          {stats?.badges?.length > 0 && (
            <div>
              <h2 className="section-title text-lg mb-3">Badges</h2>
              <div className="flex flex-wrap gap-2">
                {stats.badges.map((b) => (
                  <span
                    key={b.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/15 text-primary border border-primary/20 text-sm font-medium"
                    title={b.description}
                  >
                    <span aria-hidden>🏅</span> {b.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {stats?.milestones?.length > 0 && (
            <div>
              <h2 className="section-title text-lg mb-3">Milestones</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {stats.milestones.map((m) => (
                  <li key={m.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-primary" aria-hidden>✓</span> {m.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <Card className="bg-muted/40">
        <CardHeader>
          <CardTitle>Quick tip</CardTitle>
          <CardDescription>
            Practicing a little every day works better than long sessions once a week. Try starting with 10 minutes, or practice with <Link to="/flashcards" className="text-primary hover:underline">flashcards</Link> or <Link to="/scenarios" className="text-primary hover:underline">conversation scenarios</Link>.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
