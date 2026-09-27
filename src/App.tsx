import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Envelope } from './components/Envelope'
import { Letter } from './components/Letter'
import { Petals } from './components/Petals'
import { CenterStar } from './components/CenterStar'
import { PatternBackground } from './lib/ornaments'

type Stage = 'closed' | 'opening' | 'letter'

export default function App() {
  const [stage, setStage] = useState<Stage>('closed')
  const [letterShown, setLetterShown] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  const handleOpen = () => {
    if (stage !== 'closed') return
    setStage('opening')
    setHasOpened(true)
    window.setTimeout(() => {
      setStage('letter')
      window.setTimeout(() => setLetterShown(true), 50)
    }, 1500)
  }

  const handleCloseLetter = () => {
    setLetterShown(false)
    window.setTimeout(() => {
      setStage('closed')
    }, 600)
  }

  // Lock body scroll while envelope hasn't been opened yet.
  // The letter has its own scroller so the page itself never scrolls.
  useEffect(() => {
    const isLetterActive = stage === 'letter' && letterShown
    if (isLetterActive || stage === 'opening') {
      document.body.style.overflow = 'hidden'
    } else if (stage === 'closed' && !hasOpened) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [stage, letterShown, hasOpened])

  const showLetter = stage === 'letter'

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #fbf4e6 0%, #f6ead0 50%, #efdfc0 100%)',
      }}
    >
      {/* paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(140, 80, 40, 0.25) 1px, transparent 0)',
          backgroundSize: '3px 3px',
        }}
      />

      {/* tiled ornament pattern */}
      <PatternBackground />

      {/* edge vignettes */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(120, 80, 30, 0.18) 100%)',
        }}
      />

      {/* Slowly spinning sun-rays behind the envelope */}
      <CenterStar />

      {/* Floating particles (start when opening) */}
      <Petals active={hasOpened} />

      {/* Golden flash overlay that fires once when the envelope opens */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[25]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(243, 214, 128, 0.7) 0%, rgba(243, 214, 128, 0.2) 30%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hasOpened ? [0, 0.6, 0] : 0 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
      />

      {/* HEADER strip */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8"
      >
        <div
          className="flex items-center gap-2 text-[#8c2018]"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          <span className="block w-6 h-px bg-[#c9a45c]" />
          <span className="text-[10px] tracking-[0.5em] uppercase">Taklifnoma</span>
        </div>
        <div
          className="text-[10px] tracking-[0.5em] uppercase text-[#8c2018]/70"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          07 · 10 · 2026
        </div>
      </motion.header>

      {/* STAGE: envelope (visible while closed/opening) */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center min-h-screen transition-opacity duration-500 ${
          showLetter ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* greeting line above envelope */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="absolute top-[16%] left-0 right-0 text-center"
        >
          <div
            className="text-[#8c2018]/70 text-[11px] tracking-[0.6em] uppercase"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            sizni katta quvonch bilan
          </div>
          <motion.div
            className="mt-4 text-[#5c2018]"
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: 'clamp(28px, 4.5vw, 44px)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            turmush qurish tantanamizga
          </motion.div>
          <motion.div
            className="mt-1 text-[#5c2018]/90"
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: 'clamp(36px, 6vw, 58px)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
          >
            taklif etamiz
          </motion.div>
        </motion.div>

        <Envelope
          state={stage === 'closed' ? 'closed' : 'opening'}
          onOpen={handleOpen}
        />

        {/* soft bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-[7%] left-0 right-0 text-center"
        >
          <div
            className="inline-flex flex-col items-center gap-2 text-[#8c2018]/50"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            <div className="flex items-center gap-3">
              <span className="block w-8 h-px bg-[#c9a45c]/60" />
              <span className="text-[10px] tracking-[0.4em] uppercase">
                Shohonbek 
              </span>
              <span className="block w-8 h-px bg-[#c9a45c]/60" />
            </div>
            <div
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              2026
            </div>
          </div>
        </motion.div>
      </div>

      {/* LETTER overlay */}
      <AnimatePresence>
        {showLetter && <Letter visible={letterShown} onClose={handleCloseLetter} />}
      </AnimatePresence>

      {/* keyframes for ambient sun + glow (added globally) */}
      <style>{`
        @keyframes sunSpinSlow { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
