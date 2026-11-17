import { openContact } from "./contact"
import { Decor } from "./Decor"

/** Cierre estándar de páginas internas. */
export function PageCta({
  text = "Estamos para colaborarle.",
  action = "Agende su cita",
}: {
  text?: string
  action?: string
}) {
  return (
    <section className="relative overflow-hidden bg-brand-deep px-4 py-14 text-center text-white sm:px-8 sm:py-24">
      <Decor variant="cta" />
      <div className="relative">
        <p className="mx-auto max-w-2xl text-2xl font-extrabold tracking-tight sm:text-4xl">{text}</p>
        <button type="button" onClick={openContact} className="btn btn-brand mt-7 h-14 px-9 text-base">
          {action}
        </button>
      </div>
    </section>
  )
}
