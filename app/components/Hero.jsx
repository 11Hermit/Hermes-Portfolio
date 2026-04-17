"use client"

import Image from "next/image"
import { Linkedin, Mail, ArrowDown, Phone, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const CodePattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern
        id="pattern-circles"
        x="0"
        y="0"
        width="50"
        height="50"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
      >
        <circle id="pattern-circle" cx="10" cy="10" r="1.5" fill="var(--color-accent)"></circle>
      </pattern>
    </defs>
    <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
  </svg>
)

const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="orb w-96 h-96 left-1/4 top-1/4 animate-float-slow"></div>
      <div className="orb w-64 h-64 right-1/4 bottom-1/4 animate-float"></div>
      <div className="orb w-48 h-48 left-1/3 bottom-1/3 animate-float-fast"></div>
    </div>
  )
}

export default function Hero() {
  return (
    <div
      id="hero"
      className="min-h-screen relative overflow-hidden hero-glow"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Programming-themed Background */}
      <div className="absolute inset-0 z-0">
        <CodePattern />
      </div>

      {/* Subtle teal orbs */}
      <FloatingOrbs />

      {/* Agentic AI Illustration */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/agentic%20ai-rzv4kWbyf0ZbxOrSYS6nIMENS9KNgi.png"
          alt="Agentic AI Workflow"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[70vh]">
          <motion.div
            className="lg:w-3/5 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="mb-6 inline-flex items-center px-4 py-2 rounded-full glass-effect"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <Sparkles className="w-4 h-4 mr-2" style={{ color: 'var(--color-accent)' }} />
              <span 
                className="text-sm font-medium"
                style={{ color: 'var(--color-accent)' }}
              >
                Senior AI Engineer · Nairobi, Kenya
              </span>
            </div>

            <h1 
              className="hero-name text-5xl md:text-6xl lg:text-7xl mb-8"
              style={{ color: 'var(--color-text)' }}
            >
              Ashtone Onyango
            </h1>

            <div className="max-w-4xl mb-8">
              <p 
                className="text-xl md:text-2xl mb-6 leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                I engineer production-grade AI systems from the ground up — training transformer models from scratch, 
                building RL environments, and deploying agentic systems that actually work. 
                From attention mechanisms to distributed training pipelines, I turn research papers into 
                shipping code. 6+ years. 22+ production systems. Real quantifiable impact.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start space-x-4 mb-8">
              <a
                href="https://www.linkedin.com/in/dao-ashtone/"
                className="social-btn p-3 rounded-full transition-all duration-300"
                aria-label="LinkedIn Profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:ashtone@wanailabs.org"
                className="social-btn p-3 rounded-full transition-all duration-300"
                aria-label="Email Contact"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="tel:+254740497975"
                className="social-btn p-3 rounded-full transition-all duration-300"
                aria-label="Phone Contact"
              >
                <Phone className="w-6 h-6" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("navigateToSection", { detail: { sectionId: "projects" } }))
                }}
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Work
                <ArrowDown className="w-5 h-5" />
              </motion.button>
              <motion.a
                href="/Resume - Ashtone Onyango.pdf"
                download="Resume - Ashtone Onyango.pdf"
                className="btn-secondary inline-flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div 
          className="w-1 h-12 rounded-full animate-pulse"
          style={{ backgroundColor: 'var(--color-accent)' }}
        ></div>
      </motion.div>
    </div>
  )
}
