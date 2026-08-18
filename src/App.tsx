import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import CinematicSection from './components/CinematicSection'
import ForegroundStrip from './components/ForegroundStrip'
import { useScrollProgress } from './hooks/useScrollProgress'

// Navbar pulls in gsap (via StaggeredMenu) — lazy-load it like the below-fold
// sections so gsap doesn't land in the main bundle. No fallback needed since
// it's a fixed-position overlay with no layout space to reserve. The import
// is also kicked off eagerly on mount (below) so the chunk is warm by the
// time it's actually rendered, instead of only starting to fetch once the
// preloader finishes.
const loadNavbar = () => import('./components/Navbar')
const Navbar = lazy(loadNavbar)
// Three.js + drei + postprocessing are ~380kB gzipped — lazy-load the whole
// 3D layer for the same reason. It's mounted unconditionally below (not
// gated on isLoading) so it starts fetching immediately, hidden behind the
// preloader curtain, rather than only after the preloader is already gone.
const loadNightShift = () => import('./three/NightShift')
const NightShift = lazy(loadNightShift)
const Philosophy = lazy(() => import('./components/Philosophy'))
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))

// Loading fallback
const SectionSkeleton = () => (
  <div className="h-96 bg-bg animate-pulse" />
)

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [sceneReady, setSceneReady] = useState(false)
  const handleSceneReady = useCallback(() => setSceneReady(true), [])
  const scrollRef = useScrollProgress()

  useEffect(() => {
    loadNavbar()
  }, [])

  return (
    <div className="bg-bg text-white font-sans">
      {/* Mounted unconditionally (not gated on isLoading) so its ~380kB chunk and
          textures load hidden behind the preloader curtain instead of only
          starting once the preloader is already gone — see Preloader's `ready`. */}
      <Suspense fallback={null}>
        <NightShift onReady={handleSceneReady} scrollRef={scrollRef} />
      </Suspense>
      <Preloader onDone={() => setIsLoading(false)} ready={sceneReady} />
      {!isLoading && (
        <>
          <ForegroundStrip scrollRef={scrollRef} />
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <main className="relative z-10">
            <section id="hero"><Hero /></section>
            <Suspense fallback={<SectionSkeleton />}>
              <section id="philosophy"><CinematicSection><Philosophy /></CinematicSection></section>
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <section id="about"><CinematicSection><About /></CinematicSection></section>
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <section id="skills"><CinematicSection><Skills /></CinematicSection></section>
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <section id="experience"><CinematicSection><Experience /></CinematicSection></section>
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <section id="projects"><CinematicSection><Projects /></CinematicSection></section>
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <section id="contact"><CinematicSection><Contact /></CinematicSection></section>
            </Suspense>
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
