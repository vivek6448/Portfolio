import { lazy, Suspense, useEffect, useState } from 'react'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

// Navbar pulls in gsap (via StaggeredMenu) — lazy-load it like the below-fold
// sections so gsap doesn't land in the main bundle. No fallback needed since
// it's a fixed-position overlay with no layout space to reserve. The import
// is also kicked off eagerly on mount (below) so the chunk is warm by the
// time it's actually rendered, instead of only starting to fetch once the
// preloader finishes.
const loadNavbar = () => import('./components/Navbar')
const Navbar = lazy(loadNavbar)
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

  useEffect(() => {
    loadNavbar()
  }, [])

  return (
    <div className="bg-bg text-white font-sans">
      <Preloader onDone={() => setIsLoading(false)} />
      {!isLoading && (
        <>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <main>
            <section id="hero"><Hero /></section>
            <Suspense fallback={<SectionSkeleton />}>
              <section id="philosophy"><Philosophy /></section>
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <section id="about"><About /></section>
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <section id="skills"><Skills /></section>
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <section id="experience"><Experience /></section>
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <section id="projects"><Projects /></section>
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <section id="contact"><Contact /></section>
            </Suspense>
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
