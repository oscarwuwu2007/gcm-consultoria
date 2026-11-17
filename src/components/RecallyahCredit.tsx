import recallyahLogo from "../assets/recallyah-logo.webp"

export function RecallyahCredit() {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-medium text-white/45 transition-colors hover:text-white/80">
      <img
        src={recallyahLogo}
        alt="Recallyah"
        width={249}
        height={293}
        loading="lazy"
        decoding="async"
        className="h-5 w-auto opacity-80 drop-shadow-[0_0_6px_rgba(135,194,68,0.45)]"
      />
      <span>
        Hecho por <span className="font-bold">Recallyah Team</span>
      </span>
    </p>
  )
}
