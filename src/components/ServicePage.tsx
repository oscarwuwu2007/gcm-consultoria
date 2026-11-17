import type { Service, ServicePageData } from "../content/servicios"
import { certLogo, serviceImage } from "../content/imagenes"
import { Link } from "../router"
import { Reveal } from "./Reveal"
import { LeafFragment } from "./decorative/Decorative"
import { Decor } from "./ui/Decor"
import { openContact } from "./ui/contact"
import { PageCta } from "./ui/PageCta"
import { Arrow, PageHero } from "./ui/PageHero"
import { BODY, LEAD, TONES } from "./ui/typography"

const imageFor = serviceImage

/** Ítems tipo "Y más…" no son un tema: se muestran como nota al final de la lista. */
const isMore = (item: string) => /^y más/i.test(item.trim())

const countItems = (s: Service) => s.groups.reduce((n, g) => n + g.items.filter((i) => !isMore(i)).length, 0)

function CategoryCard({ page, service }: { page: ServicePageData; service: Service }) {
  const img = imageFor(service.id)
  return (
    <Link
      to={`${page.path}/${service.id}`}
      className="group relative flex aspect-[4/3] h-full w-full flex-col justify-end overflow-hidden rounded-3xl bg-forest text-white shadow-[0_10px_30px_rgba(14,26,9,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(14,26,9,0.3)] sm:aspect-[16/11]"
    >
      {img && (
        <img
          src={img}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-forest via-forest/55 to-forest/5 transition-opacity duration-500 group-hover:opacity-90"
      />
      <LeafFragment
        color="#ffffff"
        className="pointer-events-none absolute right-4 top-4 h-12 w-auto opacity-0 transition-opacity duration-500 group-hover:opacity-40"
      />
      <span className="relative flex items-end justify-between gap-4 p-5 sm:p-7">
        <span>
          <span className="mb-2 inline-block rounded-full bg-brand px-3 py-1 text-xs font-bold text-forest">
            {countItems(service)} temas
          </span>
          <span className="block text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.8rem]">
            {service.title}
          </span>
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-forest transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand">
          <Arrow />
        </span>
      </span>
    </Link>
  )
}

/** /consultoria y /capacitacion: una tarjeta por categoría, cada una abre su propia página. */
export function ServicePage({ data }: { data: ServicePageData }) {
  return (
    <>
      <PageHero title={data.title} lead={data.lead} />

      <section className="relative overflow-hidden bg-canvas px-4 py-10 sm:px-8 sm:py-16">
        <Decor variant="band" />
        <ul className="relative mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 sm:gap-5">
          {data.services.map((s, i) => (
            <li key={s.id}>
              <Reveal delay={(i % 2) * 80} className="h-full">
                <CategoryCard page={data} service={s} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <PageCta />
    </>
  )
}

/** /consultoria/coaching, etc.: la categoría completa en su propia página. */
export function ServiceDetail({ data, id }: { data: ServicePageData; id: string }) {
  const i = data.services.findIndex((s) => s.id === id)
  const s = data.services[i]
  if (!s) return null
  const next = data.services[(i + 1) % data.services.length]
  // Descripciones largas van en el cuerpo; solo las cortas sirven de subtítulo del encabezado.
  const longIntro = (s.intro?.length ?? 0) > 150

  return (
    <>
      <PageHero
        title={s.title}
        lead={longIntro ? undefined : s.intro}
        image={imageFor(s.id)}
        back={{ to: data.path, label: data.title }}
      />

      <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-8 sm:py-20">
        <Decor variant="band" />
        <div className="relative mx-auto max-w-5xl space-y-12">
          {longIntro && (
            <Reveal>
              <p className={`max-w-3xl ${BODY} ${TONES.light.body}`}>{s.intro}</p>
            </Reveal>
          )}
          {s.logos && s.logos.length > 0 && (
            <Reveal>
              <ul className="grid grid-cols-3 gap-3 sm:gap-4">
                {s.logos.map((l) => (
                  <li
                    key={l.id}
                    className="flex h-24 items-center justify-center rounded-2xl border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_14px_30px_rgba(47,76,18,0.12)] sm:h-32"
                  >
                    {certLogo(l.id) ? (
                      <img
                        src={certLogo(l.id)}
                        alt={l.name}
                        loading="lazy"
                        draggable={false}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-lg font-extrabold text-brand-ink">{l.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          {s.groups.map((g, gi) => (
            <Reveal key={gi}>
              <div>
                {g.title && <h2 className={`mb-5 ${LEAD} text-brand-deep`}>{g.title}</h2>}
                <ul className="grid gap-3 sm:grid-cols-2">
                  {g.items.filter((item) => !isMore(item)).map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 rounded-2xl border border-line bg-canvas px-5 py-4 text-[15px] font-semibold leading-snug transition-colors hover:border-brand hover:bg-white sm:text-base ${TONES.light.lead}`}
                    >
                      <LeafFragment className="mt-[0.2em] h-5 w-auto shrink-0" color="#4E7D1E" />
                      {item}
                    </li>
                  ))}
                </ul>
                {g.items.some(isMore) && (
                  <p className="mt-4 flex flex-wrap items-center gap-x-2 text-[15px] font-medium text-ink-soft sm:text-base">
                    Y más temas a su medida.
                    <button
                      type="button"
                      onClick={openContact}
                      className="font-bold text-brand-deep underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-brand-ink"
                    >
                      Consúltenos
                    </button>
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-canvas px-4 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to={data.path} className="btn btn-deep h-14 gap-3 px-8 text-base">
            <Arrow back />
            Ver todo en {data.title}
          </Link>
          {data.services.length > 1 && (
            <Link
              to={`${data.path}/${next.id}`}
              className={`group flex items-center justify-between gap-4 rounded-full border border-line bg-white px-6 py-3 text-left transition-colors hover:border-brand ${BODY}`}
            >
              <span>
                <span className="block text-xs font-semibold text-ink-soft">Siguiente</span>
                <span className="block font-bold text-brand-ink">{next.title}</span>
              </span>
              <Arrow />
            </Link>
          )}
        </div>
      </section>

      <PageCta />
    </>
  )
}
