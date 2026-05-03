import { motion } from 'framer-motion'

// Single word with glow on hover
export function GlowWord({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
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
