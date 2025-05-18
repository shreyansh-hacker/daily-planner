"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect, useCallback } from "react"
import { Calendar, CheckCircle2, ListTodo, BarChart, CuboidIcon as Cube, Keyboard } from "lucide-react"
import { TaskDragDropList } from "@/components/task-drag-drop-list"
import { TaskForm } from "@/components/task-form"
import { TaskStats } from "@/components/task-stats"
import { CategoryList } from "@/components/category-list"
import { DateDisplay } from "@/components/date-display"
import { SearchBar } from "@/components/search-bar"
import { TaskFilters, type FilterOption, type SortOption, type SortDirection } from "@/components/task-filters"
import { ThreeDAnalyticsView } from "@/components/3d-analytics-view"
import { ThreeDTaskVisualization } from "@/components/3d-task-visualization"
import { VoiceInput } from "@/components/voice-input"
import { NotificationManager } from "@/components/notification-manager"
import { LanguageSelector } from "@/components/language-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { OnboardingTour } from "@/components/onboarding-tour"
import { WelcomeButton } from "@/components/welcome-button"
import { KeyboardShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"
import { ProductivityTipsDialog } from "@/components/productivity-tips-dialog"
import { useMediaQuery } from "@/hooks/use-media-query"
import { AnimatedButton } from "@/components/animated-button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTranslation, type TranslationKey } from "@/lib/translations"
import { format, isToday, isFuture, addDays } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"

export type Task = {
  id: string
  title: string
  description?: string
  completed: boolean
  category: string
  priority: "low" | "medium" | "high"
  date: Date
  time?: string
  tags?: string[]
  estimatedMinutes?: number
  attachment?: string
}

export type Category = {
  id: string
  name: string
  color: string
}

// Initial categories
const defaultCategories: Category[] = [
  { id: "work", name: "Work", color: "bg-blue-500" },
  { id: "personal", name: "Personal", color: "bg-green-500" },
  { id: "health", name: "Health", color: "bg-red-500" },
  { id: "learning", name: "Learning", color: "bg-purple-500" },
  { id: "errands", name: "Errands", color: "bg-yellow-500" },
]

export function DailyPlanner() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showCompleted, setShowCompleted] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOption, setFilterOption] = useState<FilterOption>("all")
  const [sortOption, setSortOption] = useState<SortOption>("priority")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [activeTab, setActiveTab] = useState<"tasks" | "analytics" | "3d">("tasks")
  const [language, setLanguage] = useState<string>("en")
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [showProductivityTips, setShowProductivityTips] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { toast } = useToast()
  const { setTheme, theme } = useTheme()

  // Translate function
  const t = (key: TranslationKey) => getTranslation(language, key)

  // Define reorderTasks with useCallback before it's used in useEffect
  const reorderTasks = useCallback((reorderedTasks: Task[]) => {
    setTasks(reorderedTasks)
  }, [])

  // Filter tasks based on active category, selected date, search query, and filter option
  const filteredTasks = tasks.filter((task) => {
    // Category filter
    const matchesCategory = activeCategory === "all" || task.category === activeCategory

    // Date filter based on filter option
    let matchesDateFilter = true
    if (filterOption === "today") {
      matchesDateFilter = isToday(new Date(task.date))
    } else if (filterOption === "upcoming") {
      matchesDateFilter = isFuture(new Date(task.date))
    } else if (filterOption === "completed") {
      matchesDateFilter = task.completed
    } else if (filterOption === "incomplete") {
      matchesDateFilter = !task.completed
    } else {
      // "all" filter - use selected date from calendar
      matchesDateFilter = format(new Date(task.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
    }

    // Completion status filter
    const matchesCompletionStatus = showCompleted || !task.completed

    // Search query filter - now also searches in tags
    const matchesSearchQuery =
      searchQuery === "" ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.tags && task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    return matchesCategory && matchesDateFilter && matchesCompletionStatus && matchesSearchQuery
  })

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }

    // Then sort by the selected sort option
    if (sortOption === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      const result = priorityOrder[a.priority] - priorityOrder[b.priority]
      return sortDirection === "asc" ? result : -result
    } else if (sortOption === "date") {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else if (sortOption === "alphabetical") {
      const result = a.title.localeCompare(b.title)
      return sortDirection === "asc" ? result : -result
    } else if (sortOption === "category") {
      const result = a.category.localeCompare(b.category)
      return sortDirection === "asc" ? result : -result
    }

    return 0
  })

  // Load tasks, categories, and preferences from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks)
        // Convert date strings back to Date objects
        const tasksWithDates = parsedTasks.map((task: any) => ({
          ...task,
          date: new Date(task.date),
        }))
        setTasks(tasksWithDates)
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error)
      }
    }

    const savedCategories = localStorage.getItem("categories")
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories))
      } catch (error) {
        console.error("Error parsing categories from localStorage:", error)
      }
    }

    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }

    // Check if onboarding has been completed
    const onboardingComplete = localStorage.getItem("onboardingComplete")
    if (onboardingComplete !== "true") {
      // Show onboarding after a short delay
      setTimeout(() => {
        setShowOnboarding(true)
      }, 1000)
    }

    // Show a welcome back message if returning after a day
    const lastVisit = localStorage.getItem("lastVisit")
    if (lastVisit) {
      const lastVisitDate = new Date(lastVisit)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - lastVisitDate.getTime())
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays >= 1) {
        // Show welcome back toast
        setTimeout(() => {
          toast({
            title: t("welcomeBack"),
            description: t("welcomeBackMessage"),
          })
        }, 1500)
      }
    }

    // Update last visit time
    localStorage.setItem("lastVisit", new Date().toISOString())
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  // Save language preference
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields or when modifiers are pressed (except for specific combinations)
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        isSearchFocused ||
        (e.altKey && e.key !== "/") ||
        (e.metaKey && e.key !== "/") ||
        (e.shiftKey && !["ArrowUp", "ArrowDown"].includes(e.key))
      ) {
        return
      }

      // Global shortcuts
      switch (e.key) {
        case "?":
          e.preventDefault()
          setShowKeyboardShortcuts(true)
          break
        case "Escape":
          e.preventDefault()
          if (showKeyboardShortcuts) setShowKeyboardShortcuts(false)
          if (showProductivityTips) setShowProductivityTips(false)
          if (showOnboarding) setShowOnboarding(false)
          break
        case "/":
          e.preventDefault()
          document.querySelector<HTMLInputElement>('input[type="search"]')?.focus()
          break
        case "F1":
          e.preventDefault()
          setShowOnboarding(true)
          break
      }

      // Ctrl key combinations
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "/":
            e.preventDefault()
            setTheme(theme === "dark" ? "light" : "dark")
            break
          case "ArrowUp":
            if (selectedTaskId) {
              e.preventDefault()
              const currentIndex = sortedTasks.findIndex((task) => task.id === selectedTaskId)
              if (currentIndex > 0) {
                const newTasks = [...tasks]
                const taskToMove = newTasks.find((task) => task.id === sortedTasks[currentIndex].id)
                const targetTask = newTasks.find((task) => task.id === sortedTasks[currentIndex - 1].id)

                if (taskToMove && targetTask) {
                  const taskToMoveIndex = newTasks.indexOf(taskToMove)
                  const targetIndex = newTasks.indexOf(targetTask)
                  newTasks.splice(taskToMoveIndex, 1)
                  newTasks.splice(targetIndex, 0, taskToMove)
                  reorderTasks(newTasks)
                }
              }
            }
            break
          case "ArrowDown":
            if (selectedTaskId) {
              e.preventDefault()
              const currentIndex = sortedTasks.findIndex((task) => task.id === selectedTaskId)
              if (currentIndex < sortedTasks.length - 1) {
                const newTasks = [...tasks]
                const taskToMove = newTasks.find((task) => task.id === sortedTasks[currentIndex].id)
                const targetTask = newTasks.find((task) => task.id === sortedTasks[currentIndex + 1].id)

                if (taskToMove && targetTask) {
                  const taskToMoveIndex = newTasks.indexOf(taskToMove)
                  const targetIndex = newTasks.indexOf(targetTask)
                  newTasks.splice(taskToMoveIndex, 1)
                  newTasks.splice(targetIndex, 0, taskToMove)
                  reorderTasks(newTasks)
                }
              }
            }
            break
        }
      }

      // View switching and other shortcuts (only when no modifier keys are pressed)
      if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {
        switch (e.key) {
          case "1":
            e.preventDefault()
            setActiveTab("tasks")
            break
          case "2":
            e.preventDefault()
            setActiveTab("analytics")
            break
          case "3":
            e.preventDefault()
            setActiveTab("3d")
            break
          case "n":
          case "N":
            e.preventDefault()
            // Focus the task form
            document.querySelector<HTMLInputElement>(".task-form input")?.focus()
            break
          case "h":
          case "H":
            e.preventDefault()
            setShowCompleted(!showCompleted)
            break
          case "f":
          case "F":
            e.preventDefault()
            // Toggle filter dropdown
            document.querySelector<HTMLButtonElement>('[data-filter-trigger="true"]')?.click()
            break
          case "s":
          case "S":
            e.preventDefault()
            // Toggle sort dropdown
            document.querySelector<HTMLButtonElement>('[data-sort-trigger="true"]')?.click()
            break
          case "ArrowUp":
            if (selectedTaskId) {
              e.preventDefault()
              const currentIndex = sortedTasks.findIndex((task) => task.id === selectedTaskId)
              if (currentIndex > 0) {
                setSelectedTaskId(sortedTasks[currentIndex - 1].id)
              }
            } else if (sortedTasks.length > 0) {
              setSelectedTaskId(sortedTasks[0].id)
            }
            break
          case "ArrowDown":
            if (selectedTaskId) {
              e.preventDefault()
              const currentIndex = sortedTasks.findIndex((task) => task.id === selectedTaskId)
              if (currentIndex < sortedTasks.length - 1) {
                setSelectedTaskId(sortedTasks[currentIndex + 1].id)
              }
            } else if (sortedTasks.length > 0) {
              setSelectedTaskId(sortedTasks[0].id)
            }
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [
    showKeyboardShortcuts,
    showProductivityTips,
    showOnboarding,
    isSearchFocused,
    showCompleted,
    theme,
    selectedTaskId,
    tasks,
    reorderTasks,
    setTheme,
    sortedTasks,
  ])

  const addTask = (task: Task) => {
    setTasks([...tasks, task])

    // Show success toast
    toast({
      title: t("taskAdded"),
      description: task.title,
      variant: "success",
    })
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))

    // Show success toast
    toast({
      title: t("taskUpdated"),
      description: updatedTask.title,
    })
  }

  const deleteTask = (taskId: string) => {
    const taskToDelete = tasks.find((task) => task.id === taskId)
    setTasks(tasks.filter((task) => task.id !== taskId))

    // Show success toast
    if (taskToDelete) {
      toast({
        title: t("taskDeleted"),
        description: taskToDelete.title,
      })
    }
  }

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const newCompletedState = !task.completed

          // Show toast only when completing a task
          if (newCompletedState) {
            toast({
              title: t("taskCompleted"),
              description: task.title,
              variant: "success",
            })
          }

          return { ...task, completed: newCompletedState }
        }
        return task
      }),
    )
  }

  const addCategory = (category: Category) => {
    setCategories([...categories, category])

    // Show success toast
    toast({
      title: t("categoryAdded"),
      description: category.name,
    })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (filter: FilterOption) => {
    setFilterOption(filter)
  }

  const handleSortChange = (sort: SortOption, direction: SortDirection) => {
    setSortOption(sort)
    setSortDirection(direction)
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  const handleShowWelcomeTour = useCallback(() => {
    // Force the onboarding tour to be visible
    setShowOnboarding(true)
    console.log("Welcome tour triggered, showOnboarding set to true")
  }, [])

  const handleShowKeyboardShortcuts = useCallback(() => {
    setShowKeyboardShortcuts(true)
  }, [])

  const handleShowProductivityTips = useCallback(() => {
    setShowProductivityTips(true)
  }, [])

  // Quick add task for tomorrow
  const addTaskForTomorrow = useCallback(() => {
    const tomorrow = addDays(new Date(), 1)
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: t("tomorrowTask"),
      description: "",
      completed: false,
      category: categories[0]?.id || "work",
      priority: "medium",
      date: tomorrow,
    }

    addTask(newTask)
  }, [categories, addTask])

  // Calculate task statistics
  const totalTasks = filteredTasks.length
  const completedTasks = filteredTasks.filter((task) => task.completed).length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const sidebar = (
    <div className="flex flex-col h-full">
      <DateDisplay selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <div className="mt-6 category-list">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <ListTodo className="mr-2 h-5 w-5" />
          {t("category")}
        </h2>
        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
          onAddCategory={addCategory}
          language={language}
        />
      </div>

      <TaskStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        completionRate={completionRate}
        className="mt-auto mb-6 task-stats"
        language={language}
      />

      <div className="mt-2">
        <Button variant="outline" size="sm" onClick={addTaskForTomorrow} className="w-full flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {t("addTaskForTomorrow")}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Toaster />
      <motion.div
        className="flex flex-col md:flex-row gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isMobile ? (
          <Sheet>
            <div className="flex items-center justify-between mb-4">
              <motion.h1
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t("appTitle")}
              </motion.h1>
              <div className="flex items-center gap-2">
                <WelcomeButton
                  onClick={handleShowWelcomeTour}
                  language={language}
                  onShowKeyboardShortcuts={handleShowKeyboardShortcuts}
                  onShowTips={handleShowProductivityTips}
                />
                <LanguageSelector onLanguageChange={handleLanguageChange} currentLanguage={language} />
                <ThemeToggle language={language} />
                <SheetTrigger asChild>
                  <AnimatedButton variant="outline" size="icon">
                    <Calendar className="h-5 w-5" />
                  </AnimatedButton>
                </SheetTrigger>
              </div>
            </div>
            <SheetContent side="left" className="w-[280px]">
              {sidebar}
            </SheetContent>
          </Sheet>
        ) : (
          <motion.div
            className="w-64 shrink-0 p-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 perspective-1000"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                {t("appTitle")}
              </h1>
              <ThemeToggle language={language} />
            </div>
            {sidebar}
          </motion.div>
        )}

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4 perspective-1000">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center">
                <motion.h2
                  className="text-xl font-semibold flex items-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {activeTab === "tasks" ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                      <span className="bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 text-transparent bg-clip-text">
                        {t("tasks")} {format(selectedDate, "PPP")}
                      </span>
                    </>
                  ) : activeTab === "analytics" ? (
                    <>
                      <BarChart className="mr-2 h-5 w-5 text-blue-500" />
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
                        {t("analytics")}
                      </span>
                    </>
                  ) : (
                    <>
                      <Cube className="mr-2 h-5 w-5 text-purple-500" />
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                        {t("3dTaskVisualization")}
                      </span>
                    </>
                  )}
                </motion.h2>
                <div className="flex items-center gap-2">
                  {!isMobile && (
                    <WelcomeButton
                      onClick={handleShowWelcomeTour}
                      language={language}
                      onShowKeyboardShortcuts={handleShowKeyboardShortcuts}
                      onShowTips={handleShowProductivityTips}
                    />
                  )}
                  {!isMobile && <LanguageSelector onLanguageChange={handleLanguageChange} currentLanguage={language} />}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleShowKeyboardShortcuts}
                    className="hidden md:flex"
                    title={t("keyboardShortcuts")}
                  >
                    <Keyboard className="h-4 w-4" />
                  </Button>
                  <NotificationManager tasks={tasks} language={language} />
                </div>
              </div>

              <Tabs defaultValue="tasks" onValueChange={(value) => setActiveTab(value as "tasks" | "analytics" | "3d")}>
                <div className="flex justify-between items-center">
                  <TabsList className="bg-slate-100 dark:bg-slate-800">
                    <TabsTrigger
                      value="tasks"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                    >
                      {t("all")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="analytics"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 analytics-tab"
                    >
                      {t("analytics")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="3d"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700"
                    >
                      3D
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex items-center gap-2">
                    <VoiceInput onAddTask={addTask} language={language} categories={categories} />
                    {activeTab === "tasks" && (
                      <AnimatedButton
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCompleted(!showCompleted)}
                        className="text-sm"
                      >
                        {showCompleted ? t("hideCompleted") : t("showCompleted")}
                      </AnimatedButton>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <SearchBar onSearch={handleSearch} language={language} onFocusChange={setIsSearchFocused} />
                </div>

                <div className="mt-4">
                  <TaskFilters
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                    currentFilter={filterOption}
                    currentSort={sortOption}
                    currentSortDirection={sortDirection}
                    language={language}
                  />
                </div>

                <TabsContent value="tasks" className="mt-4">
                  <div className="task-form">
                    <TaskForm
                      onAddTask={addTask}
                      categories={categories}
                      selectedDate={selectedDate}
                      language={language}
                    />
                  </div>

                  <TaskDragDropList
                    tasks={sortedTasks}
                    categories={categories}
                    onToggleComplete={toggleTaskCompletion}
                    onUpdateTask={updateTask}
                    onDeleteTask={deleteTask}
                    onReorderTasks={reorderTasks}
                    language={language}
                    onSelectTask={setSelectedTaskId}
                    selectedTaskId={selectedTaskId}
                  />
                </TabsContent>

                <TabsContent value="analytics" className="mt-4">
                  <ThreeDAnalyticsView tasks={tasks} language={language} />
                </TabsContent>

                <TabsContent value="3d" className="mt-4">
                  <ThreeDTaskVisualization tasks={tasks} language={language} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showOnboarding && <OnboardingTour language={language} onComplete={handleOnboardingComplete} />}
      </AnimatePresence>

      <KeyboardShortcutsDialog
        isOpen={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
        language={language}
      />

      <ProductivityTipsDialog
        isOpen={showProductivityTips}
        onClose={() => setShowProductivityTips(false)}
        language={language}
      />
    </div>
  )
}
