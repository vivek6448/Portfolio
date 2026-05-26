import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Check if user prefers reduced motion or is on mobile
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    setIsMobile(window.innerWidth < 768)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    const handleResize = () => setIsMobile(window.innerWidth < 768)

    mediaQuery.addEventListener('change', handleChange)
    window.addEventListener('resize', handleResize)
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return prefersReducedMotion || isMobile
}

// Single word with glow on hover
export function GlowWord({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  // On mobile/reduced motion, return plain span without animation
  if (shouldReduceMotion) {
    return <span className={`inline-block cursor-default mr-[0.3em] ${className}`}>{children}</span>
  }

  return (
    <motion.span
      className={`inline-block cursor-default mr-[0.3em] ${className}`}
      whileHover={{
        textShadow: '0 0 8px rgba(6,182,212,0.95), 0 0 22px rgba(6,182,212,0.45)',
        color: '#a5f3fc',
      }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.span>
  )
}

// Splits a string into per-word GlowWord spans
export function W({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text
        .split(' ')
        .filter(Boolean)
        .map((word, i) => (
          <GlowWord key={i} className={className}>
            {word}
          </GlowWord>
        ))}
    </>
  )
}
