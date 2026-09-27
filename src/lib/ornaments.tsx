import { motion } from 'framer-motion'

/** Elegant paisley / boteh — classic Uzbek ornament */
export function Paisley({
  size = 60,
  className = '',
  fill = 'currentColor',
  style,
}: {
  size?: number
  className?: string
  fill?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 4C20 4 12 14 12 26c0 14 10 24 20 24s20-10 20-24c0-6-2-12-6-16 4 8 0 18-8 18-6 0-10-6-10-12 0-6 4-12 10-12 2 0 4 1 6 2-3-2-7-2-12-2z"
        fill={fill}
        opacity="0.85"
      />
      <path
        d="M32 18c-4 0-6 4-6 8s2 8 6 8 6-4 6-8-2-8-6-8z"
        fill="#fff"
        opacity="0.4"
      />
      <circle cx="32" cy="26" r="2" fill={fill} opacity="0.9" />
    </svg>
  )
}

/** Crescent moon with star — Uzbek cultural symbol */
export function CrescentStar({
  size = 40,
  className = '',
  fill = 'currentColor',
}: {
  size?: number
  className?: string
  fill?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size / 2}
      viewBox="0 0 80 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M55 32a16 16 0 1 1 0-24 12 12 0 0 0 0 24z"
        fill={fill}
      />
      <path
        d="M14 20l2.5-7.5L19 20l7.5 2.5L19 25l-2.5 7.5L14 25l-7.5-2.5L14 20z"
        fill={fill}
      />
      <circle cx="6" cy="8" r="1.5" fill={fill} opacity="0.6" />
      <circle cx="36" cy="6" r="1.5" fill={fill} opacity="0.6" />
      <circle cx="40" cy="34" r="1.5" fill={fill} opacity="0.6" />
    </svg>
  )
}

/** Ornamental divider line — used between text blocks */
export function OrnamentalDivider({
  width = 300,
  fill = 'currentColor',
  className = '',
}: {
  width?: number
  fill?: string
  className?: string
}) {
  return (
    <svg
      width={width}
      height="24"
      viewBox="0 0 300 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12h110"
        stroke={fill}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M190 12h110"
        stroke={fill}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <circle cx="150" cy="12" r="3" fill={fill} />
      <circle cx="150" cy="12" r="6" stroke={fill} strokeWidth="0.8" fill="none" />
      <path
        d="M140 12c2-4 8-4 10 0M150 12c2-4 8-4 10 0"
        stroke={fill}
        strokeWidth="0.6"
        fill="none"
      />
      <circle cx="125" cy="12" r="1.5" fill={fill} />
      <circle cx="175" cy="12" r="1.5" fill={fill} />
    </svg>
  )
}

/** Decorative corner flourish — sits at card corners */
export function CornerFlourish({
  size = 60,
  flip = false,
  fill = 'currentColor',
  className = '',
  rotate = 0,
}: {
  size?: number
  flip?: boolean
  fill?: string
  className?: string
  rotate?: number
}) {
  const transforms: string[] = []
  if (flip) transforms.push('scaleX(-1)')
  if (rotate) transforms.push(`rotate(${rotate}deg)`)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: transforms.join(' ') || undefined }}
    >
      <path
        d="M2 2h30c12 0 22 8 26 18"
        stroke={fill}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M2 2v30c0 12 8 22 18 26"
        stroke={fill}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M12 12c8 0 14 4 16 12"
        stroke={fill}
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="58" cy="20" r="2" fill={fill} />
      <circle cx="44" cy="8" r="1.5" fill={fill} opacity="0.6" />
      <circle cx="20" cy="44" r="1.5" fill={fill} opacity="0.6" />
      <path
        d="M48 12c4 0 6 4 6 8"
        stroke={fill}
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M12 48c0-4 4-6 8-6"
        stroke={fill}
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  )
}

/** Wax seal — sits on closed envelope flap */
export function WaxSeal({
  size = 70,
  initials = '♥',
}: {
  size?: number
  initials?: string
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="drop-shadow-[0_4px_8px_rgba(120,30,15,0.35)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="wax-grad" cx="0.35" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#c8423a" />
          <stop offset="50%" stopColor="#8c2018" />
          <stop offset="100%" stopColor="#5c140e" />
        </radialGradient>
        <radialGradient id="seal-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </radialGradient>
      </defs>
      {/* irregular wax shape */}
      <path
        d="M50 6l8 4 9-2 6 7 9 4 1 9 7 6-2 9 4 9-7 6-1 9-9 4-6 7-9-2-8 4-8-4-9 2-6-7-9-4-1-9-7-6 4-9-2-9 7-6 1-9 9-4 6-7 9 2z"
        fill="url(#wax-grad)"
      />
      <circle cx="50" cy="50" r="30" fill="url(#seal-shadow)" opacity="0.3" />
      {/* initial symbol */}
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontSize="32"
        fill="#5c140e"
        fontFamily="serif"
        fontStyle="italic"
        opacity="0.55"
      >
        {initials}
      </text>
      {/* decorative ring */}
      <circle
        cx="50"
        cy="50"
        r="26"
        fill="none"
        stroke="#5c140e"
        strokeWidth="0.5"
        opacity="0.4"
      />
    </motion.svg>
  )
}

/** Subtle background pattern — tiled ornament */
export function PatternBackground() {
  return (
    <svg
      width="100%"
      height="100%"
      className="absolute inset-0 opacity-[0.06] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="ornament-pattern"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 10c-8 0-14 6-14 14 0 10 6 16 14 16s14-6 14-16c0-4-2-8-4-10 2 4 0 12-6 12-4 0-6-4-6-8s2-8 6-8c2 0 4 2 4 2-2-2-4-2-8-2z"
            fill="#8c2018"
          />
          <circle cx="40" cy="60" r="2" fill="#c9a45c" />
          <circle cx="20" cy="40" r="1.5" fill="#c9a45c" />
          <circle cx="60" cy="40" r="1.5" fill="#c9a45c" />
          <path
            d="M10 10l4 4M70 10l-4 4M10 70l4-4M70 70l-4-4"
            stroke="#c9a45c"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ornament-pattern)" />
    </svg>
  )
}

/** Decorative oval frame around the couple */
export function OvalFrame({
  fill = 'currentColor',
  className = '',
}: {
  fill?: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="200"
        cy="250"
        rx="180"
        ry="230"
        stroke={fill}
        strokeWidth="1.2"
        opacity="0.5"
      />
      <ellipse
        cx="200"
        cy="250"
        rx="170"
        ry="220"
        stroke={fill}
        strokeWidth="0.5"
        opacity="0.3"
      />
      {/* ornamental flourishes at top and bottom */}
      <path
        d="M160 30c10-8 30-10 40 0s30 8 40 0"
        stroke={fill}
        strokeWidth="1"
        fill="none"
      />
      <circle cx="200" cy="20" r="3" fill={fill} />
      <path
        d="M160 470c10 8 30 10 40 0s30-8 40 0"
        stroke={fill}
        strokeWidth="1"
        fill="none"
      />
      <circle cx="200" cy="480" r="3" fill={fill} />
    </svg>
  )
}
