import type { CSSProperties, ReactNode } from "react"
import { useInView } from "../hooks/useInView"

type RevealProps = {
  children: ReactNode
  delay?: number
  variant?: "up" | "wipe" | "scale" | "fade"
  className?: string
}

/** Scroll-triggered entrance, plays once. No pointer tracking. */
export function Reveal({ children, delay = 0, variant = "up", className = "" }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2)

  const style: CSSProperties = { transitionDelay: `${delay}ms` }
  let state = ""
  if (variant === "wipe") {
    style.clipPath = inView
      ? "inset(0 0 0 0 round 1.5rem)"
      : "inset(0 100% 0 0 round 1.5rem)"
    style.transitionProperty = "clip-path"
    style.transitionDuration = "1100ms"
  } else if (variant === "fade") {
    state = inView ? "opacity-100" : "opacity-0"
    style.transitionDuration = "1500ms"
  } else if (variant === "scale") {
    state = inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
  } else {
    state = inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }

  return (
    <div ref={ref} className={className}>
      <div
        style={style}
        className={`h-full ${variant === "wipe" ? "ease-out" : "transition-all duration-[800ms] ease-out"} motion-reduce:transition-none ${state}`}
      >
        {children}
      </div>
    </div>
  )
}

type WordRevealProps = {
  text: string
  className?: string
  delay?: number
}

/** Heading whose words rise out of a mask, one after another. */
export function WordReveal({ text, className = "", delay = 0 }: WordRevealProps) {
  const [ref, inView] = useInView<HTMLHeadingElement>(0.3)
  const words = text.split(" ")

  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="-mb-[0.12em] -mt-[0.2em] inline-block overflow-hidden pb-[0.12em] pt-[0.2em] align-bottom"
        >
          <span
            className="inline-block transition-transform duration-[800ms] ease-out motion-reduce:transition-none"
            style={{
              transform: inView ? "translateY(0)" : "translateY(115%)",
              transitionDelay: `${delay + i * 90}ms`,
            }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  )
}

/** Short bar that draws itself from the left. */
export function GrowBar({ delay = 0, className = "", tone = "bg-brand-deep" }: { delay?: number; className?: string; tone?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.5)
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`h-1 w-20 origin-left rounded-full ${tone} transition-transform duration-[800ms] ease-out motion-reduce:transition-none ${
        inView ? "scale-x-100" : "scale-x-0"
      } ${className}`}
    />
  )
}

type ZoomFrameProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  imgClassName?: string
  round?: string
  delay?: number
}

/** Framed image that opens from the center while the photo zooms out. */
export function ZoomFrame({ src, alt, width, height, className = "", imgClassName = "", round = "1.5rem", delay = 0 }: ZoomFrameProps) {
  const [ref, inView] = useInView<HTMLDivElement>(0.25)
  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{
        borderRadius: round,
        clipPath: inView ? `inset(0% round ${round})` : `inset(14% round ${round})`,
        opacity: inView ? 1 : 0,
        transition: "clip-path 1500ms cubic-bezier(0.2,0.7,0.2,1), opacity 900ms ease-out",
        transitionDelay: `${delay}ms`,
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover transition-transform duration-[2200ms] ease-out motion-reduce:transition-none ${
          inView ? "scale-100" : "scale-[1.35]"
        } ${imgClassName}`}
        style={{ transitionDelay: `${delay}ms` }}
      />
    </div>
  )
}
