import mongoose from 'mongoose'
import validator from 'validator'

const bookingSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, 'Booking date is required'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
      enum: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    },
    tableNumber: {
      type: Number,
      required: [true, 'Table number is required'],
      min: [1, 'Table number must be between 1 and 8'],
      max: [8, 'Table number must be between 1 and 8'],
    },
    emailId: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)

bookingSchema.index({ date: 1, timeSlot: 1, tableNumber: 1 }, { unique: true })
bookingSchema.index({ emailId: 1, date: 1 })

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
