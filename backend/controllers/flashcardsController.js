import { success, error } from '../utils/response.js'
import { flashcards } from '../data/flashcards.js'
import * as store from '../data/progressStore.js'

export function getAll(req, res) {
  const list = [...flashcards]
  if (req.userId) {
    const reviews = store.getFlashcardReviews(req.userId)
    const now = new Date().toISOString()
    list.sort((a, b) => {
      const aNext = reviews[a.id]?.nextReview || ''
      const bNext = reviews[b.id]?.nextReview || ''
      if (!aNext) return 1
      if (!bNext) return -1
      return aNext.localeCompare(bNext)
    })
    const withReview = list.map((c) => ({
      ...c,
      nextReview: reviews[c.id]?.nextReview || null,
    }))
    return success(res, { flashcards: withReview })
  }
  return success(res, { flashcards: list })
}

export function recordReview(req, res) {
  const { cardId, rating } = req.body
  if (!cardId || !['again', 'good', 'easy'].includes(rating)) {
    return error(res, 'cardId and rating (again|good|easy) are required', 400)
  }
  const card = flashcards.find((c) => c.id === cardId)
  if (!card) return error(res, 'Flashcard not found', 404)
  const result = store.recordFlashcardReview(req.userId, cardId, rating)
  return success(res, result, 'Review saved!')
}
