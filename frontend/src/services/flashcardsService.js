import api from './api'

export async function getFlashcards() {
  const { data } = await api.get('/flashcards')
  return (data?.data ?? data) || {}
}

export async function recordFlashcardReview(cardId, rating) {
  const { data } = await api.post('/flashcards/review', { cardId, rating })
  return data?.data ?? data
}
