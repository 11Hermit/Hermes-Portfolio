"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { ModeToggle } from "@/components/mode-toggle"
import { Home, User, Briefcase, Lightbulb, Users, GraduationCap, BookOpen, Menu, X } from "lucide-react"

const navigationItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "expertise", label: "Expertise", icon: User },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "philosophy", label: "Philosophy", icon: Lightbulb },
  { id: "services", label: "Services", icon: Users },
  { id: "education", label: "Contact", icon: GraduationCap },
  { id: "blog", label: "Blog", icon: BookOpen },
]

interface TopNavigationProps {
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

export default function TopNavigation({ activeSection, onSectionChange }: TopNavigationProps) {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme } = useTheme()

  useEffect(() => setMounted(true), [])

  const handleNavigation = (sectionId: string) => {
    onSectionChange(sectionId)
    setMobileMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
      style={{ borderBottom: '1px solid var(--color-border)' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <span 
                className="font-bold text-lg"
                style={{ color: 'var(--color-bg)' }}
              >
                A
              </span>
            </div>
            <span 
              className="text-xl font-bold hidden sm:block hero-heading"
              style={{ color: 'var(--color-text)' }}
            >
              Ashtone Onyango
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className="relative px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2"
                  style={{ 
                    color: isActive ? 'var(--color-bg)' : 'var(--color-text-muted)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                      layoutId="activeBackground"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="text-sm font-medium relative z-10">{item.label}</span>
                </motion.button>
              )
            })}
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <div className="hidden md:block">
              <ModeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg focus:outline-none"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className="w-full flex items-center px-4 py-3 rounded-lg transition-colors"
                      style={{
                        backgroundColor: isActive ? 'var(--color-accent-dim)' : 'transparent',
                        color: isActive ? 'var(--color-accent)' : 'var(--color-text)'
                      }}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActive && (
                        <span 
                          className="ml-auto w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--color-accent)' }}
                        />
                      )}
                    </button>
                  )
                })}

                <div className="px-4 py-3">
                  <ModeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
