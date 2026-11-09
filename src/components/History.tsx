import { useEffect, useRef, useState } from "react"
import { useInView } from "../hooks/useInView"
import { Link } from "../router"
import { LeafFragment } from "./decorative/Decorative"
import { Reveal, WordReveal } from "./Reveal"

const MILESTONES = [
  { year: "2010", title: "Nace GCM", body: "Abrimos con una idea simple: ordenar empresas costarricenses." },
  { year: "2013", title: "Estructura y procesos", body: "Primeros proyectos completos de estructura organizacional." },
  { year: "2016", title: "Capacitación", body: "Sumamos formación para los equipos que ya habíamos ordenado." },
  { year: "2019", title: "Reclutamiento", body: "Lanzamos la bolsa de empleo para conectar empresas y talento." },
  { year: "2022", title: "Más allá de Costa Rica", body: "Empezamos a atender empresas de la región." },
  { year: "Hoy", title: "16 años", body: "Seguimos con el mismo trato directo del primer día." },
]

function Item({ year, title, body, index }: (typeof MILESTONES)[number] & { index: number }) {
  const [ref, inView] = useInView<HTMLLIElement>(0.5)
  const left = index % 2 === 0

  return (
    <li ref={ref} className="relative pb-7 last:pb-0 sm:pb-20 md:grid md:grid-cols-2 md:gap-24">
      <span
        aria-hidden="true"
        className={`absolute left-4 top-3 z-10 h-5 w-5 -translate-x-1/2 rounded-full border-2 transition-all duration-700 md:left-1/2 ${
          inView ? "scale-125 border-brand bg-brand" : "border-white/30 bg-forest"
        }`}
      />
      <div
        className={`pl-12 transition-all duration-[900ms] ease-out motion-reduce:transition-none md:pl-0 ${
          left ? "md:col-start-1 md:text-right" : "md:col-start-2"
        } ${inView ? "translate-x-0 opacity-100" : `opacity-0 ${left ? "md:-translate-x-12" : "md:translate-x-12"} translate-y-8 md:translate-y-0`}`}
      >
        <p className="text-4xl font-extrabold tracking-tight text-brand sm:text-7xl">{year}</p>
        <h3 className="mt-2 text-xl font-bold text-white sm:mt-3 sm:text-3xl">{title}</h3>
        <p className={`mt-2 max-w-sm text-sm sm:mt-3 sm:text-base font-medium leading-relaxed text-white/70 ${left ? "md:ml-auto" : ""}`}>
          {body}
        </p>
      </div>
    </li>
  )
}

export function History() {
  const listRef = useRef<HTMLOListElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = listRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const p = (window.innerHeight * 0.55 - r.top) / r.height
      setProgress(Math.min(1, Math.max(0, p)))
    }
    let frame = 0
    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0
          update()
        })
      }
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      id="historia"
      className="relative overflow-hidden bg-forest min-h-screen px-4 pb-14 pt-28 sm:px-6 sm:pb-28 sm:pt-40 lg:pb-40"
      style={{
        backgroundImage:
          "radial-gradient(50% 40% at 0% 0%, rgba(135,194,68,0.14), transparent 70%)",
      }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center sm:mb-20">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              <LeafFragment className="h-4 w-auto" />
              Nuestra historia
            </p>
          </Reveal>
          <WordReveal
            text="Así hemos crecido."
            className="text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-7xl"
          />
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-white/15 md:left-1/2">
            <div
              className="w-full bg-brand"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
          <ol ref={listRef} className="relative">
            {MILESTONES.map((m, i) => (
              <Item key={m.year} {...m} index={i} />
            ))}
          </ol>
        </div>
        <div className="mt-16 flex justify-center sm:mt-24">
          <Link
            to="/#quienes-somos"
            className="btn btn-brand h-14 gap-3 px-9 text-base"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}
