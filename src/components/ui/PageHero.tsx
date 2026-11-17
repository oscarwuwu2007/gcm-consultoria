import type { ReactNode } from "react"
import { Link } from "../../router"
import { Decor } from "./Decor"
import { SectionTitle } from "./SectionTitle"

export const Arrow = ({ back = false }: { back?: boolean }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" aria-hidden="true">
    <path
      d={back ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

type Props = {
  title: string
  lead?: string
  /** Foto de fondo opcional (si no hay, se usa el degradado de marca). */
  image?: string
  back?: { to: string; label: string }
  children?: ReactNode
}

/** Encabezado estándar de páginas internas: fondo oscuro, foto opcional y gráficos de marca. */
export function PageHero({ title, lead, image, back, children }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-forest px-4 pb-14 pt-28 sm:px-8 sm:pb-24 sm:pt-44"
      style={
        image
          ? undefined
          : { backgroundImage: "radial-gradient(50% 60% at 0% 0%, rgba(135,194,68,0.16), transparent 70%)" }
      }
    >
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/75 to-forest" />
        </>
      )}
      <Decor variant="hero" />
      <div className="relative mx-auto max-w-5xl">
        {back && (
          <Link
            to={back.to}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-white"
          >
            <Arrow back />
            {back.label}
          </Link>
        )}
        <SectionTitle title={title} lead={lead} tone="dark" bar />
        {children}
      </div>
    </section>
  )
}
