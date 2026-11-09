import type { ReactNode } from "react"
import {
  AngledBars,
  DotTrio,
  LeafFragment,
  MiniRibbon,
  MiniRing,
} from "./decorative/Decorative"
import { GrowBar, Reveal, WordReveal } from "./Reveal"

const ROW_ONE: { name: string; icon: ReactNode }[] = [
  { name: "Cliente 01", icon: <LeafFragment className="h-7 w-auto" color="#4E7D1E" /> },
  { name: "Cliente 02", icon: <MiniRing className="h-7 w-auto" /> },
  { name: "Cliente 03", icon: <DotTrio className="h-7 w-auto" /> },
  { name: "Cliente 04", icon: <MiniRibbon className="h-4 w-auto" color="#4E7D1E" /> },
  { name: "Cliente 05", icon: <AngledBars className="h-8 w-auto" /> },
  { name: "Cliente 06", icon: <LeafFragment className="h-7 w-auto" /> },
]

const ROW_TWO = [...ROW_ONE].reverse().map((c, i) => ({ ...c, name: `Cliente ${i + 7 < 10 ? "0" : ""}${i + 7}` }))

function Logo({ name, icon }: { name: string; icon: ReactNode }) {
  return (
    <div className="flex h-20 w-56 shrink-0 items-center gap-3 rounded-2xl border border-line bg-white px-6">
      <span className="flex w-8 justify-center">{icon}</span>
      <span className="text-lg font-bold tracking-tight text-ink-soft">{name}</span>
    </div>
  )
}

function Row({ items, reverse = false }: { items: typeof ROW_ONE; reverse?: boolean }) {
  const loop = [...items, ...items]
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className={`flex w-max gap-4 pr-4 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}
      >
        {loop.map((c, i) => (
          <Logo key={i} name={c.name} icon={c.icon} />
        ))}
      </div>
    </div>
  )
}

export function Clients() {
  return (
    <section id="clientes" className="overflow-hidden bg-white py-14 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-deep">
            <LeafFragment className="h-4 w-auto" />
            Clientes
          </p>
        </Reveal>
        <WordReveal
          text="Empresas que ya ordenamos."
          className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl"
        />
        <div className="mt-8">
          <GrowBar delay={400} />
        </div>
      </div>

      <Reveal className="mt-8 flex flex-col sm:mt-14 gap-4" delay={200}>
        <Row items={ROW_ONE} />
        <Row items={ROW_TWO} reverse />
      </Reveal>
    </section>
  )
}
