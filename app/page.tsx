"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import TopNavigation from "./components/TopNavigation"
import FullPageSection from "./components/FullPageSection"
import Hero from "./components/Hero"
import CombinedExpertise from "./components/CombinedExpertise"
import Projects from "./components/Projects"
import CombinedServices from "./components/CombinedServices"
import CombinedEducationContact from "./components/CombinedEducationContact"

const sections = [
  { id: "hero", component: Hero, bgClass: "section-base" },
  { id: "expertise", component: CombinedExpertise, bgClass: "section-surface" },
  { id: "projects", component: Projects, bgClass: "section-base" },
  { id: "experience", component: CombinedServices, bgClass: "section-surface" },
  { id: "contact", component: CombinedEducationContact, bgClass: "section-base" },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const wheelTimeoutRef = useRef<number | null>(null)
  const transitionTimeoutRef = useRef<number | null>(null)
  const lastWheelTime = useRef(0)

  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId)
    setIsTransitioning(true)
    if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current)
    transitionTimeoutRef.current = window.setTimeout(() => setIsTransitioning(false), 400)
  }, [])

  const canChangeSection = (direction: "up" | "down") => {
    const activeElement = document.querySelector(`[data-section="${activeSection}"]`)
    const scrollContainer = activeElement?.querySelector(".scroll-container") as HTMLElement | null
    if (!scrollContainer) return true

    return direction === "down"
      ? scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 10
      : scrollContainer.scrollTop <= 10
  }

  useEffect(() => {
    const changeBy = (direction: "up" | "down") => {
      const index = sections.findIndex((section) => section.id === activeSection)
      const nextIndex = direction === "down" ? Math.min(index + 1, sections.length - 1) : Math.max(index - 1, 0)
      if (nextIndex !== index) handleSectionChange(sections[nextIndex].id)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTransitioning || (event.target instanceof HTMLElement && /INPUT|TEXTAREA|SELECT/.test(event.target.tagName))) return
      if (["ArrowDown", "PageDown"].includes(event.key) && canChangeSection("down")) {
        event.preventDefault()
        changeBy("down")
      } else if (["ArrowUp", "PageUp"].includes(event.key) && canChangeSection("up")) {
        event.preventDefault()
        changeBy("up")
      }
    }

    const handleWheel = (event: WheelEvent) => {
      if (isTransitioning || Math.abs(event.deltaY) < 50 || Date.now() - lastWheelTime.current < 250) return
      const direction = event.deltaY > 0 ? "down" : "up"
      if (!canChangeSection(direction)) return
      event.preventDefault()
      if (wheelTimeoutRef.current) window.clearTimeout(wheelTimeoutRef.current)
      wheelTimeoutRef.current = window.setTimeout(() => changeBy(direction), 120)
      lastWheelTime.current = Date.now()
    }

    const handleCustomNavigation = (event: Event) => {
      const customEvent = event as CustomEvent<{ sectionId: string }>
      if (sections.some((section) => section.id === customEvent.detail?.sectionId)) {
        handleSectionChange(customEvent.detail.sectionId)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("navigateToSection", handleCustomNavigation)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("navigateToSection", handleCustomNavigation)
      if (wheelTimeoutRef.current) window.clearTimeout(wheelTimeoutRef.current)
    }
  }, [activeSection, handleSectionChange, isTransitioning])

  useEffect(() => () => {
    if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current)
  }, [])

  return (
    <main className="relative min-h-screen">
      <TopNavigation activeSection={activeSection} onSectionChange={handleSectionChange} />

      <AnimatePresence mode="wait" initial={false}>
        {sections.map((section) => {
          if (section.id !== activeSection) return null
          const SectionComponent = section.component

          return (
            <motion.div
              key={section.id}
              data-section={section.id}
              className={`fixed inset-0 ${section.bgClass}`}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1, zIndex: 10 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <FullPageSection id={section.id} isActive className={section.bgClass}>
                <SectionComponent />
              </FullPageSection>
            </motion.div>
          )
        })}
      </AnimatePresence>

      <div className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex" aria-label="Section navigation">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            onClick={() => handleSectionChange(section.id)}
            className={`scroll-dot size-2.5 rounded-full transition-all ${activeSection === section.id ? "active scale-125" : "hover:opacity-70"}`}
            aria-label={`Go to ${section.id === "hero" ? "home" : section.id}`}
            aria-current={activeSection === section.id ? "location" : undefined}
          />
        ))}
      </div>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-40 bg-background/10 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </main>
  )
}
