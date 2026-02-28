import { success, error } from '../utils/response.js'
import * as store from '../data/progressStore.js'

export function getGoals(req, res) {
  const data = store.getProgress(req.userId)
  return success(res, {
    dailyGoalMinutes: data.dailyGoalMinutes,
    minutesToday: data.minutesToday,
    streak: data.streak,
    lastPracticeDate: data.lastPracticeDate,
  })
}

export function setGoal(req, res) {
  const { minutes } = req.body
  const value = store.setDailyGoal(req.userId, minutes)
  return success(res, { dailyGoalMinutes: value }, 'Daily goal updated!')
}

export function addPractice(req, res) {
  const { minutes } = req.body
  if (!minutes || minutes < 1) {
    return error(res, 'Please provide minutes (at least 1).', 400)
  }
  store.addMinutesToday(req.userId, minutes)
  const data = store.getProgress(req.userId)
  return success(res, {
    minutesToday: data.minutesToday,
    streak: data.streak,
    dailyGoalMinutes: data.dailyGoalMinutes,
  }, 'Practice time recorded!')
}
