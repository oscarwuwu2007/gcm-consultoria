import { useEffect, useState } from "react"
import { NAV_CTA, NAV_ITEMS, type NavItem } from "../content/nav"
import { Link } from "../router"
import { openContact } from "./ui/contact"

type Props = {
  open: boolean
  path: string
  isActive: (href: string) => boolean
  onClose: () => void
}

/** Si la página actual cuelga de este ítem (ej. /consultoria/coaching), arranca desplegado. */
const owns = (item: NavItem, path: string) => !!item.children && path.startsWith(item.href)

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={`h-6 w-6 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    fill="none"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Menú de celular: hoja a pantalla completa, filas grandes y fáciles de tocar. */
export function MobileMenu({ open, path, isActive, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)

  // Al abrir, despliega la categoría donde está la persona.
  useEffect(() => {
    if (open) setExpanded(NAV_ITEMS.find((i) => owns(i, path))?.label ?? null)
  }, [open, path])

  // Bloquea el scroll de la página y cierra con Esc.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const row = "flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-2xl font-extrabold tracking-tight"

  return (
    <nav
      aria-label="Principal móvil"
      className="page-enter fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-forest px-4 pb-6 pt-24 xl:hidden"
      style={{ backgroundImage: "radial-gradient(60% 40% at 0% 0%, rgba(135,194,68,0.18), transparent 70%)" }}
    >
      <ul className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isOpen = expanded === item.label
          const current = item.children ? owns(item, path) : isActive(item.href)
          const tone = current ? "text-brand" : "text-white"

          if (!item.children) {
            return (
              <li key={item.label}>
                <Link to={item.href} onClick={onClose} className={`${row} ${tone} active:bg-white/10`}>
                  {item.label}
                </Link>
              </li>
            )
          }

          return (
            <li key={item.label}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? null : item.label)}
                className={`${row} ${tone} active:bg-white/10`}
              >
                {item.label}
                <Chevron open={isOpen} />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <ul className="overflow-hidden" inert={!isOpen}>
                  <li>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="mx-3 block rounded-xl px-4 py-2.5 text-[15px] font-bold text-brand active:bg-white/10"
                    >
                      Ver todo en {item.label}
                    </Link>
                  </li>
                  {item.children.map((c) => {
                    const here = path === c.href
                    return (
                      <li key={c.label}>
                        <Link
                          to={c.href}
                          aria-current={here ? "page" : undefined}
                          onClick={(e) => {
                            if (here) e.preventDefault()
                            onClose()
                          }}
                          className={`mx-3 block rounded-xl px-4 py-3 active:bg-white/10 ${here ? "bg-white/10" : ""}`}
                        >
                          <span className="block text-base font-semibold leading-snug text-white">{c.label}</span>
                          {c.short && (
                            <span className="mt-0.5 block text-sm font-medium leading-snug text-white/60">{c.short}</span>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={() => {
            onClose()
            openContact()
          }}
          className="btn btn-brand h-14 w-full text-base"
        >
          {NAV_CTA.label}
        </button>
      </div>
    </nav>
  )
}
