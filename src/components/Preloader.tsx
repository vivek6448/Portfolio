import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader({ onDone }: { onDone: () => void }) {
  // Read synchronously on first render so reduced-motion users never see a
  // single frame of the preloader before it's skipped.
  const [skip] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [visible, setVisible] = useState(!skip)
  const [display, setDisplay] = useState(0)
  const count = useMotionValue(0)
  const dividerColor = useTransform(count, [0, 100], ['#6b7280', '#e2452b'])

  useEffect(() => {
    if (skip) {
      onDone()
      return
    }

    const unsubscribe = count.on('change', v => setDisplay(Math.round(v)))
    let cancelled = false

    function finish() {
      if (cancelled) return
      animate(count, 100, {
        duration: 1,
        ease: 'easeOut',
        onComplete: () => {
          if (cancelled) return
          window.setTimeout(() => {
            if (cancelled) return
            setVisible(false)
          }, 900)
        },
      })
    }

    // Ties the visual count to real page-load state: ramp toward (but not to)
    // 100 while waiting on `load`, then snap the rest of the way once the
    // page is actually ready — never a fixed timer disconnected from reality.
    const alreadyReady = document.readyState === 'complete'
    const ramp = animate(count, alreadyReady ? 96 : 90, {
      duration: alreadyReady ? 1.2 : 4.2,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        if (alreadyReady) finish()
      },
    })

    if (!alreadyReady) {
      window.addEventListener('load', finish, { once: true })
    }

    return () => {
      cancelled = true
      ramp.stop()
      window.removeEventListener('load', finish)
      unsubscribe()
    }
  }, [skip])

  useEffect(() => {
    if (skip) return
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible, skip])

  if (skip) return null

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <span className="font-display font-bold text-6xl sm:text-7xl md:text-8xl tabular-nums text-white">
            {display}
          </span>
          <motion.span
            className="mt-6 h-px w-40 sm:w-56"
            style={{ backgroundColor: dividerColor }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
