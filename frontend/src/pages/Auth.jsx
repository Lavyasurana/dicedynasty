import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockKeyhole, Mail, Phone, UserRound } from 'lucide-react'
import PremiumButton from '../components/PremiumButton'
import { useAuth } from '../context/AuthContext'

const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api'

function Auth() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    name: '',
    emailId: '',
    password: '',
    phone_no: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const isRegister = mode === 'register'

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    const payload = isRegister
      ? form
      : { emailId: form.emailId, password: form.password }

    try {
      const response = await fetch(`${apiUrl}/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      login(data.token, data.user)
      navigate('/')
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-svh px-4 pb-16 pt-28 sm:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.32em] text-amber-200">Member access</p>
          <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-black leading-tight text-white">
            Join the Dynasty.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
            Create an account to protect your reservations and keep every game night
            tied to your email securely.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
          <div className="mb-7 grid grid-cols-2 rounded-full border border-white/10 bg-black/30 p-1">
            {['login', 'register'].map((item) => (
              <button
                className={`rounded-full px-4 py-3 font-bold capitalize transition ${
                  mode === item ? 'bg-[#00665E] text-white' : 'text-stone-300 hover:text-white'
                }`}
                key={item}
                type="button"
                onClick={() => {
                  setMode(item)
                  setError('')
                  setMessage('')
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isRegister && (
              <Field
                icon={UserRound}
                label="Name"
                name="name"
                onChange={handleChange}
                placeholder="Your full name"
                value={form.name}
              />
            )}
            <Field
              icon={Mail}
              label="Email"
              name="emailId"
              onChange={handleChange}
              placeholder="you@example.com"
              type="email"
              value={form.emailId}
            />
            {isRegister && (
              <Field
                icon={Phone}
                label="Phone number"
                name="phone_no"
                onChange={handleChange}
                placeholder="9876543210"
                value={form.phone_no}
              />
            )}
            <Field
              icon={LockKeyhole}
              label="Password"
              name="password"
              onChange={handleChange}
              placeholder="Minimum 8 chars, Aa + number"
              type="password"
              value={form.password}
            />

            {error && <p className="rounded-2xl bg-red-500/15 p-4 text-sm text-red-200">{error}</p>}
            {message && <p className="rounded-2xl bg-emerald-500/15 p-4 text-sm text-emerald-200">{message}</p>}

            <PremiumButton className="w-full" disabled={loading} type="submit">
              {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Login'}
            </PremiumButton>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ icon: Icon, label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-stone-200">{label}</span>
      <span className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 text-stone-300 ring-[#00665E]/40 focus-within:ring-4">
        <Icon className="size-5 text-amber-200" />
        <input
          className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-stone-500"
          required
          {...props}
        />
      </span>
    </label>
  )
}

export default Auth
