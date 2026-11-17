import { TESTIMONIOS } from "../content/testimonios"
import { Reveal } from "./Reveal"
import { SectionTitle } from "./ui/SectionTitle"

export function Testimonials() {
  if (TESTIMONIOS.length === 0) return null
  return (
    <section id="testimonios" className="bg-canvas px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="Lo que dicen" bar />
        <ul className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-3">
          {TESTIMONIOS.slice(0, 3).map((t, i) => (
            <li key={t.name}>
              <Reveal delay={i * 100} className="h-full">
                <figure className="flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-6 sm:p-8">
                  <blockquote className="text-lg font-semibold leading-snug text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 text-sm font-medium text-ink-soft">
                    <span className="block font-bold text-brand-ink">{t.name}</span>
                    {t.role ? `${t.role}, ` : ""}
                    {t.company}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
