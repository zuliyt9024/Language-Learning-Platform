import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import routes from "./routes/index.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// ✅ Allow only your frontend
const allowedOrigins = [
  "https://language-learning-platform-1-1blr.onrender.com",
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)

app.use(express.json())

app.use("/api", routes)

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Language Learning Platform API" })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})