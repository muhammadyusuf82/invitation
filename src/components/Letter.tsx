import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Paisley,
  CrescentStar,
  OrnamentalDivider,
  CornerFlourish,
} from '../lib/ornaments'
import coupleImg from '../../public/images/couple.png'

type Props = {
  visible: boolean
  onClose: () => void
}

/**
 * The letter that emerges from the envelope and unfolds to reveal the invitation.
 * Once unfolded, scrolling within the letter area reveals more content.
 */
export function Letter({ visible, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  // Mouse parallax — inner elements shift very slightly with the cursor
  // for that "minimalistic 3D that looks 2D" depth illusion.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const cardRx = useSpring(useTransform(my, [-1, 1], [-2.5, 2.5]), {
    stiffness: 120,
    damping: 18,
  })
  const cardRy = useSpring(useTransform(mx, [-1, 1], [-3, 3]), {
    stiffness: 120,
    damping: 18,
  })
  const innerX = useSpring(useTransform(mx, [-1, 1], [-8, 8]), {
    stiffness: 90,
    damping: 16,
  })
  const innerY = useSpring(useTransform(my, [-1, 1], [-6, 6]), {
    stiffness: 90,
    damping: 16,
  })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2))
    my.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2))
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      className="fixed inset-0 z-30 flex items-center justify-center px-4 py-6 overflow-y-auto"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(249, 240, 220, 0.85) 0%, rgba(232, 215, 178, 0.55) 100%)',
        backdropFilter: 'blur(2px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, delay: visible ? 0.1 : 0 }}
      onClick={(e) => {
        if ((e.target as HTMLElement).dataset.closer) onClose()
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative bg-[#fbf4e6] shadow-2xl mx-auto my-auto"
        style={{
          width: 'min(640px, 94vw)',
          transformStyle: 'preserve-3d',
          perspective: 1200,
          rotateX: cardRx,
          rotateY: cardRy,
        }}
        initial={{ y: 80, scale: 0.9, opacity: 0, rotateX: 18 }}
        animate={
          visible
            ? { y: 0, scale: 1, opacity: 1, rotateX: 0 }
            : { y: 80, scale: 0.9, opacity: 0, rotateX: 18 }
        }
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
          delay: visible ? 0.25 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* paper grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25 rounded-[3px]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(140, 80, 40, 0.2) 1px, transparent 0)',
            backgroundSize: '3px 3px',
          }}
        />

        {/* decorative outer borders */}
        <div className="absolute inset-3 border border-[#c9a45c]/40 rounded-[3px] pointer-events-none" />
        <div className="absolute inset-5 border border-[#c9a45c]/25 rounded-[2px] pointer-events-none" />

        {/* corner flourishes */}
        <CornerFlourish
          size={70}
          className="absolute top-3 left-3 text-[#c9a45c]"
        />
        <CornerFlourish
          size={70}
          flip
          className="absolute top-3 right-3 text-[#c9a45c]"
        />
        <CornerFlourish
          size={70}
          flip
          rotate={180}
          className="absolute bottom-3 left-3 text-[#c9a45c]"
        />
        <CornerFlourish
          size={70}
          rotate={180}
          className="absolute bottom-3 right-3 text-[#c9a45c]"
        />

        {/* CONTENT (parallax inner) */}
        <motion.div
          ref={innerRef}
          className="relative z-10 px-12 sm:px-16 py-12 sm:py-16"
          style={{ x: innerX, y: innerY }}
        >
          {/* ===== TOP: animated crescent & star ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={visible ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative shimmer-host"
          >
            <CrescentStar size={70} className="mx-auto text-[#c9a45c]" fill="#c9a45c" />
            {/* shimmer sweep across the moon-star */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none shimmer-mask">
              <div className="shimmer-bar" />
            </div>
          </motion.div>

          <motion.div
            className="mt-5 text-center font-serif italic text-[#8c2018]/80"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            <div className="text-[13px] tracking-[0.4em] uppercase">
              Bismillahir Rohmanir Rohiym
            </div>
          </motion.div>

          <motion.div
            className="mt-8 text-center flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={visible ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <OrnamentalDivider width={300} fill="#c9a45c" />
          </motion.div>

          {/* ===== INVITATION TEXT ===== */}
          <motion.div
            className="mt-7 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.95, duration: 0.6 }}
          >
            <div
              className="text-[#5c2018] text-[15px] leading-[1.9]"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              <span className="italic">Sizni</span> oilamizning eng baxtli kunida — turmush
              qurish tantanamizda <span className="italic">hurmat bilan</span> taklif qilamiz.
            </div>
          </motion.div>

          {/* ===== COUPLE ===== */}
          <motion.div
            className="mt-9 flex flex-col items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            <div className="relative w-[260px] h-[300px] sm:w-[300px] sm:h-[350px] flex items-center justify-center">
              {/* decorative double-oval frame */}
              <div className="absolute inset-x-2 inset-y-3 flex items-center justify-center pointer-events-none text-[#c9a45c]/60">
                <svg viewBox="0 0 400 500" className="w-full h-full" fill="none">
                  <ellipse cx="200" cy="250" rx="180" ry="235" stroke="#c9a45c" strokeWidth="1" opacity="0.55" />
                  <ellipse cx="200" cy="250" rx="172" ry="225" stroke="#c9a45c" strokeWidth="0.5" opacity="0.35" />
                </svg>
              </div>
              <motion.img
                src={coupleImg}
                alt="Couple"
                className="relative z-10 max-h-full max-w-full object-contain"
                style={{
                  filter: 'drop-shadow(0 6px 14px rgba(92,32,24,0.18))',
                }}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={visible ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>

          {/* ===== NAMES — animated letter by letter ===== */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <motion.div
                className="text-[#5c2018] leading-snug text-center"
                style={{
                  fontFamily: '"Great Vibes", cursive',
                  fontSize: 'clamp(22px, 3.5vw, 34px)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
              >
                Shohonbekni eng baxtli onlarida hamroh bolishinga taklif qilamiz.
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={visible ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 1.6, duration: 0.7 }}
          >
            <OrnamentalDivider width={340} fill="#c9a45c" />
          </motion.div>

          {/* ===== DATE & VENUE ===== */}
          <motion.div
            className="mt-9 grid grid-cols-2 gap-6 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.75, duration: 0.7 }}
          >
            <div>
              <div
                className="text-[#c9a45c] text-[10px] tracking-[0.5em] uppercase mb-2"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Sana
              </div>
              <div
                className="text-[#5c2018] text-[28px] font-light leading-tight"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                7
                <span className="text-[14px] align-middle mx-1 tracking-widest uppercase">
                  oktyabr
                </span>
                2026
              </div>
              <div
                className="text-[#8c2018]/70 text-[12px] tracking-[0.2em] mt-1 italic"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                chorshanba
              </div>
            </div>
            <div>
              <div
                className="text-[#c9a45c] text-[10px] tracking-[0.5em] uppercase mb-2"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Manzil
              </div>
              <div
                className="text-[#5c2018] text-[25px] leading-snug"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Savdogarlar 33
              </div>
              <div
                className="text-[#8c2018]/70 text-[12px] tracking-[0.05em] mt-1 italic"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Namangan Oromgox
              </div>
            </div>
          </motion.div>

          {/* ===== DIVIDER (with shimmer) ===== */}
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 1.9, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 relative shimmer-host">
              <Paisley size={26} fill="#c9a45c" />
              <div className="h-px w-12 bg-[#c9a45c]/50" />
              <CrescentStar size={36} fill="#c9a45c" className="text-[#c9a45c]" />
              <div className="h-px w-12 bg-[#c9a45c]/50" />
              <Paisley size={26} fill="#c9a45c" style={{ transform: 'rotate(180deg)' }} />
              <div className="absolute inset-0 overflow-hidden pointer-events-none shimmer-mask">
                <div className="shimmer-bar" />
              </div>
            </div>
          </motion.div>

          {/* ===== FOOTER ===== */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <div
              className="text-[#8c2018]/80 italic text-[14px] leading-[1.9]"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Hurmatli mehmon, sizning ishtirokingiz biz uchun
              <br />
              eng qimmatli sovg'a bo'ladi.
            </div>
            <div
              className="mt-6 text-[10px] tracking-[0.5em] uppercase text-[#8c2018]/50"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              with love · 2026
            </div>
          </motion.div>

          {/* close link */}
          <motion.button
            data-closer
            onClick={onClose}
            className="mt-10 block mx-auto text-[10px] tracking-[0.4em] uppercase text-[#8c2018]/40 hover:text-[#8c2018]/80 transition-colors"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 2.15, duration: 0.6 }}
          >
            ← yopish · close
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Shimmer animation + decorative keyframes */}
      <style>{`
        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(220%); }
        }
        .shimmer-host { position: relative; }
        .shimmer-mask {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .shimmer-bar {
          position: absolute;
          top: 0; bottom: 0;
          width: 28%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 240, 200, 0.55) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmerSlide 4.5s ease-in-out infinite;
          animation-delay: 2.2s;
          transform: translateX(-100%);
        }
      `}</style>
    </motion.div>
  )
}
