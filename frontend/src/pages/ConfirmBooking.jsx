import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PremiumButton from '../components/PremiumButton'
import { tables, timeSlots } from '../data/siteData'

const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api'

function ConfirmBooking() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date') || ''
  const timeSlot = searchParams.get('timeSlot') || ''
  const tableNumber = Number(searchParams.get('table'))
  const [bookedTables, setBookedTables] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('diceDynastyToken')

  const table = tables.find((item) => item.id === tableNumber)
  const timeLabel = timeSlots.find((slot) => slot.value === timeSlot)?.label || timeSlot
  const isBooked = useMemo(
    () => bookedTables.some((booking) => Number(booking.tableNumber) === tableNumber),
    [bookedTables, tableNumber],
  )

  useEffect(() => {
    if (!date || !timeSlot) {
      return
    }

    async function loadBookings() {
      try {
        const params = new URLSearchParams({ date, timeSlot })
        const response = await fetch(`${apiUrl}/bookings?${params.toString()}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Could not verify this booking slot')
        }

        setBookedTables(data.bookings || [])
      } catch (loadError) {
        setError(loadError.message)
      }
    }

    loadBookings()
  }, [date, timeSlot])

  async function confirmBooking() {
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch(`${apiUrl}/bookings`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, timeSlot, tableNumber }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Booking failed')
      }

      setMessage('Booking confirmed.')
      setBookedTables((current) => [...current, data.booking])
      setTimeout(() => navigate('/profile'), 700)
    } catch (bookingError) {
      setError(bookingError.message)
    } finally {
      setLoading(false)
    }
  }

  if (!table || !date || !timeSlot) {
    return (
      <section className="min-h-svh px-4 pb-16 pt-28 sm:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.07] p-8">
          <h1 className="text-4xl font-black text-white">Choose a table first.</h1>
          <Link className="mt-6 inline-block font-bold text-amber-200" to="/reservation">
            Back to reservations
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-svh px-4 pb-16 pt-28 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.32em] text-amber-200">Confirm booking</p>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
          <div className={`rounded-3xl p-6 text-white ${isBooked ? 'bg-red-500/90' : 'bg-emerald-600'}`}>
            <span className="text-sm opacity-85">Table {table.id}</span>
            <h1 className="mt-3 text-4xl font-black">{isBooked ? 'Already booked' : 'Ready to book'}</h1>
            <p className="mt-4 text-lg opacity-95">
              {table.seats} seats · {table.zone}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Detail label="Date" value={date} />
            <Detail label="Time" value={timeLabel} />
          </div>

          {!token && (
            <p className="mt-6 rounded-2xl bg-amber-300/15 p-4 text-sm text-amber-100">
              Please login before confirming this table.
            </p>
          )}
          {error && <p className="mt-6 rounded-2xl bg-red-500/15 p-4 text-sm text-red-200">{error}</p>}
          {message && <p className="mt-6 rounded-2xl bg-emerald-500/15 p-4 text-sm text-emerald-200">{message}</p>}

          <div className="mt-7 flex flex-wrap gap-3">
            <PremiumButton disabled={!token || isBooked || loading} type="button" onClick={confirmBooking}>
              {loading ? 'Confirming...' : 'Confirm Booking'}
            </PremiumButton>
            {!token && (
              <Link className="rounded-full bg-white/10 px-6 py-3 font-bold text-white hover:bg-white/20" to="/auth">
                Login
              </Link>
            )}
            <Link className="rounded-full bg-white/10 px-6 py-3 font-bold text-white hover:bg-white/20" to="/reservation">
              Change slot
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Detail({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
      <span className="text-sm text-stone-400">{label}</span>
      <strong className="mt-2 block text-2xl text-white">{value}</strong>
    </div>
  )
}

export default ConfirmBooking
