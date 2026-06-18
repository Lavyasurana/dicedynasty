function GameCover({ game, className = '', floating = false }) {
  const baseClass = `relative overflow-hidden rounded-[28px] border border-slate-200/30 bg-gradient-to-br ${game.tone} p-5 text-white shadow-[0_28px_80px_rgba(15,23,42,0.45),inset_0_1px_0_rgba(255,255,255,0.34)] ${floating ? `absolute ${game.position}` : ''} ${className}`

  return (
    <article className={baseClass}>
      {game.image && (
        <img
          alt={`${game.title} board game cover`}
          className="absolute inset-0 size-full object-cover"
          src={game.image}
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/20 to-transparent" />
      <span className="absolute inset-3 rounded-[22px] border border-white/25" />
      <span className="relative z-10 rounded-full bg-slate-100/88 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.22em] text-[#00665E]">
        {floating ? 'Dynasty Pick' : 'Featured'}
      </span>
      <strong className="absolute bottom-7 left-5 right-5 z-10 block text-[clamp(1.4rem,2.6vw,2.35rem)] font-black leading-[0.92] text-white drop-shadow-2xl">
        {game.title}
      </strong>
    </article>
  )
}

export default GameCover
