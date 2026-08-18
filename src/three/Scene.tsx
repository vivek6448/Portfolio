import { useEffect, useRef } from 'react'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import type { ScrollProgressState } from '../hooks/useScrollProgress'
import { createWorldState } from './chapters'
import CameraRig from './CameraRig'
import Lighting from './Lighting'
import Backdrop from './Backdrop'
import Moon from './Moon'
import Leaves from './Leaves'

export default function Scene({
  scrollRef,
  reducedMotion,
  isTouch,
  onReady,
}: {
  scrollRef: { current: ScrollProgressState }
  reducedMotion: boolean
  isTouch: boolean
  onReady?: () => void
}) {
  const worldRef = useRef(createWorldState())
  const animate = !reducedMotion
  const leafCount = reducedMotion ? 20 : isTouch ? 18 : 42

  // Fires once the Suspense boundary above this component has resolved —
  // every texture used below (drei's useTexture suspends) is already loaded
  // by the time this effect runs, so it's a reliable "scene is paintable" signal.
  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <>
      <CameraRig scrollRef={scrollRef} worldRef={worldRef} reducedMotion={reducedMotion} />
      <Lighting worldRef={worldRef} />
      <Backdrop worldRef={worldRef} />
      <Moon worldRef={worldRef} animate={animate} />
      <Leaves count={leafCount} animate={animate} />

      {isTouch ? (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.4} luminanceThreshold={0.32} luminanceSmoothing={0.3} mipmapBlur radius={0.4} />
        </EffectComposer>
      ) : (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.65} luminanceThreshold={0.22} luminanceSmoothing={0.35} mipmapBlur radius={0.6} />
          <Vignette eskil={false} offset={0.28} darkness={0.85} />
          <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.035} />
        </EffectComposer>
      )}
    </>
  )
}
