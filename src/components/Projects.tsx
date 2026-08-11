import { motion } from 'framer-motion'
import { projects, type Project } from '../data/portfolioData'
import { SectionHeading } from './About'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { W } from './GlowText'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function ProjectCard({ project, index, prefersReducedMotion }: { project: Project; index: number; prefersReducedMotion: boolean }) {
  return (
    <motion.div
      initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={prefersReducedMotion ? {} : { type: 'spring', stiffness: 110, damping: 15, delay: index * 0.08 }}
      className="group w-full max-w-[380px] sm:w-[420px] p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Title + Links */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-white font-bold text-base sm:text-lg"><W text={project.title} /></h3>
        <div className="flex gap-3 text-gray-500 shrink-0 ml-2">
          <a href={project.github} target="_blank" rel="noreferrer"
            className="hover:text-white transition-colors" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href={project.live} target="_blank" rel="noreferrer"
            className="hover:text-accent transition-colors" aria-label="Live demo">
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-xs sm:text-sm mb-4">{project.description}</p>

      {/* Highlights */}
      <ul className="space-y-1 mb-5 flex-1">
        {project.highlights.map((h, j) => (
          <li key={j} className="flex gap-2 text-xs text-gray-500">
            <span className="text-accent shrink-0">▹</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.stack.map(tech => (
          <span key={tech}
            className="px-2 py-1 text-xs rounded-md bg-accent/10 text-accent border border-accent/20">
            {tech}
          </span>
        ))}
      </div>

      {/* View project affordance */}
      <a
        href={project.live}
        target="_blank"
        rel="noreferrer"
        className="mt-auto pt-4 border-t border-white/10 text-sm text-gray-400 group-hover:text-accent transition-colors inline-flex items-center gap-2"
      >
        View Project <span className="transition-transform group-hover:translate-x-1">↗</span>
      </a>
    </motion.div>
  )
}

export default function Projects() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section className="py-16 md:py-24 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Selected Projects" subtitle="Featured Work" />

        <div className="flex flex-wrap justify-center gap-5 sm:gap-6 mt-10 md:mt-12">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
