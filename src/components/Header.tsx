import { useEffect, useState } from "react"
import { Link } from "../router"
import { openContact } from "./ui/contact"
import { CAPACITACION, CONSULTORIA, type ServicePageData } from "../content/servicios"
import { Logo } from "./Logo"

type NavChild = { label: string; href: string; short?: string }
type NavItem = { label: string; href: string; children?: NavChild[] }

const sub = (page: ServicePageData): NavChild[] =>
  page.services.map((x) => ({ label: x.title, href: `${page.path}/${x.id}`, short: x.short }))

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Quiénes somos", href: "/#quienes-somos" },
  { label: "Consultoría", href: CONSULTORIA.path, children: sub(CONSULTORIA) },
  { label: "Capacitación", href: CAPACITACION.path, children: sub(CAPACITACION) },
  { label: "Bolsa de empleo", href: "/bolsa-empleo" },
]

// En esta página la mitad derecha es blanca: el menú se muestra siempre como barra blanca.
const SOLID_PATH = "/contacto"

const CTA = { label: "Contáctenos" }

// Vive fuera del componente: al navegar, la página se vuelve a armar y el Header se recrea,
// pero el mouse sigue encima del menú; así el submenú no reaparece hasta que el mouse salga.
let lastClosedMenu: string | null = null

export function Header({ path = "/" }: { path?: string }) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  // Submenú de escritorio cerrado tras elegir una opción (se reabre al salir y volver a entrar con el mouse).
  const [closedMenu, setClosedMenuState] = useState<string | null>(lastClosedMenu)
  const setClosedMenu = (v: string | null) => {
    lastClosedMenu = v
    setClosedMenuState(v)
  }
  const [scrolled, setScrolled] = useState(false)
  const [section, setSection] = useState<"home" | "about" | null>(path === "/" ? "home" : null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24 || path === SOLID_PATH)
      if (path !== "/") {
        setSection(null)
        return
      }
      const about = document.getElementById("quienes-somos")
      if (!about) return
      const r = about.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.top >= vh * 0.5) setSection("home")
      else if (r.bottom > vh * 0.35) setSection("about")
      else setSection(null)
    }
    let frame = 0
    const onFrame = () => {
      frame = 0
      onScroll()
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(onFrame)
    }
    onScroll()
    window.addEventListener("scroll", schedule, { passive: true })
    return () => {
      window.removeEventListener("scroll", schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [path])

  const isActive = (href: string) =>
    (href === "/#inicio" && section === "home") || (href === "/#quienes-somos" && section === "about")

  const ctaClass = `btn h-12 px-7 text-[15px] ${
    scrolled ? "btn-deep" : "btn-brand"
  }`

  return (
    <div
      className={`rise rise-1 fixed inset-x-0 top-0 z-50 px-4 transition-[padding] duration-500 sm:px-8 ${
        scrolled ? "pt-3 sm:pt-4" : "pt-5 sm:pt-7"
      }`}
    >
      <header
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "max-w-5xl rounded-full bg-white py-2 pl-4 pr-2 shadow-[0_6px_24px_rgba(0,0,0,0.18)]"
            : "max-w-7xl rounded-full bg-transparent py-0 pl-0 pr-0 shadow-none"
        }`}
      >
        <Link to="/#inicio" aria-label="GCM Consultoría Organizacional, inicio">
          <Logo tone={scrolled ? "dark" : "light"} large collapsed={scrolled} />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1 text-[15px]">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="group relative" onMouseLeave={() => setClosedMenu(null)}>
                <Link
                  to={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={
                    scrolled
                      ? isActive(item.href)
                        ? "inline-flex h-11 items-center rounded-full bg-brand-pale px-5 font-semibold text-brand-ink"
                        : "inline-flex h-11 items-center rounded-full px-5 font-medium text-ink hover:text-brand-deep"
                      : isActive(item.href)
                        ? "inline-flex h-11 items-center rounded-full bg-white/15 px-5 font-semibold text-white"
                        : "inline-flex h-11 items-center rounded-full px-5 font-medium text-white/80 hover:text-white"
                  }
                >
                  {item.label}
                  {item.children && (
                    <svg viewBox="0 0 12 12" className="ml-1.5 h-3 w-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" fill="none" aria-hidden="true">
                      <path d="M2 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </Link>
                {item.children && (
                  <div className={`${closedMenu === item.label ? "invisible! opacity-0!" : ""} invisible absolute left-1/2 top-full z-30 w-max min-w-[17rem] max-w-[24rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100`}>
                    <ul className="rounded-2xl bg-white p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
                      {item.children.map((c) => {
                        const here = path === c.href
                        return (
                          <li key={c.label}>
                            <Link
                              to={c.href}
                              aria-current={here ? "page" : undefined}
                              onClick={(e) => {
                                if (here) e.preventDefault()
                                setClosedMenu(item.label)
                                e.currentTarget.blur()
                              }}
                              className={`block rounded-xl px-4 py-2.5 transition-colors hover:bg-brand-pale ${here ? "bg-brand-pale" : ""}`}
                            >
                              <span className="block text-[15px] font-semibold leading-snug text-brand-ink">{c.label}</span>
                              {c.short && (
                                <span className="mt-0.5 block text-[13px] font-medium leading-snug text-ink-soft">{c.short}</span>
                              )}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden xl:block">
          <button type="button" onClick={openContact} className={ctaClass}>
            {CTA.label}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className={`flex h-11 w-11 items-center justify-center rounded-full xl:hidden ${scrolled ? "text-ink" : "text-white"}`}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </header>

      {open && (
        <nav
          aria-label="Principal móvil"
          className="relative z-20 mx-auto mt-4 max-h-[calc(100svh-6.5rem)] max-w-7xl overflow-y-auto overscroll-contain rounded-3xl border border-white/10 bg-forest-soft p-3 xl:hidden"
        >
          <ul className="flex flex-col gap-1 text-[15px]">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <div className="flex items-center">
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex-1 rounded-2xl px-5 py-3 ${
                      isActive(item.href)
                        ? "bg-white/10 font-semibold text-brand"
                        : "font-medium text-white/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                      aria-expanded={expanded === item.label}
                      aria-label={`Opciones de ${item.label}`}
                      className="ml-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/70 active:bg-white/10"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-5 w-5 transition-transform duration-300 ${expanded === item.label ? "rotate-180" : ""}`}
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
                {item.children && (
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: expanded === item.label ? "1fr" : "0fr" }}
                  >
                    <ul className="mb-1 ml-5 overflow-hidden border-l border-white/15 pl-3">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <Link
                            to={c.href}
                            onClick={(e) => {
                              if (path === c.href) e.preventDefault()
                              setOpen(false)
                            }}
                            tabIndex={expanded === item.label ? 0 : -1}
                            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/65"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
            <li className="mt-1">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  openContact()
                }}
                className="block w-full rounded-2xl bg-brand px-5 py-3 text-center font-bold text-forest"
              >
                {CTA.label}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
