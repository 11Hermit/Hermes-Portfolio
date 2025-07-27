"use client"

import { useEffect, useRef, useState } from "react"

interface VideoPlayerProps {
  src: string
  className?: string
}

export default function VideoPlayer({ src, className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleLoaded = () => {
      setIsLoaded(true)
    }

    videoElement.addEventListener("loadeddata", handleLoaded)

    // Start playing when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch((error) => {
              console.warn("Auto-play was prevented:", error)
            })
          } else {
            videoElement.pause()
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(videoElement)

    return () => {
      videoElement.removeEventListener("loadeddata", handleLoaded)
      observer.disconnect()
    }
  }, [])

  return (
    <div className={`relative ${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-indigo-900/50 animate-pulse">
          <span className="sr-only">Loading video...</span>
        </div>
      )}
      <video ref={videoRef} className="w-full h-full object-cover rounded-lg" autoPlay loop muted playsInline>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
