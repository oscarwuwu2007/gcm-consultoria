type DecoProps = {
  className?: string
  color?: string
}

const ANGLE = -26.565

/** Single leaf fragment — the largest piece of the brand mark, used alone. */
export function LeafFragment({ className = "h-8 w-auto", color = "#87C244" }: DecoProps) {
  return (
    <svg viewBox="66 -2 92 202" className={className} aria-hidden="true">
      <path
        d="M68.5 27.96A157.33 157.33 0 0 1 155.65 0.38L68.5 198.45Z"
        fill={color}
      />
    </svg>
  )
}

/** Ring with the mark's vertical cut. */
export function MiniRing({ className = "h-8 w-auto", color = "#87C244" }: DecoProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <defs>
        <mask id="mini-ring-mask">
          <rect width="60" height="60" fill="#fff" />
          <rect x="31" width="6" height="60" fill="#000" />
        </mask>
      </defs>
      <circle
        cx="30"
        cy="30"
        r="22"
        fill="none"
        stroke={color}
        strokeWidth="7"
        mask="url(#mini-ring-mask)"
      />
    </svg>
  )
}

/** Trio of loose dots — a small accent beside a title or button. */
export function DotTrio({ className = "h-8 w-auto", color = "#87C244" }: DecoProps) {
  return (
    <svg viewBox="0 0 50 50" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="5" fill={color} />
      <circle cx="25" cy="25" r="5" fill={color} opacity="0.55" />
      <circle cx="38" cy="42" r="5" fill="#4d4e50" />
    </svg>
  )
}

/** Ribbon / parallelogram cut at the mark's diagonal angle. */
export function MiniRibbon({ className = "h-5 w-auto", color = "#87C244" }: DecoProps) {
  return (
    <svg viewBox="0 0 80 24" className={className} aria-hidden="true">
      <polygon points="0,0 70,0 60,24 0,24" fill={color} />
      <polygon points="72,0 80,0 70,24 62,24" fill={color} opacity="0.45" />
    </svg>
  )
}

/** Pair of angled bars sharing the mark's diagonal cut. */
export function AngledBars({ className = "h-9 w-auto", color = "#87C244" }: DecoProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <g transform={`rotate(${ANGLE} 30 30)`}>
        <rect x="20" y="6" width="7" height="48" fill={color} />
        <rect x="33" y="16" width="3" height="28" fill="#4d4e50" />
      </g>
    </svg>
  )
}

const LEAF_A = "M0.34 150.19L33.74 216.98L7.79 206.08A157.33 157.33 0 0 1 0.34 150.19Z"
const LEAF_B = "M48.5 44.24L48.5 200.5L5.96 115.41A157.33 157.33 0 0 1 48.5 44.24Z"
const LEAF_C = "M68.5 27.96A157.33 157.33 0 0 1 155.65 0.38L68.5 198.45Z"

/** The mark's three pieces, separated. */
export function Fragments({ className = "h-32 w-auto", color = "#87C244" }: DecoProps) {
  return (
    <svg viewBox="-20 -14 196 248" className={className} aria-hidden="true">
      <path d={LEAF_A} fill={color} opacity="0.55" transform="translate(-16 10)" />
      <path d={LEAF_B} fill={color} />
      <path d={LEAF_C} fill={color} transform="translate(14 -10)" />
    </svg>
  )
}

/** The mark's circle with its vertical and diagonal cuts, as a corner piece. */
export function SlicedArc({ className = "w-72", color = "#87C244" }: DecoProps) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <defs>
        <mask id="sliced-arc-mask">
          <rect width="400" height="400" fill="#fff" />
          <rect x="250" y="-100" width="18" height="700" fill="#000" transform={`rotate(${ANGLE} 400 0)`} />
          <rect x="150" y="-100" width="18" height="700" fill="#000" />
        </mask>
      </defs>
      <g mask="url(#sliced-arc-mask)">
        <circle cx="400" cy="0" r="330" fill={color} fillOpacity="0.16" />
        <circle cx="400" cy="0" r="230" fill={color} fillOpacity="0.5" />
      </g>
    </svg>
  )
}
