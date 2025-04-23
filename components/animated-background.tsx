"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
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

    // Criar partículas
    const particlesArray: Particle[] = []
    // Reduzir o número de partículas em dispositivos móveis
    const isMobile = window.innerWidth < 768
    const numberOfParticles = isMobile ? Math.min(window.innerWidth / 20, 30) : Math.min(window.innerWidth / 10, 100)
    const floatingElements: FloatingElement[] = []
    const numberOfFloatingElements = isMobile ? 5 : 15

    // Elementos flutuantes (formas geométricas)
    class FloatingElement {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
      type: string
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * (isMobile ? 10 : 20) + 5
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.01
        this.type = ["square", "triangle", "circle"][Math.floor(Math.random() * 3)]
        this.color = isDark
          ? `hsla(${Math.random() * 60 + 200}, 70%, 60%, 0.2)`
          : `hsla(${Math.random() * 60 + 200}, 70%, 40%, 0.15)`
        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.rotationSpeed

        // Rebater nas bordas
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (ctx) {
          ctx.save()
          ctx.translate(this.x, this.y)
          ctx.rotate(this.rotation)
          ctx.globalAlpha = this.opacity
          ctx.fillStyle = this.color

          if (this.type === "square") {
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
          } else if (this.type === "triangle") {
            ctx.beginPath()
            ctx.moveTo(0, -this.size / 2)
            ctx.lineTo(this.size / 2, this.size / 2)
            ctx.lineTo(-this.size / 2, this.size / 2)
            ctx.closePath()
            ctx.fill()
          } else {
            ctx.beginPath()
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
            ctx.fill()
          }

          ctx.restore()
        }
      }
    }

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      glow: boolean

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = particleColor
        this.glow = Math.random() > 0.9 // 10% das partículas terão brilho
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Rebater nas bordas
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (ctx) {
          if (this.glow) {
            ctx.shadowBlur = 15
            ctx.shadowColor = glowColor
          }

          ctx.fillStyle = this.color
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()

          if (this.glow) {
            ctx.shadowBlur = 0
          }
        }
      }
    }

    // Inicializar partículas e elementos flutuantes
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    for (let i = 0; i < numberOfFloatingElements; i++) {
      floatingElements.push(new FloatingElement())
    }

    // Conectar partículas próximas
    function connect() {
      if (!ctx) return

      const maxDistance = isMobile ? 70 : 100
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
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

    // Interatividade com o mouse
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: isMobile ? 80 : 150,
    }

    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      if ("touches" in event) {
        // Touch event
        if (event.touches.length > 0) {
          mouse.x = event.touches[0].clientX
          mouse.y = event.touches[0].clientY
        }
      } else {
        // Mouse event
        mouse.x = event.clientX
        mouse.y = event.clientY
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleMouseMove)
    window.addEventListener("touchstart", handleMouseMove)

    // Função de animação
    function animate() {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Desenhar elementos flutuantes primeiro (atrás das partículas)
      for (let i = 0; i < floatingElements.length; i++) {
        floatingElements[i].update()
        floatingElements[i].draw()
      }

      // Atualizar e desenhar partículas
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()

        // Interatividade com o mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particlesArray[i].x - mouse.x
          const dy = particlesArray[i].y - mouse.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouse.radius - distance) / mouse.radius

            particlesArray[i].x += forceDirectionX * force * 2
            particlesArray[i].y += forceDirectionY * force * 2
          }
        }

        particlesArray[i].draw()
      }

      connect()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleMouseMove)
      window.removeEventListener("touchstart", handleMouseMove)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-50" />
}
