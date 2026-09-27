import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { WaxSeal, Paisley } from '../lib/ornaments'

type Props = {
  state: 'closed' | 'opening' | 'open'
  onOpen: () => void
}

/**
 * 3D envelope. The whole envelope tilts toward the viewer on hover (subtle 2D-feeling 3D).
 * The flap is a separate panel that rotates around its bottom edge with rotateX.
 * Click anywhere → onOpen() → parent advances state.
 */
export function Envelope({ state, onOpen }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  // gentle 3D tilt with mouse (minimalistic — capped to a few degrees)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotY = useSpring(useTransform(mx, [-1, 1], [-6, 6]), {
    stiffness: 120,
    damping: 18,
  })
  const rotX = useSpring(useTransform(my, [-1, 1], [-4, 4]), {
    stiffness: 120,
    damping: 18,
  })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
      mx.set(x)
      my.set(y)
    }
    const handleLeave = () => {
      mx.set(0)
      my.set(0)
      setHovered(false)
    }
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [mx, my])

  const isClosed = state === 'closed'
  const isOpening = state === 'opening'

  return (
    <div className="relative">
      {/* pulsing glow ring around the envelope */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: '50%',
          top: '50%',
          width: '130%',
          height: '130%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(201, 164, 92, 0.25) 0%, rgba(201, 164, 92, 0.05) 40%, transparent 70%)',
          filter: 'blur(8px)',
          animation: 'pulseGlow 3s ease-in-out infinite',
        }}
      />
      <motion.div
        ref={containerRef}
        className="relative cursor-pointer"
        style={{
          perspective: 1400,
          width: 440,
          height: 300,
          maxWidth: '88vw',
          maxHeight: '62vh',
        }}
        onMouseEnter={() => setHovered(true)}
        onClick={onOpen}
        initial={{ scale: 0.92, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            rotateX: rotX,
            rotateY: rotY,
          }}
          animate={{
            y: hovered && isClosed ? -3 : 0,
          }}
          transition={{ type: 'spring', stiffness: 180, damping: 16 }}
        >
          {/* ===== BACK PANEL ===== */}
          <div
            className="absolute inset-0 rounded-[6px] overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, #f9f2e5 0%, #f3e9d3 50%, #ecdfc1 100%)',
              boxShadow:
                '0 30px 60px -20px rgba(92, 32, 24, 0.28), 0 18px 36px -18px rgba(140, 60, 30, 0.18), inset 0 0 0 1px rgba(201, 164, 92, 0.25)',
            }}
          >
            {/* paper grain via tiny dots */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(140, 80, 40, 0.15) 1px, transparent 0)',
                backgroundSize: '3px 3px',
              }}
            />
            {/* gold inner border */}
            <div className="absolute inset-3 border border-[#c9a45c]/40 rounded-[3px] pointer-events-none" />
            <div className="absolute inset-5 border border-[#c9a45c]/20 rounded-[2px] pointer-events-none" />

            {/* center ornament */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex flex-col items-center gap-3 -mt-2">
                <Paisley size={56} fill="#8c2018" />
                <div className="text-[11px] tracking-[0.6em] text-[#8c2018]/80 font-serif uppercase">
                  Taklifnoma
                </div>
                <Paisley size={56} fill="#8c2018" style={{ transform: 'rotate(180deg)' }} />
              </div>
            </div>
          </div>

          {/* ===== BODY (letter pocket shows above flap when open) ===== */}
          {/* The "body" is what sits in front; we render an inner shadow at the top so it looks 3D */}
          <div
            className="absolute inset-x-0 bottom-0 h-[78%] rounded-b-[6px] pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(120, 60, 20, 0.08) 100%)',
            }}
          />

          {/* ===== FRONT POCKET (V-shaped crease) ===== */}
          <svg
            className="absolute inset-0 pointer-events-none"
            viewBox="0 0 440 300"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pocket-front" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbf4e6" />
                <stop offset="100%" stopColor="#e8d9b5" />
              </linearGradient>
              <linearGradient id="crease-shade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(120,60,20,0.18)" />
                <stop offset="100%" stopColor="rgba(120,60,20,0)" />
              </linearGradient>
            </defs>
            <path
              d="M0 130 L220 240 L440 130 L440 300 L0 300 Z"
              fill="url(#pocket-front)"
            />
            <path
              d="M0 130 L220 240 L440 130"
              stroke="#8c2018"
              strokeWidth="0.6"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M0 130 L220 240 L440 130 L220 220 Z"
              fill="url(#crease-shade)"
              opacity="0.5"
            />
          </svg>

          {/* ===== FLAP ===== */}
          <motion.div
            className="absolute top-0 left-0 right-0"
            style={{
              height: '50%',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              perspective: 800,
            }}
            initial={false}
            animate={{
              rotateX: isClosed ? 0 : -178,
            }}
            transition={{
              duration: isOpening ? 1.3 : 0.7,
              ease: [0.5, 0, 0.2, 1],
            }}
          >
            {/* FRONT face of the flap */}
            <div
              className="absolute inset-0 overflow-hidden rounded-t-[6px]"
              style={{
                backfaceVisibility: 'hidden',
                background:
                  'linear-gradient(180deg, #fbf4e6 0%, #efe2c4 100%)',
                boxShadow: 'inset 0 -2px 8px rgba(120, 60, 20, 0.15)',
              }}
            >
              {/* triangle illusion via SVG matching body crease */}
              <svg
                className="absolute inset-0"
                viewBox="0 0 440 150"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="flap-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbf4e6" />
                    <stop offset="100%" stopColor="#e3d2aa" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 0 L440 0 L220 150 Z"
                  fill="url(#flap-grad)"
                />
                {/* ornamental border inside flap */}
                <path
                  d="M30 15 L410 15 L220 130 Z"
                  fill="none"
                  stroke="#c9a45c"
                  strokeWidth="0.6"
                  opacity="0.6"
                />
                <path
                  d="M40 20 L400 20 L220 122 Z"
                  fill="none"
                  stroke="#c9a45c"
                  strokeWidth="0.4"
                  opacity="0.4"
                />
              </svg>

              {/* corner paisleys */}
              <div className="absolute top-2 left-2 opacity-70">
                <Paisley size={24} fill="#c9a45c" />
              </div>
              <div className="absolute top-2 right-2 opacity-70">
                <Paisley size={24} fill="#c9a45c" style={{ transform: 'scaleX(-1)' }} />
              </div>
            </div>

            {/* BACK face (visible when open) — paper underside */}
            <div
              className="absolute inset-0 rounded-t-[6px]"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
                background: 'linear-gradient(180deg, #e8d9b5 0%, #d9c590 100%)',
              }}
            />
          </motion.div>

          {/* ===== WAX SEAL — breaks into pieces ===== */}
          <div
            className="absolute pointer-events-none z-10"
            style={{
              left: '50%',
              top: '52%',
              x: '-50%',
              y: '-50%',
            }}
          >
            {/* whole seal (only when closed) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isClosed
                  ? { scale: 1, opacity: 1, rotate: 0 }
                  : { scale: 0.85, opacity: 0, rotate: 35 }
              }
              transition={{ duration: 0.45, ease: [0.5, 0, 0.2, 1] }}
            >
              <WaxSeal size={78} initials="♥" />
            </motion.div>

            {/* fragment burst (when opening) */}
            {!isClosed && (
              <div className="absolute inset-0 flex items-center justify-center">
                {Array.from({ length: 9 }).map((_, i) => {
                  const angle = (i / 9) * Math.PI * 2
                  const dist = 60 + (i % 3) * 14
                  const dx = Math.cos(angle) * dist
                  const dy = Math.sin(angle) * dist * 0.8
                  const rot = (i * 37) % 360
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-sm"
                      style={{
                        width: 10 + (i % 3) * 3,
                        height: 10 + (i % 3) * 3,
                        background:
                          i % 2 === 0
                            ? 'linear-gradient(135deg, #c8423a, #8c2018)'
                            : 'linear-gradient(135deg, #8c2018, #5c140e)',
                        boxShadow: '0 2px 4px rgba(60, 12, 8, 0.3)',
                      }}
                      initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                      animate={{ x: dx, y: dy, rotate: rot, opacity: 0 }}
                      transition={{
                        duration: 0.9,
                        ease: [0.4, 0, 0.2, 1],
                        delay: 0.05,
                      }}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* ===== HINT TEXT ===== */}
          <motion.div
            className="absolute -bottom-12 left-0 right-0 text-center pointer-events-none"
            animate={{ opacity: isClosed ? 1 : 0, y: isClosed ? 0 : 8 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-[11px] tracking-[0.4em] text-[#8c2018]/60 uppercase font-serif">
              xat ochish uchun bosing
            </div>
            <div className="text-[10px] tracking-[0.3em] text-[#8c2018]/40 mt-1 uppercase">
              click to open
            </div>
            {/* dotted animated underline */}
            <motion.div
              className="mx-auto mt-2 h-px bg-gradient-to-r from-transparent via-[#8c2018]/40 to-transparent"
              animate={{ width: ['40%', '60%', '40%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* keyframes for pulse glow */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.06); }
        }
      `}</style>
    </div>
  )
}
