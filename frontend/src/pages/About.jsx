import { Dice5, HeartHandshake, UsersRound } from 'lucide-react'
import PremiumButton from '../components/PremiumButton'

const values = [
  { icon: Dice5, title: 'Games for everyone', text: 'From first rolls to expert strategy, we help every table find a game worth talking about.' },
  { icon: UsersRound, title: 'Tables that connect', text: 'Dice Dynasty is built for friends, families, teams, and new rivals who become regulars.' },
  { icon: HeartHandshake, title: 'Warm hospitality', text: 'Thoughtful hosts, great game recommendations, and a comfortable space make every visit easy.' },
]

function About() {
  return (
    <section className="min-h-svh px-4 pb-20 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-200">About Dice Dynasty</p>
        <div className="mt-5 grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] text-white sm:text-7xl">A kingdom built around the table.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">Dice Dynasty is Mumbai&apos;s home for board-game lovers: a place to discover brilliant games, share a table, and leave with a story from the night.</p>
          </div>
          <div className="border-l-2 border-[#78d6ce] bg-slate-950/45 p-6 backdrop-blur-xl">
            <p className="text-2xl font-black text-white">Play more. Connect more.</p>
            <p className="mt-3 leading-7 text-stone-300">Whether you arrive with a group or join a table, our team makes it simple to settle in and start playing.</p>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <article className="bg-slate-950/75 p-7" key={title}>
              <Icon className="size-8 text-[#78d6ce]" />
              <h2 className="mt-8 text-2xl font-black text-white">{title}</h2>
              <p className="mt-3 leading-7 text-stone-300">{text}</p>
            </article>
          ))}
        </div>

        <PremiumButton className="mt-12 w-full sm:w-auto" to="/reservation">Reserve your table</PremiumButton>
      </div>
    </section>
  )
}

export default About
