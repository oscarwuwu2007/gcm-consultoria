import yearsImg from "../assets/years.webp"
import { AngledBars, DotTrio, Fragments, MiniRing } from "./decorative/Decorative"
import { Reveal } from "./Reveal"

export function Years() {
  return (
    <section
      aria-label="Más de 17 años de trayectoria"
      className="relative z-10 overflow-hidden rounded-t-[2.5rem] bg-brand-deep shadow-[0_-24px_60px_rgba(0,0,0,0.35)]"
    >
      <Fragments
        color="#ffffff"
        className="deco-float pointer-events-none absolute left-4 top-6 z-20 h-24 w-auto opacity-30 sm:left-8 sm:top-10 sm:h-32"
      />
      <MiniRing
        color="#ffffff"
        className="deco-float pointer-events-none absolute bottom-5 left-4 z-20 h-14 w-auto opacity-35 [animation-delay:-2s] sm:bottom-10 sm:left-10 sm:h-20"
      />
      <DotTrio
        color="#ffffff"
        className="deco-float pointer-events-none absolute right-4 top-6 z-20 h-12 w-auto opacity-60 [animation-delay:-4s] sm:right-10 sm:top-10 sm:h-16"
      />
      <AngledBars
        color="#87C244"
        className="deco-float pointer-events-none absolute bottom-5 right-4 z-20 h-14 w-auto [animation-delay:-1s] sm:bottom-10 sm:right-10 sm:h-20"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-4 pt-12 sm:px-6 sm:pt-20 lg:min-h-screen lg:py-20">
        <Reveal>
        <p className="select-none text-[24vw] font-extrabold uppercase leading-[0.85] tracking-tighter text-white sm:text-[18vw] lg:text-[9.5rem]">
          +17 años
        </p>
        </Reveal>
        <Reveal delay={150}>
        <p className="mt-5 max-w-sm text-xl font-semibold leading-snug text-white/90 sm:mt-8 md:text-2xl">
          Colaborando con empresas costarricenses a gestionar y desarrollar
          estrategias de Talento Humano.
        </p>
        </Reveal>
      </div>

      <Reveal
        variant="fade"
        className="relative -mt-6 h-72 sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[64%]"
      >
        <img
          src={yearsImg}
          alt="Reunión de trabajo en una mesa de madera"
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover fade-y lg:fade-lb"
        />
      </Reveal>
    </section>
  )
}
