"use client"

import { useState } from "react"
import type { Task, Category } from "@/components/daily-planner"
import { AnimatedTaskItem } from "@/components/animated-task-item"
import { TaskEditDialog } from "@/components/task-edit-dialog"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import { motion, AnimatePresence } from "framer-motion"

interface TaskListProps {
  tasks: Task[]
  categories: Category[]
  onToggleComplete: (taskId: string) => void
  onUpdateTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  language: string
}

export function TaskList({ tasks, categories, onToggleComplete, onUpdateTask, onDeleteTask, language }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const t = (key: TranslationKey) => getTranslation(language, key)

  const handleEditClick = (task: Task) => {
    setEditingTask(task)
  }

  const handleEditClose = () => {
    setEditingTask(null)
  }

  const handleEditSave = (updatedTask: Task) => {
    onUpdateTask(updatedTask)
    setEditingTask(null)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-3 perspective-1000">
      <AnimatePresence>
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-8 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-dashed border-slate-300 dark:border-slate-700"
          >
            <p>{t("noTasks")}</p>
          </motion.div>
        ) : (
          tasks.map((task) => (
            <AnimatedTaskItem
              key={task.id}
              task={task}
              categories={categories}
              onToggleComplete={onToggleComplete}
              onEditClick={handleEditClick}
              onDeleteTask={onDeleteTask}
              language={language}
            />
          ))
        )}
      </AnimatePresence>

      {editingTask && (
        <TaskEditDialog
          task={editingTask}
          categories={categories}
          onClose={handleEditClose}
          onSave={handleEditSave}
          language={language}
        />
      )}
    </motion.div>
  )
}
