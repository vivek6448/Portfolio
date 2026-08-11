import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useIsTouchDevice } from '../hooks/useIsTouchDevice'

// Hover glow doesn't apply on touch devices (no hover — this correctly covers
// iPad too, unlike a viewport-width check) or when the user prefers reduced
// motion. Both checks use a lazy useState initializer so the correct value is
// known on first render — avoiding a mount-as-animated / remount-as-plain flash.
export function useReducedMotion() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isTouchDevice = useIsTouchDevice()

  return prefersReducedMotion || isTouchDevice
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
        textShadow: '0 0 8px rgba(226,69,43,0.95), 0 0 22px rgba(226,69,43,0.45)',
        color: '#ff9d85',
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
