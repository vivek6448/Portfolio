import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Preloader({ onDone, ready }: { onDone: () => void; ready: boolean }) {
  // Read synchronously on first render so reduced-motion users never see a
  // single frame of the preloader before it's skipped.
  const [skip] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [visible, setVisible] = useState(!skip)
  const [display, setDisplay] = useState(0)
  const count = useMotionValue(0)
  const dividerColor = useTransform(count, [0, 100], ['#6b7280', '#e2452b'])

  // `ready` (the Night Shift 3D layer's code + textures) can flip true well
  // after — or well before — the page's own load event. Both need to be true
  // before the preloader is allowed to finish, or the cinematic background
  // pops in a beat after the old plain page is already visible. Refs (not
  // the `ready` prop directly) so the mount effect below, which only runs
  // once, always reads the current value instead of a stale closure.
  const readyRef = useRef(ready)
  useEffect(() => {
    readyRef.current = ready
  }, [ready])
  const pageLoadedRef = useRef(false)
  const forceRef = useRef(false)
  const finishedRef = useRef(false)
  const tryFinishRef = useRef<() => void>(() => {})

  useEffect(() => {
    if (skip) {
      onDone()
      return
    }

    const unsubscribe = count.on('change', v => setDisplay(Math.round(v)))
    let cancelled = false

    function tryFinish() {
      if (finishedRef.current || cancelled) return
      if (!pageLoadedRef.current || !(readyRef.current || forceRef.current)) return
      finishedRef.current = true
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
    tryFinishRef.current = tryFinish

    // Ties the visual count to real page-load state: ramp toward (but not to)
    // 100 while waiting on `load`, then snap the rest of the way once the
    // page is actually ready — never a fixed timer disconnected from reality.
    const alreadyReady = document.readyState === 'complete'
    if (alreadyReady) pageLoadedRef.current = true

    const ramp = animate(count, alreadyReady ? 96 : 90, {
      duration: alreadyReady ? 1.2 : 4.2,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => tryFinish(),
    })

    function onWindowLoad() {
      pageLoadedRef.current = true
      tryFinish()
    }
    if (!alreadyReady) {
      window.addEventListener('load', onWindowLoad, { once: true })
    }

    // Never let a slow/failed 3D-asset fetch hang the preloader forever.
    const forceTimer = window.setTimeout(() => {
      forceRef.current = true
      tryFinish()
    }, 8000)

    return () => {
      cancelled = true
      ramp.stop()
      window.removeEventListener('load', onWindowLoad)
      window.clearTimeout(forceTimer)
      unsubscribe()
    }
    // Runs once by design: `count` (a stable useMotionValue handle) and `onDone`
    // are read via closure at mount, not tracked as deps — adding them would
    // re-run this whole init sequence (and restart the ramp) on every re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip])

  // `ready` can flip true after the page-load condition already fired —
  // the mount effect above has no reason to re-run on its own, so re-check here.
  useEffect(() => {
    if (ready) tryFinishRef.current()
  }, [ready])

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
