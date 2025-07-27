"use client"

import Image from "next/image"
import { Linkedin, Mail, ArrowDown, Phone, Sparkles, Zap, Brain } from "lucide-react"
import { motion } from "framer-motion"

const CodePattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
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
        <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#000"></circle>
      </pattern>
      <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>

    {/* Philosophical flowing lines */}
    <path d="M0,300 Q250,200 500,300 T1000,300" stroke="url(#flow-gradient)" strokeWidth="3" fill="none" />
    <path d="M0,400 Q250,500 500,400 T1000,400" stroke="url(#flow-gradient)" strokeWidth="3" fill="none" />
    <path d="M0,500 Q250,400 500,500 T1000,500" stroke="url(#flow-gradient)" strokeWidth="3" fill="none" />
    <path d="M0,600 Q250,700 500,600 T1000,600" stroke="url(#flow-gradient)" strokeWidth="3" fill="none" />
  </svg>
)

const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="orb w-64 h-64 left-1/4 top-1/4 animate-float-slow"></div>
      <div className="orb w-48 h-48 right-1/4 bottom-1/4 animate-float"></div>
      <div className="orb w-32 h-32 left-1/3 bottom-1/3 animate-float-fast"></div>

      <div className="philosophical-circle w-96 h-96 left-1/4 top-1/4 animate-pulse-slow"></div>
      <div
        className="philosophical-circle w-64 h-64 right-1/4 bottom-1/4 animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="philosophical-circle w-48 h-48 left-2/3 top-1/3 animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  )
}

export default function Hero() {
  return (
    <div
      id="hero"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900"
    >
      {/* Programming-themed Background */}
      <div className="absolute inset-0 z-0">
        <CodePattern />
      </div>

      {/* Philosophical Elements */}
      <FloatingOrbs />

      {/* Animated Gradient */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient-x"></div>
      </div>

      {/* Agentic AI Illustration */}
      <div className="absolute inset-0 z-0 opacity-20">
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
            <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full glass-effect border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Senior AI Software Engineer
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 philosophical-text">Ashtone Onyango</h1>

            <div className="max-w-4xl mb-8">
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                With half a decade of experience building production AI systems, I have helped transform business
                outcomes for over 11 clients across healthcare, real estate, and fintech. My AI solutions have improved
                customer relationships by 85% and reduced administrative backlog by 70%, while generating over $2M in
                cost savings through intelligent automation.
              </p>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-500 italic">
                Let me bring AI intelligence to your applications!
              </p>
            </div>

            <div className="flex justify-center lg:justify-start space-x-4 mb-8">
              <a
                href="https://www.linkedin.com/in/dao-ashtone/"
                className="p-3 rounded-full glass-effect hover:bg-white/90 dark:hover:bg-gray-800/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                aria-label="LinkedIn Profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </a>
              <a
                href="mailto:ashtoneonyango@gmail.com"
                className="p-3 rounded-full glass-effect hover:bg-white/90 dark:hover:bg-gray-800/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                aria-label="Email Contact"
              >
                <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </a>
              <a
                href="tel:+254740497975"
                className="p-3 rounded-full glass-effect hover:bg-white/90 dark:hover:bg-gray-800/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                aria-label="Phone Contact"
              >
                <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={() => {
                  // Dispatch custom event to trigger section change
                  window.dispatchEvent(new CustomEvent("navigateToSection", { detail: { sectionId: "projects" } }))
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Work
                <ArrowDown className="w-5 h-5" />
              </motion.button>
              <motion.a
                href="/Ashtone_Onyango_Resume.pdf"
                download="Ashtone_Onyango_Resume.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300 text-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-2/5 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Clean, professional image container without decorative overlays */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl glass-card">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0812.jpg-jQSxWaycmtpBR7IUnsPV8C8L3vlrQ2.jpeg"
                  alt="Ashtone Onyango"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Subtle gradient overlay for professional look */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>

              {/* Minimal decorative elements */}
              <div className="absolute -top-4 -right-4 p-3 rounded-full glass-effect shadow-lg">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 p-3 rounded-full glass-effect shadow-lg">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
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
        <div className="w-1 h-12 bg-gradient-to-b from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full animate-pulse"></div>
      </motion.div>
    </div>
  )
}
