import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { GlowWord } from './GlowText'

const navLinks = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[60] transition-all duration-500 ${
          scrolled ? 'bg-bg/70 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Mark */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-display text-sm sm:text-base lg:text-lg font-bold tracking-tight text-accent whitespace-nowrap"
            aria-label={personalInfo.name}
          >
            {personalInfo.name}
          </button>

          {/* Menu toggle */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-accent hover:border-accent/60 hover:bg-accent/10 hover:text-accent-soft transition-colors text-sm font-medium tracking-wide"
          >
            {menuOpen ? (
              <>
                Close <span aria-hidden>✕</span>
              </>
            ) : (
              <>
                Menu <span aria-hidden>☰</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Portaled to <body> so it's never affected by `nav`'s own backdrop-blur
          (backdrop-filter creates a containing block for fixed descendants,
          which would otherwise squash inset-0 down to nav's own short box). */}
      {createPortal(
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/50"
              />

              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-y-0 left-0 z-50 w-full max-w-sm sm:max-w-md border-r border-white/10 bg-bg/95 backdrop-blur-xl overflow-y-auto"
              >
                <div className="flex flex-col gap-2 px-8 sm:px-10 pt-28 pb-10">
                  {navLinks.map((link, i) => (
                    <button
                      key={link}
                      onClick={() => scrollTo(link)}
                      className="group flex items-baseline gap-3 py-2 text-left"
                    >
                      <GlowWord className="font-display text-4xl sm:text-5xl font-bold uppercase text-white">
                        {link}
                      </GlowWord>
                      <span className="text-xs text-gray-500 group-hover:text-accent transition-colors">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </button>
                  ))}

                  <div className="mt-10 pt-8 border-t border-white/10">
                    <p className="text-accent text-xs font-medium tracking-[0.3em] uppercase mb-4">
                      — Socials
                    </p>
                    <div className="flex flex-col gap-2">
                      <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-white transition-colors text-sm w-fit"
                      >
                        GitHub
                      </a>
                      <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-white transition-colors text-sm w-fit"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
