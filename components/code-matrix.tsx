// Substitua o conteúdo do arquivo components/code-matrix.tsx por este:

"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export function CodeMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar o canvas para ocupar toda a tela
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Caracteres para a matriz (reduzidos para melhor desempenho)
    const chars = "01"
    const columns = Math.floor(canvas.width / 30) // Aumentar o espaçamento
    const drops: number[] = []

    // Inicializar posições
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
    }

    // Função de desenho com controle de FPS
    let lastTime = 0
    const fps = 15 // Reduzir para 15 FPS
    const fpsInterval = 1000 / fps

    const draw = (timestamp: number) => {
      if (!ctx) return
      
      const elapsed = timestamp - lastTime
      
      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval)
        
        // Fundo semi-transparente para criar o efeito de desvanecimento
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Cor do texto
        ctx.fillStyle = "#0F0" // Verde Matrix
        ctx.font = "15px monospace"

        // Desenhar caracteres
        for (let i = 0; i < drops.length; i++) {
          // Caractere aleatório
          const text = chars[Math.floor(Math.random() * chars.length)]

          // Posição x é baseada no índice e um espaçamento fixo
          const x = i * 30

          // Posição y é baseada no valor atual da gota
          const y = drops[i] * 20

          // Desenhar o caractere
          ctx.fillText(text, x, y)

          // Incrementar a posição y
          drops[i]++

          // Resetar quando a gota sair da tela ou aleatoriamente
          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
        }
      }
      
      animationId = requestAnimationFrame(draw)
    }

    // Iniciar animação
    let animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme, isMounted])

  if (!isMounted) return null

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-20 opacity-5" />
}