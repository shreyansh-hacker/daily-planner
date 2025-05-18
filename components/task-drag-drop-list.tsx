"use client"

import { useState, useEffect } from "react"
import type { Task, Category } from "@/components/daily-planner"
import { AnimatedTaskItem } from "@/components/animated-task-item"
import { TaskEditDialog } from "@/components/task-edit-dialog"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import { motion, AnimatePresence } from "framer-motion"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useToast } from "@/components/ui/use-toast"

interface TaskDragDropListProps {
  tasks: Task[]
  categories: Category[]
  onToggleComplete: (taskId: string) => void
  onUpdateTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onReorderTasks: (tasks: Task[]) => void
  language: string
  onSelectTask?: (taskId: string | null) => void
  selectedTaskId?: string | null
}

// Sortable wrapper component for task items
function SortableTaskItem({
  task,
  categories,
  onToggleComplete,
  onEditClick,
  onDeleteTask,
  language,
  isSelected,
  onSelect,
}: {
  task: Task
  categories: Category[]
  onToggleComplete: (taskId: string) => void
  onEditClick: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  language: string
  isSelected?: boolean
  onSelect?: (taskId: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  }

  const handleClick = () => {
    if (onSelect) {
      onSelect(task.id)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className={isSelected ? "ring-2 ring-primary ring-offset-2 rounded-lg" : ""}
    >
      <AnimatedTaskItem
        task={task}
        categories={categories}
        onToggleComplete={onToggleComplete}
        onEditClick={onEditClick}
        onDeleteTask={onDeleteTask}
        language={language}
        isDragging={isDragging}
      />
    </div>
  )
}

export function TaskDragDropList({
  tasks,
  categories,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  onReorderTasks,
  language,
  onSelectTask,
  selectedTaskId,
}: TaskDragDropListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [reorderEnabled, setReorderEnabled] = useState(true)
  const t = (key: TranslationKey) => getTranslation(language, key)
  const { toast } = useToast()

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id)
      const newIndex = tasks.findIndex((task) => task.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newTasks = arrayMove(tasks, oldIndex, newIndex)
        onReorderTasks(newTasks)

        // Show toast notification
        toast({
          title: t("taskReordered"),
          description: t("taskReorderedDescription"),
          duration: 2000,
        })
      }
    }
  }

  const handleSelectTask = (taskId: string) => {
    if (onSelectTask) {
      onSelectTask(selectedTaskId === taskId ? null : taskId)
    }
  }

  // Keyboard navigation for tasks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle keyboard events if no task is selected or if the user is typing in an input
      if (!selectedTaskId || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      const currentIndex = tasks.findIndex((task) => task.id === selectedTaskId)
      if (currentIndex === -1) return

      switch (e.key) {
        case "ArrowDown":
          if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault()
            if (currentIndex < tasks.length - 1) {
              onSelectTask?.(tasks[currentIndex + 1].id)
            }
          }
          break
        case "ArrowUp":
          if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault()
            if (currentIndex > 0) {
              onSelectTask?.(tasks[currentIndex - 1].id)
            }
          }
          break
        case " ": // Space key
          e.preventDefault()
          onToggleComplete(selectedTaskId)
          break
        case "Delete":
          e.preventDefault()
          onDeleteTask(selectedTaskId)
          break
        case "e":
        case "E":
          if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault()
            const selectedTask = tasks.find((task) => task.id === selectedTaskId)
            if (selectedTask) {
              handleEditClick(selectedTask)
            }
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedTaskId, tasks, onSelectTask, onToggleComplete, onDeleteTask])

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
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <SortableTaskItem
                    key={task.id}
                    task={task}
                    categories={categories}
                    onToggleComplete={onToggleComplete}
                    onEditClick={handleEditClick}
                    onDeleteTask={onDeleteTask}
                    language={language}
                    isSelected={task.id === selectedTaskId}
                    onSelect={handleSelectTask}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
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
