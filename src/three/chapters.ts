import * as THREE from 'three'
import { CHAPTER_IDS, type ChapterId } from '../hooks/useScrollProgress'

export type Vec3 = [number, number, number]

interface ShotKeyframe {
  t: number
  position: Vec3
  lookAt: Vec3
  fov: number
}

interface ChapterTheme {
  fogColor: string
  fogNear: number
  fogFar: number
  coldIntensity: number
  warmIntensity: number
  coreIntensity: number
}

export interface Shot {
  position: Vec3
  lookAt: Vec3
  fov: number
}

export interface Theme {
  fogColor: THREE.Color
  fogNear: number
  fogFar: number
  coldIntensity: number
  warmIntensity: number
  coreIntensity: number
}

// The world the camera travels through, near (hero) to far (contact), along
// -Z: a moonlit shrine pathway — torii approach, sanmon gate, lantern-lit
// court, moonwater garden. Foreground cutouts (lanterns, walls, foliage) sit
// at moderate depth for real parallax; the four backdrop photographs sit far
// behind everything as a near-fixed painted sky.
export const MOON_POSITION: Vec3 = [2.6, 6.2, -64]
export const CHAMBER_POSITIONS: Vec3[] = [
  [2.8, 1.7, -12],
  [-2.8, 1.8, -16.5],
  [2.6, 1.7, -21],
]
export const MONOLITH_POSITIONS: Vec3[] = [
  [-2.8, 1.9, -26],
  [2.8, 1.9, -30],
  [-2.6, 1.9, -34],
]
export type BackdropKey = 'approach' | 'sanmon' | 'lanternCourt' | 'moonwater' | 'afterlight'

/** Story-position window (in the same units as WorldState.story) each backdrop owns, for crossfading. */
export const BACKDROP_RANGES: Record<BackdropKey, { start: number; end: number }> = {
  approach: { start: -0.5, end: 1.1 },
  sanmon: { start: 0.9, end: 2.1 },
  lanternCourt: { start: 1.9, end: 4.1 },
  moonwater: { start: 3.9, end: 6.3 },
  afterlight: { start: 6.3, end: 8.5 },
}

const SHOTS: Record<ChapterId, ShotKeyframe[]> = {
  hero: [
    { t: 0, position: [0, 1.6, 5.5], lookAt: [0, 1.4, -6], fov: 38 },
    { t: 1, position: [0, 1.85, 2.6], lookAt: [0, 1.4, -6], fov: 42 },
  ],
  philosophy: [
    { t: 0, position: [0, 1.85, 2.6], lookAt: [0, 1.3, -3], fov: 42 },
    { t: 0.5, position: [0.4, 1.7, 0.2], lookAt: [0, 1.2, -6], fov: 46 },
    { t: 1, position: [-0.3, 1.6, -2.6], lookAt: [0, 1.4, -8], fov: 44 },
  ],
  about: [
    { t: 0, position: [-0.3, 1.6, -2.6], lookAt: [0, 1.4, -8], fov: 44 },
    { t: 1, position: [-1.4, 1.5, -4.6], lookAt: [-0.6, 1.3, -9], fov: 34 },
  ],
  skills: [
    { t: 0, position: [-1.4, 1.5, -4.6], lookAt: [-0.6, 1.3, -9], fov: 34 },
    { t: 1, position: [0.8, 1.4, -9], lookAt: [0, 1.1, -14], fov: 40 },
  ],
  experience: [
    { t: 0, position: [0.8, 1.4, -9], lookAt: [0, 1.2, -13], fov: 40 },
    { t: 0.15, position: [1.1, 1.6, -10.4], lookAt: [2.8, 1.7, -12], fov: 42 },
    { t: 0.5, position: [-1.3, 1.7, -14.8], lookAt: [-2.8, 1.8, -16.5], fov: 42 },
    { t: 0.85, position: [1.0, 1.6, -19.4], lookAt: [2.6, 1.7, -21], fov: 42 },
    { t: 1, position: [0, 1.9, -22.5], lookAt: [0, 1.4, -26], fov: 40 },
  ],
  projects: [
    { t: 0, position: [0, 1.9, -22.5], lookAt: [0, 1.4, -26], fov: 40 },
    { t: 0.15, position: [-1.2, 1.8, -24.4], lookAt: [-2.8, 1.9, -26], fov: 42 },
    { t: 0.5, position: [1.3, 1.8, -28.8], lookAt: [2.8, 1.9, -30], fov: 42 },
    { t: 0.85, position: [-1.1, 1.8, -32.9], lookAt: [-2.6, 1.9, -34], fov: 42 },
    { t: 1, position: [0, 2.6, -35.5], lookAt: [0, 1.6, -38], fov: 44 },
  ],
  contact: [
    { t: 0, position: [0, 2.6, -35.5], lookAt: [0, 1.6, -38], fov: 44 },
    { t: 1, position: [0, 3, -18], lookAt: [0, 2.4, -55], fov: 44 },
  ],
}

const THEMES: Record<ChapterId, ChapterTheme> = {
  hero: { fogColor: '#05070a', fogNear: 2, fogFar: 17, coldIntensity: 0.35, warmIntensity: 0.9, coreIntensity: 0.55 },
  philosophy: { fogColor: '#070b10', fogNear: 1.5, fogFar: 15, coldIntensity: 0.5, warmIntensity: 1.35, coreIntensity: 1.7 },
  about: { fogColor: '#080c11', fogNear: 1.5, fogFar: 9, coldIntensity: 0.55, warmIntensity: 0.55, coreIntensity: 0.85 },
  skills: { fogColor: '#080d12', fogNear: 1.5, fogFar: 11, coldIntensity: 0.6, warmIntensity: 0.8, coreIntensity: 0.8 },
  experience: { fogColor: '#070a0f', fogNear: 2, fogFar: 18, coldIntensity: 0.45, warmIntensity: 1.1, coreIntensity: 0.7 },
  projects: { fogColor: '#06090d', fogNear: 2, fogFar: 18, coldIntensity: 0.4, warmIntensity: 1.15, coreIntensity: 0.65 },
  contact: { fogColor: '#04060a', fogNear: 3, fogFar: 24, coldIntensity: 0.3, warmIntensity: 0.65, coreIntensity: 0.5 },
}

const smoothstep = (t: number) => {
  const c = t < 0 ? 0 : t > 1 ? 1 : t
  return c * c * (3 - 2 * c)
}

const edgeSmoothstep = (edge0: number, edge1: number, x: number) => smoothstep((x - edge0) / (edge1 - edge0))

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const lerpVec3 = (a: Vec3, b: Vec3, t: number): Vec3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]

const tmpColorA = new THREE.Color()
const tmpColorB = new THREE.Color()

/** chapterIndex is clamped to [0, CHAPTER_IDS.length - 1]; localT to [0, 1]. */
export function sampleShot(chapterIndex: number, localT: number): Shot {
  const id = CHAPTER_IDS[Math.min(CHAPTER_IDS.length - 1, Math.max(0, chapterIndex))]
  const kfs = SHOTS[id]
  const t = Math.min(1, Math.max(0, localT))
  let i = 0
  while (i < kfs.length - 2 && kfs[i + 1].t < t) i++
  const a = kfs[i]
  const b = kfs[Math.min(i + 1, kfs.length - 1)]
  const span = Math.max(1e-5, b.t - a.t)
  const e = smoothstep(span <= 1e-5 ? 0 : (t - a.t) / span)
  return {
    position: lerpVec3(a.position, b.position, e),
    lookAt: lerpVec3(a.lookAt, b.lookAt, e),
    fov: lerp(a.fov, b.fov, e),
  }
}

/** Crossfades theme values from the current chapter toward the next, by localT. */
export function sampleTheme(chapterIndex: number, localT: number, out: Theme): Theme {
  const i = Math.min(CHAPTER_IDS.length - 1, Math.max(0, chapterIndex))
  const a = THEMES[CHAPTER_IDS[i]]
  const b = THEMES[CHAPTER_IDS[Math.min(CHAPTER_IDS.length - 1, i + 1)]]
  const e = smoothstep(Math.min(1, Math.max(0, localT)))

  tmpColorA.set(a.fogColor)
  tmpColorB.set(b.fogColor)
  out.fogColor.copy(tmpColorA).lerp(tmpColorB, e)
  out.fogNear = lerp(a.fogNear, b.fogNear, e)
  out.fogFar = lerp(a.fogFar, b.fogFar, e)
  out.coldIntensity = lerp(a.coldIntensity, b.coldIntensity, e)
  out.warmIntensity = lerp(a.warmIntensity, b.warmIntensity, e)
  out.coreIntensity = lerp(a.coreIntensity, b.coreIntensity, e)
  return out
}

export function createTheme(): Theme {
  return {
    fogColor: new THREE.Color(THEMES.hero.fogColor),
    fogNear: THEMES.hero.fogNear,
    fogFar: THEMES.hero.fogFar,
    coldIntensity: THEMES.hero.coldIntensity,
    warmIntensity: THEMES.hero.warmIntensity,
    coreIntensity: THEMES.hero.coreIntensity,
  }
}

/** Which of the 3 chambers/monoliths is "active" for a chapter-local t in [0,1]. */
export function activeTriadIndex(localT: number): number {
  return Math.min(2, Math.floor(localT * 3))
}

/** Crossfade weight (0..1) for a backdrop given the continuous story position. */
export function backdropWeight(story: number, key: BackdropKey): number {
  const { start, end } = BACKDROP_RANGES[key]
  const margin = 0.18
  const fadeIn = edgeSmoothstep(start - margin, start + margin, story)
  const fadeOut = 1 - edgeSmoothstep(end - margin, end + margin, story)
  return Math.max(0, Math.min(fadeIn, fadeOut))
}

export interface WorldState {
  chapterIndex: number
  chapterId: ChapterId
  localT: number
  /** Continuous chapterIndex + localT, used to crossfade backdrops smoothly across chapter boundaries. */
  story: number
  theme: Theme
  shot: Shot
  activeChamber: number
  activeMonolith: number
}

export type WorldRef = { current: WorldState }

export function createWorldState(): WorldState {
  return {
    chapterIndex: 0,
    chapterId: 'hero',
    localT: 0,
    story: 0,
    theme: createTheme(),
    shot: { position: [0, 1.6, 5.5], lookAt: [0, 1.4, -6], fov: 38 },
    activeChamber: -1,
    activeMonolith: -1,
  }
}
