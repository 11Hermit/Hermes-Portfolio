"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TopNavigation from "./components/TopNavigation"
import FullPageSection from "./components/FullPageSection"
import Hero from "./components/Hero"
import CombinedExpertise from "./components/CombinedExpertise"
import Projects from "./components/Projects"
import CombinedPhilosophy from "./components/CombinedPhilosophy"
import CombinedServices from "./components/CombinedServices"
import CombinedEducationContact from "./components/CombinedEducationContact"
import PhilosophicalBackground from "./components/PhilosophicalBackground"
import FloatingParticles from "./components/FloatingParticles"
import ScrollToTop from "./components/ScrollToTop"
import Blog from "./components/Blog"

const sections = [
  {
    id: "hero",
    component: Hero,
    bgClass:
      "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900",
  },
  {
    id: "expertise",
    component: CombinedExpertise,
    bgClass: "bg-gradient-to-b from-indigo-50 to-gray-50 dark:from-indigo-900 dark:to-gray-900",
  },
  {
    id: "projects",
    component: Projects,
    bgClass: "bg-gradient-to-b from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900",
  },
  {
    id: "blog",
    component: Blog,
    bgClass: "bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900",
  },
  {
    id: "philosophy",
    component: CombinedPhilosophy,
    bgClass: "bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900",
  },
  {
    id: "services",
    component: CombinedServices,
    bgClass: "bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900",
  },
  {
    id: "education",
    component: CombinedEducationContact,
    bgClass: "bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900",
  },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const activeSectionRef = useRef<HTMLDivElement>(null)
  const wheelTimeoutRef = useRef<NodeJS.Timeout>()
  const lastWheelTime = useRef(0)

  const handleSectionChange = (sectionId: string) => {
    if (sectionId === activeSection || isTransitioning) return

    setIsTransitioning(true)

    // Smooth transition with delay
    setTimeout(() => {
      setActiveSection(sectionId)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    }, 200)
  }

  // Check if current section is scrollable and at top/bottom
  const canChangeSection = (direction: "up" | "down"): boolean => {
    const activeElement = document.querySelector(`[data-section="${activeSection}"]`)
    if (!activeElement) return true

    const scrollContainer = activeElement.querySelector(".scroll-container") || activeElement
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer as HTMLElement

    if (direction === "down") {
      // Can change section if scrolled to bottom or content fits in viewport
      return scrollTop + clientHeight >= scrollHeight - 10 // 10px tolerance
    } else {
      // Can change section if scrolled to top
      return scrollTop <= 10 // 10px tolerance
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTransitioning) return

      const currentIndex = sections.findIndex((section) => section.id === activeSection)

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        if (canChangeSection("down")) {
          event.preventDefault()
          const nextIndex = (currentIndex + 1) % sections.length
          handleSectionChange(sections[nextIndex].id)
        }
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        if (canChangeSection("up")) {
          event.preventDefault()
          const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1
          handleSectionChange(sections[prevIndex].id)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection, isTransitioning])

  // Enhanced wheel navigation with scroll detection
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isTransitioning) return

      const now = Date.now()
      const timeDiff = now - lastWheelTime.current

      // Clear existing timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }

      // Only consider section changes if wheel events are consistent and strong
      if (Math.abs(event.deltaY) > 50 && timeDiff > 100) {
        const direction = event.deltaY > 0 ? "down" : "up"

        if (canChangeSection(direction)) {
          event.preventDefault()

          // Add delay to prevent accidental section changes
          wheelTimeoutRef.current = setTimeout(() => {
            const currentIndex = sections.findIndex((section) => section.id === activeSection)

            if (direction === "down") {
              const nextIndex = (currentIndex + 1) % sections.length
              handleSectionChange(sections[nextIndex].id)
            } else {
              const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1
              handleSectionChange(sections[prevIndex].id)
            }
          }, 150) // Delay to ensure intentional navigation
        }
      }

      lastWheelTime.current = now
    }

    // Use passive: false only when necessary
    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }
    }
  }, [activeSection, isTransitioning])

  useEffect(() => {
    const handleCustomNavigation = (event) => {
      const { sectionId } = event.detail
      handleSectionChange(sectionId)
    }

    window.addEventListener("navigateToSection", handleCustomNavigation)

    return () => {
      window.removeEventListener("navigateToSection", handleCustomNavigation)
    }
  }, [])

  return (
    <main className="relative">
      <PhilosophicalBackground />
      <FloatingParticles />
      <ScrollToTop />

      <TopNavigation activeSection={activeSection} onSectionChange={handleSectionChange} />

      <div className="relative">
        <AnimatePresence>
          {sections.map((section) => {
            const SectionComponent = section.component
            const isActive = activeSection === section.id

            // Only render the active section to prevent multiple children in AnimatePresence
            if (!isActive) return null

            return (
              <motion.div
                key={section.id}
                data-section={section.id}
                className={`fixed inset-0 ${section.bgClass}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  zIndex: 10,
                }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  pointerEvents: "auto",
                }}
              >
                <FullPageSection id={section.id} isActive={isActive} className={section.bgClass}>
                  <SectionComponent />
                </FullPageSection>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Section Indicators */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:flex flex-col space-y-3">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => handleSectionChange(section.id)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "bg-gradient-to-r from-blue-600 to-purple-600 scale-125"
                : "bg-gray-400/50 hover:bg-gray-400/70"
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
