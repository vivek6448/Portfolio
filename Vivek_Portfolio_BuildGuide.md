# 🚀 Vivek Singh Bhadauria — Portfolio Build Guide
### React.js + Tailwind CSS | Step-by-Step

---

## 📋 Overview

This guide breaks down the **entire portfolio build into 10 focused steps**. Complete one step, test it, then move to the next. Each step is self-contained.

**Final Portfolio Sections:**
- Navbar
- Hero
- About
- Skills
- Experience (Timeline)
- Projects
- Contact
- Footer

---

## 🛠️ Tech Stack
- **React.js** (via Vite)
- **Tailwind CSS v4**
- **React Router DOM** (for smooth scroll / nav)
- **Framer Motion** (animations)

---

---

## ✅ STEP 1 — Project Setup

**Goal:** Initialize the React + Vite project and install all dependencies.

### Commands:
```bash
npm create vite@latest vivek-portfolio -- --template react
cd vivek-portfolio
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install framer-motion react-icons
npm run dev
```

### Tailwind Setup (`vite.config.js`):
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### In `src/index.css` — replace all content with:
```css
@import "tailwindcss";
```

### ✅ Check:
- Run `npm run dev`
- You should see the default Vite + React page
- Tailwind utility classes should work (test: add `className="text-red-500"` to App.jsx)

---

---

## ✅ STEP 2 — Project Structure

**Goal:** Set up a clean folder structure before writing any components.

### Create this folder structure inside `src/`:
```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── data/
│   └── portfolioData.js      ← All your personal data lives here
├── hooks/
│   └── useScrollReveal.js    ← Scroll animation hook
├── App.jsx
├── main.jsx
└── index.css
```

### Create `src/data/portfolioData.js`:
```js
export const personalInfo = {
  name: "Vivek Singh Bhadauria",
  role: "Frontend Developer",
  tagline: "Building secure, scalable, and high-performance web experiences.",
  email: "vivek6448@gmail.com",
  phone: "+91-8468857141",
  location: "New Delhi, India",
  linkedin: "https://linkedin.com/in/viveksinghbhadauria",
  github: "https://github.com/vivek6448",
  experience: "4.7+",
};

export const skills = {
  "Languages & Frameworks": ["JavaScript (ES6+)", "TypeScript", "React.js", "React Native", "Redux", "jQuery"],
  "Frontend & Styling": ["HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material UI", "Responsive Design", "WCAG"],
  "APIs & Data": ["RESTful APIs", "Axios", "Fetch API", "LLM Integration", "Prompt Engineering"],
  "Databases": ["MongoDB", "MySQL"],
  "Testing": ["Jest", "React Testing Library", "Chrome DevTools"],
  "Auth & Security": ["RBAC", "Protected Routes", "OAuth 2.0"],
  "DevOps & Tools": ["Git", "GitHub", "Webpack", "Vite", "CI/CD", "Jira", "Agile Scrum"],
};

export const experiences = [
  {
    company: "Agyom Private Limited",
    role: "Frontend Developer",
    project: "Yukti (Client: Kimbal)",
    duration: "Feb 2026 – Apr 2026",
    location: "Greater Noida",
    points: [
      "Developed Yukti survey management platform with React.js and TypeScript.",
      "Built Role Management module with RBAC for field workers, admins, and supervisors.",
      "Developed multi-level Work Order approval workflow (L1, L2, L3 stages).",
      "Contributed to React Native mobile app integrated with LLM via prompt engineering.",
      "Integrated RESTful APIs with Axios in Agile sprints using Jira.",
    ],
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Frontend Developer",
    project: "Client: Indian Air Force",
    duration: "Feb 2022 – Sep 2025",
    location: "Gurugram",
    points: [
      "Migrated legacy JSP app to React.js + TypeScript, improving performance by 30%.",
      "Optimized app using Redux, lazy loading, React.memo, useMemo — reducing load times by 25%.",
      "Implemented WCAG-compliant accessible UI for classified government systems.",
      "Implemented RBAC and protected routes for secure classified modules.",
      "Collaborated with UI/UX designers using Figma for pixel-perfect components.",
      "Wrote unit tests using Jest and React Testing Library.",
    ],
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Frontend Developer",
    project: "Client: American Express",
    duration: "May 2021 – Feb 2022",
    location: "Gurugram",
    points: [
      "Built secure internal support dashboard with React.js for background job management.",
      "Implemented RBAC and protected routes using React Router.",
      "Built reusable Material UI components, cutting dev time by ~20%.",
      "Automated job management processes, improving operational efficiency by ~30%.",
      "Integrated REST APIs for CRUD and real-time job monitoring.",
    ],
  },
];

export const projects = [
  {
    title: "E-Commerce Web Application",
    stack: ["React.js", "Redux", "REST APIs", "React Router"],
    live: "https://ecommerce-frontend-r394.vercel.app",
    github: "https://github.com/vivek6448",
    description:
      "Full-featured e-commerce frontend with product listings, cart management, and secure admin dashboard using React.js and Redux.",
    highlights: [
      "RBAC + protected admin routes",
      "Axios REST API integration with error-boundary handling",
      "30% reduction in unnecessary re-renders via React.memo & useMemo",
      "Unit tests with Jest and React Testing Library",
    ],
  },
];
```

### ✅ Check:
- All component files created (can be empty for now)
- `portfolioData.js` filled with your data
- No errors on `npm run dev`

---

---

## ✅ STEP 3 — App.jsx Layout + Navbar

**Goal:** Build the root layout and a sticky glassmorphism Navbar.

### `src/App.jsx`:
```jsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-[#0a0a0f] text-white font-sans">
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="experience"><Experience /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  )
}

export default App
```

### `src/components/Navbar.jsx`:
```jsx
import { useState, useEffect } from 'react'
import { personalInfo } from '../data/portfolioData'

const navLinks = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {personalInfo.name.split(' ')[0]}<span className="text-white">.</span>
        </span>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium tracking-wide"
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Hire Me Button */}
        <a
          href={`mailto:${personalInfo.email}`}
          className="hidden md:block px-5 py-2 rounded-full border border-cyan-500/50 text-cyan-400 text-sm hover:bg-cyan-500/10 transition-all duration-300"
        >
          Hire Me
        </a>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <button key={link} onClick={() => scrollTo(link)} className="text-gray-300 text-left hover:text-cyan-400">
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
```

### ✅ Check:
- Navbar appears at top
- Scrolling makes it glassmorphic
- Mobile hamburger menu works

---

---

## ✅ STEP 4 — Hero Section

**Goal:** Eye-catching hero with your name, role, stats, and CTA buttons.

### `src/components/Hero.jsx`:
```jsx
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4"
        >
          👋 Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight"
        >
          {personalInfo.name.split(' ').slice(0, 2).join(' ')}
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            {personalInfo.name.split(' ').slice(2).join(' ')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-xl text-gray-400 mb-2"
        >
          {personalInfo.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-gray-500 max-w-xl mx-auto mb-10"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex justify-center gap-10 mb-10"
        >
          {[
            { value: '4.7+', label: 'Years Experience' },
            { value: '3', label: 'Companies' },
            { value: '10+', label: 'Projects Built' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-cyan-500/25"
          >
            Hire Me
          </a>
          <a
            href={personalInfo.github}
            target="_blank" rel="noreferrer"
            className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank" rel="noreferrer"
            className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-blue-400 hover:text-blue-400 transition-all duration-300 flex items-center gap-2"
          >
            <FaLinkedin /> LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 text-2xl"
      >
        ↓
      </motion.div>
    </section>
  )
}
```

### ✅ Check:
- Name, role, tagline visible
- Stats show up
- Buttons link correctly
- Bouncing scroll arrow at bottom

---

---

## ✅ STEP 5 — About Section

**Goal:** Professional bio with key highlights and info cards.

### `src/components/About.jsx`:
```jsx
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa'

export default function About() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="About Me" subtitle="Who I am" />

        <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            <p className="text-gray-400 leading-relaxed mb-6">
              Frontend Developer with <span className="text-cyan-400 font-semibold">4.7+ years</span> of experience
              building secure, scalable, and high-performance web and mobile applications using
              React.js, React Native, TypeScript, and Redux.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Proven track record in <span className="text-white font-medium">government</span> and{' '}
              <span className="text-white font-medium">fintech</span> platforms with expertise in frontend
              architecture, REST API integration, responsive design, RBAC, performance optimization,
              unit testing, and CI/CD workflows.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Skilled in <span className="text-cyan-400 font-semibold">prompt engineering</span> and
              LLM-integrated application development. Strong collaborator in Agile (Scrum) environments.
            </p>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {[
              { icon: <FaMapMarkerAlt />, label: 'Location', value: personalInfo.location },
              { icon: <FaEnvelope />, label: 'Email', value: personalInfo.email },
              { icon: <FaPhone />, label: 'Phone', value: personalInfo.phone },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                <span className="text-cyan-400 text-lg">{item.icon}</span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}

            <a
              href="/resume.pdf" download
              className="mt-2 text-center px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300 text-sm font-medium"
            >
              Download Resume ↓
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Reusable section heading — export and reuse in all sections
export function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-4">
      <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-2">{subtitle}</p>
      <h2 className="text-4xl font-bold text-white">{title}</h2>
      <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
    </div>
  )
}
```

> 💡 **Note:** The `SectionHeading` component is exported from `About.jsx`. Import it in other sections: `import { SectionHeading } from './About'`

### ✅ Check:
- Bio text shows correctly
- 3 info cards (location, email, phone) render with icons
- Download Resume button visible

---

---

## ✅ STEP 6 — Skills Section

**Goal:** Organized tech stack cards grouped by category.

### `src/components/Skills.jsx`:
```jsx
import { motion } from 'framer-motion'
import { skills } from '../data/portfolioData'
import { SectionHeading } from './About'

export default function Skills() {
  return (
    <section className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Technical Skills" subtitle="What I know" />

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {Object.entries(skills).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <h3 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs bg-white/10 text-gray-300 border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### ✅ Check:
- Skills grouped into category cards
- Badges render for each skill
- Hover effects work

---

---

## ✅ STEP 7 — Experience Section (Timeline)

**Goal:** A vertical timeline of your work history.

### `src/components/Experience.jsx`:
```jsx
import { motion } from 'framer-motion'
import { experiences } from '../data/portfolioData'
import { SectionHeading } from './About'

export default function Experience() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Work Experience" subtitle="My Journey" />

        <div className="mt-12 relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent hidden md:block" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }}
                className="md:pl-16 relative"
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-4 top-6 w-4 h-4 rounded-full bg-cyan-500 border-2 border-[#0a0a0f] shadow-lg shadow-cyan-500/50" />

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/20 transition-all duration-300">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <div>
                      <h3 className="text-white font-bold text-lg">{exp.company}</h3>
                      <p className="text-cyan-400 text-sm font-medium">{exp.role}</p>
                      <p className="text-gray-500 text-xs mt-1">{exp.project}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">
                        {exp.duration}
                      </span>
                      <p className="text-gray-500 text-xs mt-1">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-2 text-sm text-gray-400">
                        <span className="text-cyan-500 mt-1 shrink-0">▹</span>
                        {point}
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
```

### ✅ Check:
- 3 experience cards show in timeline
- Vertical line visible on desktop
- Duration badges render correctly

---

---

## ✅ STEP 8 — Projects Section

**Goal:** Showcase your project with tech stack, links, and highlights.

### `src/components/Projects.jsx`:
```jsx
import { motion } from 'framer-motion'
import { projects } from '../data/portfolioData'
import { SectionHeading } from './About'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

export default function Projects() {
  return (
    <section className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Projects" subtitle="What I've Built" />

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white font-bold text-lg">{project.title}</h3>
                <div className="flex gap-3 text-gray-500">
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="hover:text-white transition-colors"><FaGithub /></a>
                  <a href={project.live} target="_blank" rel="noreferrer"
                    className="hover:text-cyan-400 transition-colors"><FaExternalLinkAlt /></a>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-4">{project.description}</p>

              <ul className="space-y-1 mb-5 flex-1">
                {project.highlights.map((h, j) => (
                  <li key={j} className="flex gap-2 text-xs text-gray-500">
                    <span className="text-cyan-500">▹</span>{h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.stack.map(tech => (
                  <span key={tech} className="px-2 py-1 text-xs rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### ✅ Check:
- E-Commerce project card renders
- Live + GitHub links work
- Tech stack badges at bottom
- Highlights list shows

---

---

## ✅ STEP 9 — Contact Section

**Goal:** A contact form + info with glassmorphic styling.

### `src/components/Contact.jsx`:
```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { SectionHeading } from './About'
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Replace with EmailJS or Formspree integration
    console.log(form)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Get In Touch" subtitle="Contact Me" />

        <div className="grid md:grid-cols-2 gap-10 mt-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {['name', 'email'].map(field => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                required
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            ))}
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
            />
            <button
              type="submit"
              className="py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-[1.02] transition-transform duration-200 shadow-lg shadow-cyan-500/20"
            >
              {sent ? '✅ Message Sent!' : 'Send Message →'}
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="flex flex-col gap-4 justify-center"
          >
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              I'm currently open to new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
            </p>
            {[
              { icon: <FaEnvelope />, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
              { icon: <FaLinkedin />, label: 'LinkedIn', href: personalInfo.linkedin },
              { icon: <FaGithub />, label: 'GitHub', href: personalInfo.github },
            ].map(item => (
              <a
                key={item.label} href={item.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-all duration-300"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

### ✅ Check:
- Form submits (check console.log)
- Success message shows after submit
- Contact info links work

---

---

## ✅ STEP 10 — Footer + Final Polish

**Goal:** Add footer and make final tweaks.

### `src/components/Footer.jsx`:
```jsx
import { personalInfo } from '../data/portfolioData'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} <span className="text-white font-medium">{personalInfo.name}</span>. All rights reserved.
        </p>
        <div className="flex gap-5 text-gray-500">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaGithub size={18} /></a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><FaLinkedin size={18} /></a>
          <a href={`mailto:${personalInfo.email}`} className="hover:text-cyan-400 transition-colors"><FaEnvelope size={18} /></a>
        </div>
        <p className="text-gray-600 text-xs">Built with React + Tailwind CSS</p>
      </div>
    </footer>
  )
}
```

### Final Polish Checklist:
- [ ] Add `public/resume.pdf` — your actual resume PDF for the download button in About
- [ ] Update `<title>` in `index.html` to `Vivek Singh Bhadauria | Frontend Developer`
- [ ] Add `<meta name="description">` for SEO in `index.html`
- [ ] Test on mobile (Chrome DevTools → responsive mode)
- [ ] Test all external links (GitHub, LinkedIn, email)
- [ ] Run `npm run build` — check for errors

### ✅ Final Check:
- `npm run build` completes without errors
- All 8 sections visible on scroll
- Mobile responsive
- All links working

---

---

## 🚀 Deployment (Bonus — Vercel)

```bash
npm install -g vercel
npm run build
vercel --prod
```

Or connect your GitHub repo at **vercel.com** and it auto-deploys on every push.

---

## 📦 Summary of Steps

| Step | What You Build | Est. Time |
|------|---------------|-----------|
| 1 | Project Setup | 15 min |
| 2 | Folder Structure + Data File | 20 min |
| 3 | App Layout + Navbar | 25 min |
| 4 | Hero Section | 20 min |
| 5 | About Section | 20 min |
| 6 | Skills Section | 15 min |
| 7 | Experience Timeline | 25 min |
| 8 | Projects Section | 20 min |
| 9 | Contact Form | 25 min |
| 10 | Footer + Polish + Deploy | 20 min |
| **Total** | | **~3.5 hrs** |

---

*Guide built specifically for Vivek Singh Bhadauria's portfolio — React.js + Tailwind CSS + Framer Motion*
