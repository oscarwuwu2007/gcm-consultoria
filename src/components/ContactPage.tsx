import type { MouseEvent } from "react"
import contactImg from "../assets/mission.webp"
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONES } from "../content/contacto"
import { Reveal } from "./Reveal"
import { Decor } from "./ui/Decor"
import { SectionTitle } from "./ui/SectionTitle"

const field =
  "peer w-full border-0 border-b-2 border-line bg-transparent px-0 pb-2 pt-6 text-base font-semibold text-ink outline-none transition-colors placeholder:text-transparent focus:border-brand-deep"
const label =
  "pointer-events-none absolute left-0 top-1 text-xs font-bold text-ink-soft transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-focus:top-1 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-deep"

type Provider = "gmail" | "outlook" | "mailto"

/** Arma la dirección que abre el correo del visitante con el mensaje ya escrito, dirigido a GCM. */
function composeUrl(provider: Provider, subject: string, body: string) {
  const to = encodeURIComponent(CONTACT_EMAIL)
  const su = encodeURIComponent(subject)
  const bd = encodeURIComponent(body)
  if (provider === "gmail") return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bd}`
  if (provider === "outlook")
    return `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}&body=${bd}`
  return `mailto:${CONTACT_EMAIL}?subject=${su}&body=${bd}`
}

/** No envía nada por su cuenta: abre el correo de la persona con el mensaje listo para enviar. */
function ContactForm() {
  const send = (provider: Provider) => (e: MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form!
    if (!form.reportValidity()) return
    const d = new FormData(form)
    const body = `${d.get("mensaje")}

— ${d.get("nombre")}`
    const url = composeUrl(provider, String(d.get("asunto")), body)
    if (provider === "mailto") window.location.href = url
    else window.open(url, "_blank", "noopener")
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
      <div className="relative">
        <input id="c-nombre" name="nombre" required maxLength={80} autoComplete="name" placeholder=" " className={field} />
        <label htmlFor="c-nombre" className={label}>Nombre</label>
      </div>
      <div className="relative">
        <input id="c-asunto" name="asunto" required maxLength={100} placeholder=" " className={field} />
        <label htmlFor="c-asunto" className={label}>Asunto</label>
      </div>
      <div className="relative">
        <textarea id="c-mensaje" name="mensaje" required maxLength={800} rows={4} placeholder=" " className={`${field} resize-none`} />
        <label htmlFor="c-mensaje" className={label}>Mensaje</label>
      </div>

      <p className="mt-3 text-sm font-semibold text-ink-soft">Enviar desde:</p>
      <div className="grid gap-2 sm:grid-cols-3">
        <button type="button" onClick={send("gmail")} className="btn btn-deep h-12 px-4 text-[15px]">
          Gmail
        </button>
        <button type="button" onClick={send("outlook")} className="btn btn-deep h-12 px-4 text-[15px]">
          Outlook
        </button>
        <button
          type="button"
          onClick={send("mailto")}
          className="btn h-12 rounded-full border border-brand-deep/40 px-4 text-[15px] font-bold text-brand-deep transition-colors hover:bg-brand-pale"
        >
          Otro correo
        </button>
      </div>
      <p className="text-xs font-medium text-ink-soft">
        Se abre su correo con el mensaje listo; solo debe presionar enviar.
      </p>
    </form>
  )
}

/** /contacto: media sección con imagen y datos de GCM, media con el formulario. */
export function ContactPage() {
  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      <div className="relative flex min-h-[26rem] flex-col justify-end overflow-hidden bg-forest px-5 pb-10 pt-32 text-white sm:px-10 sm:pb-14 lg:pt-40">
        <img src={contactImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-forest/40" />
        <Decor variant="hero" />
        <div className="relative max-w-md">
          <SectionTitle title="Contáctenos" tone="dark" bar />
          <p className="mt-6 text-xl font-semibold leading-snug text-white/90">
            Estamos para colaborarle. Escríbanos y agende su cita.
          </p>
          <address className="mt-8 space-y-1.5 text-[15px] font-medium not-italic text-white/85">
            <p>{CONTACT_ADDRESS}</p>
            {CONTACT_PHONES.map((p) => (
              <p key={p.href}>
                <a href={p.href} className="transition-colors hover:text-brand">
                  {p.label}
                </a>
              </p>
            ))}
            <p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-brand">
                {CONTACT_EMAIL}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="flex items-center bg-white px-5 py-12 sm:px-10 lg:pt-32">
        <Reveal className="mx-auto w-full max-w-md">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-brand-ink sm:text-3xl">Escríbanos</h2>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
