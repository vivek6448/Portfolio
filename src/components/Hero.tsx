import { motion, useMotionTemplate, useMotionValue, type Variants } from 'framer-motion'
import { useRef, useState } from 'react'
import { personalInfo, skills } from '../data/portfolioData'
import { W, useReducedMotion as useHoverDisabled } from './GlowText'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function AnimatedLine({ text, delayChildren, reduced }: { text: string; delayChildren: number; reduced: boolean }) {
  const chars = Array.from(text)
  const hoverDisabled = useHoverDisabled()
  // Touch devices (phone/iPad) get the same instant reveal as prefers-reduced-motion —
  // the per-character blur/stagger intro adds ~1.2s that's pure delay with no payoff
  // on a device that can't hover anyway.
  const instant = reduced || hoverDisabled
  const lineRef = useRef<HTMLSpanElement>(null)
  const [hovering, setHovering] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const maskImage = useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black 55%, transparent 100%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = lineRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.span
      className="block"
      initial={instant ? { filter: 'blur(0px)', scale: 1 } : { filter: 'blur(16px)', scale: 1.04 }}
      animate={{ filter: 'blur(0px)', scale: 1 }}
      transition={{ duration: instant ? 0 : 1.1, delay: instant ? 0 : delayChildren, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        ref={lineRef}
        className="relative block"
        onMouseMove={hoverDisabled ? undefined : handleMouseMove}
        onMouseEnter={() => !hoverDisabled && setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        initial={instant ? 'show' : 'hidden'}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: instant ? 0 : 0.03, delayChildren: instant ? 0 : delayChildren } },
        }}
      >
        {/* warm glow that tracks the cursor, blending into the page background */}
        {!hoverDisabled && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -z-10 h-64 w-64 rounded-full blur-3xl"
            style={{
              left: mouseX,
              top: mouseY,
              translateX: '-50%',
              translateY: '-50%',
              background:
                'radial-gradient(circle, rgba(226,69,43,0.6) 0%, rgba(255,122,92,0.25) 45%, rgba(226,69,43,0) 75%)',
              opacity: hovering ? 1 : 0,
              transition: 'opacity 0.3s ease-out',
            }}
          />
        )}

        {/* hollow outline text — the resting state */}
        <span
          className={
            hoverDisabled
              ? 'block text-white'
              : 'block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]'
          }
        >
          {chars.map((ch, i) => (
            <motion.span key={i} variants={charVariants} className="inline-block">
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </span>

        {/* solid fill, revealed only in a lens around the cursor — split into the
            same per-character spans as the outline layer so kerning matches exactly */}
        {!hoverDisabled && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 block font-normal text-white"
            style={{
              WebkitMaskImage: maskImage,
              maskImage,
              opacity: hovering ? 1 : 0,
              transition: 'opacity 0.2s ease-out',
            }}
          >
            {chars.map((ch, i) => (
              <span key={i} className="inline-block">
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </motion.span>
        )}
      </motion.span>
    </motion.span>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const allSkills = Object.values(skills).flat()
const skillsMid = Math.ceil(allSkills.length / 2)
const skillsRowA = allSkills.slice(0, skillsMid)
const skillsRowB = allSkills.slice(skillsMid)

export default function Hero() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden px-4 sm:px-6 lg:px-10 pt-32 sm:pt-36 pb-28 md:pb-36">
      {/* Glow blob — flares bright on mount, then settles to an ambient level */}
      <motion.div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] bg-accent rounded-full blur-[140px]"
        initial={reduced ? { opacity: 0.35, scale: 1 } : { opacity: 0, scale: 0.55 }}
        animate={reduced ? { opacity: 0.35, scale: 1 } : { opacity: [0, 1, 0.35], scale: [0.55, 1.2, 1] }}
        transition={reduced ? { duration: 0 } : { duration: 1.8, times: [0, 0.4, 1], ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Bottom vignette so the glow eases into the base background instead of hard-cutting at the section boundary */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 sm:h-80 bg-gradient-to-b from-transparent to-bg" />

      {/* Location / availability — pinned under the navbar */}
      <motion.p
        initial={reduced ? 'show' : 'hidden'}
        animate="show"
        variants={fadeUp}
        className="absolute top-32 sm:top-36 left-4 sm:left-6 lg:left-10 z-10 text-accent text-xs sm:text-sm font-medium tracking-[0.3em] uppercase"
      >
        — {personalInfo.location} · Available for work
      </motion.p>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Big name */}
        <h1 className="font-display font-light uppercase leading-[0.92] tracking-wide whitespace-nowrap text-[clamp(1.75rem,6.4vw,5.5rem)] mb-8">
          <AnimatedLine text={personalInfo.name} delayChildren={0.15} reduced={reduced} />
        </h1>

        {/* Role / value proposition */}
        <motion.p
          initial={reduced ? 'show' : 'hidden'}
          animate="show"
          variants={fadeUp}
          transition={{ delay: reduced ? 0 : 0.6 }}
          className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl"
        >
          <W text={personalInfo.role} className="text-white" />
          <span className="text-gray-600 mr-[0.3em]">—</span>
          {personalInfo.tagline}
        </motion.p>
      </div>

      {/* Skills ticker — two rows scrolling in opposite directions, full viewport width */}
      <motion.div
        initial={reduced ? 'show' : 'hidden'}
        animate="show"
        variants={fadeUp}
        transition={{ delay: reduced ? 0 : 0.75 }}
        className="relative z-10 mt-12 sm:mt-14 -mx-4 sm:-mx-6 lg:-mx-10 space-y-3"
      >
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max animate-marquee gap-3 whitespace-nowrap">
            {[...skillsRowA, ...skillsRowA].map((skill, i) => (
              <span
                key={i}
                className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs sm:text-sm text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max animate-marquee-reverse gap-3 whitespace-nowrap">
            {[...skillsRowB, ...skillsRowB].map((skill, i) => (
              <span
                key={i}
                className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs sm:text-sm text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA cluster */}
      <motion.div
        initial={reduced ? 'show' : 'hidden'}
        animate="show"
        variants={fadeUp}
        transition={{ delay: reduced ? 0 : 0.8 }}
        className="relative z-10 mt-10 flex items-center gap-6 md:absolute md:mt-0 md:bottom-12 md:right-6 lg:right-10"
      >
        <button
          onClick={() => scrollToId('projects')}
          className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-accent hover:border-accent/60 hover:bg-accent/10 hover:text-accent-soft transition-colors text-sm font-medium tracking-wide"
        >
          View Projects <span aria-hidden>↗</span>
        </button>
        <button
          onClick={() => scrollToId('contact')}
          className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-accent hover:border-accent/60 hover:bg-accent/10 hover:text-accent-soft transition-colors text-sm font-medium tracking-wide"
        >
          Let's Talk
        </button>
      </motion.div>

      {/* Scroll cue */}
      <div className="hidden md:flex absolute bottom-12 left-6 lg:left-10 flex-col items-center gap-2 text-gray-600 z-10">
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <span className="text-lg animate-bounce-y">↓</span>
      </div>
    </section>
  )
}
