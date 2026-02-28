import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { getQuiz, submitQuiz } from '../services/quizService'
import { useToast } from '../context/ToastContext'

export default function Quiz() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { success, error: showError } = useToast()
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!lessonId) return
      try {
        const data = await getQuiz(lessonId)
        if (!cancelled) {
          setQuiz(data)
          setAnswers((data.questions || []).map(() => null))
        }
      } catch (e) {
        if (!cancelled) showError(e?.userMessage || 'Could not load quiz. Please try again.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [lessonId, showError])

  const handleSubmit = async () => {
    const hasAll = quiz?.questions?.every((_, i) => answers[i] !== null && answers[i] !== undefined)
    if (!hasAll) {
      showError('Please answer all questions.')
      return
    }
    setSubmitting(true)
    try {
      const data = await submitQuiz(lessonId, answers)
      setResult(data)
      success(data.passed ? 'Quiz passed! Well done.' : 'Keep practicing!')
    } catch (e) {
      showError(e.userMessage || e.response?.data?.message || 'Could not submit quiz. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }
  if (!quiz?.questions?.length) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <p className="text-muted-foreground mb-4">No quiz available for this lesson.</p>
        <Link to={`/lessons/${lessonId}`}><Button>Back to lesson</Button></Link>
      </div>
    )
  }

  if (result) {
    const passed = result.passed
    return (
      <div className="max-w-lg mx-auto">
        <Card className={passed ? 'border-green-500/50' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {passed ? '🎉 Quiz complete!' : 'Keep practicing'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl font-semibold">
              Score: {result.score}% ({result.correct}/{result.total} correct)
            </p>
            <p className="text-sm text-muted-foreground">
              Your progress has been updated. This quiz added 5 minutes to your daily practice.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/progress">
                <Button>View progress</Button>
              </Link>
              <Link to="/lessons">
                <Button variant="outline">More lessons</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to={`/lessons/${lessonId}`} className="text-sm text-primary hover:underline">
        ← Back to lesson
      </Link>
      <h1 className="text-2xl font-bold">{quiz.lessonTitle} – Quiz</h1>
      <div className="space-y-6">
        {quiz.questions.map((q, qIndex) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle className="text-base">
                {qIndex + 1}. {q.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {q.options.map((opt, oIndex) => (
                <button
                  key={oIndex}
                  type="button"
                  onClick={() => setAnswers((prev) => {
                    const next = [...prev]
                    next[qIndex] = oIndex
                    return next
                  })}
                  className={`text-left px-4 py-3 rounded-lg border transition-colors ${
                    answers[qIndex] === oIndex
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-input hover:bg-accent'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={submitting} className="w-full sm:w-auto">
        {submitting ? <Spinner size="sm" className="mr-2 inline" /> : null}
        Submit quiz
      </Button>
    </div>
  )
}
