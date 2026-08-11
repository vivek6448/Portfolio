import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa'
import { W } from './GlowText'

const infoCards = [
  { icon: <FaMapMarkerAlt />, label: 'Location', value: personalInfo.location },
  { icon: <FaEnvelope />,     label: 'Email',    value: personalInfo.email },
  { icon: <FaPhone />,        label: 'Phone',    value: personalInfo.phone },
]

export const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">
      <W text={subtitle} className="text-accent" /> <W text={title} />
    </h2>
  </motion.div>
)

export default function About() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="About Me" subtitle="Who I am" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-10 md:mt-12 items-center">

          {/* 1 — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 order-1"
          >
            <p className="text-gray-400 leading-relaxed">
              Frontend Developer with{' '}
              <span className="text-accent font-semibold">4.7+ years</span> of experience
              building secure, scalable, and high-performance web and mobile applications
              using React.js, React Native, TypeScript, and Redux.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Proven track record in <span className="text-white font-medium">government</span>{' '}
              and <span className="text-white font-medium">fintech</span> platforms with
              expertise in frontend architecture, REST API integration, responsive design,
              RBAC, performance optimization, unit testing, and CI/CD workflows.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Skilled in <span className="text-accent font-semibold">prompt engineering</span>{' '}
              and LLM-integrated application development. Strong collaborator in{' '}
              <span className="text-white font-medium">Agile (Scrum)</span> environments.
            </p>
          </motion.div>

          {/* 2 — Info Cards + Resume */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 order-2"
          >
            {infoCards.map(item => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-300"
              >
                <span className="text-accent text-lg">{item.icon}</span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
            <a
              href="/Resume-Vivek.pdf"
              download="Vivek-Singh-Bhadauria-Resume.pdf"
              className="mt-2 flex items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-accent hover:border-accent/60 hover:bg-accent/10 hover:text-accent-soft transition-colors text-sm font-medium tracking-wide"
            >
              Download Resume ↓
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
