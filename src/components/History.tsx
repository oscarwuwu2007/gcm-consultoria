import { useEffect, useRef, useState } from "react"
import { useInView } from "../hooks/useInView"
import { Link } from "../router"
import { SectionTitle } from "./ui/SectionTitle"

const MILESTONES: { year: string; title?: string; body: string }[] = [
  {
    year: "2009",
    title: "Nace GCM",
    body: "Con la idea de proporcionar a las empresas servicios en Desarrollo Organizacional, basados en la experiencia profesional de más de 17 años de su fundadora.",
  },
  {
    year: "2012",
    body: "Se incorporan servicios de capacitación y consultoría en diversas especialidades con profesionales de alta trayectoria.",
  },
  {
    year: "2018",
    body: "Se consolidan los servicios de Organización y Logística de Eventos Corporativos y Congresos.",
  },
  {
    year: "2023",
    body: "Se consolida el método de trabajo especializado para conectar a personas talentosas con empresas que valoran el potencial humano.",
  },
  {
    year: "2026",
    body: "Innovando para impulsar el crecimiento de las organizaciones a través de una gestión humana cercana, ética, tecnológica y especializada.",
  },
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
        {title && <h3 className="mt-2 text-xl font-bold text-white sm:mt-3 sm:text-3xl">{title}</h3>}
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
          <SectionTitle title="Nuestra historia" tone="dark" className="flex flex-col items-center text-center" />
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
