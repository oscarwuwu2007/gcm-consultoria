/**
 * Escala tipográfica única del sitio. Todo título/subtítulo sale de aquí,
 * así una sección nueva se ve igual sin copiar clases.
 *
 *  title  → nombre de la sección (Quiénes somos, Misión, Visión, Clientes…)
 *  lead   → frase que explica la sección (segundo nivel, claramente menor)
 *  body   → texto de apoyo
 */
export const TITLE =
  "font-extrabold leading-[0.95] tracking-tighter text-[clamp(2.75rem,10vw,5.5rem)] lg:text-[5.5rem]"
export const TITLE_XL =
  "font-extrabold uppercase leading-[0.9] tracking-tighter text-[18vw] sm:text-8xl lg:text-[8.5rem]"
export const LEAD = "text-xl font-semibold leading-snug sm:text-2xl"
export const BODY = "text-base font-medium leading-relaxed sm:text-lg"

export type Tone = "light" | "dark"

/** Colores por fondo: light = fondo claro, dark = fondo oscuro/foto. */
export const TONES: Record<Tone, { title: string; lead: string; body: string }> = {
  light: { title: "text-brand-ink", lead: "text-ink", body: "text-ink-soft" },
  dark: { title: "text-white", lead: "text-white/90", body: "text-white/75" },
}
