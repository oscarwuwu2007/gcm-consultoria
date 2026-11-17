import aboutImg from "../assets/about.webp"
import { Link } from "../router"
import { Reveal, ZoomFrame } from "./Reveal"
import { SectionTitle } from "./ui/SectionTitle"
import { BODY, TONES } from "./ui/typography"

export function AboutUs() {
  return (
    <section id="quienes-somos" className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle
              title="Quiénes somos"
              lead="Acompañamos la evolución de su negocio aportando nuestra sólida trayectoria en la Gestión de Recursos Humanos."
            />
            <Reveal delay={350}>
              <p className={`mt-4 max-w-lg ${BODY} ${TONES.light.body}`}>
                Nos convertimos en una extensión de su equipo para optimizar la gestión empresarial,
                brindándoles la calidad, cercanía y soluciones especializadas que su organización
                necesita para seguir creciendo.
              </p>
            </Reveal>
            <Reveal delay={500}>
              <Link to="/historia" className="btn btn-deep mt-9 h-14 gap-3 px-8 text-base">
                Conozca nuestra historia
                <svg viewBox="0 0 24 24" className="btn-arrow h-5 w-5" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] bg-brand-pale"
            />
            <ZoomFrame
              src={aboutImg}
              alt="Personas caminando por una plaza"
              width={960}
              height={1200}
              delay={150}
              round="2rem"
              className="relative aspect-[4/3] w-full shadow-[0_24px_60px_rgba(47,76,18,0.18)] lg:aspect-[5/4]"
              imgClassName="kenburns"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
