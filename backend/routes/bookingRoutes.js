import express from 'express'
import {
  createBooking,
  getBookingsByDateAndTime,
  getMyBookings,
} from '../controller/bookingController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getBookingsByDateAndTime)
router.get('/mine', protect, getMyBookings)
router.post('/', protect, createBooking)

export default router
