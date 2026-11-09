import { Link } from "../router"
import { Logo } from "./Logo"
import { Reveal } from "./Reveal"
import { RecallyahCredit } from "./RecallyahCredit"
import { SOCIAL_ICONS } from "./socialIcons"

const NAV = [
  { label: "Inicio", to: "/#inicio" },
  { label: "Quiénes somos", to: "/#quienes-somos" },
  { label: "Nuestra historia", to: "/historia" },
  { label: "Consultoría", to: "/consultoria" },
  { label: "Capacitación", to: "/capacitacion" },
  { label: "Bolsa de empleo", to: "/bolsa-empleo" },
]

const LEGAL = [
  { label: "Términos y condiciones", to: "/terminos" },
  { label: "Política de privacidad", to: "/privacidad" },
  { label: "Política de cookies", to: "/cookies" },
]

const SOCIAL = Object.keys(SOCIAL_ICONS) as (keyof typeof SOCIAL_ICONS)[]

const linkClass = "text-base font-medium text-white/70 transition-colors hover:text-brand"
const headingClass = "mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-brand"

export function Footer() {
  return (
    <footer id="contacto" className="text-white">
      <div className="bg-brand-deep">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-4 py-16 sm:px-8 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
              Contacto
            </p>
            <h2 className="text-[3.6rem] font-extrabold uppercase leading-[0.85] tracking-tighter sm:text-[7rem] lg:text-[8.5rem]">
              ¿Hablamos?
            </h2>
          </div>
          </Reveal>
          <Reveal delay={200}>
          <div className="flex flex-col items-start gap-5 lg:items-end">
            <p className="max-w-xs text-lg font-medium leading-relaxed text-white/90 lg:text-right">
              Cuéntenos qué necesita y le respondemos en un día hábil.
            </p>
            <a
              href="mailto:correo@placeholder.com"
              className="btn btn-brand h-16 px-10 text-lg"
            >
              Agenda una consulta
              <svg viewBox="0 0 24 24" className="btn-arrow h-5 w-5" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </a>
            <a
              href="mailto:correo@placeholder.com"
              className="text-base font-semibold text-white underline decoration-white/50 decoration-2 underline-offset-4 hover:decoration-white"
            >
              [correo@placeholder.com]
            </a>
          </div>
          </Reveal>
        </div>
      </div>

      <div className="bg-forest">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-8">
        <div className="grid gap-10 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-4">
          <Reveal>
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-base font-medium leading-relaxed text-white/70">
              Consultoría organizacional y reclutamiento en Costa Rica.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {SOCIAL.map((name) => (
                <li key={name}>
                  <a
                    href="#"
                    aria-label={name}
                    title={name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand hover:bg-brand hover:text-forest"
                  >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                      <path d={SOCIAL_ICONS[name]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          </Reveal>

          <Reveal delay={100}>
          <nav aria-label="Navegación del pie">
            <h3 className={headingClass}>Navegación</h3>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          </Reveal>

          <Reveal delay={200}>
          <nav aria-label="Información legal">
            <h3 className={headingClass}>Legal</h3>
            <ul className="space-y-3">
              {LEGAL.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          </Reveal>

          <Reveal delay={300}>
          <div>
            <h3 className={headingClass}>Contacto</h3>
            <address className="space-y-3 text-base font-medium not-italic text-white/70">
              <p>[Dirección placeholder]</p>
              <p>San José, Costa Rica</p>
              <p>
                <a href="tel:+50600000000" className="hover:text-brand">
                  [+506 0000-0000]
                </a>
              </p>
              <p>
                <a href="mailto:correo@placeholder.com" className="hover:text-brand">
                  [correo@placeholder.com]
                </a>
              </p>
              <p>Lunes a viernes, 8:00 a 17:00</p>
            </address>
          </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm font-medium text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} GCM Consultoría Organizacional S.A. Cédula jurídica [0-000-000000]. Todos los derechos reservados.
          </p>
          <div className="flex flex-col gap-3 sm:items-end">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <RecallyahCredit />
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}
