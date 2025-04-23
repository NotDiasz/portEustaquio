"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    // Forçar o tema dark no carregamento inicial
    document.documentElement.classList.add("dark")
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
