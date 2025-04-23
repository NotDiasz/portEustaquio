import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, Fira_Code } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransitions } from "@/components/page-transitions"
import { Sharingan } from "@/components/sharingan"
import { Terminal } from "@/components/terminal"
import { FloatingCode } from "@/components/floating-code"
import { CodeMatrix } from "@/components/code-matrix"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
})

export const metadata: Metadata = {
  title: "Miguel Eustáquio | Desenvolvedor Full Stack",
  description:
    "Portfólio de Miguel Eustáquio - Desenvolvedor Full Stack especializado em React, Node.js, TypeScript e mais.",
  creator: "Miguel Eustáquio",
  authors: [{ name: "Miguel Eustáquio" }],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${firaCode.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <CodeMatrix />
            <PageTransitions>
              <main className="flex-1">{children}</main>
            </PageTransitions>
            <Footer />
            <Sharingan />
            <Terminal initialCommands={["echo 'Bem-vindo ao meu portfólio!'", "help"]} />
            <FloatingCode />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
