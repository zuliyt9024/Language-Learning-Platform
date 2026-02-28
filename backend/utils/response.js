/**
 * Consistent API responses for a user-friendly experience.
 * Frontend can always expect: { success, data?, message?, error?, errors? }
 */

export function success(res, data = null, message = 'Success', status = 200) {
  return res.status(status).json({
    success: true,
    data: data ?? undefined,
    message,
  })
}

export function error(res, message = 'Something went wrong', status = 400, errors = null) {
  return res.status(status).json({
    success: false,
    message,
    error: message,
    ...(errors && { errors }),
  })
}
