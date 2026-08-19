import { Navigate, Route, Routes } from 'react-router-dom'
import FixedHeroBackground from './components/FixedHeroBackground'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import Auth from './pages/Auth'
import About from './pages/About'
import ConfirmBooking from './pages/ConfirmBooking'
import Home from './pages/Home'
import { PrivacyPolicy, ReturnPolicy, TermsAndConditions } from './pages/Legal'
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
        <Route element={<About />} path="/about" />
        <Route element={<Reservation />} path="/reservation" />
        <Route element={<ConfirmBooking />} path="/reservation/confirm" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<TermsAndConditions />} path="/terms-and-conditions" />
        <Route element={<ReturnPolicy />} path="/return-policy" />
        <Route element={<PrivacyPolicy />} path="/privacy-policy" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
      </div>
      <Footer />
    </main>
    </ToastProvider>
    </AuthProvider>
  )
}

export default App
