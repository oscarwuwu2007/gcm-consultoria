import { useEffect, useRef, useState } from "react"
import visionImg from "../assets/vision.webp"
import { LogoIcon } from "./Logo"
import { SectionTitle } from "./ui/SectionTitle"

/**
 * wise.com "Everyday, everywhere" style, in normal page flow (nothing slides
 * over other sections): a photo card opens out to full width by itself,
 * fast, as soon as the section is on screen. Text only fades in (no zoom or
 * movement); the round icon between the lines pops in and keeps flipping.
 */
export function Vision() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.4) setOpen(true)
        else if (entry.intersectionRatio < 0.03) setOpen(false)
      },
      { threshold: [0, 0.03, 0.4] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)"

  return (
    <section
      ref={ref}
      id="vision"
      aria-label="Visión"
      className="relative h-screen min-h-[34rem] overflow-hidden bg-white"
    >
      {/* Photo card that opens to full bleed */}
      <div
        className="absolute inset-0 bg-forest"
        style={{
          clipPath: open
            ? "inset(0% 0% 0% 0% round 0rem)"
            : "inset(14% calc(50% - min(39vw, 13rem)) 14% calc(50% - min(39vw, 13rem)) round 2rem)",
          transition: `clip-path 800ms ${ease}`,
          willChange: "clip-path",
        }}
      >
        <img
          src={visionImg}
          alt=""
          width={1200}
          height={900}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black"
          style={{ opacity: open ? 0.45 : 0.15, transition: `opacity 800ms ${ease}` }}
        />
      </div>

      {/* Pill on the closed card */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 text-lg font-semibold text-forest shadow-xl sm:text-xl"
        style={{ opacity: open ? 0 : 1, transition: "opacity 300ms ease" }}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand sm:h-14 sm:w-14">
          <LogoIcon className="h-6 w-auto sm:h-7" fill="#0e1a09" />
        </span>
        Nuestra visión
      </div>

      {/* Headline: fades in, no movement */}
      <div
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center"
        style={{
          opacity: open ? 1 : 0,
          transition: `opacity 500ms ease ${open ? "350ms" : "0ms"}`,
        }}
      >
        <span
          aria-hidden="true"
          className={`vision-icon relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand sm:h-20 sm:w-20 ${
            open ? "vision-icon-on" : ""
          }`}
        >
          <LogoIcon className="h-7 w-auto sm:h-10" fill="#0e1a09" />
        </span>
        <SectionTitle
          title="VISIÓN"
          size="xl"
          tone="dark"
          lead="Transformar la gestión del talento humano siendo el puente de confianza entre personas talentosas y empresas comprometidas con su desarrollo."
          className="flex flex-col items-center [&_p]:mx-auto"
        />
      </div>
    </section>
  )
}
