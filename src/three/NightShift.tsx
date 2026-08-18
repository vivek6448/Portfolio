import { Suspense, useCallback, useEffect, useMemo, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useIsTouchDevice } from '../hooks/useIsTouchDevice'
import type { ScrollProgressState } from '../hooks/useScrollProgress'
import { useWebGLSupport } from '../hooks/useWebGLSupport'
import Scene from './Scene'

// Matches the Night Shift palette: a faint ember pool low in the frame, a
// cold charcoal wash, near-black base — read as a single frozen establishing
// shot for the pre-WebGL-check paint and the true no-WebGL fallback alike.
function StaticBackdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 60% 45% at 50% 28%, rgba(226,69,43,0.12), rgba(10,10,12,0) 60%), ' +
          'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(58,74,92,0.16), rgba(10,10,12,0) 65%), #0a0a0c',
      }}
    />
  )
}

export default function NightShift({
  onReady,
  scrollRef,
}: {
  onReady?: () => void
  scrollRef: { current: ScrollProgressState }
}) {
  const reducedMotion = usePrefersReducedMotion()
  const isTouch = useIsTouchDevice()
  const webglSupported = useWebGLSupport()

  const dpr = useMemo<[number, number]>(() => (isTouch ? [1, 1.5] : [1, 2]), [isTouch])
  const cleanupRef = useRef<() => void>(() => {})

  // No WebGL means no Scene to wait on — the static fallback paints synchronously.
  useEffect(() => {
    if (!webglSupported) onReady?.()
  }, [webglSupported, onReady])

  // Sustained heavy scroll motion (many full-screen backdrop layers + bloom/
  // vignette/noise post-processing, redrawn every frame at up to 2x DPR) can
  // push a GPU driver into a timeout/reset under load, firing a
  // webglcontextlost event. Without calling preventDefault() on it, the
  // browser never attempts to restore the context — the canvas is left
  // permanently black until a full page reload. R3F's own render loop
  // resumes on its own once the context comes back, so recovering is just a
  // matter of not opting out of it.
  const handleCreated = useCallback((state: RootState) => {
    const canvas = state.gl.domElement
    const onLost = (e: Event) => e.preventDefault()
    canvas.addEventListener('webglcontextlost', onLost)
    cleanupRef.current = () => canvas.removeEventListener('webglcontextlost', onLost)
  }, [])

  useEffect(() => () => cleanupRef.current(), [])

  if (!webglSupported) {
    return <StaticBackdrop />
  }

  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        camera={{ fov: 38, near: 0.1, far: 100, position: [0, 1.6, 5.5] }}
        onCreated={handleCreated}
      >
        <color attach="background" args={['#0a0a0c']} />
        <Suspense fallback={null}>
          <Scene scrollRef={scrollRef} reducedMotion={reducedMotion} isTouch={isTouch} onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  )
}
