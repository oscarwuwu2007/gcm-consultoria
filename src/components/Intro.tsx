import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import { showIntro } from "../intro"

const LEAVES = [
  { d: "M0.34 150.19L33.74 216.98L7.79 206.08A157.33 157.33 0 0 1 0.34 150.19Z", tx: "-60px", ty: "50px", r: "-25deg", delay: "0.1s" },
  { d: "M48.5 44.24L48.5 200.5L5.96 115.41A157.33 157.33 0 0 1 48.5 44.24Z", tx: "-40px", ty: "-60px", r: "-18deg", delay: "0.25s" },
  { d: "M68.5 27.96A157.33 157.33 0 0 1 155.65 0.38L68.5 198.45Z", tx: "70px", ty: "-50px", r: "22deg", delay: "0.4s" },
]

export function Intro() {
  const [done, setDone] = useState(!showIntro)

  useEffect(() => {
    if (!showIntro) return
    document.body.style.overflow = "hidden"
    const t = window.setTimeout(() => {
      document.body.style.overflow = ""
      setDone(true)
    }, 2800)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = ""
    }
  }, [])

  if (done) return null

  return (
    <div
      aria-hidden="true"
      className="intro-curtain fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 rounded-b-[3rem] bg-forest"
      style={{
        backgroundImage:
          "radial-gradient(50% 50% at 50% 50%, rgba(78,125,30,0.35), transparent 70%)",
      }}
    >
      <svg viewBox="0 0 156 217" className="h-28 w-auto sm:h-36">
        <g fill="#87C244">
          {LEAVES.map((l) => (
            <path
              key={l.d}
              d={l.d}
              className="intro-leaf"
              style={{ "--tx": l.tx, "--ty": l.ty, "--r": l.r, "--d": l.delay } as CSSProperties}
            />
          ))}
        </g>
      </svg>
      <p className="intro-text text-4xl font-semibold tracking-tight text-white">gcm</p>
      <div className="h-px w-40 overflow-hidden bg-white/15">
        <div className="intro-bar h-full w-full bg-brand" />
      </div>
    </div>
  )
}
