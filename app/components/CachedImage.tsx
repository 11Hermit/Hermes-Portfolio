"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface CachedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallbackSrc?: string
}

export default function CachedImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc = "/placeholder.svg",
}: CachedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const img = new window.Image()
    img.src = src
    img.onload = () => {
      setImgSrc(src)
      setLoading(false)
    }
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}, using fallback`)
      setImgSrc(fallbackSrc)
      setLoading(false)
    }
  }, [src, fallbackSrc])

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse rounded">
          <span className="sr-only">Loading image...</span>
        </div>
      )}
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
      />
    </div>
  )
}
