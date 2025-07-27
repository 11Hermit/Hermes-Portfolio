"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Create particles - reduce count for better performance
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 40) // Reduced particle count

    // Get color based on theme
    const getParticleColor = () => {
      const isLight = theme !== "dark"

      // Array of colors in the indigo/purple/blue spectrum
      const lightColors = [
        "hsla(238, 100%, 67%, opacity)",
        "hsla(262, 83%, 58%, opacity)",
        "hsla(245, 58%, 51%, opacity)",
        "hsla(225, 95%, 53%, opacity)",
        "hsla(270, 76%, 53%, opacity)",
      ]

      const darkColors = [
        "hsla(238, 100%, 77%, opacity)",
        "hsla(262, 83%, 68%, opacity)",
        "hsla(245, 58%, 61%, opacity)",
        "hsla(225, 95%, 63%, opacity)",
        "hsla(270, 76%, 63%, opacity)",
      ]

      const colors = isLight ? lightColors : darkColors
      return colors[Math.floor(Math.random() * colors.length)]
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3, // Reduced speed
        speedY: (Math.random() - 0.5) * 0.3, // Reduced speed
        color: getParticleColor(),
        opacity: Math.random() * 0.2 + 0.1, // Reduced opacity
      })
    }

    // Visibility observer to pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting)
      },
      { threshold: 0.1 },
    )

    observer.observe(canvas)

    // Animation loop with requestAnimationFrame for better performance
    let animationId: number

    const animate = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("opacity", particle.opacity.toString())
        ctx.fill()
      })

      // Draw connections - only connect nearby particles to improve performance
      ctx.strokeStyle = theme === "dark" ? "rgba(139, 92, 246, 0.03)" : "rgba(79, 70, 229, 0.03)" // Reduced opacity
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            // Reduced connection distance
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      observer.disconnect()
      cancelAnimationFrame(animationId)
    }
  }, [theme, isVisible])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.2 }} />
}
