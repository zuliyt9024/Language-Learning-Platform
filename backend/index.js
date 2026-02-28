import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import routes from './routes/index.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Language Learning Platform API' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong. Please try again later.',
    error: 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
