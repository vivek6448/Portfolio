import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { CUTOUTS } from './textures'

const { aspect } = CUTOUTS.mapleLeaves
const TOP_Y = 7
const BOTTOM_Y = -0.5
const Z_RANGE: [number, number] = [4, -40]

interface LeafDatum {
  x: number
  z: number
  fallSpeed: number
  swayAmp: number
  swayFreq: number
  spinSpeed: number
  scale: number
  phase: number
}

// Scratch objects reused across every instance/frame — one InstancedMesh
// draw call for the whole field instead of one mesh (and one draw call) per
// leaf, so these can't be per-leaf state anyway.
const tmpMatrix = new THREE.Matrix4()
const tmpPosition = new THREE.Vector3()
const tmpQuaternion = new THREE.Quaternion()
const tmpSpin = new THREE.Quaternion()
const tmpScale = new THREE.Vector3()
const SPIN_AXIS = new THREE.Vector3(0, 0, 1)

export default function Leaves({ count, animate }: { count: number; animate: boolean }) {
  const texture = useTexture(CUTOUTS.mapleLeaves.src)
  const { camera } = useThree()
  const meshRef = useRef<THREE.InstancedMesh>(null)

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace
  }, [texture])

  const leaves = useMemo<LeafDatum[]>(() => {
    const data: LeafDatum[] = []
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 16,
        z: Z_RANGE[0] + Math.random() * (Z_RANGE[1] - Z_RANGE[0]),
        fallSpeed: 0.18 + Math.random() * 0.22,
        swayAmp: 0.6 + Math.random() * 0.9,
        swayFreq: 0.3 + Math.random() * 0.4,
        spinSpeed: (Math.random() - 0.5) * 0.6,
        scale: 0.4 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      })
    }
    return data
  }, [count])

  const yRef = useRef<Float32Array>(new Float32Array(count).map(() => TOP_Y - Math.random() * (TOP_Y - BOTTOM_Y)))

  // Seed every instance's starting transform once — identity rotation, same
  // as the original per-mesh JSX defaults before the first animated frame
  // ever ran (so the animate=false / reduced-motion look is unchanged).
  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    for (let i = 0; i < count; i++) {
      const d = leaves[i]
      tmpScale.setScalar(d.scale)
      tmpMatrix.compose(tmpPosition.set(d.x, TOP_Y, d.z), tmpQuaternion.identity(), tmpScale)
      mesh.setMatrixAt(i, tmpMatrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }, [count, leaves])

  useFrame((state, delta) => {
    if (!animate) return
    const mesh = meshRef.current
    if (!mesh) return
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const d = leaves[i]

      let y = yRef.current[i] - d.fallSpeed * delta
      if (y < BOTTOM_Y) y = TOP_Y
      yRef.current[i] = y

      const x = d.x + Math.sin(t * d.swayFreq + d.phase) * d.swayAmp
      tmpPosition.set(x, y, d.z)
      tmpSpin.setFromAxisAngle(SPIN_AXIS, t * d.spinSpeed + d.phase)
      tmpQuaternion.copy(camera.quaternion).multiply(tmpSpin)
      tmpScale.setScalar(d.scale)
      tmpMatrix.compose(tmpPosition, tmpQuaternion, tmpScale)
      mesh.setMatrixAt(i, tmpMatrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[aspect, 1]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} depthWrite={false} opacity={0.85} />
    </instancedMesh>
  )
}
