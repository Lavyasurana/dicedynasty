import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Mail, Phone, Table2, UserRound } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { timeSlots } from '../data/siteData'

const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api'

function Profile() {
  const { token, user: authUser } = useAuth()
  const [user, setUser] = useState(authUser)
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(() => Boolean(token))

  useEffect(() => {
    setUser(authUser)
  }, [authUser])

  useEffect(() => {
    if (!token) {
      return
    }

    async function loadProfile() {
      setError('')

      try {
        const headers = { Authorization: `Bearer ${token}` }
        const [meResponse, bookingsResponse] = await Promise.all([
          fetch(`${apiUrl}/auth/me`, { headers }),
          fetch(`${apiUrl}/bookings/mine`, { headers }),
        ])
        const meData = await meResponse.json()
        const bookingsData = await bookingsResponse.json()

        if (!meResponse.ok) {
          throw new Error(meData.message || 'Could not load your profile')
        }

        if (!bookingsResponse.ok) {
          throw new Error(bookingsData.message || 'Could not load your bookings')
        }

        setUser(meData.user)
        setBookings(bookingsData.bookings || [])
      } catch (profileError) {
        setError(profileError.message)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [token])

  if (!token) {
    return (
      <section className="min-h-svh px-4 pb-16 pt-28 sm:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.08] p-8">
          <h1 className="text-4xl font-black text-white">Login to view your profile.</h1>
          <Link className="mt-6 inline-block rounded-full bg-[#00665E] px-6 py-3 font-bold text-white" to="/auth">
            Login
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-svh px-4 pb-16 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.32em] text-amber-200">Profile</p>
        <h1 className="text-[clamp(3rem,7vw,5rem)] font-black leading-tight text-white">Your Dynasty details.</h1>

        {error && <p className="mt-6 rounded-2xl bg-red-500/15 p-4 text-sm text-red-200">{error}</p>}

        <div className="mt-8 grid gap-5 lg:grid-cols-[360px_1fr]">
          <aside className="h-max rounded-[2rem] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="grid size-16 place-items-center rounded-full bg-[#00665E] text-amber-200">
              <UserRound className="size-8" />
            </div>
            <h2 className="mt-5 text-3xl font-black text-white">{user?.name || 'Member'}</h2>
            <ProfileLine icon={Mail} text={user?.emailId} />
            <ProfileLine icon={Phone} text={user?.phone_no} />
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-3xl font-black text-white">Bookings</h2>
              <Link className="rounded-full bg-[#00665E] px-5 py-3 font-bold text-white" to="/reservation">
                New booking
              </Link>
            </div>

            {loading ? (
              <p className="mt-6 text-stone-300">Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <p className="mt-6 rounded-2xl bg-black/25 p-5 text-stone-300">
                No bookings yet. Your confirmed table bookings will appear here.
              </p>
            ) : (
              <div className="mt-6 grid gap-4">
                {bookings.map((booking) => (
                  <article className="rounded-2xl border border-white/10 bg-black/25 p-5" key={booking._id}>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="inline-flex items-center gap-2 text-sm text-amber-200">
                          <Table2 className="size-4" />
                          Table {booking.tableNumber}
                        </span>
                        <strong className="mt-2 block text-2xl text-white">
                          {formatTime(booking.timeSlot)}
                        </strong>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-stone-200">
                        <CalendarDays className="size-4" />
                        {booking.date}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}

function ProfileLine({ icon: Icon, text }) {
  return (
    <p className="mt-4 flex items-center gap-3 text-stone-300">
      <Icon className="size-5 text-amber-200" />
      <span>{text || 'Not available'}</span>
    </p>
  )
}

function formatTime(timeSlot) {
  return timeSlots.find((slot) => slot.value === timeSlot)?.label || timeSlot
}

export default Profile
