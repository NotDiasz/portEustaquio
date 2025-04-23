"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, Figma, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  url: string
  urlType: "github" | "figma" | "site"
  className?: string
}

export function ProjectCard({ title, description, tags, url, urlType = "github", className }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = () => {
    switch (urlType) {
      case "figma":
        return <Figma className={cn("mr-2 h-4 w-4", isHovered && "animate-pulse")} />
      case "site":
        return <Globe className={cn("mr-2 h-4 w-4", isHovered && "animate-bounce")} />
      default:
        return <Github className={cn("mr-2 h-4 w-4", isHovered && "animate-spin-slow")} />
    }
  }

  const getButtonText = () => {
    switch (urlType) {
      case "figma":
        return "Figma"
      case "site":
        return "Visitar Site"
      default:
        return "GitHub"
    }
  }

  return (
    <div
      className={cn(
        "bg-card border rounded-lg p-6 transition-all duration-300 relative overflow-hidden",
        isHovered ? "shadow-lg transform -translate-y-2 border-primary" : "shadow-md hover:shadow-lg",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efeito de gradiente animado no fundo */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 transition-opacity duration-700",
          isHovered ? "opacity-100" : "opacity-0",
        )}
        style={{
          backgroundSize: "200% 100%",
          animation: isHovered ? "gradientMove 3s linear infinite" : "none",
        }}
      />

      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "text-xs px-2 py-1 rounded-full transition-all duration-300",
                isHovered ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-end">
          <Button asChild variant={isHovered ? "default" : "outline"} size="sm" className="transition-all duration-300">
            <Link href={url} target="_blank" rel="noopener noreferrer">
              {getIcon()}
              {getButtonText()}
            </Link>
          </Button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}
