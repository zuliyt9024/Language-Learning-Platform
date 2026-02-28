import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { Image } from '../components/ui/Image'
import { getFlashcards, recordFlashcardReview } from '../services/flashcardsService'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { IMAGES } from '../utils/constants'
import { cn } from '../utils/cn'

export default function Flashcards() {
  const [flashcards, setFlashcards] = useState([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const { error: showError, success: showSuccess } = useToast()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await getFlashcards()
        const list = res?.flashcards ?? res ?? []
        if (!cancelled) setFlashcards(Array.isArray(list) ? list : [])
      } catch (e) {
        if (!cancelled) showError(e?.userMessage || 'Could not load flashcards. Please try again.')
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

  if (flashcards.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <p className="text-muted-foreground mb-4">No flashcards available.</p>
        <Link to="/lessons"><Button>Browse lessons</Button></Link>
      </div>
    )
  }

  const card = flashcards[index]
  const total = flashcards.length

  async function handleReview(rating) {
    if (!card?.id || reviewing) return
    setReviewing(true)
    try {
      await recordFlashcardReview(card.id, rating)
      showSuccess('+2 XP')
      setFlipped(false)
      setIndex((i) => (i === total - 1 ? 0 : i + 1))
    } catch (e) {
      showError(e?.userMessage || 'Could not save review.')
    } finally {
      setReviewing(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="section-title">Flashcards</h1>
        <p className="section-subtitle">
          Tap the card to flip. {isAuthenticated ? 'Rate with Again / Good / Easy to use spaced repetition and earn XP.' : 'Sign in to track reviews and earn XP.'}
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden bg-muted h-52 mb-6 shadow-lg ring-1 ring-black/5">
        <Image
          src={IMAGES.flashcards}
          alt="Vocabulary flashcards for language learning"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      </div>

      <div
        className="flip-card cursor-pointer min-h-[240px]"
        onClick={() => setFlipped((f) => !f)}
      >
        <div className={cn('flip-card-inner relative h-56', flipped && 'flipped')}>
          <Card className="flip-card-front absolute inset-0 flex flex-col justify-center items-center p-8">
            <CardContent className="text-center w-full">
              <p className="text-2xl font-semibold">{card.front}</p>
              <p className="text-sm text-muted-foreground mt-2">Tap to reveal</p>
            </CardContent>
          </Card>
          <Card className="flip-card-back absolute inset-0 flex flex-col justify-center items-center p-8 bg-primary/10 border-primary/30">
            <CardContent className="text-center w-full">
              <p className="text-2xl font-semibold text-primary">{card.back}</p>
              <p className="text-sm text-muted-foreground mt-2">Tap to flip back</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {isAuthenticated && flipped && (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
          <Button variant="outline" size="sm" className="bg-red-500/10 border-red-500/30 text-red-600 hover:bg-red-500/20" onClick={() => handleReview('again')} disabled={reviewing}>
            Again
          </Button>
          <Button variant="outline" size="sm" className="bg-green-500/10 border-green-500/30 text-green-600 hover:bg-green-500/20" onClick={() => handleReview('good')} disabled={reviewing}>
            Good
          </Button>
          <Button variant="outline" size="sm" className="bg-primary/15 border-primary/30 text-primary hover:bg-primary/25" onClick={() => handleReview('easy')} disabled={reviewing}>
            Easy
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={(e) => { e.stopPropagation(); setIndex((i) => (i === 0 ? total - 1 : i - 1)); setFlipped(false); }}
        >
          ← Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          {index + 1} / {total}
        </span>
        <Button
          variant="outline"
          onClick={(e) => { e.stopPropagation(); setIndex((i) => (i === total - 1 ? 0 : i + 1)); setFlipped(false); }}
        >
          Next →
        </Button>
      </div>

      <div className="flex justify-center pt-4">
        <Link to="/lessons"><Button variant="ghost">Back to lessons</Button></Link>
      </div>
    </div>
  )
}
