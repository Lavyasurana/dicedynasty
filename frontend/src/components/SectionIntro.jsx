function SectionIntro({ eyebrow, title }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 text-xs font-black uppercase tracking-[0.32em] text-[#76d5cd]">{eyebrow}</p>
      <h2 className="text-4xl font-black leading-tight text-white sm:text-6xl">{title}</h2>
    </div>
  )
}

export default SectionIntro
