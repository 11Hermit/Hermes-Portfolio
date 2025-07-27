"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function PhilosophicalBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const orbs: HTMLDivElement[] = []
    const flowLines: HTMLDivElement[] = []
    const circles: HTMLDivElement[] = []

    // Create orbs
    for (let i = 0; i < 5; i++) {
      const orb = document.createElement("div")
      orb.className = "orb"
      orb.style.width = `${Math.random() * 300 + 100}px`
      orb.style.height = orb.style.width
      orb.style.left = `${Math.random() * 100}%`
      orb.style.top = `${Math.random() * 100}%`
      orb.style.animationDelay = `${Math.random() * 5}s`
      orb.style.opacity = `${Math.random() * 0.2 + 0.1}`
      container.appendChild(orb)
      orbs.push(orb)
    }

    // Create flow lines
    for (let i = 0; i < 10; i++) {
      const line = document.createElement("div")
      line.className = "flow-line"
      line.style.width = `${Math.random() * 30 + 20}%`
      line.style.left = `${Math.random() * 70}%`
      line.style.top = `${Math.random() * 100}%`
      line.style.transform = `rotate(${Math.random() * 360}deg)`
      container.appendChild(line)
      flowLines.push(line)
    }

    // Create philosophical circles
    for (let i = 0; i < 8; i++) {
      const circle = document.createElement("div")
      circle.className = "philosophical-circle"
      const size = Math.random() * 200 + 50
      circle.style.width = `${size}px`
      circle.style.height = `${size}px`
      circle.style.left = `${Math.random() * 100}%`
      circle.style.top = `${Math.random() * 100}%`
      container.appendChild(circle)
      circles.push(circle)
    }

    return () => {
      orbs.forEach((orb) => orb.remove())
      flowLines.forEach((line) => line.remove())
      circles.forEach((circle) => circle.remove())
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden opacity-30 pointer-events-none">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(79, 70, 229, 0.15) 0%, transparent 70%)",
            "radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
            "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
            "radial-gradient(circle at 60% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
            "radial-gradient(circle at 20% 30%, rgba(79, 70, 229, 0.15) 0%, transparent 70%)",
          ],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}
