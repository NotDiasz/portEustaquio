"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeSnippetProps {
  code: string
  language?: string
  title?: string
  className?: string
}

export function CodeSnippet({ code, language = "javascript", title, className }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("rounded-lg overflow-hidden border border-gray-700 bg-gray-900", className)}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {title && <span className="text-sm font-mono text-gray-300">{title}</span>}
        </div>
        <div className="flex items-center">
          <span className="text-xs px-2 py-0.5 rounded bg-blue-900 text-blue-200 mr-2">{language}</span>
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            aria-label={copied ? "Copiado" : "Copiar código"}
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-gray-400" />}
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-sm text-gray-300 whitespace-pre-wrap">{code}</pre>
    </motion.div>
  )
}
