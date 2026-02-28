import api from './api'

export async function getLessons(params = {}) {
  const { data } = await api.get('/lessons', { params })
  return data?.data ?? data
}

export async function getLesson(id) {
  const { data } = await api.get(`/lessons/${id}`)
  return data?.data ?? data
}
