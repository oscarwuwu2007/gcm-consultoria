import { useEffect, useRef } from "react"

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    let max = 0
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight
    }
    const paint = () => {
      frame = 0
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
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
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-brand-deep via-brand to-brand-pale will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  )
}
