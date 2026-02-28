import { success, error } from '../utils/response.js'
import { scenarios } from '../data/scenarios.js'

export function getAll(req, res) {
  return success(res, { scenarios })
}

export function getById(req, res) {
  const scenario = scenarios.find((s) => s.id === req.params.id)
  if (!scenario) return error(res, 'Scenario not found', 404)
  return success(res, scenario)
}
