import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Spinner } from '../components/ui/Spinner'
import { Image } from '../components/ui/Image'
import { getGoals, setDailyGoal, addPracticeTime } from '../services/goalsService'
import { useToast } from '../context/ToastContext'
import { IMAGES } from '../utils/constants'

export default function Goals() {
  const [goals, setGoals] = useState(null)
  const [loading, setLoading] = useState(true)
  const [goalMinutes, setGoalMinutes] = useState(10)
  const [savingGoal, setSavingGoal] = useState(false)
  const [addMinutes, setAddMinutes] = useState(5)
  const [adding, setAdding] = useState(false)
  const { success, error: showError } = useToast()

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await getGoals()
        if (!cancelled) {
          setGoals(res)
          setGoalMinutes(res?.dailyGoalMinutes ?? 10)
        }
      } catch (e) {
        if (!cancelled) showError(e?.userMessage || 'Could not load goals. Please try again.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [showError])

  const handleSetGoal = async (e) => {
    e.preventDefault()
    setSavingGoal(true)
    try {
      const res = await setDailyGoal(goalMinutes)
      setGoals((g) => ({ ...g, dailyGoalMinutes: res?.dailyGoalMinutes ?? goalMinutes }))
      success('Daily goal updated!')
    } catch (e) {
      showError(e.userMessage || e.response?.data?.message || 'Could not update goal. Please try again.')
    } finally {
      setSavingGoal(false)
    }
  }

  const handleAddPractice = async (e) => {
    e.preventDefault()
    setAdding(true)
    try {
      const res = await addPracticeTime(addMinutes)
      setGoals((g) => ({ ...g, ...res }))
      success('Practice time recorded!')
    } catch (e) {
      showError(e.userMessage || e.response?.data?.message || 'Could not record practice. Please try again.')
    } finally {
      setAdding(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  const minutesToday = goals?.minutesToday ?? 0
  const dailyGoal = goals?.dailyGoalMinutes ?? 10
  const streak = goals?.streak ?? 0
  const progress = Math.min(100, Math.round((minutesToday / dailyGoal) * 100))

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="section-title">Daily goal & streak</h1>
        <p className="section-subtitle">
          Set a daily practice goal and track your streak.
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden bg-muted min-h-[200px] shadow-lg ring-1 ring-black/5">
        <Image
          src={IMAGES.goals}
          alt="Daily goals and learning streak"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 p-6 flex flex-col justify-end h-full">
          <p className="text-4xl font-bold text-white drop-shadow">🔥 {streak} day streak</p>
          <p className="text-white/90">
            {streak === 0
              ? 'Complete a lesson quiz or record practice above to start your streak.'
              : 'Keep it up! Practice today to extend your streak.'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's progress</CardTitle>
          <CardDescription>
            {minutesToday} of {dailyGoal} minutes completed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <form onSubmit={handleAddPractice} className="flex gap-2 flex-wrap items-end">
            <div className="flex-1 min-w-[120px]">
              <Label htmlFor="add-min">Add practice (minutes)</Label>
              <Input
                id="add-min"
                type="number"
                min={1}
                max={120}
                value={addMinutes}
                onChange={(e) => setAddMinutes(Number(e.target.value) || 5)}
              />
            </div>
            <Button type="submit" disabled={adding}>
              {adding ? <Spinner size="sm" className="mr-1" /> : null}
              Record
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily goal</CardTitle>
          <CardDescription>How many minutes do you want to practice each day?</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetGoal} className="flex gap-2 flex-wrap items-end">
            <div className="flex-1 min-w-[120px]">
              <Label htmlFor="goal-min">Minutes per day</Label>
              <Input
                id="goal-min"
                type="number"
                min={5}
                max={120}
                value={goalMinutes}
                onChange={(e) => setGoalMinutes(Number(e.target.value) || 10)}
              />
            </div>
            <Button type="submit" disabled={savingGoal}>
              {savingGoal ? <Spinner size="sm" className="mr-1" /> : null}
              Save goal
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Link to="/dashboard"><Button variant="outline">Back to dashboard</Button></Link>
      </div>
    </div>
  )
}
