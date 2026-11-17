import { Reveal } from "./Reveal"
import { SectionTitle } from "./ui/SectionTitle"

/**
 * Para agregar un cliente: copie su logo (png, jpg, webp o svg) a
 * src/assets/clientes/. Aparece solo, ordenado por nombre de archivo.
 */
const files = import.meta.glob<string>("../assets/clientes/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
})

const LOGOS = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src], i) => ({ n: i + 1, src, name: path.split("/").pop()!.replace(/\.\w+$/, "") }))

export function Clients() {
  return (
    <section
      id="clientes"
      className="flex min-h-screen items-center overflow-hidden bg-white py-16 [contain-intrinsic-size:auto_900px] [content-visibility:auto] sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionTitle title="Nuestros clientes" bar />

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
          {LOGOS.map(({ n, src, name }) => (
            <li key={name}>
              <Reveal delay={(n % 5) * 60}>
                <div className="flex h-28 items-center justify-center rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_14px_30px_rgba(47,76,18,0.12)] sm:h-32">
                  <img
                    src={src}
                    alt={`Logo de cliente ${n}`}
                    loading="lazy"
                    draggable={false}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
