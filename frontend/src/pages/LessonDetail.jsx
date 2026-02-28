import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { Image, ImageBox } from '../components/ui/Image'
import { getLesson } from '../services/lessonsService'
import { useToast } from '../context/ToastContext'
import { IMAGES } from '../utils/constants'
import { cn } from '../utils/cn'

export default function LessonDetail() {
  const { id } = useParams()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const { error: showError } = useToast()

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!id) return
      try {
        const data = await getLesson(id)
        if (!cancelled) setLesson(data)
      } catch (e) {
        if (!cancelled) showError(e?.userMessage || 'Could not load lesson. Please try again.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [id, showError])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }
  if (!lesson) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Lesson not found.</p>
        <Link to="/lessons"><Button>Back to lessons</Button></Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/lessons" className="text-sm text-primary hover:underline">
        ← Back to lessons
      </Link>
      <Card className="overflow-hidden shadow-lg">
        <ImageBox aspectRatio="3/1" className="rounded-t-xl">
          <Image
            src={lesson.imageUrl || IMAGES.defaultLesson}
            alt={lesson.title}
            className="rounded-t-xl"
          />
        </ImageBox>
        <CardHeader>
          <div className="flex gap-2 flex-wrap">
            <span className={cn(
              'text-xs px-2 py-1 rounded-full',
              lesson.level === 'Beginner' && 'bg-green-100 text-green-800',
              lesson.level === 'Intermediate' && 'bg-amber-100 text-amber-800',
              lesson.level === 'Advanced' && 'bg-purple-100 text-purple-800'
            )}>
              {lesson.level}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-muted">{lesson.category}</span>
          </div>
          <CardTitle className="text-2xl mt-2">{lesson.title}</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          <div className="whitespace-pre-wrap text-foreground">
            {lesson.content?.replace(/#{1,3}\s?/g, '').replace(/\*\*(.+?)\*\*/g, '$1').split('\n').map((line, i) => (
              line.startsWith('- ') ? (
                <li key={i} className="ml-4">{line.slice(2)}</li>
              ) : (
                <p key={i} className="mb-2">{line || <br />}</p>
              )
            ))}
          </div>
        </CardContent>
      </Card>
      {lesson.cultureNotes && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span aria-hidden>🌎</span> Cultural note
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{lesson.cultureNotes}</p>
          </CardContent>
        </Card>
      )}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Completing the quiz will add 5 minutes to your daily practice and update your progress.
        </p>
        <div className="flex gap-3">
          <Link to={`/lessons/${id}/quiz`} className="flex-1">
            <Button className="w-full">Take quiz</Button>
          </Link>
          <Link to="/lessons">
            <Button variant="outline">More lessons</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
