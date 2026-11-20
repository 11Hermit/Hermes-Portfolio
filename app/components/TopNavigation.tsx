"use client"

import { useState } from "react"
import { BriefcaseBusiness, Code2, Home, Mail, Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

const navigationItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "expertise", label: "Expertise", icon: Code2 },
  { id: "projects", label: "Projects", icon: BriefcaseBusiness },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "contact", label: "Contact", icon: Mail },
]

const sectionPrefetchers: Partial<Record<string, () => Promise<unknown>>> = {
  expertise: () => import("./CombinedExpertise"),
  projects: () => import("./Projects"),
  experience: () => import("./CombinedServices"),
  contact: () => import("./CombinedEducationContact"),
}

interface TopNavigationProps {
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

export default function TopNavigation({ activeSection, onSectionChange }: TopNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = (sectionId: string) => {
    onSectionChange(sectionId)
    setMobileMenuOpen(false)
  }
  const prefetch = (sectionId: string) => {
    void sectionPrefetchers[sectionId]?.().catch(() => undefined)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8" aria-label="Main navigation">
        <button type="button" onClick={() => navigate("hero")} className="flex items-center gap-3 text-left" aria-label="Ashtone Onyango Omondi, home">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">A</span>
          <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">Ashtone Onyango Omondi</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const selected = activeSection === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                onPointerEnter={() => prefetch(item.id)}
                onFocus={() => prefetch(item.id)}
                aria-current={selected ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors ${selected ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                <Icon className="size-4" aria-hidden="true" />{item.label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block"><ModeToggle /></div>
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden" aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">
            {mobileMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="mobile-menu-enter border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const selected = activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  onTouchStart={() => prefetch(item.id)}
                  onFocus={() => prefetch(item.id)}
                  aria-current={selected ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm ${selected ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"}`}
                >
                  <Icon className="size-4" aria-hidden="true" />{item.label}
                </button>
              )
            })}
            <div className="pt-2"><ModeToggle /></div>
          </div>
        </div>
      )}
    </header>
  )
}
