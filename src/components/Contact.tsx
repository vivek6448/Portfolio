import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { SectionHeading } from './About'
import { FaEnvelope, FaLinkedin, FaGithub, FaCopy, FaCheck } from 'react-icons/fa'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ''

const EMAIL = 'vivek6448@gmail.com'

interface FormState { name: string; email: string; message: string }
type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [form, setForm]     = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const buttonLabel =
    status === 'sending' ? 'Sending…'         :
    status === 'sent'    ? '✅ Message Sent!'  :
    status === 'error'   ? '❌ Failed — retry' :
    'Send Message →'

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Get In Touch" subtitle="Contact Me" />

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 mt-10 md:mt-12">

          {/* ── Form ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {(['name', 'email'] as const).map(field => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                required
                disabled={status === 'sending'}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-all disabled:opacity-50"
              />
            ))}
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              disabled={status === 'sending'}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 transition-all resize-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-3 text-accent hover:border-accent/60 hover:bg-accent/10 hover:text-accent-soft transition-colors text-sm font-medium tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {buttonLabel}
            </button>
          </motion.form>

          {/* ── Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 justify-center"
          >
            <p className="text-gray-400 text-sm leading-relaxed mb-2">
              I'm currently open to new opportunities. Whether you have a question or just
              want to say hi, my inbox is always open!
            </p>

            {/* Email row — mailto link + copy button */}
            <div className="flex items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-300">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors duration-300 flex-1 min-w-0"
              >
                <span className="text-lg shrink-0"><FaEnvelope /></span>
                <span className="text-sm truncate">{EMAIL}</span>
              </a>

              {/* Copy button */}
              <button
                onClick={copyEmail}
                title="Copy email"
                className="shrink-0 p-2 rounded-full border border-accent/30 bg-accent/5 text-accent hover:border-accent/60 hover:bg-accent/10 hover:text-accent-soft transition-colors duration-200"
              >
                {copied
                  ? <FaCheck className="text-accent" size={13} />
                  : <FaCopy size={13} />
                }
              </button>
            </div>

            {/* LinkedIn */}
            <a
              href={personalInfo.linkedin}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 text-gray-400 hover:text-accent transition-all duration-300"
            >
              <span className="text-lg"><FaLinkedin /></span>
              <span className="text-sm">LinkedIn</span>
            </a>

            {/* GitHub */}
            <a
              href={personalInfo.github}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 text-gray-400 hover:text-accent transition-all duration-300"
            >
              <span className="text-lg"><FaGithub /></span>
              <span className="text-sm">GitHub</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
