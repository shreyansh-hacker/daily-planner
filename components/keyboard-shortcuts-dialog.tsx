"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import { motion } from "framer-motion"

interface KeyboardShortcutsDialogProps {
  isOpen: boolean
  onClose: () => void
  language: string
}

export function KeyboardShortcutsDialog({ isOpen, onClose, language }: KeyboardShortcutsDialogProps) {
  const [activeTab, setActiveTab] = useState("general")
  const t = (key: TranslationKey) => getTranslation(language, key)

  const shortcuts = {
    general: [
      { key: "?", description: t("openKeyboardShortcuts") },
      { key: "Esc", description: t("closeDialogs") },
      { key: "/", description: t("focusSearch") },
      { key: "Ctrl+/", description: t("toggleDarkMode") },
      { key: "F1", description: t("openWelcomeTour") },
    ],
    tasks: [
      { key: "N", description: t("newTask") },
      { key: "E", description: t("editSelectedTask") },
      { key: "Delete", description: t("deleteSelectedTask") },
      { key: "Space", description: t("toggleTaskCompletion") },
      { key: "↑/↓", description: t("navigateTasks") },
      { key: "Ctrl+↑/↓", description: t("reorderTasks") },
    ],
    views: [
      { key: "1", description: t("switchToTasksView") },
      { key: "2", description: t("switchToAnalyticsView") },
      { key: "3", description: t("switchTo3DView") },
      { key: "F", description: t("toggleFilters") },
      { key: "S", description: t("toggleSort") },
      { key: "H", description: t("toggleCompletedTasks") },
    ],
  }

  const ShortcutItem = ({ shortcut }: { shortcut: { key: string; description: string } }) => (
    <motion.div
      className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-sm">{shortcut.description}</span>
      <kbd className="px-2 py-1 text-xs font-semibold text-slate-800 bg-slate-100 dark:bg-slate-700 dark:text-slate-200 rounded">
        {shortcut.key}
      </kbd>
    </motion.div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("keyboardShortcuts")}</DialogTitle>
          <DialogDescription>{t("keyboardShortcutsDescription")}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="general">{t("general")}</TabsTrigger>
            <TabsTrigger value="tasks">{t("tasks")}</TabsTrigger>
            <TabsTrigger value="views">{t("views")}</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-1 mt-4">
            {shortcuts.general.map((shortcut, index) => (
              <ShortcutItem key={index} shortcut={shortcut} />
            ))}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-1 mt-4">
            {shortcuts.tasks.map((shortcut, index) => (
              <ShortcutItem key={index} shortcut={shortcut} />
            ))}
          </TabsContent>

          <TabsContent value="views" className="space-y-1 mt-4">
            {shortcuts.views.map((shortcut, index) => (
              <ShortcutItem key={index} shortcut={shortcut} />
            ))}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>{t("close")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
