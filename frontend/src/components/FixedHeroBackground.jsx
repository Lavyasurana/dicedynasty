import { backgroundGames } from '../data/siteData'

function GameGalaxy() {
  const sizeClasses = {
    sm: 'h-28 w-20 sm:h-32 sm:w-24',
    md: 'h-36 w-28 sm:h-44 sm:w-32',
    lg: 'h-44 w-32 sm:h-52 sm:w-40',
  }

  return (
    <div className="absolute inset-0">
      {backgroundGames.map((game, index) => (
        <article
          className={`absolute overflow-hidden rounded-2xl border border-white/35 bg-gradient-to-br ${game.tone} text-white shadow-[0_20px_60px_rgba(15,23,42,.55),0_0_30px_rgba(0,102,94,.12),inset_0_1px_0_rgba(255,255,255,.3)] ${sizeClasses[game.size]}`}
          key={`${game.title}-${index}`}
          style={{
            left: `${game.left}%`,
            top: `${game.top}%`,
            opacity: game.left < 35 ? 0.72 : 0.88,
            transform: `translate(-50%, -50%) rotate(${game.rotate}deg)`,
            zIndex: Math.round(game.left + game.top / 10),
          }}
        >
          {game.image && (
            <img
              alt={`${game.title} board game cover`}
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              src={game.image}
            />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-900/8 to-transparent" />
          <span className="absolute inset-1.5 rounded-xl border border-white/20" />
          <strong className="absolute bottom-2 left-2 right-2 z-10 text-sm font-black leading-tight drop-shadow-2xl sm:text-base">
            {game.title}
          </strong>
        </article>
      ))}
      <div className="absolute left-1/2 top-1/2 z-[120] grid size-36 -translate-x-1/2 -translate-y-1/2 rotate-45 place-items-center rounded-[1.75rem] border border-slate-100/70 bg-[linear-gradient(135deg,#f8fafc,#94a3b8_48%,#00665E)] shadow-[0_0_90px_rgba(0,102,94,.5),0_30px_80px_rgba(15,23,42,.6),inset_0_2px_0_rgba(255,255,255,.6)] sm:size-48">
        <div className="grid size-20 grid-cols-3 grid-rows-3 gap-1.5 sm:size-28 sm:gap-2">
          {[0, 2, 4, 6, 8].map((dot) => (
            <span
              className="rounded-full bg-slate-900 shadow-inner"
              key={dot}
              style={{ gridColumnStart: (dot % 3) + 1, gridRowStart: Math.floor(dot / 3) + 1 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function FixedHeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_76%_28%,rgba(0,102,94,0.3),transparent_26%),radial-gradient(circle_at_12%_18%,rgba(148,163,184,0.24),transparent_30%),linear-gradient(135deg,#0f172a_0%,#1f2937_44%,#334155_100%)]"
    >
      <div className="absolute inset-0 opacity-80">
        <div className="absolute left-[52%] top-[-16%] h-[92vh] w-[26vw] min-w-72 rotate-[28deg] bg-gradient-to-b from-slate-200/22 via-slate-200/6 to-transparent blur-sm" />
        <div className="absolute left-[66%] top-[-18%] h-[94vh] w-[22vw] min-w-64 rotate-[48deg] bg-gradient-to-b from-[#00665E]/38 via-[#00665E]/8 to-transparent blur-md" />
        <div className="absolute right-[4%] top-[10%] size-[46rem] rounded-full bg-[#00665E]/24 blur-3xl" />
        <div className="absolute right-[16%] top-[20%] size-[34rem] rounded-full bg-slate-200/12 blur-3xl" />
      </div>
      <div className="absolute inset-0 overflow-hidden opacity-85">
        <GameGalaxy />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,23,42,0.78)_0%,rgba(15,23,42,0.64)_32%,rgba(31,41,55,0.38)_58%,rgba(15,23,42,0.55)_100%)]" />
    </div>
  )
}

export default FixedHeroBackground
