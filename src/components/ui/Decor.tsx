import {
  AngledBars,
  DotTrio,
  Fragments,
  LeafFragment,
  MiniRibbon,
  MiniRing,
} from "../decorative/Decorative"

/**
 * Elementos gráficos de la marca, ya colocados. Cualquier sección los usa con
 * <Decor variant="hero" /> dentro de un contenedor `relative overflow-hidden`;
 * así el estilo gráfico es el mismo en todo el sitio y no se copian posiciones.
 */
export type DecorVariant = "hero" | "cta" | "band"

const float = "deco-float pointer-events-none absolute"

export function Decor({ variant, light = false }: { variant: DecorVariant; light?: boolean }) {
  const soft = light ? "#ffffff" : "#87C244"
  if (variant === "hero") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Fragments
          color={soft}
          className={`${float} -right-10 top-24 h-64 w-auto opacity-[0.14] sm:right-6 sm:h-96`}
        />
        <MiniRing
          color={soft}
          className={`${float} bottom-8 right-6 h-12 w-auto opacity-50 [animation-delay:-2s] sm:bottom-14 sm:right-24 sm:h-16`}
        />
        <DotTrio
          color="#ffffff"
          className={`${float} right-24 top-28 hidden h-12 w-auto opacity-40 [animation-delay:-4s] sm:block`}
        />
      </div>
    )
  }
  if (variant === "cta") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Fragments
          color="#ffffff"
          className={`${float} -left-6 top-4 h-28 w-auto opacity-25 sm:left-10 sm:h-40`}
        />
        <AngledBars
          color="#87C244"
          className={`${float} bottom-5 right-5 h-12 w-auto [animation-delay:-1s] sm:bottom-10 sm:right-16 sm:h-20`}
        />
        <DotTrio
          color="#ffffff"
          className={`${float} right-6 top-6 h-10 w-auto opacity-50 [animation-delay:-3s] sm:right-24 sm:h-14`}
        />
      </div>
    )
  }
  // band: fondo claro, muy tenue
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <LeafFragment className={`${float} -right-6 top-10 h-56 w-auto opacity-[0.07] sm:right-10 sm:h-80`} />
      <MiniRibbon
        color="#4E7D1E"
        className={`${float} bottom-8 left-4 h-5 w-auto opacity-30 [animation-delay:-2s] sm:left-10`}
      />
    </div>
  )
}
