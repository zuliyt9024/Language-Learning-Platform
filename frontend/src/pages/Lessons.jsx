import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { Image, ImageBox } from '../components/ui/Image'
import { getLessons } from '../services/lessonsService'
import { useToast } from '../context/ToastContext'
import { CATEGORIES, LEVELS, IMAGES } from '../utils/constants'
import { cn } from '../utils/cn'

export default function Lessons() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const { error: showError } = useToast()

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await getLessons({
          ...(filterCategory && { category: filterCategory }),
          ...(filterLevel && { level: filterLevel }),
        })
        const list = res?.lessons ?? res ?? []
        if (!cancelled) setLessons(Array.isArray(list) ? list : [])
      } catch (e) {
        if (!cancelled) showError(e?.userMessage || 'Could not load lessons. Please try again.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [filterCategory, filterLevel, showError])

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="section-title">Lessons</h1>
        <p className="section-subtitle">
          Choose a lesson to start learning. Complete quizzes to track your progress.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground py-1">Category:</span>
        <Button
          variant={!filterCategory ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterCategory('')}
        >
          All
        </Button>
        {CATEGORIES.map((c) => (
          <Button
            key={c}
            variant={filterCategory === c ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterCategory(c)}
          >
            {c}
          </Button>
        ))}
        <span className="w-full sm:w-auto" />
        <span className="text-sm text-muted-foreground py-1">Level:</span>
        <Button
          variant={!filterLevel ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterLevel('')}
        >
          All
        </Button>
        {LEVELS.map((l) => (
          <Button
            key={l}
            variant={filterLevel === l ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterLevel(l)}
          >
            {l}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : lessons.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No lessons match your filters. Try changing category or level.
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Link key={lesson.id} to={`/lessons/${lesson.id}`}>
              <Card className="h-full overflow-hidden card-hover group">
                <ImageBox aspectRatio="16/10" className="img-card-group rounded-t-xl">
                  <Image
                    src={lesson.imageUrl || IMAGES.defaultLesson}
                    alt={`${lesson.title} – ${lesson.level} ${lesson.category}`}
                    className="img-card rounded-t-xl"
                  />
                </ImageBox>
                <CardHeader className="pb-2">
                  <div className="flex gap-2 flex-wrap">
                    <span className={cn(
                      'text-xs px-2 py-0.5 rounded-full',
                      lesson.level === 'Beginner' && 'bg-green-100 text-green-800',
                      lesson.level === 'Intermediate' && 'bg-amber-100 text-amber-800',
                      lesson.level === 'Advanced' && 'bg-purple-100 text-purple-800'
                    )}>
                      {lesson.level}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {lesson.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-2">{lesson.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    Open lesson
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
