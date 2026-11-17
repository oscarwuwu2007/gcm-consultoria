/**
 * Menú principal (escritorio y celular). Las categorías de Consultoría y Capacitación
 * salen solas de src/content/servicios.ts; para agregar un enlace nuevo, agréguelo aquí.
 */
import { CAPACITACION, CONSULTORIA, type ServicePageData } from "./servicios"

export type NavChild = { label: string; href: string; short?: string }
export type NavItem = { label: string; href: string; children?: NavChild[] }

const sub = (page: ServicePageData): NavChild[] =>
  page.services.map((x) => ({ label: x.title, href: `${page.path}/${x.id}`, short: x.short }))

export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Quiénes somos", href: "/#quienes-somos" },
  { label: "Consultoría", href: CONSULTORIA.path, children: sub(CONSULTORIA) },
  { label: "Capacitación", href: CAPACITACION.path, children: sub(CAPACITACION) },
  { label: "Bolsa de empleo", href: "/bolsa-empleo" },
]

export const NAV_CTA = { label: "Contáctenos" }
