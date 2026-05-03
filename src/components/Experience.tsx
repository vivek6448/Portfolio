import { motion } from 'framer-motion'
import { experiences } from '../data/portfolioData'
import { SectionHeading } from './About'
import { W } from './GlowText'

export default function Experience() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Work Experience" subtitle="My Journey" />

        <div className="mt-10 md:mt-12 relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent hidden md:block" />

          <div className="flex flex-col gap-8 md:gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="md:pl-16 relative"
              >
                <div className="hidden md:block absolute left-4 top-6 w-4 h-4 rounded-full bg-cyan-500 border-2 border-[#0a0a0f] shadow-lg shadow-cyan-500/50" />

                <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/20 transition-all duration-300">
                  {/* Header — stacks on mobile */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg"><W text={exp.company} /></h3>
                      <p className="text-cyan-400 text-sm font-medium"><W text={exp.role} /></p>
                      <p className="text-gray-500 text-xs mt-1"><W text={exp.project} /></p>
                    </div>
                    <div className="sm:text-right flex sm:flex-col gap-2 sm:gap-0 items-center sm:items-end">
                      <span className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full whitespace-nowrap">
                        <W text={exp.duration} />
                      </span>
                      <p className="text-gray-500 text-xs sm:mt-1"><W text={exp.location} /></p>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-2 text-xs sm:text-sm text-gray-400">
                        <span className="text-cyan-500 mt-0.5 shrink-0">▹</span>
                        <span><W text={point} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
