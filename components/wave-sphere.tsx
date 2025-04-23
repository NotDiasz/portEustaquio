"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function WaveSphere() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    const container = containerRef.current

    // Limpar qualquer conteúdo anterior
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }

    // Criar a esfera de ondas
    const sphere = document.createElement("div")
    sphere.className = "wave-sphere"
    container.appendChild(sphere)

    // Criar as ondas
    const numberOfWaves = 5
    const waves = []

    for (let i = 0; i < numberOfWaves; i++) {
      const wave = document.createElement("div")
      wave.className = "wave"
      wave.style.animationDelay = `${i * 0.2}s`
      wave.style.transform = `scale(${0.8 + i * 0.1})`
      wave.style.opacity = `${1 - i * 0.15}`
      sphere.appendChild(wave)
      waves.push(wave)
    }

    // Adicionar texto no centro
    const centerText = document.createElement("div")
    centerText.className = "center-text"
    centerText.textContent = "Explore"
    sphere.appendChild(centerText)

    // Interatividade com o mouse
    let isHovered = false
    let rotationX = 0
    let rotationY = 0
    let targetRotationX = 0
    let targetRotationY = 0
    let animationId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return

      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      targetRotationX = ((e.clientY - centerY) / rect.height) * 20
      targetRotationY = ((e.clientX - centerX) / rect.width) * 20
    }

    const handleMouseEnter = () => {
      isHovered = true
      centerText.style.transform = "scale(1.2)"
      waves.forEach((wave) => {
        wave.style.animationPlayState = "paused"
      })
    }

    const handleMouseLeave = () => {
      isHovered = false
      centerText.style.transform = "scale(1)"
      waves.forEach((wave) => {
        wave.style.animationPlayState = "running"
      })
    }

    const handleClick = () => {
      // Navegar para a página de projetos
      window.location.href = "/projetos"
    }

    const animate = () => {
      if (isHovered) {
        rotationX += (targetRotationX - rotationX) * 0.1
        rotationY += (targetRotationY - rotationY) * 0.1
        sphere.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
      } else {
        rotationX *= 0.95
        rotationY *= 0.95
        sphere.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)
    container.addEventListener("click", handleClick)

    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeEventListener("click", handleClick)
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      className="w-64 h-64 md:w-80 md:h-80 perspective-500 cursor-pointer mx-auto"
      aria-label="Esfera interativa - Clique para explorar projetos"
    >
      <style jsx global>{`
        .perspective-500 {
          perspective: 500px;
        }
        
        .wave-sphere {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
        }
        
        .wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid hsl(var(--primary));
          box-shadow: 0 0 20px hsla(var(--primary), 0.3);
          animation: pulse 3s infinite ease-in-out;
        }
        
        .center-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          font-weight: bold;
          color: hsl(var(--primary));
          transition: transform 0.3s ease;
          text-shadow: 0 0 10px hsla(var(--primary), 0.5);
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
