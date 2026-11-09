import { useEffect, useState } from "react"
import type { AnchorHTMLAttributes, MouseEvent } from "react"

let scrollToken = 0

export function smoothScrollTo(y: number) {
  const token = ++scrollToken
  const start = window.scrollY
  const dist = y - start
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(dist) < 2) {
    window.scrollTo(0, y)
    return
  }
  const duration = Math.min(1500, 650 + Math.abs(dist) * 0.22)
  const t0 = performance.now()
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  const step = (now: number) => {
    if (token !== scrollToken) return
    const p = Math.min(1, (now - t0) / duration)
    window.scrollTo(0, start + dist * ease(p))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return false
  const y = id === "inicio" ? 0 : el.getBoundingClientRect().top + window.scrollY
  smoothScrollTo(y)
  return true
}

export function navigate(to: string) {
  const url = new URL(to, window.location.origin)
  const samePath = url.pathname === window.location.pathname
  if (!samePath) window.scrollTo(0, 0)
  window.history.pushState({}, "", url.pathname + url.hash)
  window.dispatchEvent(new PopStateEvent("popstate"))
  const id = url.hash ? url.hash.slice(1) : ""
  if (samePath) {
    if (!id || !scrollToId(id)) smoothScrollTo(0)
    return
  }
  if (id) window.setTimeout(() => scrollToId(id), 110)
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const onChange = () => setPath(window.location.pathname)
    window.addEventListener("popstate", onChange)
    return () => window.removeEventListener("popstate", onChange)
  }, [])
  return path
}

export function useAnchorScroll() {
  useEffect(() => {
    const cancel = () => {
      scrollToken++
    }
    const onClick = (e: globalThis.MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!a || e.defaultPrevented) return
      const id = a.getAttribute("href")!.slice(1)
      if (id && scrollToId(id)) {
        e.preventDefault()
        window.history.replaceState(null, "", "#" + id)
      }
    }
    document.addEventListener("click", onClick)
    window.addEventListener("wheel", cancel, { passive: true })
    window.addEventListener("touchstart", cancel, { passive: true })
    return () => {
      document.removeEventListener("click", onClick)
      window.removeEventListener("wheel", cancel)
      window.removeEventListener("touchstart", cancel)
    }
  }, [])
}

type LinkProps = { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">

export function Link({ to, onClick, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    navigate(to)
  }
  return <a href={to} onClick={handle} {...rest} />
}
