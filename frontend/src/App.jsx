import { Navigate, Route, Routes } from 'react-router-dom'
import FixedHeroBackground from './components/FixedHeroBackground'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import Auth from './pages/Auth'
import ConfirmBooking from './pages/ConfirmBooking'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Reservation from './pages/Reservation'

function App() {
  return (
    <AuthProvider>
    <ToastProvider>
    <main className="relative min-h-svh overflow-x-hidden bg-transparent text-stone-100">
      <FixedHeroBackground />
      <Navbar />
      <div className="relative z-10">
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Auth />} path="/auth" />
        <Route element={<Reservation />} path="/reservation" />
        <Route element={<ConfirmBooking />} path="/reservation/confirm" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
      </div>
    </main>
    </ToastProvider>
    </AuthProvider>
  )
}

export default App
