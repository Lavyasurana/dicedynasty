import jwt from 'jsonwebtoken'
import User from '../model/User.js'

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' })
    }

    req.user = user
    return next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export function requireOwner(req, res, next) {
  const ownerEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  if (!ownerEmail) return res.status(503).json({ message: 'Owner access is not configured' })
  if (req.user.emailId !== ownerEmail) return res.status(403).json({ message: 'Owner access is required' })
  return next()
}
