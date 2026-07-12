import { motion, useInView } from 'framer-motion'
import { personalInfo, skills } from '../data/portfolioData'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { W } from './GlowText'
import { useRef } from 'react'

const stats = [
  { value: '4.7+', label: 'Years Exp.' },
  { value: '2',    label: 'Companies' },
  { value: '10+',  label: 'Projects' },
]

const allSkills = Object.values(skills).flat()
const reel1 = allSkills.filter((_, i) => i % 2 === 0)
const reel2 = allSkills.filter((_, i) => i % 2 === 1)

const FACE_H = 56

function SkillReel({ items, duration }: { items: string[]; duration: number }) {
  const count  = items.length
  const radius = Math.round((FACE_H * count) / (2 * Math.PI))
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.1 })

  return (
    <div ref={ref} className="relative flex-1 overflow-hidden" style={{ height: 420, perspective: '800px' }}>
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        style={{ height: FACE_H, borderTop: '1px solid rgba(6,182,212,0.3)', borderBottom: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.03)' }}
      />
      <div className="h-full flex items-center justify-center">
        <motion.div
          animate={isInView ? { rotateX: [0, -360] } : {}}
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

const STAGGER = 0.1

export default function Hero() {
  const firstName = personalInfo.name.split(' ').slice(0, 2).join(' ')
  const lastName  = personalInfo.name.split(' ').slice(2).join(' ')

  return (
    <section className="min-h-screen flex items-center px-4 sm:px-6 pt-20 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">

        {/* ── Left: Content ── */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left animate-fade-in-left">
          <p
            className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4 animate-fade-in-up"
            style={{ animationDelay: `${STAGGER}s` }}
          >
            👋 Hello, I'm
          </p>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-fade-in-up"
            style={{ animationDelay: `${STAGGER * 2}s` }}
          >
            {firstName}
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              {lastName}
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl text-gray-400 mb-2 animate-fade-in-up"
            style={{ animationDelay: `${STAGGER * 3}s` }}
          >
            <W text={personalInfo.role} />
          </p>

          <p
            className="text-gray-500 mb-8 max-w-md animate-fade-in"
            style={{ animationDelay: `${STAGGER * 4}s` }}
          >
            <W text={personalInfo.tagline} />
          </p>

          {/* Stats */}
          <div
            className="flex gap-6 sm:gap-10 mb-8 animate-fade-in-up"
            style={{ animationDelay: `${STAGGER * 5}s` }}
          >
            {stats.map(stat => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400"><W text={stat.value} /></div>
                <div className="text-xs text-gray-500 mt-1"><W text={stat.label} /></div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="flex gap-3 flex-wrap justify-center md:justify-start animate-fade-in"
            style={{ animationDelay: `${STAGGER * 6}s` }}
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
          </div>
        </div>

        {/* ── Right: Slot Machine (desktop only) ── */}
        <div
          className="hidden md:flex flex-col gap-3 animate-fade-in-right"
          style={{ animationDelay: `${STAGGER * 3}s` }}
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
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 text-2xl animate-bounce-y">↓</div>
    </section>
  )
}
