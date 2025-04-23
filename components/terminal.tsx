"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { TerminalIcon, X, Minimize, Maximize } from "lucide-react"
import { cn } from "@/lib/utils"

interface TerminalProps {
  className?: string
  initialCommands?: string[]
  autoType?: boolean
}

interface CommandItem {
  cmd: string
  response: string
}

export function Terminal({ className, initialCommands = [], autoType = true }: TerminalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [commands, setCommands] = useState<CommandItem[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && autoType) {
      const typeInitialCommands = async () => {
        for (const cmd of initialCommands) {
          // Simular digitação
          for (let i = 0; i <= cmd.length; i++) {
            setCurrentCommand(cmd.substring(0, i))
            await new Promise((resolve) => setTimeout(resolve, 50))
          }

          // Executar comando
          handleCommand(cmd)
          await new Promise((resolve) => setTimeout(resolve, 500))
          setCurrentCommand("")
        }
      }

      typeInitialCommands()
    }
  }, [isOpen, initialCommands, autoType])

  const handleCommand = (cmd: string) => {
    let response = ""

    // Comandos básicos
    if (cmd === "help") {
      response = `
Comandos disponíveis:
  help          - Mostra esta ajuda
  about         - Sobre Miguel Eustáquio
  skills        - Listar habilidades
  projects      - Listar projetos
  contact       - Informações de contato
  clear         - Limpar terminal
  exit          - Fechar terminal
      `
    } else if (cmd === "about") {
      response = `
Miguel Eustáquio
-------------
Desenvolvedor Full Stack com foco em back-end, apaixonado por criar APIs 
robustas e escaláveis. Atualmente cursando Análise e Desenvolvimento 
de Sistemas na Uniube, com previsão de conclusão para 2026.
      `
    } else if (cmd === "skills") {
      response = `
Habilidades:
-----------
Linguagens: Python, JavaScript, TypeScript, Java
Frameworks: Node.js, Express.js, React, Spring Boot, Bun.js
Bancos de Dados: MongoDB, MySQL, SQL Server, Oracle
Ferramentas: Git, GitHub, Docker, Figma
      `
    } else if (cmd === "projects") {
      response = `
Projetos:
--------
1. CRUD API - GitHub: https://github.com/NotDiasz/CRUDApi
2. Task List Python - GitHub: https://github.com/NotDiasz/Projeto-Python
3. Void Studio - Site: https://void-studio.netlify.app/
4. Gooday App Fitness - Figma
      `
    } else if (cmd === "contact") {
      response = `
Contato:
-------
Email: migueladp33@gmail.com
Telefone: (34) 99220-8736
GitHub: https://github.com/NotDiasz
LinkedIn: https://www.linkedin.com/in/miguel-eustaquio-77405b326
Instagram: https://www.instagram.com/migueldiasc_
      `
    } else if (cmd === "clear") {
      setCommands([])
      return
    } else if (cmd === "exit") {
      setIsOpen(false)
      return
    } else if (cmd.trim() === "") {
      // Comando vazio, não fazer nada
    } else {
      response = `Comando não reconhecido: ${cmd}. Digite 'help' para ver os comandos disponíveis.`
    }

    setCommands([...commands, { cmd, response }])

    // Adicionar ao histórico de comandos
    if (cmd.trim() !== "") {
      setCommandHistory([...commandHistory, cmd])
      setHistoryIndex(-1)
    }

    // Rolar para o final
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentCommand)
      setCurrentCommand("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex] || "")
      } else {
        setHistoryIndex(-1)
        setCurrentCommand("")
      }
    }
  }

  return (
    <>
      {!isOpen && (
        <motion.button
          className={cn(
            "fixed bottom-6 left-6 z-50 p-3 rounded-full bg-background border border-primary shadow-lg",
            className,
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
        >
          <TerminalIcon className="text-primary" />
        </motion.button>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-6 z-50 w-[90vw] max-w-2xl h-[60vh] bg-black/90 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
        >
          {/* Barra de título */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <TerminalIcon size={16} className="text-green-400" />
              <span className="text-sm font-mono text-gray-300">miguel@portfolio:~</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>
                <Minimize size={14} className="text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-700 rounded">
                <Maximize size={14} className="text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-700 rounded" onClick={() => setIsOpen(false)}>
                <X size={14} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Conteúdo do terminal */}
          <div
            ref={terminalRef}
            className="p-4 h-[calc(60vh-80px)] overflow-y-auto font-mono text-sm text-green-400 bg-black"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="mb-4">
              <p className="text-yellow-400">Bem-vindo ao Terminal do Portfolio v1.0.0</p>
              <p>
                Digite <span className="text-white">&apos;help&apos;</span> para ver os comandos disponíveis.
              </p>
            </div>

            {commands.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex">
                  <span className="text-blue-400 mr-2">miguel@portfolio:~$</span>
                  <span>{item.cmd}</span>
                </div>
                {item.response && <pre className="whitespace-pre-wrap mt-1 text-gray-300">{item.response}</pre>}
              </div>
            ))}

            <div className="flex items-center mt-2">
              <span className="text-blue-400 mr-2">miguel@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
                autoFocus
              />
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
