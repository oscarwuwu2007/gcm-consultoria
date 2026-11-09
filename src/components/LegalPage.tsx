import { Link } from "../router"

type Doc = {
  title: string
  sections: string[]
}

export const LEGAL_DOCS: Record<string, Doc> = {
  "/terminos": {
    title: "Términos y condiciones",
    sections: ["Sección 1", "Sección 2", "Sección 3"],
  },
  "/privacidad": {
    title: "Política de privacidad",
    sections: ["Sección 1", "Sección 2", "Sección 3"],
  },
  "/cookies": {
    title: "Política de cookies",
    sections: ["Sección 1", "Sección 2", "Sección 3"],
  },
}

export function LegalPage({ path }: { path: string }) {
  const doc = LEGAL_DOCS[path]
  if (!doc) return null

  return (
    <>
      <section className="bg-forest px-4 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-44">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand">Legal</p>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            {doc.title}
          </h1>
          <p className="mt-5 text-sm font-medium text-white/60">
            Última actualización: [fecha por definir]
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg font-medium leading-relaxed text-ink-soft">
            [Información por agregar]
          </p>
          <div className="mt-10 space-y-8">
            {doc.sections.map((heading) => (
              <div key={heading}>
                <h2 className="text-xl font-extrabold tracking-tight text-ink">{heading}</h2>
                <p className="mt-2 text-base font-medium leading-relaxed text-ink-soft">
                  [Información por agregar]
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/"
            className="mt-14 btn btn-deep h-14 px-9 text-base"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </>
  )
}
