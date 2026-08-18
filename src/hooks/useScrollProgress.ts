import { useEffect, useRef } from 'react'

export const CHAPTER_IDS = ['hero', 'philosophy', 'about', 'skills', 'experience', 'projects', 'contact'] as const
export type ChapterId = (typeof CHAPTER_IDS)[number]

export interface ChapterProgress {
  /** 0 when the section's top is at the viewport bottom, 1 once its bottom has passed the viewport top. */
  progress: number
  /** Signed distance of the section's center from the viewport center, in viewport-heights. */
  center: number
}

export interface ScrollProgressState {
  /** 0..1 across the whole document. */
  global: number
  sections: Partial<Record<ChapterId, ChapterProgress>>
  activeId: ChapterId | null
  /**
   * Continuous chapter position: floor(story) is the chapter index, the
   * fractional part is how far the viewport center has moved through it.
   * Built from the viewport-center's position inside each section's box, so
   * it is continuous across chapter boundaries (no jump at the handoff) —
   * this is what the camera rig walks along.
   */
  story: number
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v)

/**
 * Tracks page scroll against the seven chapter sections without triggering
 * React re-renders — the 3D camera rig reads this ref every frame instead.
 */
export function useScrollProgress() {
  const stateRef = useRef<ScrollProgressState>({ global: 0, sections: {}, activeId: null, story: 0 })

  const elsRef = useRef<Partial<Record<ChapterId, HTMLElement | null>>>({})
  const elsResolvedRef = useRef(false)

  useEffect(() => {
    let raf = 0

    // Sections mount lazily (behind the preloader, then behind per-section
    // Suspense boundaries) — this hook is already running by then, so a
    // one-shot lookup on mount would cache a bunch of nulls. Keep re-querying
    // until every id resolves at least once, then stop paying for it.
    const resolveEls = () => {
      let allFound = true
      for (const id of CHAPTER_IDS) {
        const el = document.getElementById(id)
        elsRef.current[id] = el
        if (!el) allFound = false
      }
      elsResolvedRef.current = allFound
    }

    const measure = () => {
      if (!elsResolvedRef.current) resolveEls()

      const scrollY = window.scrollY
      const vh = window.innerHeight
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh)
      const viewportCenter = scrollY + vh / 2

      const sections: ScrollProgressState['sections'] = {}
      let activeId: ChapterId | null = null
      let closestDist = Infinity
      let story = 0

      for (let i = 0; i < CHAPTER_IDS.length; i++) {
        const id = CHAPTER_IDS[i]
        const el = elsRef.current[id]
        if (!el) continue
        const top = el.offsetTop
        const height = el.offsetHeight
        const start = top - vh
        const end = top + height
        const progress = clamp((scrollY - start) / Math.max(1, end - start), 0, 1)
        const center = top + height / 2
        const dist = Math.abs(center - viewportCenter)

        sections[id] = { progress, center: (center - viewportCenter) / vh }
        if (dist < closestDist) {
          closestDist = dist
          activeId = id
        }

        if (viewportCenter >= top || i === 0) {
          story = i + clamp((viewportCenter - top) / Math.max(1, height), 0, 1)
        }
      }

      stateRef.current = { global: clamp(scrollY / maxScroll, 0, 1), sections, activeId, story }
      raf = 0
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    const onResize = () => {
      resolveEls()
      onScroll()
    }

    resolveEls()
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return stateRef
}
