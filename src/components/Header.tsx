import { useEffect, useState } from "react"
import { Link } from "../router"
import { Logo } from "./Logo"

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] }

const opts = (href: string, n = 3) =>
  Array.from({ length: n }, (_, i) => ({ label: `Opción ${i + 1}`, href }))

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Quiénes somos", href: "/#quienes-somos" },
  { label: "Consultoría", href: "/consultoria", children: opts("/consultoria", 4) },
  { label: "Capacitación", href: "/capacitacion", children: opts("/capacitacion", 4) },
  { label: "Bolsa de empleo", href: "/bolsa-empleo", children: opts("/bolsa-empleo", 3) },
]

const CTA = { label: "Contáctenos", href: "#contacto" }

export function Header({ path = "/" }: { path?: string }) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [section, setSection] = useState<"home" | "about" | null>(path === "/" ? "home" : null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
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
              <li key={item.label} className="group relative">
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
                  <div className="invisible absolute left-0 top-full z-30 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="min-w-[13rem] rounded-2xl bg-white p-2 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <Link
                            to={c.href}
                            onClick={(e) => {
                              if (path === c.href) e.preventDefault()
                            }}
                            className="block rounded-xl px-4 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-brand-pale hover:text-brand-ink"
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
          </ul>
        </nav>

        <div className="hidden xl:block">
          <a href={CTA.href} className={ctaClass}>
            {CTA.label}
          </a>
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
              <a
                href={CTA.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl bg-brand px-5 py-3 text-center font-bold text-forest"
              >
                {CTA.label}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
