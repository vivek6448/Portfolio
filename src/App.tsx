import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

// Lazy load sections below the fold
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))

// Loading fallback
const SectionSkeleton = () => (
  <div className="h-96 bg-[#0a0a0f] animate-pulse" />
)

function App() {
  return (
    <div className="bg-[#0a0a0f] text-white font-sans">
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
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
    </div>
  )
}

export default App
