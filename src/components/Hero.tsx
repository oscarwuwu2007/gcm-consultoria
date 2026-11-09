import { useEffect, useState } from "react"
import heroImg from "../assets/hero.webp"
import missionImg from "../assets/mission.webp"
import yearsImg from "../assets/years.webp"
import { Link } from "../router"

const ICONS = {
  // building
  structure: [
    "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",
    "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",
    "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",
    "M10 6h4M10 10h4M10 14h4M10 18h4",
  ],
  // user plus
  people: [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
    "M19 8v6M22 11h-6",
  ],
  // graduation cap
  learn: [
    "M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0Z",
    "M22 10v6",
    "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
  ],
}

const CHOICES = [
  { label: "Quiero ordenar mi empresa", to: "/consultoria", icon: ICONS.structure },
  { label: "Necesito contratar personal", to: "/bolsa-empleo", icon: ICONS.people },
  { label: "Quiero capacitar a mi equipo", to: "/capacitacion", icon: ICONS.learn },
]

const SLIDES = [
  { src: heroImg, pos: "50% 30%", label: "Equipo trabajando en conjunto" },
  { src: missionImg, pos: "50% 45%", label: "Contratación y documentos" },
  { src: yearsImg, pos: "50% 50%", label: "Equipo en capacitación" },
]

export function Hero() {
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => {
      if (!document.hidden) setSlide((i) => (i + 1) % SLIDES.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [paused, slide])

  return (
    <section
      id="inicio"
      className="relative z-0 flex flex-col overflow-hidden bg-forest text-white sticky top-0 min-h-svh"
    >
      {SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt=""
          width={2000}
          height={1321}
          fetchPriority={i === 0 ? "high" : "auto"}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          aria-hidden={i !== slide}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: s.pos,
            opacity: i === slide ? 1 : 0,
            transform: i === slide ? "scale(1.06)" : "scale(1)",
            transition: "opacity 1200ms ease, transform 7000ms linear",
          }}
        />
      ))}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.62) 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 pb-8 pt-24 text-center sm:px-8 sm:pb-14 sm:pt-36">
        <h1 className="rise rise-1 text-[3rem] font-extrabold leading-[0.98] tracking-tighter sm:text-7xl lg:text-[6.25rem]">
          Usted dirige.
          <br />
          <span className="text-brand">Nosotros ordenamos.</span>
        </h1>
        <p className="rise rise-2 mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-white/90 sm:mt-7 sm:text-xl">
          Estructura, personal y capacitación para su empresa. Sin complicaciones.
        </p>

        <div className="rise rise-3 mt-8 w-full sm:mt-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            ¿Qué necesita hoy?
          </p>
          <ul className="mx-auto grid max-w-5xl gap-2.5 sm:gap-3 md:grid-cols-3">
            {CHOICES.map((c) => (
              <li key={c.to}>
                <Link
                  to={c.to}
                  className="hero-choice group flex h-full items-center gap-4 rounded-full border border-white/35 bg-white/15 py-2 pl-2 pr-5 text-left text-[15px] sm:py-3 sm:pl-3 sm:pr-6 sm:text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-forest hover:shadow-[0_14px_30px_rgba(0,0,0,0.3)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-forest sm:h-12 sm:w-12 transition-colors duration-300 group-hover:bg-forest group-hover:text-brand"
                  >
                    <svg viewBox="0 0 24 24" className="h-[26px] w-[26px]" fill="none">
                      {c.icon.map((d) => (
                        <path key={d} d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      ))}
                    </svg>
                  </span>
                  <span className="flex-1 leading-snug">{c.label}</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rise rise-3 mt-6 flex items-center gap-2 sm:mt-8"
          role="group"
          aria-label="Cambiar imagen"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setSlide(i)}
              aria-label={`Imagen ${i + 1}: ${s.label}`}
              aria-current={i === slide}
              className="group flex h-6 items-center px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ${
                  i === slide ? "w-10 bg-brand" : "w-4 bg-white/50 group-hover:bg-white/80"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
