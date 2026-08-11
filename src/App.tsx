import { lazy, Suspense, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

// Lazy load sections below the fold
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

  return (
    <div className="bg-bg text-white font-sans">
      <Preloader onDone={() => setIsLoading(false)} />
      {!isLoading && (
        <>
          <Navbar />
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
