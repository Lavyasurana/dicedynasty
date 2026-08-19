import Booking from '../model/Booking.js'
import User from '../model/User.js'

export async function createBooking(req, res) {
  try {
    const { date, timeSlot, tableNumber } = req.body

    if (!date || !timeSlot || !tableNumber) {
      return res.status(400).json({ message: 'Date, time slot, and table number are required' })
    }

    const booking = await Booking.create({
      date,
      timeSlot,
      tableNumber,
      emailId: req.user.emailId,
      user: req.user._id,
    })

    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { bookings: booking._id },
    })

    return res.status(201).json({ booking })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'This table is already booked for the selected slot' })
    }

    return res.status(400).json({ message: error.message || 'Booking failed' })
  }
}

export async function getBookingsByDateAndTime(req, res) {
  try {
    const { date, timeSlot } = req.query

    if (!date || !timeSlot) {
      return res.status(400).json({ message: 'Date and time slot are required' })
    }

    const bookings = await Booking.find({ date, timeSlot }).select('date timeSlot tableNumber emailId')

    return res.json({ bookings })
  } catch {
    return res.status(500).json({ message: 'Could not fetch bookings' })
  }
}

export async function getMyBookings(req, res) {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ date: 1, timeSlot: 1, tableNumber: 1 })

    return res.json({ bookings })
  } catch {
    return res.status(500).json({ message: 'Could not fetch your bookings' })
  }
}

export async function getOwnerBookings(req, res) {
  try {
    const bookings = await Booking.find().sort({ date: 1, timeSlot: 1, tableNumber: 1 }).select('date timeSlot tableNumber emailId createdAt').lean()
    return res.json({ bookings })
  } catch {
    return res.status(500).json({ message: 'Could not fetch bookings' })
  }
}

export async function getOwnerLedger(req, res) {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).select('date timeSlot tableNumber emailId createdAt').lean()
    const entries = bookings.map((booking) => ({ id: booking._id, occurredAt: booking.createdAt, type: 'Booking created', guestEmail: booking.emailId, detail: `Table ${booking.tableNumber} · ${booking.date} at ${booking.timeSlot}` }))
    return res.json({ entries })
  } catch {
    return res.status(500).json({ message: 'Could not fetch ledger' })
  }
}
