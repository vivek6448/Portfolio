import { personalInfo } from '../data/portfolioData'
import StaggeredMenu from './StaggeredMenu'

const menuItems = [
  { label: 'Philosophy', ariaLabel: 'Go to Philosophy section', link: '#philosophy' },
  { label: 'About', ariaLabel: 'Go to About section', link: '#about' },
  { label: 'Skills', ariaLabel: 'Go to Skills section', link: '#skills' },
  { label: 'Experience', ariaLabel: 'Go to Experience section', link: '#experience' },
  { label: 'Projects', ariaLabel: 'Go to Projects section', link: '#projects' },
  { label: 'Contact', ariaLabel: 'Go to Contact section', link: '#contact' },
]

const socialItems = [
  { label: 'GitHub', link: personalInfo.github },
  { label: 'LinkedIn', link: personalInfo.linkedin },
]

export default function Navbar() {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      isFixed
      logoText={personalInfo.name}
      onLogoClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
      menuButtonColor="#ffffff"
      openMenuButtonColor="#111111"
      changeMenuColorOnOpen
      colors={['#1a0f0d', '#e2452b']}
      accentColor="#e2452b"
    />
  )
}
