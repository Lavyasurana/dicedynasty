import { motion } from 'framer-motion'

function ExperienceCard({ experience, index }) {
  const Icon = experience.icon

  return (
    <motion.article
      className="group relative min-h-[440px] overflow-hidden rounded-[2rem] border border-slate-200/18 bg-slate-200/10 p-6 shadow-2xl shadow-slate-950/35 backdrop-blur-xl"
      initial={{ opacity: 0, y: 40 }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -10, scale: 1.01 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <img
        alt=""
        className="absolute inset-0 size-full object-cover opacity-58 transition duration-700 group-hover:scale-110 group-hover:opacity-72"
        src={experience.image}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(0,102,94,0.26),transparent_24%),linear-gradient(180deg,rgba(31,41,55,0.08),rgba(31,41,55,0.42)_40%,rgba(15,23,42,0.92))]" />
      <div className="absolute inset-x-5 top-5 h-24 rounded-full bg-[#00665E]/16 blur-2xl" />
      <div className="relative z-10 flex h-full min-h-[392px] flex-col justify-between">
        <span className="grid size-14 place-items-center rounded-2xl bg-[#00665E]/85 text-white ring-1 ring-slate-100/30 backdrop-blur-xl transition group-hover:scale-110 group-hover:bg-[#008175]">
          <Icon className="size-7" />
        </span>
        <div>
          <h2 className="text-3xl font-black text-white sm:text-4xl">{experience.title}</h2>
          <ul className="mt-5 space-y-2 text-slate-200">
            {experience.lines.map((line) => (
              <li className="flex items-center gap-2" key={line}>
                <span className="size-1.5 rounded-full bg-[#76d5cd]" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  )
}

export default ExperienceCard
