import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ChapterId, ScrollProgressState } from '../hooks/useScrollProgress'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

import sakuraBranch from '../secret-pathways-assets/foreground/png/sakura-branch.webp'
import templeWall from '../secret-pathways-assets/foreground/png/temple-wall.webp'
import gardenBush from '../secret-pathways-assets/foreground/png/garden-bush.webp'
import tallGrass from '../secret-pathways-assets/foreground/png/tall-grass.webp'
import stoneLantern from '../secret-pathways-assets/foreground/png/stone-lantern.webp'
import pineTree from '../secret-pathways-assets/foreground/png/pine-tree.webp'
import hill from '../secret-pathways-assets/foreground/png/hill.webp'

// One cutout per chapter, pinned to the bottom of the viewport while that
// chapter is active — arrives in focus, holds, then fades+blurs out on
// handoff to the next. Screen-space (DOM), not world-space: no 3D depth or
// occlusion to fight, so it can never leave a gap of raw black behind it.
const FOREGROUND: Record<ChapterId, string> = {
  hero: sakuraBranch,
  philosophy: templeWall,
  about: gardenBush,
  skills: tallGrass,
  experience: stoneLantern,
  projects: pineTree,
  contact: hill,
}

export default function ForegroundStrip({ scrollRef }: { scrollRef: { current: ScrollProgressState } }) {
  const reducedMotion = usePrefersReducedMotion()
  const [activeId, setActiveId] = useState<ChapterId | null>(null)

  useEffect(() => {
    let raf = 0
    const check = () => {
      setActiveId((prev) => {
        const next = scrollRef.current.activeId
        return next !== prev ? next : prev
      })
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [scrollRef])

  const src = activeId ? FOREGROUND[activeId] : undefined

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 bottom-0 z-[5] h-[13vh] sm:h-[15vh] overflow-hidden pointer-events-none [mask-image:linear-gradient(to_top,black_35%,transparent)]"
    >
      <AnimatePresence mode="wait">
        {src && (
          <motion.img
            key={activeId}
            src={src}
            alt=""
            initial={reducedMotion ? { opacity: 0.85 } : { opacity: 0, scale: 1.04, filter: 'blur(16px)' }}
            animate={{ opacity: 0.85, scale: 1, filter: 'blur(0px)' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(12px)' }}
            transition={{ duration: reducedMotion ? 0.15 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 w-full h-full object-cover object-bottom"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
