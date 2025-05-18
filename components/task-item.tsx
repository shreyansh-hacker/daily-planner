"use client"

import { useState } from "react"
import type { Task, Category } from "@/components/daily-planner"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Clock, Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { type TranslationKey, getTranslation } from "@/lib/translations"

interface TaskItemProps {
  task: Task
  categories: Category[]
  onToggleComplete: (taskId: string) => void
  onEditClick: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  language: string
}

export function TaskItem({ task, categories, onToggleComplete, onEditClick, onDeleteTask, language }: TaskItemProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const t = (key: TranslationKey) => getTranslation(language, key)

  const category = categories.find((cat) => cat.id === task.category)

  const priorityColors = {
    low: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    medium: "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    high: "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300",
  }

  return (
    <div
      className={`p-4 rounded-lg border ${task.completed ? "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"} transition-colors`}
    >
      <div className="flex items-start gap-3">
        <Checkbox checked={task.completed} onCheckedChange={() => onToggleComplete(task.id)} className="mt-1" />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className={`font-medium ${task.completed ? "line-through text-slate-500 dark:text-slate-400" : ""}`}>
              {task.title}
            </h3>

            {category && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${category.color} bg-opacity-20 dark:bg-opacity-30`}>
                {category.name}
              </span>
            )}

            <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
              {t(task.priority as TranslationKey)}
            </span>
          </div>

          {task.description && (
            <p className={`text-sm text-slate-600 dark:text-slate-400 ${task.completed ? "line-through" : ""}`}>
              {task.description}
            </p>
          )}

          {task.time && (
            <div className="flex items-center mt-2 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="h-3 w-3 mr-1" />
              {task.time}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={() => onEditClick(task)} className="h-8 w-8">
            <Edit className="h-4 w-4" />
            <span className="sr-only">{t("edit")}</span>
          </Button>

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">{t("delete")}</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("deleteTask")}</AlertDialogTitle>
                <AlertDialogDescription>{t("deleteTaskConfirmation")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDeleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  {t("delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
