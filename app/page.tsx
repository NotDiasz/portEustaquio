"use client"

import Link from "next/link"
import { ArrowRight, Github, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"
import { AnimatedSection } from "@/components/animated-section"
import { Cube3D } from "@/components/cube-3d"
import { AnimatedBackground } from "@/components/animated-background"
import { AnimatedImage } from "@/components/animated-image"
import { motion } from "framer-motion"
import { VisitCounter } from "@/components/visit-counter"

export default function Home() {
  return (
    <div className="pt-16 relative">
      <AnimatedBackground />

      {/* Hero Section */}
      <Section className="min-h-[calc(100vh-4rem)] flex items-center relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection className="order-2 md:order-1">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Miguel Eustáquio
              <motion.span
                className="text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                .
              </motion.span>
            </motion.h1>
            <div className="flex items-center gap-3 mb-6">
              <motion.h2
                className="text-2xl md:text-3xl font-medium text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Desenvolvedor Full Stack
              </motion.h2>
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary animate-pulse">
                <AnimatedImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eu2.jpg-8zzXJNuJbQP333uqSZl6xmfstzY5yy.jpeg"
                  alt="Miguel Eustáquio"
                  fill
                />
              </div>
            </div>
            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Especializado em desenvolvimento back-end e criação de APIs Rest e RestFull utilizando Node.js,
              Python. Também tenho experiência com desenvolvimento web moderno.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button asChild size="lg" className="animate-pulse">
                <Link href="/contato">
                  Entre em contato
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projetos">Ver projetos</Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex mt-8 space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link
                href="https://github.com/NotDiasz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={24} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/miguel-eustaquio-77405b326"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.instagram.com/migueldiasc_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </Link>
            </motion.div>

            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <VisitCounter />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="order-1 md:order-2 flex justify-center" delay={200}>
            <Cube3D />
          </AnimatedSection>
        </div>
      </Section>

      {/* Brief About Section */}
      <Section className="bg-muted/50">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Sobre Mim</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sou um desenvolvedor Full Stack apaixonado por criar soluções web eficientes e escaláveis, com foco em
              desenvolvimento back-end e APIs.
            </p>
            <Button asChild className="animate-bounce">
              <Link href="/sobre">
                Saiba mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </Section>
    </div>
  )
}
