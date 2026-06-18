import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `block rounded-full px-5 py-2 text-sm font-semibold transition backdrop-blur-xl ${
      isActive
        ? 'bg-[#00665E] text-white shadow-lg shadow-[#00665E]/25'
        : 'bg-slate-900/45 text-slate-300 hover:bg-slate-900/65 hover:text-white'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
      isActive ? 'bg-[#00665E] text-white' : 'text-slate-200 hover:bg-white/10 hover:text-white'
    }`

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/reservation', label: 'Reserve' },
  ]

  function handleLogout() {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 mx-auto w-full px-4 py-4 sm:px-8">
      <div className="flex items-center justify-between">
        <NavLink
          className="group flex items-center gap-3 rounded-full border border-slate-200/15 bg-slate-900/45 px-3 py-2 text-left shadow-2xl shadow-slate-950/20 backdrop-blur-xl"
          to="/"
        >
          <span className="grid size-11 place-items-center rounded-full bg-[#00665E] font-black text-white shadow-lg shadow-[#00665E]/30">
            DD
          </span>
          <span className="hidden font-semibold tracking-wide text-white sm:block">Dice Dynasty</span>
        </NavLink>

        <div className="hidden items-center gap-3 md:flex">
          {navLinks.map((link) => (
            <NavLink className={linkClass} key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
          {isLoggedIn ? (
            <>
              <NavLink className={linkClass} to="/profile">
                Profile
              </NavLink>
              <button
                className="rounded-full bg-slate-900/45 px-5 py-2 text-sm font-semibold text-slate-300 transition backdrop-blur-xl hover:bg-slate-900/65 hover:text-white"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink className={linkClass} to="/auth">
              Login
            </NavLink>
          )}
        </div>

        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="grid size-11 place-items-center rounded-full border border-slate-200/15 bg-slate-900/45 text-white shadow-2xl shadow-slate-950/20 backdrop-blur-xl md:hidden"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="mt-3 rounded-[1.5rem] border border-slate-200/15 bg-slate-900/95 p-2 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <NavLink className={mobileLinkClass} key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
          {isLoggedIn ? (
            <>
              <NavLink className={mobileLinkClass} to="/profile">
                Profile
              </NavLink>
              <button
                className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink className={mobileLinkClass} to="/auth">
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
