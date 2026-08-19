import jwt from 'jsonwebtoken'
import User from '../model/User.js'

function createToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    emailId: user.emailId,
    phone_no: user.phone_no,
    bookings: user.bookings || [],
  }
}

function isStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
}

export async function register(req, res) {
  try {
    const { name, emailId, password, phone_no, acceptsTerms } = req.body

    if (!name || !emailId || !password || !phone_no) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (acceptsTerms !== true) {
      return res.status(400).json({ message: 'You must accept the Terms & Conditions to create an account' })
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters and include uppercase, lowercase, and a number',
      })
    }

    const existingUser = await User.findOne({ emailId: emailId.toLowerCase() })

    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists' })
    }

    const user = await User.create({ name, emailId, password, phone_no, termsAcceptedAt: new Date() })
    const token = createToken(user._id)

    return res.status(201).json({ token, user: sanitizeUser(user) })
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Registration failed' })
  }
}

export async function login(req, res) {
  try {
    const { emailId, password } = req.body

    if (!emailId || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ emailId: emailId.toLowerCase() }).select('+password')

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = createToken(user._id)

    return res.json({ token, user: sanitizeUser(user) })
  } catch {
    return res.status(500).json({ message: 'Login failed' })
  }
}

export function getMe(req, res) {
  return res.json({ user: sanitizeUser(req.user) })
}
