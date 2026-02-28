import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { getGoals, setGoal, addPractice } from '../controllers/goalsController.js'

const router = Router()
router.use(requireAuth)
router.get('/', getGoals)
router.put('/', setGoal)
router.post('/practice', addPractice)
export default router
