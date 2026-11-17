import missionImg from "../assets/mission.webp"
import { Fragments } from "./decorative/Decorative"
import { Reveal, ZoomFrame } from "./Reveal"
import { SectionTitle } from "./ui/SectionTitle"

export function Mission() {
  return (
    <section
      id="mision"
      className="relative z-0 flex items-center overflow-hidden bg-forest px-4 pb-12 pt-24 sm:px-8 sm:pt-32 lg:min-h-screen"
      style={{
        backgroundImage:
          "radial-gradient(55% 60% at 100% 100%, rgba(78,125,30,0.4), transparent 70%)",
      }}
    >
      <Fragments className="pointer-events-none absolute -bottom-24 -left-20 h-[30rem] w-auto opacity-[0.12]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <div className="mb-6 flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              <span className="h-px w-16 bg-brand/50" />
              <span>Por qué existimos</span>
            </div>
          </Reveal>
          <SectionTitle
            title="MISIÓN"
            size="xl"
            tone="dark"
            bar
            lead="Impulsar el crecimiento de las organizaciones a través de una gestión humana cercana, ética y especializada."
          />
        </div>

        <div className="relative mb-6 mr-5 lg:mr-0">
          <div
            aria-hidden="true"
            className="absolute inset-0 -translate-x-4 translate-y-5 -rotate-3 rounded-3xl bg-brand-deep/60"
          />
          <ZoomFrame
            src={missionImg}
            alt="Dos personas revisando documentos en una mesa"
            width={1200}
            height={900}
            delay={150}
            className="relative aspect-[16/10] w-full lg:aspect-[4/3]"
          />
        </div>
      </div>
    </section>
  )
}
