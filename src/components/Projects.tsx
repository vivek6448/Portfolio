import { projects, type Project } from '../data/portfolioData'
import { SectionHeading } from './About'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { W } from './GlowText'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import ScrollStack, { ScrollStackItem } from './ScrollStack'

function ProjectCardContent({ project }: { project: Project }) {
  return (
    <div className="group h-full flex flex-col p-6 sm:p-8">
      {/* Title + Links */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-white font-bold text-lg sm:text-xl"><W text={project.title} /></h3>
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
    </div>
  )
}

// Static fallback grid for prefers-reduced-motion — ScrollStack's pin/scale
// effect is purely scroll-driven motion, so reduced-motion users get the
// plain card layout instead.
function ProjectGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-5 sm:gap-6 mt-10 md:mt-12">
      {projects.map(project => (
        <div
          key={project.title}
          className="w-full max-w-[380px] sm:w-[420px] rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors duration-300"
        >
          <ProjectCardContent project={project} />
        </div>
      ))}
    </div>
  )
}

export default function Projects() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Selected Projects" subtitle="Featured Work" />

        {prefersReducedMotion ? (
          <ProjectGrid />
        ) : (
          <div className="mt-10 md:mt-12 h-[75vh] sm:h-[80vh] max-h-[820px] rounded-[1.75rem] border border-white/10 bg-white/[0.02]">
            <ScrollStack
              className="rounded-[1.75rem]"
              itemDistance={120}
              itemScale={0.045}
              itemStackDistance={36}
              stackPosition="16%"
              scaleEndPosition="8%"
              baseScale={0.86}
            >
              {projects.map(project => (
                <ScrollStackItem key={project.title}>
                  <ProjectCardContent project={project} />
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        )}
      </div>
    </section>
  )
}
