import { useState, useEffect } from 'react'
import { personalInfo } from '../data/portfolioData'
import { GlowWord } from './GlowText'

const navLinks = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {personalInfo.name}
        </span>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className="text-gray-400 text-sm font-medium tracking-wide"
              >
                <GlowWord>{link}</GlowWord>
              </button>
            </li>
          ))}
        </ul>

        {/* Email Button */}
        <a
          href={`mailto:${personalInfo.email}`}
          className="hidden md:block px-5 py-2 rounded-full border border-cyan-500/50 text-cyan-400 text-sm hover:bg-cyan-500/10 transition-all duration-300 tracking-wide"
        >
          <GlowWord className="text-cyan-400">{personalInfo.email}</GlowWord>
        </a>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white text-xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-gray-300 text-left"
            >
              <GlowWord>{link}</GlowWord>
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
