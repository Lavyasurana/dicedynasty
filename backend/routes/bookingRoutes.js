import express from 'express'
import {
  createBooking,
  getBookingsByDateAndTime,
  getMyBookings,
  getOwnerBookings,
  getOwnerLedger,
} from '../controller/bookingController.js'
import { protect, requireOwner } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getBookingsByDateAndTime)
router.get('/mine', protect, getMyBookings)
router.get('/owner', protect, requireOwner, getOwnerBookings)
router.get('/owner/ledger', protect, requireOwner, getOwnerLedger)
router.post('/', protect, createBooking)

export default router
