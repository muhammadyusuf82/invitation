import { motion } from 'framer-motion'

/**
 * Subtle radial sun-rays that emerge from behind the envelope on first view.
 * Pure SVG, looks 2D but has minimal 3D depth via layering and rotation.
 */
export function CenterStar() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <motion.svg
        viewBox="0 0 800 800"
        className="absolute"
        style={{ width: 'min(900px, 130vw)', height: 'min(900px, 130vw)' }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: [0, 0.45, 0.3], rotate: 360 }}
        transition={{
          opacity: { duration: 1.5, ease: 'easeOut' },
          rotate: { duration: 80, repeat: Infinity, ease: 'linear' },
        }}
      >
        <defs>
          <radialGradient id="ray-grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#c9a45c" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#c9a45c" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#c9a45c" stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: 24 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 15} 400 400)`}>
            <path
              d="M400 80 L420 380 L400 400 L380 380 Z"
              fill="url(#ray-grad)"
            />
          </g>
        ))}
      </motion.svg>

      <motion.svg
        viewBox="0 0 800 800"
        className="absolute"
        style={{ width: 'min(700px, 100vw)', height: 'min(700px, 100vw)' }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.25, rotate: -360 }}
        transition={{
          opacity: { duration: 2, ease: 'easeOut', delay: 0.4 },
          rotate: { duration: 110, repeat: Infinity, ease: 'linear' },
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 30} 400 400)`}>
            <path
              d="M400 120 L408 370 L400 400 L392 370 Z"
              fill="#8c2018"
              opacity="0.5"
            />
          </g>
        ))}
      </motion.svg>
    </div>
  )
}
