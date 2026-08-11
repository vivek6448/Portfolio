import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// Inline SVG fractal-noise turbulence, tiled as a low-opacity grain layer —
// stands in for a photographic background without shipping an image asset.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function Philosophy() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section className="relative overflow-hidden py-32 md:py-48 px-4 sm:px-6">
      {/* Accent corner glows */}
      <div className="pointer-events-none absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-accent/15 rounded-full blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-accent/10 rounded-full blur-[140px]" />

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10 mix-blend-soft-light"
        style={{ backgroundImage: GRAIN }}
      />

      {/* Edge vignette so the glow doesn't hard-cut against neighboring sections */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <p className="text-accent text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-6">
          — Philosophy
        </p>
        <p className="font-display font-medium leading-[1.15] text-[clamp(1.75rem,4.5vw,3.5rem)] text-white text-balance">
          I build interfaces people can trust <span className="text-gray-500">—</span> fast, accessible, and secure by default.
        </p>
      </motion.div>
    </section>
  )
}
