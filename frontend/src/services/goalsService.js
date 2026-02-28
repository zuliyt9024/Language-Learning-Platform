import api from './api'

export async function getGoals() {
  const { data } = await api.get('/goals')
  return (data?.data ?? data) || {}
}

export async function setDailyGoal(minutes) {
  const { data } = await api.put('/goals', { minutes })
  return data?.data ?? data
}

export async function addPracticeTime(minutes) {
  const { data } = await api.post('/goals/practice', { minutes })
  return data?.data ?? data
}
