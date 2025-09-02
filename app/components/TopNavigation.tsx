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
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-white/10 dark:border-gray-700/20"
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold philosophical-text hidden sm:block">Ashtone Onyango</span>
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
                  className={`
                    relative px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
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
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
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
                      className={`
                        w-full flex items-center px-4 py-3 rounded-lg transition-colors
                        ${
                          isActive
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActive && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
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
