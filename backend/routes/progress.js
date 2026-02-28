import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { getProgress, completeLesson } from '../controllers/progressController.js'

const router = Router()
router.use(requireAuth)
router.get('/', getProgress)
router.post('/complete', completeLesson)
export default router
