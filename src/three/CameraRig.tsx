import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { CHAPTER_IDS, type ScrollProgressState } from '../hooks/useScrollProgress'
import { sampleShot, sampleTheme, activeTriadIndex, type WorldRef } from './chapters'

const posVec = new THREE.Vector3()
const lookVec = new THREE.Vector3()

export default function CameraRig({
  scrollRef,
  worldRef,
  reducedMotion,
}: {
  scrollRef: { current: ScrollProgressState }
  worldRef: WorldRef
  reducedMotion: boolean
}) {
  const { camera, scene } = useThree()
  const currentLookAt = useRef(new THREE.Vector3(0, 1.4, -6))
  const fogRef = useRef<THREE.Fog | null>(null)

  useEffect(() => {
    const fog = new THREE.Fog(new THREE.Color('#05070a'), 2, 17)
    scene.fog = fog
    fogRef.current = fog
    return () => {
      scene.fog = null
    }
  }, [scene])

  useFrame((_, delta) => {
    const scroll = scrollRef.current
    const world = worldRef.current

    let chapterIndex: number
    let localT: number

    if (reducedMotion) {
      const activeId = scroll.activeId ?? 'hero'
      chapterIndex = Math.max(0, CHAPTER_IDS.indexOf(activeId))
      localT = 0.5
    } else {
      chapterIndex = Math.min(CHAPTER_IDS.length - 1, Math.max(0, Math.floor(scroll.story)))
      localT = Math.min(1, Math.max(0, scroll.story - chapterIndex))
    }

    const shot = sampleShot(chapterIndex, localT)
    sampleTheme(chapterIndex, reducedMotion ? 0 : localT, world.theme)

    world.chapterIndex = chapterIndex
    world.chapterId = CHAPTER_IDS[chapterIndex]
    world.localT = localT
    world.story = chapterIndex + localT
    world.shot = shot
    world.activeChamber = chapterIndex === 4 ? activeTriadIndex(localT) : -1
    world.activeMonolith = chapterIndex === 5 ? activeTriadIndex(localT) : -1

    posVec.set(shot.position[0], shot.position[1], shot.position[2])
    lookVec.set(shot.lookAt[0], shot.lookAt[1], shot.lookAt[2])

    if (reducedMotion) {
      camera.position.copy(posVec)
      currentLookAt.current.copy(lookVec)
    } else {
      const damp = 1 - Math.exp(-delta * 3.2)
      camera.position.lerp(posVec, damp)
      currentLookAt.current.lerp(lookVec, damp)
    }

    camera.lookAt(currentLookAt.current)

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = reducedMotion ? shot.fov : THREE.MathUtils.lerp(camera.fov, shot.fov, 1 - Math.exp(-delta * 3))
      camera.updateProjectionMatrix()
    }

    if (fogRef.current) {
      fogRef.current.color.copy(world.theme.fogColor)
      fogRef.current.near = world.theme.fogNear
      fogRef.current.far = world.theme.fogFar
    }
  })

  return null
}
