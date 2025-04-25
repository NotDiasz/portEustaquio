// Substitua o conteúdo do arquivo components/animated-background.tsx por este:

"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar o canvas para ocupar toda a tela
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Definir cores com base no tema
    const isDark = theme === "dark"
    const particleColor = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.3)"
    const lineColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    const glowColor = isDark ? "rgba(100, 149, 237, 0.5)" : "rgba(65, 105, 225, 0.3)"

    // Reduzir o número de partículas em dispositivos móveis
    const isMobile = window.innerWidth < 768
    const numberOfParticles = isMobile ? Math.min(window.innerWidth / 40, 20) : Math.min(window.innerWidth / 20, 50)
    const numberOfFloatingElements = isMobile ? 3 : 8

    // Criar partículas e elementos flutuantes com menos elementos
    const particlesArray = Array.from({ length: numberOfParticles }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3, // Velocidade reduzida
      speedY: (Math.random() - 0.5) * 0.3, // Velocidade reduzida
      color: particleColor,
      glow: Math.random() > 0.9
    }))

    const floatingElements = Array.from({ length: numberOfFloatingElements }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (isMobile ? 10 : 20) + 5,
      speedX: (Math.random() - 0.5) * 0.2, // Velocidade reduzida
      speedY: (Math.random() - 0.5) * 0.2, // Velocidade reduzida
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.005, // Velocidade reduzida
      type: ["square", "triangle", "circle"][Math.floor(Math.random() * 3)],
      color: isDark
        ? `hsla(${Math.random() * 60 + 200}, 70%, 60%, 0.2)`
        : `hsla(${Math.random() * 60 + 200}, 70%, 40%, 0.15)`,
      opacity: Math.random() * 0.5 + 0.1
    }))

    // Função para desenhar elementos flutuantes
    const drawFloatingElement = (element: any) => {
      if (!ctx) return
      
      ctx.save()
      ctx.translate(element.x, element.y)
      ctx.rotate(element.rotation)
      ctx.globalAlpha = element.opacity
      ctx.fillStyle = element.color

      if (element.type === "square") {
        ctx.fillRect(-element.size / 2, -element.size / 2, element.size, element.size)
      } else if (element.type === "triangle") {
        ctx.beginPath()
        ctx.moveTo(0, -element.size / 2)
        ctx.lineTo(element.size / 2, element.size / 2)
        ctx.lineTo(-element.size / 2, element.size / 2)
        ctx.closePath()
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.arc(0, 0, element.size / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    // Função para desenhar partículas
    const drawParticle = (particle: any) => {
      if (!ctx) return
      
      if (particle.glow) {
        ctx.shadowBlur = 15
        ctx.shadowColor = glowColor
      }

      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()

      if (particle.glow) {
        ctx.shadowBlur = 0
      }
    }

    // Conectar partículas próximas (com menos conexões)
    const connect = () => {
      if (!ctx) return

      const maxDistance = isMobile ? 50 : 80
      // Reduzir o número de iterações
      for (let a = 0; a < particlesArray.length; a += 2) {
        for (let b = a; b < particlesArray.length; b += 2) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 1 - distance / maxDistance
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Interatividade com o mouse (simplificada)
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: isMobile ? 50 : 100,
    }

    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      if ("touches" in event) {
        if (event.touches.length > 0) {
          mouse.x = event.touches[0].clientX
          mouse.y = event.touches[0].clientY
        }
      } else {
        mouse.x = event.clientX
        mouse.y = event.clientY
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleMouseMove)
    window.addEventListener("touchstart", handleMouseMove)

    // Usar requestAnimationFrame com controle de FPS
    let lastTime = 0
    const fps = 30 // Limitar a 30 FPS para economizar recursos
    const fpsInterval = 1000 / fps

    function animate(timestamp: number) {
      if (!ctx) return
      
      const elapsed = timestamp - lastTime
      
      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval)
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Atualizar e desenhar elementos flutuantes
        floatingElements.forEach(element => {
          element.x += element.speedX
          element.y += element.speedY
          element.rotation += element.rotationSpeed

          // Rebater nas bordas
          if (element.x > canvas.width || element.x < 0) {
            element.speedX = -element.speedX
          }
          if (element.y > canvas.height || element.y < 0) {
            element.speedY = -element.speedY
          }

          drawFloatingElement(element)
        })

        // Atualizar e desenhar partículas
        particlesArray.forEach(particle => {
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Rebater nas bordas
          if (particle.x > canvas.width || particle.x < 0) {
            particle.speedX = -particle.speedX
          }
          if (particle.y > canvas.height || particle.y < 0) {
            particle.speedY = -particle.speedY
          }

          // Interatividade com o mouse (simplificada)
          if (mouse.x !== null && mouse.y !== null) {
            const dx = particle.x - mouse.x
            const dy = particle.y - mouse.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < mouse.radius) {
              const forceDirectionX = dx / distance
              const forceDirectionY = dy / distance
              const force = (mouse.radius - distance) / mouse.radius

              particle.x += forceDirectionX * force
              particle.y += forceDirectionY * force
            }
          }

          drawParticle(particle)
        })

        connect()
      }
      
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleMouseMove)
      window.removeEventListener("touchstart", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [theme, isMounted])

  if (!isMounted) return null

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-30" />
}