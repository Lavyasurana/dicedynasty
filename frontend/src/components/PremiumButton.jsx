import { Link } from 'react-router-dom'

const baseClass =
  'inline-flex min-h-14 cursor-pointer items-center justify-center rounded-full px-7 font-black tracking-normal transition-colors duration-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#00665E]/40'

const variants = {
  primary:
    'border border-[#00665E]/50 bg-[#00665E] text-white shadow-[0_24px_60px_rgba(0,102,94,.24),inset_0_1px_0_rgba(255,255,255,.28)] hover:bg-[#00786f] hover:shadow-[0_28px_70px_rgba(0,102,94,.34),inset_0_1px_0_rgba(255,255,255,.34)]',
  secondary:
    'border border-slate-300/40 bg-slate-200/12 text-slate-50 no-underline shadow-xl shadow-slate-950/20 backdrop-blur-xl hover:bg-slate-200/20',
}

function PremiumButton({ children, className = '', to, variant = 'primary', ...props }) {
  const classes = `${baseClass} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}

export default PremiumButton
