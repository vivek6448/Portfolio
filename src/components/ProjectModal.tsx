import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import type { Project } from '../data/portfolioData'

interface ProjectModalProps {
  project: (Project & { image?: string }) | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            className="relative flex w-full max-w-6xl max-h-[92vh] sm:max-h-[680px] flex-col sm:flex-row overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d10]"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-accent transition-colors"
            >
              <FaTimes />
            </button>

            {project.image && (
              <div className="relative h-56 sm:h-auto sm:w-1/2 w-full shrink-0 overflow-hidden flex items-center justify-center p-4 sm:p-8">
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="max-h-full max-w-full w-auto h-auto rounded-lg object-contain"
                />
              </div>
            )}

            <div className="flex flex-1 min-w-0 flex-col overflow-y-auto p-6 sm:p-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{project.title}</h3>
              <p className="text-xs text-gray-500 mb-4">{project.live.replace(/^https?:\/\//, '')}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.stack.map(tech => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-md bg-accent/10 text-accent border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">{project.description}</p>

              <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 mb-3">Highlights</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-400 leading-snug">
                    <span className="text-accent shrink-0">▹</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mt-auto pt-2">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-soft transition-colors"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:border-accent/50 hover:text-accent transition-colors"
                >
                  <FaGithub /> Source Code
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
