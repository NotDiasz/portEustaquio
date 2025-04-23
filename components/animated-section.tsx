"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: "fade-up" | "fade-in" | "slide-in-right" | "zoom-in" | "bounce"
}

export function AnimatedSection({ children, className, delay = 0, animation = "fade-up" }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [delay])

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return "opacity-0 translate-y-10"
        case "fade-in":
          return "opacity-0"
        case "slide-in-right":
          return "opacity-0 translate-x-10"
        case "zoom-in":
          return "opacity-0 scale-95"
        case "bounce":
          return "opacity-0 -translate-y-10"
        default:
          return "opacity-0 translate-y-10"
      }
    }

    return "opacity-100 translate-y-0 translate-x-0 scale-100"
  }

  return (
    <div ref={ref} className={cn("transition-all duration-700 ease-out", getAnimationClass(), className)}>
      {children}
    </div>
  )
}
