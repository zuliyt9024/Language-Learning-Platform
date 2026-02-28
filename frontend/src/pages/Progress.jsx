import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { Image } from '../components/ui/Image'
import { getProgress } from '../services/progressService'
import { useToast } from '../context/ToastContext'
import { IMAGES } from '../utils/constants'

export default function Progress() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { error: showError } = useToast()

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await getProgress()
        if (!cancelled) setData(res)
      } catch (e) {
        if (!cancelled) {
          showError(e?.userMessage || 'Could not load progress. Sign in to see your stats.')
          setData({ completedLessonIds: [], streak: 0, quizScores: {} })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [showError])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  const completed = data?.completedLessonIds?.length ?? 0
  const streak = data?.streak ?? 0
  const xp = data?.xp ?? 0
  const badges = data?.badges ?? []
  const milestones = data?.milestones ?? []
  const scores = data?.quizScores ?? {}
  const scoreList = Object.entries(scores)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="section-title">Your progress</h1>
        <p className="section-subtitle">
          See how much you've learned and stay motivated.
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden bg-muted min-h-[220px] flex items-center justify-center shadow-lg ring-1 ring-black/5">
        <Image
          src={IMAGES.progress}
          alt="Track your learning progress and streaks"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-primary/25" />
        <div className="relative z-10 flex flex-wrap gap-6 sm:gap-10 justify-center p-8 text-center">
          <div>
            <p className="text-4xl sm:text-5xl font-bold text-primary">{streak}</p>
            <p className="text-sm font-medium text-muted-foreground">Day streak</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-bold text-primary">{completed}</p>
            <p className="text-sm font-medium text-muted-foreground">Lessons completed</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-bold text-amber-500">{xp}</p>
            <p className="text-sm font-medium text-muted-foreground">Total XP</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-bold text-primary">{scoreList.length}</p>
            <p className="text-sm font-medium text-muted-foreground">Quizzes taken</p>
          </div>
        </div>
      </div>

      {(badges.length > 0 || milestones.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-6">
          {badges.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Earned achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {badges.map((b) => (
                    <span key={b.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/15 text-primary border border-primary/20 text-sm font-medium" title={b.description}>
                      🏅 {b.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {milestones.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
                <CardDescription>Unlocked progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {milestones.map((m) => (
                    <li key={m.id} className="flex items-center gap-2 text-sm">
                      <span className="text-primary">✓</span> {m.title}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Continue learning or set your goal</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link to="/lessons">
              <Button variant="outline" className="w-full">Browse lessons</Button>
            </Link>
            <Link to="/goals">
              <Button variant="outline" className="w-full">Daily goal & streak</Button>
            </Link>
            <Link to="/flashcards">
              <Button variant="outline" className="w-full">Practice flashcards</Button>
            </Link>
            <Link to="/scenarios">
              <Button variant="outline" className="w-full">Conversation scenarios</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quiz scores</CardTitle>
            <CardDescription>Your latest quiz results</CardDescription>
          </CardHeader>
          <CardContent>
            {scoreList.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Take a quiz after a lesson to see scores here. You can also record practice time on the <Link to="/goals" className="text-primary hover:underline">Goals</Link> page.
              </p>
            ) : (
              <ul className="space-y-2">
                {scoreList.slice(-5).reverse().map(([lessonId, score]) => (
                  <li key={lessonId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lesson {lessonId}</span>
                    <span className="font-medium">{score}%</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
