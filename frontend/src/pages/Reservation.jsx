import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config/api'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { tables, timeSlots } from '../data/siteData'

function getToday() {
  return new Date().toISOString().split('T')[0]
}

function Reservation() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const { showToast } = useToast()
  const [selectedDate, setSelectedDate] = useState(getToday())
  const [selectedTime, setSelectedTime] = useState(timeSlots[0].value)
  const [bookings, setBookings] = useState([])
  const [statusMessage, setStatusMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadBookings() {
      setLoading(true)
      setStatusMessage('')

      try {
        const params = new URLSearchParams({
          date: selectedDate,
          timeSlot: selectedTime,
        })
        const response = await fetch(`${API_URL}/bookings?${params.toString()}`, {
          signal: controller.signal,
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Could not load table availability')
        }

        setBookings(data.bookings || [])
      } catch (error) {
        if (error.name !== 'AbortError') {
          setBookings([])
          setStatusMessage(error.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadBookings()

    return () => controller.abort()
  }, [selectedDate, selectedTime])

  const tableStatus = useMemo(
    () => {
      const bookedTables = new Set(bookings.map((booking) => Number(booking.tableNumber)))

      return tables.map((table) => ({
        ...table,
        booked: bookedTables.has(table.id),
      }))
    },
    [bookings],
  )

  const availableTables = tableStatus.filter((table) => !table.booked).length
  const selectedLabel = timeSlots.find((slot) => slot.value === selectedTime)?.label

  function openConfirmation(table) {
    if (table.booked) {
      return
    }

    if (!isLoggedIn) {
      showToast('Login first')
      navigate('/auth')
      return
    }

    const params = new URLSearchParams({
      date: selectedDate,
      timeSlot: selectedTime,
      table: String(table.id),
    })

    navigate(`/reservation/confirm?${params.toString()}`)
  }

  return (
    <section className="min-h-svh px-4 pb-16 pt-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.32em] text-amber-200">Table reservation</p>
          <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-black leading-tight text-white">
            Choose your game night slot.
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-300">
            Select a date, pick a one-hour slot between 1 PM and 11 PM, then view
            the eight cafe tables by availability.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[340px_1fr]">
          <aside className="h-max rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <label className="mb-2 block font-bold text-white" htmlFor="date">
              Select date
            </label>
            <input
              className="h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none ring-[#00665E]/40 focus:ring-4"
              id="date"
              min={getToday()}
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1" aria-label="Available time slots">
              {timeSlots.map((slot) => (
                <button
                  className={`min-h-12 rounded-xl px-4 font-semibold transition ${
                    selectedTime === slot.value
                      ? 'bg-[#00665E] text-white shadow-lg shadow-[#00665E]/30'
                      : 'bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white'
                  }`}
                  key={slot.value}
                  type="button"
                  onClick={() => setSelectedTime(slot.value)}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-200">{selectedDate}</p>
                <h2 className="mt-2 text-4xl font-black text-white">{selectedLabel}</h2>
              </div>
              <strong className="w-max rounded-full bg-[#00665E]/20 px-4 py-2 text-[#6ee7df]">
                {loading ? 'Checking...' : `${availableTables} / 8 available`}
              </strong>
            </div>

            {statusMessage && (
              <p className="mt-5 rounded-2xl bg-red-500/15 p-4 text-sm text-red-200">{statusMessage}</p>
            )}

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-stone-300">
              <span className="inline-flex items-center gap-2">
                <i className="size-3 rounded-full bg-emerald-500" />
                Available
              </span>
              <span className="inline-flex items-center gap-2">
                <i className="size-3 rounded-full bg-red-500" />
                Booked
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {tableStatus.map((table) => (
                <button
                  className={`min-h-36 rounded-2xl p-5 text-left text-white shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-200/40 ${
                    table.booked
                      ? 'cursor-not-allowed bg-red-500/90 shadow-red-950/30'
                      : 'cursor-pointer bg-emerald-600 shadow-emerald-950/30 hover:bg-emerald-500'
                  }`}
                  disabled={table.booked}
                  key={table.id}
                  type="button"
                  onClick={() => openConfirmation(table)}
                >
                  <span className="text-sm opacity-85">Table {table.id}</span>
                  <strong className="mt-4 block text-2xl">{table.booked ? 'Booked' : 'Available'}</strong>
                  <small className="mt-5 block opacity-90">
                    {table.seats} seats · {table.zone}
                  </small>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default Reservation
