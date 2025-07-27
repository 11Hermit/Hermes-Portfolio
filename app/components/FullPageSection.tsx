"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FullPageSectionProps {
  id: string
  children: ReactNode
  className?: string
  isActive: boolean
}

export default function FullPageSection({ id, children, className = "", isActive }: FullPageSectionProps) {
  return (
    <motion.section
      id={id}
      className={`
        min-h-screen w-full relative overflow-hidden
        ${className}
      `}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isActive ? 1 : 0.3,
        y: isActive ? 0 : 20,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Scrollable container for section content */}
      <div
        className="scroll-container h-screen overflow-y-auto overflow-x-hidden"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(156, 163, 175, 0.5) transparent",
        }}
      >
        <div className="pt-20 pb-10 min-h-full flex flex-col justify-center">{children}</div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }
        .scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </motion.section>
  )
}
