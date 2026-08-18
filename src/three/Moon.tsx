import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { WorldRef } from './chapters'
import { MOON_POSITION } from './chapters'

const ACCENT = new THREE.Color('#e2452b')
const ACCENT_SOFT = new THREE.Color('#ff7a5c')

// The persistent glow the whole path is walked toward — additively blended,
// so it reads as extra moonlight bleeding off whichever backdrop photo is
// showing rather than a second, misaligned moon.
export default function Moon({ worldRef, animate }: { worldRef: WorldRef; animate: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null)
  const shellRef = useRef<THREE.Mesh>(null)
  const coreMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const shellMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const clockRef = useRef(0)

  useFrame((_, delta) => {
    if (animate) clockRef.current += delta
    const t = clockRef.current
    const intensity = worldRef.current.theme.coreIntensity
    const wobble = animate ? 1 + Math.sin(t * 1.2) * 0.05 : 1

    if (coreRef.current) coreRef.current.scale.setScalar((2.1 + intensity * 0.35) * wobble)
    if (shellRef.current) shellRef.current.scale.setScalar((3.4 + intensity * 0.9) * (animate ? 1 + Math.sin(t * 0.9) * 0.04 : 1))
    if (coreMatRef.current) coreMatRef.current.opacity = Math.min(1, 0.55 + intensity * 0.3)
    if (shellMatRef.current) shellMatRef.current.opacity = Math.min(0.45, 0.08 + intensity * 0.14)
  })

  return (
    <group position={MOON_POSITION}>
      <mesh ref={coreRef}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial ref={coreMatRef} color={ACCENT} transparent opacity={0.7} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={shellRef}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial
          ref={shellMatRef}
          color={ACCENT_SOFT}
          transparent
          opacity={0.16}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
