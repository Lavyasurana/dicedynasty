import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const deployedClientUrl = 'https://deal-dine.vercel.app'
const localCustomerUrl = 'http://localhost:5173'
const localAdminUrl = 'http://localhost:5174'
const configuredClientUrls = [process.env.CLIENT_URL, process.env.CLIENT_URLS]
  .flatMap((value) => value?.split(',') || [])
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean)
const allowedOrigins = new Set([deployedClientUrl, localCustomerUrl, localAdminUrl, ...configuredClientUrls])

app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      const normalizedOrigin = origin?.replace(/\/$/, '')

      if (!origin || allowedOrigins.has(normalizedOrigin)) {
        return callback(null, true)
      }

      return callback(null, false)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
  }),
)
app.use(express.json({ limit: '10kb' }))
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please try again later' },
  }),
)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }

  return res.status(500).json({ message: error.message || 'Internal server error' })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB successfully connected')
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })
