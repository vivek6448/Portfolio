import { motion, type Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import { skills } from '../data/portfolioData'
import { SectionHeading } from './About'
import { W } from './GlowText'

// Card drops in like a block being placed
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 180, damping: 18 },
  },
}

// Each badge falls in from above and bounces into place
const badgeVariants: Variants = {
  hidden: { opacity: 0, y: -24, scale: 0.5 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 420, damping: 14 },
  },
}

// Stagger badges inside each card
const badgeContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
}

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReduced
}

export default function Skills() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Technical Skills" subtitle="What I know" />

        <motion.div
          className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-10 md:mt-12"
          initial={prefersReducedMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 } },
          }}
        >
          {Object.entries(skills).map(([category, items]) => (
            <motion.div
              key={category}
              variants={prefersReducedMotion ? { hidden: {}, show: {} } : cardVariants}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors duration-300"
            >
              {/* Category label */}
              <h3 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4">
                <W text={category} />
              </h3>

              {/* Badges — building-block drop */}
              <motion.div
                className="flex flex-wrap gap-2"
                variants={prefersReducedMotion ? { hidden: {}, show: {} } : badgeContainer}
                initial={prefersReducedMotion ? 'show' : 'hidden'}
                whileInView="show"
                viewport={{ once: false }}
              >
                {items.map(skill => (
                  <motion.span
                    key={skill}
                    variants={prefersReducedMotion ? { hidden: {}, show: {} } : badgeVariants}
                    whileHover={prefersReducedMotion ? {} : {
                      scale: 1.1,
                      y: -3,
                      textShadow: '0 0 8px rgba(6,182,212,0.95), 0 0 22px rgba(6,182,212,0.45)',
                      color: '#a5f3fc',
                    }}
                    className="px-3 py-1 rounded-full text-xs bg-white/10 text-gray-300 border border-white/10 hover:border-cyan-400/50 transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
