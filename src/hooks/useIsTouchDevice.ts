import { useEffect, useState } from 'react'

// (hover: none) catches phones AND tablets (iPad reports no hover regardless
// of screen size), unlike a viewport-width check.
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none)')
    const handleChange = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isTouch
}
