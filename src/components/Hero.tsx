import { useEffect, useState } from "react"
import missionImg from "../assets/mission.webp"
import yearsImg from "../assets/years.webp"
import docsImg from "../assets/hero-manos-docs.jpg"
import meetingImg from "../assets/hero-manos-reunion.jpg"

const SLIDES = [
  { src: missionImg, pos: "50% 55%", label: "Manos firmando y revisando documentos" },
  { src: docsImg, pos: "50% 50%", label: "Manos conversando sobre un formulario" },
  { src: yearsImg, pos: "50% 50%", label: "Manos tomando notas en reunión" },
  { src: meetingImg, pos: "50% 40%", label: "Manos gesticulando en una reunión" },
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
          <span className="text-brand">Nosotros le apoyamos.</span>
        </h1>
        <p className="rise rise-2 mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-white/90 sm:mt-7 sm:text-xl">
          Brindamos apoyo en las diferentes áreas de la Gestión de Talento Humano para su empresa.
        </p>

        <div
          className="rise rise-3 mt-10 flex items-center gap-2 sm:mt-14"
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
