import { success, error } from '../utils/response.js'
import { quizByLessonId } from '../data/quiz.js'
import { lessons } from '../data/lessons.js'
import * as store from '../data/progressStore.js'

export function getQuiz(req, res) {
  const { lessonId } = req.params
  const lesson = lessons.find((l) => l.id === lessonId)
  if (!lesson) return error(res, 'Lesson not found', 404)
  const questions = quizByLessonId[lessonId] || []
  return success(res, { lessonId, lessonTitle: lesson.title, questions })
}

export function submitQuiz(req, res) {
  const { lessonId, answers } = req.body
  if (!lessonId || !Array.isArray(answers)) {
    return error(res, 'lessonId and answers array required', 400)
  }
  const questions = quizByLessonId[lessonId] || []
  if (questions.length === 0) return error(res, 'No quiz for this lesson', 404)
  let correct = 0
  questions.forEach((q, i) => {
    if (answers[i] === q.correct) correct++
  })
  const score = Math.round((correct / questions.length) * 100)
  store.saveQuizScore(req.userId, lessonId, score)
  return success(res, {
    score,
    total: questions.length,
    correct,
    passed: score >= 70,
  }, score >= 70 ? 'Quiz passed! Well done.' : 'Keep practicing!')
}
