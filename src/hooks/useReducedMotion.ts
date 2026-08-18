import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { useIsTouchDevice } from './useIsTouchDevice'

// Hover glow doesn't apply on touch devices (no hover — this correctly covers
// iPad too, unlike a viewport-width check) or when the user prefers reduced
// motion. Both checks use a lazy useState initializer so the correct value is
// known on first render — avoiding a mount-as-animated / remount-as-plain flash.
export function useReducedMotion() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isTouchDevice = useIsTouchDevice()

  return prefersReducedMotion || isTouchDevice
}
