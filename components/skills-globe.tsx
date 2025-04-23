"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Skill {
  name: string
  size: number
  color: string
}

export function SkillsGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    const container = containerRef.current

    // Limpar qualquer conteúdo anterior
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }

    // Criar o globo de habilidades
    const globe = document.createElement("div")
    globe.className = "skills-globe"
    container.appendChild(globe)

    // Lista de habilidades
    const skills: Skill[] = [
      { name: "JavaScript", size: 1.2, color: "#f7df1e" },
      { name: "TypeScript", size: 1.2, color: "#3178c6" },
      { name: "React", size: 1.1, color: "#61dafb" },
      { name: "Node.js", size: 1.1, color: "#68a063" },
      { name: "Java", size: 1.0, color: "#f89820" },
      { name: "Spring", size: 1.0, color: "#6db33f" },
      { name: "Python", size: 1.0, color: "#306998" },
      { name: "MongoDB", size: 0.9, color: "#4db33d" },
      { name: "MySQL", size: 0.9, color: "#00758f" },
      { name: "Git", size: 0.9, color: "#f34f29" },
      { name: "Docker", size: 0.9, color: "#0db7ed" },
      { name: "HTML", size: 0.8, color: "#e34c26" },
      { name: "CSS", size: 0.8, color: "#264de4" },
      { name: "Tailwind", size: 0.8, color: "#38b2ac" },
      { name: "Express", size: 0.8, color: "#000000" },
      { name: "REST API", size: 0.8, color: "#ff6c37" },
      { name: "Bun.js", size: 0.8, color: "#fbf0df" },
      { name: "Figma", size: 0.7, color: "#f24e1e" },
      { name: "UI/UX", size: 0.7, color: "#ff7262" },
      { name: "Scrum", size: 0.7, color: "#6b46c1" },
    ]

    // Criar elementos de habilidade
    skills.forEach((skill, index) => {
      const element = document.createElement("div")
      element.className = "skill-tag"
      element.textContent = skill.name
      element.style.fontSize = `${skill.size}rem`

      // Converter cor para HSL para tema escuro
      if (theme === "dark" && skill.color === "#000000") {
        element.style.color = "#ffffff"
      } else {
        element.style.color = skill.color
      }

      // Posicionar aleatoriamente em uma esfera
      const phi = Math.acos(-1 + (2 * index) / skills.length)
      const theta = Math.sqrt(skills.length * Math.PI) * phi

      const x = Math.cos(theta) * Math.sin(phi) * 100
      const y = Math.sin(theta) * Math.sin(phi) * 100
      const z = Math.cos(phi) * 100

      element.style.transform = `translate3d(${x}%, ${y}%, ${z}px)`
      globe.appendChild(element)
    })

    // Rotação automática
    let rotationX = 0
    let rotationY = 0.5
    let animationId: number
    let autoRotate = true

    // Interatividade com o mouse
    let isDragging = false
    let previousX: number
    let previousY: number

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      previousX = e.clientX
      previousY = e.clientY
      autoRotate = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - previousX
      const deltaY = e.clientY - previousY

      rotationY += deltaX * 0.005
      rotationX -= deltaY * 0.005

      previousX = e.clientX
      previousY = e.clientY
    }

    const handleMouseUp = () => {
      isDragging = false
      setTimeout(() => {
        autoRotate = true
      }, 2000)
    }

    const animate = () => {
      if (autoRotate) {
        rotationY += 0.003
      }

      globe.style.transform = `rotateX(${rotationX}rad) rotateY(${rotationY}rad)`
      animationId = requestAnimationFrame(animate)
    }

    animate()

    container.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    // Limpar event listeners
    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] perspective-800 cursor-grab active:cursor-grabbing"
      aria-label="Globo de habilidades interativo"
    >
      <style jsx global>{`
        .perspective-800 {
          perspective: 800px;
        }
        
        .skills-globe {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.1s;
        }
        
        .skill-tag {
          position: absolute;
          top: 50%;
          left: 50%;
          transform-origin: center;
          transform-style: preserve-3d;
          white-space: nowrap;
          font-weight: bold;
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          transition: all 0.3s;
          transform: translate(-50%, -50%);
          opacity: 0.7;
        }
        
        .skill-tag:hover {
          opacity: 1;
          text-shadow: 0 0 10px currentColor;
          transform: translate(-50%, -50%) scale(1.2);
        }
      `}</style>
    </div>
  )
}
