"use client"

import Image from "next/image"
import { Linkedin, Mail, ArrowDown, Phone, Sparkles, Github } from "lucide-react"
import { motion } from "framer-motion"

const CodePattern = () => (
  <svg className="absolute inset-0 size-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.5" fill="var(--color-accent)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pattern-circles)" />
  </svg>
)

export default function Hero() {
  return (
    <section className="hero-glow relative min-h-screen overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0" aria-hidden="true"><CodePattern /></div>
      <div className="absolute inset-0 z-0 opacity-[0.08]" aria-hidden="true">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/agentic%20ai-rzv4kWbyf0ZbxOrSYS6nIMENS9KNgi.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="container relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-16 pt-28 sm:px-10">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
            <span>AI Software Engineer · Nairobi, Kenya</span>
          </div>
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.24em] text-muted-foreground">Ashtone Onyango Omondi</p>
          <h1 id="hero-title" className="hero-name max-w-4xl text-5xl leading-[0.98] text-foreground sm:text-7xl lg:text-8xl">
            Engineering AI for the real world.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
            I build production software and agentic AI systems that people depend on—from healthcare triage and caregiver support to reliable LLM evaluation and the infrastructure behind it.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground/80">
            Six-plus years across backend engineering, APIs, cloud infrastructure and CI/CD. Biomedical engineer by training; focused on safe, measurable software for social impact.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <motion.button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("navigateToSection", { detail: { sectionId: "projects" } }))}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore selected work <ArrowDown className="size-4" aria-hidden="true" />
            </motion.button>
            <a
              href="/Ashtone-Onyango-AI-Software-Engineer.docx"
              download
              className="btn-secondary inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
            >
              Download résumé
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3" aria-label="Contact and profiles">
            <a href="https://www.linkedin.com/in/dao-ashtone/" className="social-btn rounded-full p-3" aria-label="LinkedIn profile" target="_blank" rel="noopener noreferrer"><Linkedin className="size-5" /></a>
            <a href="https://github.com/11Hermit" className="social-btn rounded-full p-3" aria-label="GitHub profile" target="_blank" rel="noopener noreferrer"><Github className="size-5" /></a>
            <a href="mailto:ashtoneonyango@gmail.com" className="social-btn rounded-full p-3" aria-label="Email Ashtone"><Mail className="size-5" /></a>
            <a href="tel:+254740497975" className="social-btn rounded-full p-3" aria-label="Call Ashtone"><Phone className="size-5" /></a>
          </div>
          <div className="mt-14 grid max-w-2xl grid-cols-3 gap-5 border-t border-border pt-6">
            <div><p className="stat-number text-3xl font-bold">20+</p><p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">AI systems shipped</p></div>
            <div><p className="stat-number text-3xl font-bold">5,000+</p><p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">triage users served</p></div>
            <div><p className="stat-number text-3xl font-bold">1,000+</p><p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">caregivers supported</p></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
