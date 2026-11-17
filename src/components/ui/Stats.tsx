import { useEffect, useState } from "react"
import { useInView } from "../../hooks/useInView"

function CountUp({ to, prefix = "" }: { to: number; prefix?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.6)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to)
      return
    }
    const t0 = performance.now()
    let frame = 0
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 1400)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, to])

  return (
    <span ref={ref}>
      {prefix}
      {n}
    </span>
  )
}

export type Stat = { value: number; prefix?: string; label: string }

/** Cifras que suben al aparecer en pantalla. */
export function Stats({ items }: { items: Stat[] }) {
  return (
    <dl className="grid grid-cols-3 gap-3 sm:gap-6">
      {items.map((s) => (
        <div key={s.label} className="rounded-2xl border border-line bg-canvas px-3 py-5 text-center sm:px-6 sm:py-7">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="block text-4xl font-extrabold tracking-tighter text-brand-deep sm:text-6xl">
              <CountUp to={s.value} prefix={s.prefix} />
            </span>
            <span className="mt-1 block text-xs font-semibold leading-tight text-ink-soft sm:text-base">
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
