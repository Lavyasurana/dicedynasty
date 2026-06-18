import { CalendarCheck, Castle, Star } from 'lucide-react'
import GameCover from '../components/GameCover'
import PremiumButton from '../components/PremiumButton'
import SectionIntro from '../components/SectionIntro'
import {
  events,
  featuredGames,
  heroGames,
  stats,
  testimonials,
} from '../data/siteData'

function Home() {
  return (
    <>
      <Hero />
      <FeaturedGames />
      <Stats />
      <EventShowcase />
      <Testimonials />
      <ReservationCta />
    </>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-[125svh] items-center px-4 pb-20 pt-24 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#00665E]/45 bg-slate-200/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-100 shadow-2xl shadow-slate-950/25 backdrop-blur-xl sm:tracking-[0.28em]">
          <Castle className="size-4 shrink-0" />
          <span className="truncate">Mumbai&apos;s Board Game Kingdom</span>
        </p>
        <h1 className="max-w-[760px] text-[clamp(3rem,6.8vw,6.2rem)] font-black leading-[0.88] tracking-normal text-white">
          Roll The Dice.
          <span className="block text-[#78d6ce] drop-shadow-[0_10px_36px_rgba(0,102,94,0.34)]">
            Rule The Kingdom.
          </span>
        </h1>
        <div className="mt-7 flex max-w-4xl flex-col gap-4 sm:flex-row">
          <PremiumButton className="w-full sm:w-auto" to="/reservation">
            Reserve Table
          </PremiumButton>
          <PremiumButton className="w-full sm:w-auto" to="/#featured-games" variant="secondary">
            Explore Game Library
          </PremiumButton>
        </div>
      </div>
    </section>
  )
}

function FeaturedGames() {
  const games = featuredGames.map((title, index) => ({
    title,
    tone: heroGames[index].tone,
  }))

  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-8" id="featured-games">
      <SectionIntro eyebrow="Featured games" title="A shelf that keeps the table talking." />
      <div className="mt-10 overflow-x-auto pb-5 [scrollbar-color:rgba(212,175,55,.8)_rgba(255,255,255,.08)] [scrollbar-width:thin]">
        <div className="flex w-max gap-5">
          {games.map((game) => (
            <GameCover className="h-[330px] w-[230px] shrink-0" game={game} key={game.title} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-8">
 
    </section>
  )
}

function EventShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-8">
      <SectionIntro eyebrow="Event showcase" title="Designed for every kind of gathering." />
      <div className="mt-12 space-y-8">
        {events.map((event, index) => (
          <article
            className={`grid items-center gap-6 rounded-[2rem] border border-slate-200/15 bg-slate-200/[0.08] p-4 shadow-2xl shadow-slate-950/20 backdrop-blur-xl lg:grid-cols-2 ${index % 2 ? 'lg:[&>img]:order-2' : ''}`}
            key={event.title}
          >
            <img className="h-72 w-full rounded-[1.5rem] object-cover sm:h-96" src={event.image} alt={event.title} />
            <div className="p-4 sm:p-8">
              <h2 className="text-3xl font-black text-white sm:text-5xl">{event.title}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">{event.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-8">
      <SectionIntro eyebrow="Player love" title="The kingdom has regulars for a reason." />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article
            className="rounded-[2rem] border border-slate-200/15 bg-slate-200/[0.08] p-6 shadow-2xl shadow-slate-950/25 backdrop-blur-xl"
            key={item.name}
          >
            <div className="flex gap-1 text-[#76d5cd]">
              {Array.from({ length: 5 }, (_, star) => (
                <Star className="size-5 fill-current" key={star} />
              ))}
            </div>
            <p className="mt-6 text-lg leading-8 text-slate-200">&ldquo;{item.text}&rdquo;</p>
            <div className="mt-8 flex items-center gap-4">
              <img className="size-14 rounded-full object-cover ring-2 ring-[#00665E]/40" src={item.image} alt={item.name} />
              <div>
                <strong className="block text-white">{item.name}</strong>
                <span className="text-sm text-slate-400">{item.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ReservationCta() {
  return (
    <section className="px-4 pb-20 pt-10 sm:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-slate-200/20 bg-[radial-gradient(circle_at_20%_20%,rgba(0,102,94,0.24),transparent_28%),linear-gradient(135deg,#334155,#111827)] p-8 text-center shadow-2xl shadow-slate-950/40 sm:p-16">
        <CalendarCheck className="mx-auto size-12 text-[#76d5cd]" />
        <h2 className="mt-5 text-4xl font-black text-white sm:text-6xl">Your Table Awaits</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Step into the cafe, choose your game, and let the evening become a story.
        </p>
        <PremiumButton className="mt-8 w-full sm:w-auto" to="/reservation">
          Reserve Now
        </PremiumButton>
      </div>
    </section>
  )
}

export default Home
