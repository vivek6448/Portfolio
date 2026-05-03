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
}

export const skills: Record<string, string[]> = {
  "Languages & Frameworks": ["JavaScript (ES6+)", "TypeScript", "React.js", "React Native", "Redux", "jQuery"],
  "Frontend & Styling": ["HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material UI", "Responsive Design", "WCAG"],
  "APIs & Data": ["RESTful APIs", "Axios", "Fetch API", "LLM Integration", "Prompt Engineering"],
  "Databases": ["MongoDB", "MySQL"],
  "Testing": ["Jest", "React Testing Library", "Chrome DevTools"],
  "Auth & Security": ["RBAC", "Protected Routes", "OAuth 2.0"],
  "DevOps & Tools": ["Git", "GitHub", "Webpack", "Vite", "CI/CD", "Jira", "Agile Scrum"],
}

export interface Experience {
  company: string
  role: string
  project: string
  duration: string
  location: string
  points: string[]
}

export const experiences: Experience[] = [
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
]

export interface Project {
  title: string
  stack: string[]
  live: string
  github: string
  description: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    title: "Zaptro — E-Commerce App",
    stack: ["React.js", "Redux", "REST APIs", "React Router"],
    live: "https://ecommerce-frontend-r394.vercel.app",
    github: "https://github.com/vivek6448",
    description:
      "Full-featured e-commerce frontend with product listings, cart management, and a secure admin dashboard built with React.js and Redux.",
    highlights: [
      "RBAC + protected admin routes",
      "Axios REST API integration with error-boundary handling",
      "30% reduction in unnecessary re-renders via React.memo & useMemo",
      "Unit tests with Jest and React Testing Library",
    ],
  },
  {
    title: "Dev Study Notes",
    stack: ["React.js", "React Router", "TypeScript"],
    live: "https://study-five-delta.vercel.app",
    github: "https://github.com/vivek6448",
    description:
      "A bilingual (English + Hinglish) study reference covering React, JavaScript, and TypeScript — with clear explanations and real code examples for each concept.",
    highlights: [
      "Covers React, JavaScript, and TypeScript in one place",
      "Bilingual content in English & Hinglish for accessibility",
      "Code examples alongside every concept",
      "Clean topic-wise navigation for quick lookup",
    ],
  },
]
