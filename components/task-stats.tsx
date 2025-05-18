"use client"

import { CheckCircle, Circle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { type TranslationKey, getTranslation } from "@/lib/translations"

interface TaskStatsProps {
  totalTasks: number
  completedTasks: number
  completionRate: number
  className?: string
  language: string
}

export function TaskStats({ totalTasks, completedTasks, completionRate, className = "", language }: TaskStatsProps) {
  const t = (key: TranslationKey) => getTranslation(language, key)

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-lg font-semibold">{t("progress")}</h2>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{t("completionRate")}</span>
          <span className="font-medium">{completionRate}%</span>
        </div>
        <Progress value={completionRate} className="h-2" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-center mb-1">
            <Circle className="h-5 w-5 text-slate-500" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{totalTasks}</div>
            <div className="text-xs text-slate-500">{t("totalTasks")}</div>
          </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-center mb-1">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{completedTasks}</div>
            <div className="text-xs text-slate-500">{t("completedTasks")}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
