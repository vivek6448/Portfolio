import { personalInfo } from '../data/portfolioData'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { W } from './GlowText'

export default function Footer() {
  return (
    <footer className="py-8 md:py-10 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm">
          <W text={`© ${new Date().getFullYear()}`} />
          {' '}
          <W text={personalInfo.name} className="text-white font-medium" />
          <W text=". All rights reserved." />
        </p>

        <div className="flex gap-5 text-gray-500">
          <a href={personalInfo.github} target="_blank" rel="noreferrer"
            className="hover:text-white transition-colors" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer"
            className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
          <a href={`mailto:${personalInfo.email}`}
            className="hover:text-cyan-400 transition-colors" aria-label="Email">
            <FaEnvelope size={18} />
          </a>
        </div>

        <p className="text-gray-600 text-xs">
          <W text="Built with React + Tailwind CSS" />
        </p>
      </div>
    </footer>
  )
}
