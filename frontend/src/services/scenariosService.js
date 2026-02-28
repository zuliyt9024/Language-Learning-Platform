import api from './api'
import { scenariosFallback } from '../data/scenariosFallback'

function parseListResponse(res) {
  const body = res?.data
  const payload = body?.data ?? body
  const list = Array.isArray(payload) ? payload : payload?.scenarios
  return Array.isArray(list) ? list : []
}

export async function getScenarios() {
  try {
    const res = await api.get('/scenarios')
    const list = parseListResponse(res)
    if (list.length > 0) return { scenarios: list }
  } catch (_) {
    /* use fallback */
  }
  return { scenarios: scenariosFallback }
}

export async function getScenario(id) {
  if (!id) return null
  try {
    const res = await api.get(`/scenarios/${id}`)
    const body = res?.data
    const payload = body?.data ?? body
    if (payload && (payload.id || payload.title)) return payload
  } catch (_) {
    /* use fallback */
  }
  return scenariosFallback.find((s) => s.id === id) ?? null
}
