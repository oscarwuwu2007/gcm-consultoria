import { GrowBar, Reveal, WordReveal } from "../Reveal"
import { LEAD, TITLE, TITLE_XL, TONES, type Tone } from "./typography"

type Props = {
  title: string
  /** Frase corta bajo el título (nivel 2). */
  lead?: string
  tone?: Tone
  /** "xl" = mayúsculas gigantes (Misión/Visión); "md" = título normal. */
  size?: "md" | "xl"
  bar?: boolean
  className?: string
}

export function SectionTitle({ title, lead, tone = "light", size = "md", bar = false, className = "" }: Props) {
  const t = TONES[tone]
  return (
    <div className={className}>
      <WordReveal text={title} className={`${size === "xl" ? TITLE_XL : TITLE} ${t.title}`} />
      {bar && (
        <div className="mt-6">
          <GrowBar delay={400} tone={tone === "dark" ? "bg-brand" : "bg-brand-deep"} />
        </div>
      )}
      {lead && (
        <Reveal delay={250}>
          <p className={`mt-6 max-w-xl ${LEAD} ${t.lead}`}>{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
