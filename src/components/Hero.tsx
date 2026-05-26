import { motion } from 'framer-motion'
import { personalInfo, skills } from '../data/portfolioData'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { W } from './GlowText'
import { useEffect, useState } from 'react'

const stats = [
  { value: '4.7+', label: 'Years Exp.' },
  { value: '2',    label: 'Companies' },
  { value: '10+',  label: 'Projects' },
]

const allSkills = Object.values(skills).flat()
const reel1 = allSkills.filter((_, i) => i % 2 === 0)
const reel2 = allSkills.filter((_, i) => i % 2 === 1)

const FACE_H = 56

// Detect reduced motion preference
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

function SkillReel({ items, duration }: { items: string[]; duration: number }) {
  const count  = items.length
  const radius = Math.round((FACE_H * count) / (2 * Math.PI))

  return (
    <div className="relative flex-1 overflow-hidden" style={{ height: 420, perspective: '800px' }}>
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        style={{ height: FACE_H, borderTop: '1px solid rgba(6,182,212,0.3)', borderBottom: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.03)' }}
      />
      <div className="h-full flex items-center justify-center">
        <motion.div
          animate={{ rotateX: [0, -360] }}
          transition={{ duration, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d', position: 'relative', height: FACE_H, width: '100%' }}
        >
          {items.map((skill, i) => (
            <div
              key={skill + i}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: `rotateX(${(360 / count) * i}deg) translateZ(${radius}px)`, backfaceVisibility: 'hidden', height: FACE_H }}
            >
              <span className="px-3 py-1 rounded-full text-[11px] font-medium border whitespace-nowrap"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)', color: '#d1d5db' }}>
                {skill}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const firstName = personalInfo.name.split(' ').slice(0, 2).join(' ')
  const lastName  = personalInfo.name.split(' ').slice(2).join(' ')

  // Adjust animation settings based on motion preference
  const animationDuration = prefersReducedMotion ? 0 : 0.6
  const staggerDelay = prefersReducedMotion ? 0 : 0.1

  return (
    <section className="min-h-screen flex items-center px-4 sm:px-6 pt-20 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">

        {/* ── Left: Content ── */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: animationDuration }}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: staggerDelay }}
            className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4"
          >
            👋 Hello, I'm
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: staggerDelay * 2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight"
          >
            {firstName}
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              {lastName}
            </span>
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: staggerDelay * 3 }}
            className="text-lg sm:text-xl text-gray-400 mb-2"
          >
            <W text={personalInfo.role} />
          </motion.p>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: staggerDelay * 4 }}
            className="text-gray-500 mb-8 max-w-md"
          >
            <W text={personalInfo.tagline} />
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: staggerDelay * 5 }}
            className="flex gap-6 sm:gap-10 mb-8"
          >
            {stats.map(stat => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400"><W text={stat.value} /></div>
                <div className="text-xs text-gray-500 mt-1"><W text={stat.label} /></div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: staggerDelay * 6 }}
            className="flex gap-3 flex-wrap justify-center md:justify-start"
          >
            <a href={`mailto:${personalInfo.email}`}
              className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-cyan-500/25 text-sm sm:text-base">
              {personalInfo.email}
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer"
              className="px-5 sm:px-6 py-3 rounded-full border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
              <FaGithub /> GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer"
              className="px-5 sm:px-6 py-3 rounded-full border border-white/20 text-white hover:border-blue-400 hover:text-blue-400 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
              <FaLinkedin /> LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: Slot Machine (desktop only) ── */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: animationDuration, delay: staggerDelay * 3 }}
          className="hidden md:flex flex-col gap-3"
        >
          <p className="text-center text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-1">Tech Stack</p>
          <div className="relative rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)' }}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/5" />
            <div className="flex px-4 py-2 gap-4">
              <SkillReel items={reel1} duration={20} />
              <SkillReel items={reel2} duration={27} />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 text-2xl"
        >↓</motion.div>
      )}
    </section>
  )
}
