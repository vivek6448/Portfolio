import { useRef, type ReactNode } from 'react'
import { useCinematicReveal } from '../hooks/useCinematicReveal'

export default function CinematicSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useCinematicReveal(ref)

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
