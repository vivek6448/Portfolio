import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import type { WorldRef } from './chapters'
import { backdropWeight, type BackdropKey } from './chapters'
import { BACKDROPS } from './textures'

const KEYS = Object.keys(BACKDROPS) as BackdropKey[]

// Fixed distance in front of the camera, in camera-local space — safely
// beyond the leaf field and every landmark, safely inside the camera's far
// plane across the whole path.
const LOCAL_DISTANCE = 45

function Layer({ backdropKey, worldRef }: { backdropKey: BackdropKey; worldRef: WorldRef }) {
  const { src, aspect } = BACKDROPS[backdropKey]
  const texture = useTexture(src)
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshBasicMaterial>(null)

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace
  }, [texture])

  useFrame(() => {
    const weight = backdropWeight(worldRef.current.story, backdropKey)
    if (matRef.current) matRef.current.opacity = weight
    if (!groupRef.current || !meshRef.current || !(camera instanceof THREE.PerspectiveCamera)) return

    // Skip the draw call entirely once a plane has faded out — 5 always-on
    // full-screen textured quads is real, avoidable fill-rate pressure
    // during heavy scroll-driven camera motion; at most 2 are ever
    // meaningfully visible (mid-crossfade), the rest are pure waste.
    meshRef.current.visible = weight > 0.001
    if (!meshRef.current.visible) return

    // Stays a normal scene child (so the renderer's scene traversal actually
    // reaches it — parenting to the camera object itself doesn't work here,
    // since the camera is never added to the scene graph) but is
    // repositioned every frame to sit dead-center in view at a fixed
    // distance, tracking the camera's position/orientation directly instead
    // of ray-casting toward a fixed world-space Z. No drift, no desync
    // during fast scrolling.
    groupRef.current.position.copy(camera.position)
    groupRef.current.quaternion.copy(camera.quaternion)
    groupRef.current.translateZ(-LOCAL_DISTANCE)

    // Cover the frustum at LOCAL_DISTANCE without distorting the photo's own
    // aspect ratio — like CSS background-size: cover.
    const vFov = THREE.MathUtils.degToRad(camera.fov)
    const frustumHeight = 2 * Math.tan(vFov / 2) * LOCAL_DISTANCE
    const frustumWidth = frustumHeight * camera.aspect
    const scale = Math.max(frustumWidth / aspect, frustumHeight) * 1.15
    meshRef.current.scale.set(scale * aspect, scale, 1)
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={matRef} map={texture} transparent fog={false} toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  )
}

export default function Backdrop({ worldRef }: { worldRef: WorldRef }) {
  return (
    <>
      {KEYS.map((key) => (
        <Layer key={key} backdropKey={key} worldRef={worldRef} />
      ))}
    </>
  )
}
