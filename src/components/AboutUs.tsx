import aboutImg from "../assets/about.webp"
import { Link } from "../router"
import { Reveal, WordReveal, ZoomFrame } from "./Reveal"

const TRAITS = [
  {
    title: "Trato directo",
    body: "Hablamos con quien decide, sin intermediarios ni vueltas.",
    icon: ["M7.9 20A9 9 0 1 0 4 16.1L2 22Z"],
  },
  {
    title: "Resultados medibles",
    body: "Cada proyecto arranca con metas claras y un responsable.",
    icon: [
      "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
      "M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z",
      "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    ],
  },
  {
    title: "Gente primero",
    body: "La estructura se diseña pensando en las personas que la viven.",
    icon: [
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
      "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
      "M22 21v-2a4 4 0 0 0-3-3.87",
      "M16 3.13a4 4 0 0 1 0 7.75",
    ],
  },
]

export function AboutUs() {
  return (
    <section id="quienes-somos" className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-deep">
                <span className="h-px w-10 bg-brand-deep" />
                Quiénes somos
              </p>
            </Reveal>
            <WordReveal
              text="Ordenamos empresas. Conectamos personas."
              className="text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-[3.4rem]"
            />
            <Reveal delay={350}>
              <p className="mt-7 max-w-lg text-lg font-medium leading-relaxed text-ink-soft">
                Somos una consultora costarricense. Entramos a su empresa, ordenamos lo que está
                enredado y le ayudamos a contratar a la gente correcta.
              </p>
            </Reveal>
            <Reveal delay={500}>
              <Link to="/historia" className="btn btn-deep mt-9 h-14 gap-3 px-8 text-base">
                Conozca nuestra historia
                <svg viewBox="0 0 24 24" className="btn-arrow h-5 w-5" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] bg-brand-pale"
            />
            <ZoomFrame
              src={aboutImg}
              alt="Personas caminando por una plaza"
              width={960}
              height={1200}
              delay={150}
              round="2rem"
              className="relative aspect-[4/3] w-full shadow-[0_24px_60px_rgba(47,76,18,0.18)] lg:aspect-[5/4]"
              imgClassName="kenburns"
            />
          </div>
        </div>

        <ul className="mt-16 grid gap-5 sm:mt-20 md:grid-cols-3">
          {TRAITS.map((t, i) => (
            <li key={t.title}>
              <Reveal delay={i * 120} className="h-full">
                <div className="h-full rounded-3xl border border-line bg-canvas p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-white hover:shadow-[0_18px_40px_rgba(47,76,18,0.12)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-pale text-brand-deep">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                      {t.icon.map((d) => (
                        <path key={d} d={d} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                      ))}
                    </svg>
                  </span>
                  <p className="mt-5 text-xl font-extrabold tracking-tight text-brand-ink">{t.title}</p>
                  <p className="mt-2 text-base font-medium leading-relaxed text-ink-soft">{t.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
