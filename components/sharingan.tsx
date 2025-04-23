"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Sharingan() {
  const [stage, setStage] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Ciclo de animação: Sharingan -> Mangekyou -> Rinnegan -> Sharingan
    intervalRef.current = setInterval(() => {
      if (!isHovered) {
        setStage((prev) => (prev + 1) % 3)
      }
    }, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClick = () => {
    setStage((prev) => (prev + 1) % 3)
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 cursor-pointer"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      title="Alternar Dōjutsu"
    >
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="sharingan"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: 1 }}
            exit={{ rotate: 720, opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center relative"
          >
            {/* Sharingan básico */}
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
            {/* Tomoe (vírgulas) */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-3 bg-black rounded-full"
                style={{
                  transformOrigin: "center 20px",
                  transform: `rotate(${i * 120}deg) translateY(-6px)`,
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            ))}
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="mangekyou"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: 1 }}
            exit={{ rotate: 720, opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center relative overflow-hidden"
          >
            {/* Mangekyou de Sasuke */}
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-red-700 rounded-full"></div>
            </div>
            {/* Padrão do Mangekyou */}
            <motion.div
              className="absolute w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute w-10 h-1 bg-black"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                    transform: `rotate(${i * 120}deg)`,
                  }}
                />
              ))}
              {[0, 1, 2].map((i) => (
                <div
                  key={i + 3}
                  className="absolute w-4 h-4 bg-black"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                    transform: `rotate(${i * 120}deg) translate(6px, -2px)`,
                    borderRadius: "50% 0",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="rinnegan"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: 1 }}
            exit={{ rotate: 720, opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center relative"
          >
            {/* Rinnegan */}
            <div className="w-5 h-5 bg-purple-900 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
            {/* Círculos concêntricos */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute w-full h-full"
            >
              {[2, 4, 6, 8].map((size) => (
                <div
                  key={size}
                  className="absolute border border-purple-500 rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `calc(50% - ${size / 2}px)`,
                    left: `calc(50% - ${size / 2}px)`,
                  }}
                />
              ))}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <div
                  key={angle}
                  className="absolute w-12 h-0.5 bg-purple-500"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                    transform: `rotate(${angle}deg)`,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-xs mt-1 text-center opacity-70 font-mono">Dōjutsu</div>
    </motion.div>
  )
}
