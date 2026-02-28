const validations = {
  register: (body) => {
    const errors = {}
    if (!body.name?.trim()) errors.name = 'Name is required'
    if (!body.email?.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.email = 'Please enter a valid email'
    if (!body.password) errors.password = 'Password is required'
    else if (body.password.length < 6) errors.password = 'Password must be at least 6 characters'
    return errors
  },
  login: (body) => {
    const errors = {}
    if (!body.email?.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.email = 'Please enter a valid email'
    if (!body.password) errors.password = 'Password is required'
    return errors
  },
}

export function validate(schema) {
  return (req, res, next) => {
    const errors = validations[schema] ? validations[schema](req.body) : {}
    const hasErrors = Object.keys(errors).length > 0
    if (hasErrors) {
      return res.status(400).json({
        success: false,
        message: 'Please fix the errors below.',
        error: 'Validation failed',
        errors,
      })
    }
    next()
  }
}
