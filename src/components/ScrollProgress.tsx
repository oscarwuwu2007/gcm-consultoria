import { useEffect, useRef } from "react"
import { LeafFragment } from "./decorative/Decorative"

/**
 * Una ramita pegada al borde derecho que crece al bajar la página y echa hojas
 * en cada tramo. Va con transform y clases (sin re-render de React), así que
 * es liviana incluso en celulares lentos.
 */
const LEAVES = [0.08, 0.2, 0.32, 0.44, 0.56, 0.68, 0.8, 0.92]

export function ScrollProgress() {
  const stem = useRef<HTMLDivElement>(null)
  const leaves = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    let frame = 0
    let max = 0
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight
    }
    const paint = () => {
      frame = 0
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (stem.current) stem.current.style.transform = `scaleY(${p})`
      LEAVES.forEach((t, i) => leaves.current[i]?.classList.toggle("leaf-on", p >= t))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const onResize = () => {
      measure()
      onScroll()
    }
    measure()
    paint()
    const ro = new ResizeObserver(onResize)
    ro.observe(document.documentElement)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-[10vh] right-2 top-[16vh] z-[60] w-6 sm:right-4"
    >
      <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-brand/25" />
      <div
        ref={stem}
        className="absolute inset-y-0 left-1/2 w-[2px] origin-top -translate-x-1/2 rounded-full bg-brand will-change-transform"
        style={{ transform: "scaleY(0)" }}
      />
      {LEAVES.map((t, i) => {
        const right = i % 2 === 0
        return (
          <span
            key={t}
            ref={(el) => {
              leaves.current[i] = el
            }}
            className={`vine-leaf absolute ${right ? "left-1/2 origin-bottom-left" : "right-1/2 origin-bottom-right"}`}
            style={{ top: `${t * 100}%` }}
          >
            <LeafFragment
              className={`h-5 w-auto sm:h-6 ${right ? "rotate-[28deg]" : "-rotate-[28deg] -scale-x-100"}`}
            />
          </span>
        )
      })}
    </div>
  )
}
