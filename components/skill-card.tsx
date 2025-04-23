"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function SkillCard({ icon: Icon, title, description, className }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "bg-card border rounded-lg p-6 transition-all duration-300",
        isHovered ? "shadow-lg transform -translate-y-2 border-primary" : "shadow-md hover:shadow-lg",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "mb-4 inline-flex items-center justify-center p-2 rounded-md transition-all duration-300",
          isHovered ? "bg-primary text-primary-foreground scale-110" : "bg-primary/10 text-primary",
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
