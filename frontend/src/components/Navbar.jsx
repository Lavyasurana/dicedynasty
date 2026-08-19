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
    `block border-b-2 px-1 py-3 text-xs font-black uppercase tracking-[0.16em] transition ${
      isActive
        ? 'border-[#78d6ce] text-white'
        : 'border-transparent text-slate-400 hover:border-slate-500 hover:text-white'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block border-l-2 px-4 py-3 text-sm font-black uppercase tracking-[0.12em] transition ${
      isActive ? 'border-[#78d6ce] bg-white/10 text-white' : 'border-transparent text-slate-300 hover:border-slate-500 hover:bg-white/5 hover:text-white'
    }`

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
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
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/85 px-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-8">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between">
        <NavLink
          className="group flex items-center gap-3 text-left"
          to="/"
        >
          <span className="grid size-10 place-items-center bg-[#00665E] font-black text-white shadow-lg shadow-[#00665E]/30">
            DD
          </span>
          <span className="hidden font-black uppercase tracking-[0.12em] text-white sm:block">Dice Dynasty</span>
        </NavLink>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex">
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
                className="border-b-2 border-transparent px-1 py-3 text-xs font-black uppercase tracking-[0.16em] text-slate-400 transition hover:border-slate-500 hover:text-white"
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
          className="grid size-10 place-items-center border border-white/15 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-b border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:hidden">
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
                className="block w-full border-l-2 border-transparent px-4 py-3 text-left text-sm font-black uppercase tracking-[0.12em] text-slate-300 transition hover:border-slate-500 hover:bg-white/5 hover:text-white"
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
