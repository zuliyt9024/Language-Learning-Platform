import { success, error } from '../utils/response.js'
import { lessons } from '../data/lessons.js'

export function getAll(req, res) {
  const { category, level } = req.query
  let list = lessons
  if (category) list = list.filter((l) => l.category === category)
  if (level) list = list.filter((l) => l.level === level)
  return success(res, { lessons: list })
}

export function getById(req, res) {
  const lesson = lessons.find((l) => l.id === req.params.id)
  if (!lesson) return error(res, 'Lesson not found', 404)
  return success(res, lesson)
}
