import api from './api'

export async function getProgress() {
  const { data } = await api.get('/progress')
  return (data?.data ?? data) || {}
}

export async function completeLesson(lessonId) {
  const { data } = await api.post('/progress/complete', { lessonId })
  return data?.data ?? data
}
