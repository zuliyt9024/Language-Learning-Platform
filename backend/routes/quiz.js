import { Router } from 'express'
import { optionalAuth } from '../middleware/auth.js'
import { requireAuth } from '../middleware/auth.js'
import { getQuiz, submitQuiz } from '../controllers/quizController.js'

const router = Router()
router.get('/:lessonId', optionalAuth, getQuiz)
router.post('/submit', requireAuth, submitQuiz)
export default router
