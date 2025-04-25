// Substitua o conteúdo do arquivo components/cube-3d.tsx por este:

"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export function Cube3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    if (typeof window === "undefined" || !containerRef.current) return

    const container = containerRef.current

    // Limpar qualquer conteúdo anterior
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }

    // Criar o cubo
    const cube = document.createElement("div")
    cube.className = "cube"
    container.appendChild(cube)

    // Criar as faces do cubo
    const faces = ["front", "back", "right", "left", "top", "bottom"]
    const icons = ["💻", "🚀", "🔧", "⚙️", "📱", "🌐"]

    faces.forEach((face, index) => {
      const element = document.createElement("div")
      element.className = `face ${face}`
      element.innerHTML = `<span class="text-4xl">${icons[index]}</span>`
      cube.appendChild(element)
    })

    // Animação de rotação com controle de FPS
    let x = 0
    let y = 0
    let lastTime = 0
    const fps = 30 // Limitar a 30 FPS
    const fpsInterval = 1000 / fps

    const animate = (timestamp: number) => {
      const elapsed = timestamp - lastTime
      
      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval)
        
        x += 0.005
        y += 0.005
        cube.style.transform = `rotateX(${x}rad) rotateY(${y}rad)`
      }
      
      animationId = requestAnimationFrame(animate)
    }

    let animationId = requestAnimationFrame(animate)

    // Interatividade com o mouse/touch (otimizada)
    let isDragging = false
    let previousX = 0
    let previousY = 0

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDragging = true
      if ("touches" in e) {
        previousX = e.touches[0].clientX
        previousY = e.touches[0].clientY
      } else {
        previousX = e.clientX
        previousY = e.clientY
      }
      cancelAnimationFrame(animationId)
    }

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return

      let currentX = 0
      let currentY = 0

      if ("touches" in e) {
        currentX = e.touches[0].clientX
        currentY = e.touches[0].clientY
      } else {
        currentX = e.clientX
        currentY = e.clientY
      }

      const deltaX = currentX - previousX
      const deltaY = currentY - previousY

      x += deltaY * 0.005
      y += deltaX * 0.005

      cube.style.transform = `rotateX(${x}rad) rotateY(${y}rad)`

      previousX = currentX
      previousY = currentY
    }

    const handleEnd = () => {
      isDragging = false
      animationId = requestAnimationFrame(animate)
    }

    // Mouse events com passive true para melhor desempenho
    container.addEventListener("mousedown", handleStart, { passive: true })
    window.addEventListener("mousemove", handleMove, { passive: true })
    window.addEventListener("mouseup", handleEnd, { passive: true })

    // Touch events com passive true para melhor desempenho
    container.addEventListener("touchstart", handleStart, { passive: true })
    window.addEventListener("touchmove", handleMove, { passive: true })
    window.addEventListener("touchend", handleEnd, { passive: true })

    // Limpar event listeners
    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener("mousedown", handleStart)
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleEnd)
      container.removeEventListener("touchstart", handleStart)
      window.removeEventListener("touchmove", handleMove)
      window.removeEventListener("touchend", handleEnd)
    }
  }, [theme, isMounted])

  if (!isMounted) return null

  return (
    <div className="w-64 h-64 md:w-80 md:h-80 perspective-500 cursor-grab active:cursor-grabbing">
      <div ref={containerRef} className="w-full h-full relative preserve-3d" />
      <style jsx global>{`
        .perspective-500 {
          perspective: 500px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.1s;
        }
        
        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid hsl(var(--primary));
          background-color: hsla(var(--primary), 0.1);
          backdrop-filter: blur(5px);
          box-shadow: 0 0 20px hsla(var(--primary), 0.3);
          border-radius: 8px;
        }
        
        .front  { transform: translateZ(125px); }
        .back   { transform: rotateY(180deg) translateZ(125px); }
        .right  { transform: rotateY(90deg) translateZ(125px); }
        .left   { transform: rotateY(-90deg) translateZ(125px); }
        .top    { transform: rotateX(90deg) translateZ(125px); }
        .bottom { transform: rotateX(-90deg) translateZ(125px); }
        
        @media (min-width: 768px) {
          .front, .back, .right, .left, .top, .bottom {
            transform-origin: center;
          }
          .front  { transform: translateZ(150px); }
          .back   { transform: rotateY(180deg) translateZ(150px); }
          .right  { transform: rotateY(90deg) translateZ(150px); }
          .left   { transform: rotateY(-90deg) translateZ(150px); }
          .top    { transform: rotateX(90deg) translateZ(150px); }
          .bottom { transform: rotateX(-90deg) translateZ(150px); }
        }
      `}</style>
    </div>
  )
}