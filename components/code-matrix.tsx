"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function CodeMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
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

    // Caracteres para a matriz (incluindo caracteres de código)
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>?/\\|;:,.+-*=&^%$#@!~`"
    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = []

    // Inicializar posições
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
    }

    // Função de desenho
    const draw = () => {
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
        const x = i * 20

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

    // Iniciar animação
    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-20 opacity-10" />
}
