import api from './api'

export async function getQuiz(lessonId) {
  const { data } = await api.get(`/quiz/${lessonId}`)
  return data?.data ?? data
}

export async function submitQuiz(lessonId, answers) {
  const { data } = await api.post('/quiz/submit', { lessonId, answers })
  return data?.data ?? data
}
