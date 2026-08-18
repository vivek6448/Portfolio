import { useState } from 'react'

function detectWebGL(): boolean {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

/** Checked once, lazily, on first render — this is a pure client-side SPA (no SSR), so reading the DOM here is safe. */
export function useWebGLSupport() {
  const [supported] = useState<boolean>(detectWebGL)
  return supported
}
