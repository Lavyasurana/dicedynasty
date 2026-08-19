import { Link } from 'react-router-dom'

const terms = [
  {
    title: 'Using Dice Dynasty',
    text: 'Please provide accurate account and reservation information. You are responsible for activity under your account and for keeping your login details secure.',
  },
  {
    title: 'Reservations',
    text: 'A reservation is subject to availability and is confirmed only after the details shown in your booking confirmation have been accepted by Dice Dynasty. Please arrive on time so we can keep the table available for everyone.',
  },
  {
    title: 'Guest conduct',
    text: 'We want every game night to feel welcoming and safe. Treat fellow guests, staff, games, and cafe property with care. We may refuse service or end a visit where conduct is unsafe, disruptive, or damaging.',
  },
  {
    title: 'Changes to these terms',
    text: 'We may update these terms as our service changes. The version posted here applies to your use of the website and future reservations.',
  },
]

const returns = [
  {
    title: 'Reservation cancellations',
    text: 'If you need to cancel or change a reservation, please contact us as soon as possible. Any refund eligibility is based on the cancellation timing and the booking details provided at checkout.',
  },
  {
    title: 'Refunds',
    text: 'Approved refunds are returned to the original payment method. Processing times can vary by payment provider. Non-refundable charges, if any, will be clearly communicated when you book.',
  },
  {
    title: 'Games and merchandise',
    text: 'For unused, unopened merchandise, contact us with your proof of purchase so we can review your request. Opened games, used items, and items damaged after collection are generally not eligible for return.',
  },
  {
    title: 'How to request help',
    text: 'Please include your reservation or order details and the reason for your request when contacting Dice Dynasty. We will review the request and let you know the next steps.',
  },
]

const privacy = [
  {
    title: 'Information we collect',
    text: 'We collect the information you provide when creating an account or making a reservation, such as your name, email address, phone number, and booking details.',
  },
  {
    title: 'How we use your information',
    text: 'We use your information to create and manage your account, process reservations, communicate about your booking, and improve the Dice Dynasty experience.',
  },
  {
    title: 'Keeping information secure',
    text: 'We use reasonable safeguards to protect personal information. Please keep your account credentials private and contact us if you believe your account has been accessed without permission.',
  },
  {
    title: 'Your choices',
    text: 'You can contact us to ask about the personal information associated with your account or to request an update or deletion, subject to our legal and operational requirements.',
  },
]

function Legal({ policy }) {
  const isTerms = policy === 'terms'
  const isReturns = policy === 'returns'
  const sections = isTerms ? terms : isReturns ? returns : privacy
  const title = isTerms ? 'Terms & Conditions' : isReturns ? 'Return Policy' : 'Privacy Policy'
  const intro = isTerms
    ? 'These terms explain the ground rules for creating an account, booking a table, and enjoying Dice Dynasty.'
    : isReturns
      ? 'This policy explains how cancellation, refund, and return requests are handled.'
      : 'This policy explains what personal information Dice Dynasty collects and how it is used.'

  return (
    <section className="min-h-svh px-4 pb-20 pt-32 sm:px-8">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-200">Dice Dynasty</p>
        <h1 className="mt-4 text-4xl font-black text-white sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">{intro}</p>
        <p className="mt-3 text-sm text-stone-400">Last updated: August 4, 2026</p>

        <div className="mt-10 space-y-7">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-black text-white">{section.title}</h2>
              <p className="mt-2 leading-7 text-stone-300">{section.text}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm font-bold">
          <Link className="text-amber-200 underline underline-offset-4 hover:text-amber-100" to="/terms-and-conditions">
            Terms &amp; Conditions
          </Link>
          <Link className="text-amber-200 underline underline-offset-4 hover:text-amber-100" to="/return-policy">
            Return Policy
          </Link>
          <Link className="text-amber-200 underline underline-offset-4 hover:text-amber-100" to="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="text-amber-200 underline underline-offset-4 hover:text-amber-100" to="/auth">
            Create an account
          </Link>
        </div>
      </article>
    </section>
  )
}

export function TermsAndConditions() {
  return <Legal policy="terms" />
}

export function ReturnPolicy() {
  return <Legal policy="returns" />
}

export function PrivacyPolicy() {
  return <Legal policy="privacy" />
}
