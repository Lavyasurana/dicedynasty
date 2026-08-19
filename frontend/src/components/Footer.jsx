import { Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/70 px-4 py-10 backdrop-blur-xl sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-black tracking-wide text-white">Dice Dynasty</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-stone-400">Mumbai&apos;s board game kingdom for unforgettable tables and brilliant game nights.</p>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-200">Policies</p>
          <div className="mt-3 flex flex-col items-start gap-2 text-sm font-bold text-stone-300">
            <Link className="hover:text-white" to="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link className="hover:text-white" to="/return-policy">Return Policy</Link>
            <Link className="hover:text-white" to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-200">Contact</p>
          <div className="mt-3 space-y-2 text-sm font-bold text-stone-300">
            <a className="flex items-center gap-2 hover:text-white" href="tel:+919876543210"><Phone className="size-4 text-[#78d6ce]" />+91 98765 43210</a>
            <a className="flex items-center gap-2 hover:text-white" href="mailto:hello@dicedynasty.in"><Mail className="size-4 text-[#78d6ce]" />hello@dicedynasty.in</a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs text-stone-500">© {new Date().getFullYear()} Dice Dynasty. All rights reserved.</p>
    </footer>
  )
}

export default Footer
