import { personalInfo } from '../data/portfolioData'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 md:py-10 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()}{' '}
          <span className="text-white font-medium">{personalInfo.name}</span>. All rights
          reserved.
        </p>

        <div className="flex gap-5 text-gray-500">
          <a href={personalInfo.github} target="_blank" rel="noreferrer"
            className="hover:text-white transition-colors" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer"
            className="hover:text-accent transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
          <a href={`mailto:${personalInfo.email}`}
            className="hover:text-accent transition-colors" aria-label="Email">
            <FaEnvelope size={18} />
          </a>
        </div>

        <p className="text-gray-600 text-xs">Built with React + Tailwind CSS</p>
      </div>
    </footer>
  )
}
