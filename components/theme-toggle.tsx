"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import { useEffect, useState } from "react"

interface ThemeToggleProps {
  language: string
}

export function ThemeToggle({ language }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = (key: TranslationKey) => getTranslation(language, key)

  // Ensure component only renders after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={theme === "dark" ? t("lightMode") : t("darkMode")}
      className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{theme === "dark" ? t("lightMode") : t("darkMode")}</span>
    </Button>
  )
}
