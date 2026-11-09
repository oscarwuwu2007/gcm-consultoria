type LogoIconProps = {
  className?: string
  fill?: string
}

export function LogoIcon({ className, fill = "#87C244" }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 156 217"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill={fill}>
        <path d="M0.34 150.19L33.74 216.98L7.79 206.08A157.33 157.33 0 0 1 0.34 150.19Z" />
        <path d="M48.5 44.24L48.5 200.5L5.96 115.41A157.33 157.33 0 0 1 48.5 44.24Z" />
        <path d="M68.5 27.96A157.33 157.33 0 0 1 155.65 0.38L68.5 198.45Z" />
      </g>
    </svg>
  )
}

export function Logo({
  className = "",
  tone = "dark",
  large = false,
  collapsed = false,
  iconFill,
}: {
  className?: string
  tone?: "dark" | "light"
  large?: boolean
  collapsed?: boolean
  iconFill?: string
}) {
  const text = tone === "light" ? "text-white" : "text-ink"
  const iconSize = collapsed ? "h-10" : large ? "h-14 sm:h-16" : "h-9"
  return (
    <div className={`flex items-center ${className}`}>
      <LogoIcon fill={iconFill} className={`${iconSize} w-auto shrink-0 transition-all duration-500`} />
      <div
        className={`flex flex-col overflow-hidden whitespace-nowrap leading-none transition-all duration-500 ${
          collapsed
            ? "max-xl:ml-3 max-xl:max-w-xs max-xl:opacity-100 xl:ml-0 xl:max-w-0 xl:opacity-0"
            : `max-w-xs opacity-100 ${large ? "ml-4" : "ml-3"}`
        }`}
      >
        <span className={`${large ? (collapsed ? "text-3xl xl:text-4xl" : "text-4xl") : "text-[1.6rem]"} font-semibold tracking-tight ${text}`}>
          gcm
        </span>
        <span className={`mt-1.5 text-[0.55rem] font-semibold tracking-[0.3em] ${text}`}>
          CONSULTORÍA ORGANIZACIONAL
        </span>
      </div>
    </div>
  )
}
