import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { personalInfo, skills } from '../data/portfolioData'
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa'
import { W } from './GlowText'

const infoCards = [
  { icon: <FaMapMarkerAlt />, label: 'Location', value: personalInfo.location },
  { icon: <FaEnvelope />,     label: 'Email',    value: personalInfo.email },
  { icon: <FaPhone />,        label: 'Phone',    value: personalInfo.phone },
]

// ── Single slot-machine reel (desktop only) ──────────────────────
const allSkills = Object.values(skills).flat()
const FACE_H    = 44

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

function MobileReel() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const count  = allSkills.length
  const radius = Math.round((FACE_H * count) / (2 * Math.PI))

  // Don't render 3D animation on mobile if reduced motion is enabled
  if (prefersReducedMotion) {
    return (
      <div className="flex flex-wrap gap-2 justify-center max-w-xs mx-auto">
        {allSkills.map(skill => (
          <span
            key={skill}
            className="px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)', color: '#d1d5db' }}
          >
            {skill}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/8 mx-auto w-full max-w-xs"
      style={{ height: 260, perspective: '700px', background: 'rgba(255,255,255,0.015)' }}
    >
      {/* Top / bottom fades */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent z-10 pointer-events-none" />
      {/* Centre highlight */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        style={{ height: FACE_H, borderTop: '1px solid rgba(6,182,212,0.3)', borderBottom: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.03)' }}
      />
      {/* Hairlines top / bottom */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="h-full flex items-center justify-center">
        <motion.div
          animate={{ rotateX: [0, -360] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d', position: 'relative', height: FACE_H, width: '100%' }}
        >
          {allSkills.map((skill, i) => (
            <div
              key={skill + i}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `rotateX(${(360 / count) * i}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
                height: FACE_H,
              }}
            >
              <span
                className="px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)', color: '#d1d5db' }}
              >
                {skill}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">
      <W text={subtitle} className="text-cyan-400" /> <W text={title} />
    </h2>
  </motion.div>
)

export default function About() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Mobile-only reel — above the heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="md:hidden mb-8"
        >
          <p className="text-center text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-3">Tech Stack</p>
          <MobileReel />
        </motion.div>

        <SectionHeading title="About Me" subtitle="Who I am" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-10 md:mt-12 items-center">

          {/* 1 — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 order-1"
          >
            <p className="text-gray-400 leading-relaxed">
              <W text="Frontend Developer with" />
              <W text="4.7+ years" className="text-cyan-400 font-semibold" />
              <W text="of experience building secure, scalable, and high-performance web and mobile applications using React.js, React Native, TypeScript, and Redux." />
            </p>
            <p className="text-gray-400 leading-relaxed">
              <W text="Proven track record in" />
              <W text="government" className="text-white font-medium" />
              <W text="and" />
              <W text="fintech" className="text-white font-medium" />
              <W text="platforms with expertise in frontend architecture, REST API integration, responsive design, RBAC, performance optimization, unit testing, and CI/CD workflows." />
            </p>
            <p className="text-gray-400 leading-relaxed">
              <W text="Skilled in" />
              <W text="prompt engineering" className="text-cyan-400 font-semibold" />
              <W text="and LLM-integrated application development. Strong collaborator in" />
              <W text="Agile (Scrum)" className="text-white font-medium" />
              <W text="environments." />
            </p>
          </motion.div>

          {/* 2 — Info Cards + Resume */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 order-2"
          >
            {infoCards.map(item => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <span className="text-cyan-400 text-lg">{item.icon}</span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
            <a
              href="/resume.pdf"
              download
              className="mt-2 text-center px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300 text-sm font-medium"
            >
              Download Resume ↓
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
