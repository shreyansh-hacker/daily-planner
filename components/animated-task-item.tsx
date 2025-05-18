"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { Task, Category } from "@/components/daily-planner"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Clock, Edit, Trash2, Share2, GripVertical } from "lucide-react"
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
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import confetti from "canvas-confetti"
import { ShareTaskDialog } from "@/components/share-task-dialog"

interface AnimatedTaskItemProps {
  task: Task
  categories: Category[]
  onToggleComplete: (taskId: string) => void
  onEditClick: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  language: string
  isDragging?: boolean
}

export function AnimatedTaskItem({
  task,
  categories,
  onToggleComplete,
  onEditClick,
  onDeleteTask,
  language,
  isDragging = false,
}: AnimatedTaskItemProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const taskRef = useRef<HTMLDivElement>(null)
  const t = (key: TranslationKey) => getTranslation(language, key)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smoother spring physics for the tilt
  const springConfig = { damping: 20, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  // Transform mouse position to rotation values
  const rotateX = useTransform(ySpring, [-100, 100], [10, -10])
  const rotateY = useTransform(xSpring, [-100, 100], [-10, 10])

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!taskRef.current || isDragging) return

    const rect = taskRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const category = categories.find((cat) => cat.id === task.category)

  const priorityColors = {
    low: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    medium: "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    high: "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300",
  }

  const handleComplete = () => {
    // If task is being marked as complete, trigger confetti
    if (!task.completed) {
      if (taskRef.current) {
        const rect = taskRef.current.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: x / window.innerWidth, y: y / window.innerHeight },
          colors: ["#4CAF50", "#8BC34A", "#CDDC39"],
          zIndex: 9999,
        })
      }
    }
    onToggleComplete(task.id)
  }

  // Pulse animation for high priority tasks
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    if (task.priority === "high" && !task.completed) {
      const interval = setInterval(() => {
        setIsPulsing((prev) => !prev)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [task.priority, task.completed])

  return (
    <motion.div
      ref={taskRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: isDragging ? 1 : 1.02 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg border ${
        task.completed
          ? "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700"
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
      } transition-all shadow-sm hover:shadow-lg ${isDragging ? "cursor-grabbing" : ""}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX: !isDragging ? rotateX : 0,
        rotateY: !isDragging ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-2">
          <GripVertical className="h-5 w-5 text-slate-400 cursor-grab" />
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleComplete}
            className="mt-1 transition-all duration-300 hover:scale-110"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className={`font-medium ${
                task.completed ? "line-through text-slate-500 dark:text-slate-400" : ""
              } transition-all duration-300`}
            >
              {task.title}
            </h3>

            {category && (
              <motion.span
                whileHover={{ scale: 1.1 }}
                className={`text-xs px-2 py-0.5 rounded-full ${category.color} bg-opacity-20 dark:bg-opacity-30`}
              >
                {category.name}
              </motion.span>
            )}

            <motion.span
              whileHover={{ scale: 1.1 }}
              animate={{ scale: isPulsing && task.priority === "high" && !task.completed ? 1.1 : 1 }}
              className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}
            >
              {t(task.priority as TranslationKey)}
            </motion.span>
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

        <motion.div
          className="flex items-center space-x-1"
          style={{ z: 10, transformStyle: "preserve-3d", translateZ: isHovered ? 20 : 0 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsShareDialogOpen(true)}
            className="h-8 w-8 transition-all duration-300 hover:scale-110 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Share2 className="h-4 w-4" />
            <span className="sr-only">{t("share")}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEditClick(task)}
            className="h-8 w-8 transition-all duration-300 hover:scale-110 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">{t("edit")}</span>
          </Button>

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300 hover:scale-110 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">{t("delete")}</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border border-slate-200 dark:border-slate-700 shadow-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>{t("deleteTask")}</AlertDialogTitle>
                <AlertDialogDescription>{t("deleteTaskConfirmation")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDeleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-105"
                >
                  {t("delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>
      </div>

      <ShareTaskDialog
        task={task}
        category={category}
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        language={language}
      />
    </motion.div>
  )
}
