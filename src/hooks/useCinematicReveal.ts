import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll-scrubbed blur entrance for a section wrapper — the DOM half of the
 * cinematic system (the 3D camera rig is the other half). Single direction
 * only (blur settles in, then holds crisp): a matching exit tween would
 * fight this one's scrub on any section shorter than the viewport, which is
 * most of them. No `scale` here deliberately — a scaled-down block element
 * in normal flow doesn't reserve extra space, so its shrunk edges expose a
 * sliver of whatever sits behind the section: a hard seam at every section
 * boundary for the length of the scroll-in.
 */
export function useCinematicReveal(ref: RefObject<HTMLElement | null>) {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reducedMotion) {
      gsap.set(el, { clearProps: 'filter,opacity' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { filter: 'blur(10px)', opacity: 0.45 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 55%',
            scrub: 0.6,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [ref, reducedMotion])
}
