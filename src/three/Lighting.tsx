import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { WorldRef } from './chapters'
import { MOON_POSITION, CHAMBER_POSITIONS, MONOLITH_POSITIONS } from './chapters'

const COLD_SKY = new THREE.Color('#2c3a48')
const COLD_GROUND = new THREE.Color('#04050a')
const ACCENT_SOFT = new THREE.Color('#ff7a5c')

export default function Lighting({ worldRef }: { worldRef: WorldRef }) {
  const hemiRef = useRef<THREE.HemisphereLight>(null)
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const focalLightRef = useRef<THREE.PointLight>(null)

  useFrame(() => {
    const world = worldRef.current
    const theme = world.theme

    if (hemiRef.current) hemiRef.current.intensity = 0.5 + theme.coldIntensity * 0.9
    if (ambientRef.current) ambientRef.current.intensity = 0.14 + theme.coldIntensity * 0.2

    if (focalLightRef.current) {
      const target =
        world.activeChamber >= 0
          ? CHAMBER_POSITIONS[world.activeChamber]
          : world.activeMonolith >= 0
            ? MONOLITH_POSITIONS[world.activeMonolith]
            : [0, 2, -14]
      focalLightRef.current.position.set(target[0], target[1] + 1.2, target[2])
      focalLightRef.current.intensity = 1.4 + theme.warmIntensity * 1.8
    }
  })

  return (
    <>
      <hemisphereLight ref={hemiRef} color={COLD_SKY} groundColor={COLD_GROUND} intensity={0.6} />
      <ambientLight ref={ambientRef} color={COLD_SKY} intensity={0.18} />
      <pointLight ref={focalLightRef} position={MOON_POSITION} color={ACCENT_SOFT} intensity={2} distance={13} decay={2} />
    </>
  )
}
