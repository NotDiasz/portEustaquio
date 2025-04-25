"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"

export function VisitCounter() {
  const [visits, setVisits] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se já visitou antes (para não contar múltiplas vezes na mesma sessão)
    const hasVisited = localStorage.getItem("has_visited")

    const fetchVisits = async () => {
      try {
        // Se não visitou antes, incrementar o contador
        if (!hasVisited) {
          // Fazer requisição para incrementar o contador
          const hitResponse = await fetch("https://api.countapi.xyz/hit/miguel-eustaquio-portfolio/visits")
          const hitData = await hitResponse.json()
          setVisits(hitData.value)
          localStorage.setItem("has_visited", "true")
        } else {
          // Apenas obter o valor atual sem incrementar
          const getResponse = await fetch("https://api.countapi.xyz/get/miguel-eustaquio-portfolio/visits")
          const getData = await getResponse.json()
          setVisits(getData.value)
        }
      } catch (error) {
        console.error("Erro ao obter contagem de visitas:", error)
        // Fallback para um número fictício em caso de erro
        setVisits(1000)
      } finally {
        setLoading(false)
      }
    }

    fetchVisits()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Users size={16} />
        <span className="text-sm">Carregando visitas...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Users size={16} />
      <span className="text-sm">
        {visits?.toLocaleString("pt-BR") || "0"} {visits === 1 ? "visita" : "visitas"}
      </span>
    </div>
  )
}
