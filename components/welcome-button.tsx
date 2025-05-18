"use client"

import { Info, HelpCircle, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"

interface WelcomeButtonProps {
  onClick: () => void
  language: string
  onShowKeyboardShortcuts?: () => void
  onShowTips?: () => void
}

export function WelcomeButton({ onClick, language, onShowKeyboardShortcuts, onShowTips }: WelcomeButtonProps) {
  const t = (key: TranslationKey) => getTranslation(language, key)
  const [hasNewFeatures, setHasNewFeatures] = useState(false)

  // Check if there are new features to highlight
  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit")
    const currentVersion = "1.2.0" // Update this when adding new features
    const lastSeenVersion = localStorage.getItem("lastSeenVersion")

    if (!lastSeenVersion || lastSeenVersion !== currentVersion) {
      setHasNewFeatures(true)
    }

    // Update last visit time
    localStorage.setItem("lastVisit", new Date().toISOString())
  }, [])

  // Mark features as seen when dropdown is opened
  const handleDropdownOpen = (open: boolean) => {
    if (open && hasNewFeatures) {
      const currentVersion = "1.2.0"
      localStorage.setItem("lastSeenVersion", currentVersion)
      setHasNewFeatures(false)
    }
  }

  return (
    <DropdownMenu onOpenChange={handleDropdownOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="hidden sm:inline">{t("help")}</span>
                </Button>

                {hasNewFeatures && (
                  <motion.span
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                    }}
                  />
                )}
              </motion.div>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("helpAndTips")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={onClick} className="cursor-pointer">
          <Info className="mr-2 h-4 w-4" />
          <span>{t("welcomeTour")}</span>
          {hasNewFeatures && (
            <span className="ml-auto text-xs font-medium text-red-500 dark:text-red-400">{t("new")}</span>
          )}
        </DropdownMenuItem>

        {onShowKeyboardShortcuts && (
          <DropdownMenuItem onClick={onShowKeyboardShortcuts} className="cursor-pointer">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>{t("keyboardShortcuts")}</span>
          </DropdownMenuItem>
        )}

        {onShowTips && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onShowTips} className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>{t("productivityTips")}</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
