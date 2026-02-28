import { Router } from 'express'
import { optionalAuth } from '../middleware/auth.js'
import { requireAuth } from '../middleware/auth.js'
import { getAll, recordReview } from '../controllers/flashcardsController.js'

const router = Router()
router.get('/', optionalAuth, getAll)
router.post('/review', requireAuth, recordReview)
export default router
