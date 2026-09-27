import { motion } from 'framer-motion'
import { useMemo } from 'react'

/**
 * Drifting golden particles that animate in after the envelope opens.
 * Pure CSS / framer-motion, no canvas.
 */
export function Petals({ active }: { active: boolean }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => {
        const side = i % 2 === 0 ? -1 : 1
        return {
          id: i,
          left: Math.random() * 100,
          startY: 90 + Math.random() * 10,
          endX: side * (20 + Math.random() * 30),
          size: 4 + Math.random() * 8,
          duration: 4 + Math.random() * 5,
          delay: Math.random() * 3,
          shape: i % 3, // 0=circle 1=petal 2=star
          opacity: 0.5 + Math.random() * 0.4,
        }
      }),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: `${p.startY}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
          animate={
            active
              ? {
                  opacity: [0, p.opacity, p.opacity, 0],
                  y: -window.innerHeight * 1.1,
                  x: p.endX * 6,
                  rotate: [0, 180, 360],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeOut',
          }}
        >
          {p.shape === 0 && (
            <div
              className="w-full h-full rounded-full"
              style={{
                background:
                  'radial-gradient(circle, #f3d680 0%, #c9a45c 60%, transparent 100%)',
              }}
            />
          )}
          {p.shape === 1 && (
            <svg viewBox="0 0 10 10" className="w-full h-full">
              <path
                d="M5 0c1 2 2 3 5 5-3 2-4 3-5 5-1-2-2-3-5-5 3-2 4-3 5-5z"
                fill="#c9a45c"
                opacity="0.7"
              />
            </svg>
          )}
          {p.shape === 2 && (
            <svg viewBox="0 0 10 10" className="w-full h-full">
              <path
                d="M5 0l1.5 3 3.5.5-2.5 2.5.5 3.5L5 8l-3 1.5.5-3.5L0 3.5l3.5-.5L5 0z"
                fill="#f3d680"
                opacity="0.6"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  )
}
