import { Router } from 'express'
import authRoutes from './auth.js'
import lessonsRoutes from './lessons.js'
import progressRoutes from './progress.js'
import goalsRoutes from './goals.js'
import quizRoutes from './quiz.js'
import flashcardsRoutes from './flashcards.js'
import scenariosRoutes from './scenarios.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'Language Learning Platform API',
      version: '1.0.0',
      endpoints: {
        health: 'GET /health',
        auth: 'POST /api/auth/register, POST /api/auth/login',
        lessons: 'GET /api/lessons',
        progress: 'GET /api/progress (auth)',
        goals: 'GET/PUT /api/goals (auth)',
        quiz: 'GET /api/quiz/:lessonId, POST /api/quiz/submit (auth)',
        flashcards: 'GET /api/flashcards',
        scenarios: 'GET /api/scenarios',
      },
    },
  })
})

router.use('/auth', authRoutes)
router.use('/lessons', lessonsRoutes)
router.use('/progress', progressRoutes)
router.use('/goals', goalsRoutes)
router.use('/quiz', quizRoutes)
router.use('/flashcards', flashcardsRoutes)
router.use('/scenarios', scenariosRoutes)

// Catch-all for unknown API paths
router.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found', error: 'Not found' })
})

export default router
