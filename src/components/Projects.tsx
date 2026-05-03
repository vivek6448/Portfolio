import { motion } from 'framer-motion'
import { projects, type Project } from '../data/portfolioData'
import { SectionHeading } from './About'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { W } from './GlowText'

function ProjectCard({ project, direction }: { project: Project; direction: 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ type: 'spring', stiffness: 110, damping: 13, mass: 1, delay: direction === 'right' ? 0.1 : 0 }}
      className="group p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors duration-300 flex flex-col"
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
            className="hover:text-cyan-400 transition-colors" aria-label="Live demo">
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-xs sm:text-sm mb-4"><W text={project.description} /></p>

      {/* Highlights */}
      <ul className="space-y-1 mb-5 flex-1">
        {project.highlights.map((h, j) => (
          <li key={j} className="flex gap-2 text-xs text-gray-500">
            <span className="text-cyan-500 shrink-0">▹</span>
            <span><W text={h} /></span>
          </li>
        ))}
      </ul>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.stack.map(tech => (
          <span key={tech}
            className="px-2 py-1 text-xs rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <W text={tech} className="text-cyan-400" />
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Projects" subtitle="What I've Built" />

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mt-10 md:mt-12">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              direction={i % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
