import { success } from '../utils/response.js'
import * as store from '../data/progressStore.js'

export function getProgress(req, res) {
  const data = store.getProgress(req.userId)
  return success(res, data)
}

export function completeLesson(req, res) {
  const { lessonId } = req.body
  if (!lessonId) {
    return res.status(400).json({ success: false, message: 'lessonId is required' })
  }
  store.completeLesson(req.userId, lessonId)
  const data = store.getProgress(req.userId)
  return success(res, data, 'Lesson marked complete!')
}
