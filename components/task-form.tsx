"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { PlusCircle, Clock, AlertCircle, CalendarIcon, Tag, Timer, Paperclip, Save } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import type { Task, Category } from "@/components/daily-planner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

interface TaskFormProps {
  onAddTask: (task: Task) => void
  categories: Category[]
  selectedDate: Date
  language: string
}

export function TaskForm({ onAddTask, categories, selectedDate, language }: TaskFormProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [date, setDate] = useState<Date>(selectedDate)
  const [time, setTime] = useState("")
  const [errors, setErrors] = useState<{ title?: string; category?: string }>({})
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [estimatedMinutes, setEstimatedMinutes] = useState(30)
  const [attachmentName, setAttachmentName] = useState("")
  const [formTab, setFormTab] = useState("basic")
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  const t = (key: TranslationKey) => getTranslation(language, key)

  // Set default category when categories change or on initial load
  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0].id)
    }
  }, [categories, category])

  // Update date when selectedDate changes
  useEffect(() => {
    setDate(selectedDate)
  }, [selectedDate])

  const validateForm = () => {
    const newErrors: { title?: string; category?: string } = {}

    if (!title.trim()) {
      newErrors.title = t("titleRequired")
    }

    if (!category) {
      newErrors.category = t("categoryRequired")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      category,
      priority,
      date,
      time,
      tags: tags.length > 0 ? tags : undefined,
      estimatedMinutes: estimatedMinutes > 0 ? estimatedMinutes : undefined,
      attachment: attachmentName ? attachmentName : undefined,
    }

    onAddTask(newTask)

    // Show success toast
    toast({
      title: t("taskAdded"),
      description: title,
      variant: "success",
    })

    // Reset form
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    if (categories.length > 0) {
      setCategory(categories[0].id)
    }
    setPriority("medium")
    setDate(selectedDate)
    setTime("")
    setTags([])
    setNewTag("")
    setEstimatedMinutes(30)
    setAttachmentName("")
    setErrors({})
    setIsExpanded(false)
    setFormTab("basic")
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault()
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()])
      }
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleQuickTemplate = (template: string) => {
    switch (template) {
      case "meeting":
        setTitle(t("meetingTemplate"))
        setDescription(t("meetingDescription"))
        setPriority("medium")
        setTags(["meeting", "work"])
        setEstimatedMinutes(60)
        break
      case "deadline":
        setTitle(t("deadlineTemplate"))
        setPriority("high")
        setTags(["deadline", "important"])
        break
      case "personal":
        setTitle(t("personalTemplate"))
        setPriority("low")
        setTags(["personal"])
        break
    }
  }

  return (
    <div className="mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(true)}
            className="flex items-center w-full text-left text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors p-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 btn-3d"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            {t("addTask")}
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{t("addTask")}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleQuickTemplate("meeting")} className="text-xs">
                  {t("meetingTemplate")}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleQuickTemplate("deadline")} className="text-xs">
                  {t("deadlineTemplate")}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleQuickTemplate("personal")} className="text-xs">
                  {t("personalTemplate")}
                </Button>
              </div>
            </div>

            <Tabs value={formTab} onValueChange={setFormTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="basic">{t("basicInfo")}</TabsTrigger>
                <TabsTrigger value="advanced">{t("advancedOptions")}</TabsTrigger>
              </TabsList>
            </Tabs>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {formTab === "basic" ? (
                <>
                  <div className="space-y-1">
                    <Input
                      type="text"
                      placeholder={t("taskTitle")}
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value)
                        if (e.target.value.trim()) {
                          setErrors({ ...errors, title: undefined })
                        }
                      }}
                      className={`w-full ${errors.title ? "border-red-500 dark:border-red-500" : ""}`}
                      autoFocus
                    />
                    {errors.title && (
                      <div className="text-red-500 text-xs flex items-center mt-1">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.title}
                      </div>
                    )}
                  </div>

                  <Textarea
                    placeholder={t("taskDescription")}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full resize-none"
                    rows={2}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Select
                        value={category}
                        onValueChange={(value) => {
                          setCategory(value)
                          setErrors({ ...errors, category: undefined })
                        }}
                      >
                        <SelectTrigger className={errors.category ? "border-red-500 dark:border-red-500" : ""}>
                          <SelectValue placeholder={t("category")} />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              <div className="flex items-center">
                                <div className={`w-3 h-3 rounded-full ${cat.color} mr-2`} />
                                {cat.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <div className="text-red-500 text-xs flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.category}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm text-muted-foreground">{t("priority")}</label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={priority === "low" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPriority("low")}
                          className={`flex-1 ${priority === "low" ? "bg-green-500 hover:bg-green-600" : ""}`}
                        >
                          {t("low")}
                        </Button>
                        <Button
                          type="button"
                          variant={priority === "medium" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPriority("medium")}
                          className={`flex-1 ${priority === "medium" ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                        >
                          {t("medium")}
                        </Button>
                        <Button
                          type="button"
                          variant={priority === "high" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPriority("high")}
                          className={`flex-1 ${priority === "high" ? "bg-red-500 hover:bg-red-600" : ""}`}
                        >
                          {t("high")}
                        </Button>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : t("pickDate")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(date) => date && setDate(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 w-full md:w-1/3">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="flex-1"
                        placeholder={t("time")}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("tags")}</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-2 py-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-xs rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 h-4 w-4 inline-flex items-center justify-center"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Tag className="h-4 w-4 text-slate-500 mt-2.5" />
                      <Input
                        type="text"
                        placeholder={t("addTag")}
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleAddTag}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{t("pressEnterToAddTag")}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("estimatedTime")}</label>
                    <div className="flex items-center gap-4">
                      <Timer className="h-4 w-4 text-slate-500" />
                      <div className="flex-1">
                        <Slider
                          value={[estimatedMinutes]}
                          min={5}
                          max={180}
                          step={5}
                          onValueChange={(value) => setEstimatedMinutes(value[0])}
                        />
                      </div>
                      <span className="w-16 text-right">
                        {estimatedMinutes} {t("minutes")}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("attachment")}</label>
                    <div className="flex gap-2">
                      <Paperclip className="h-4 w-4 text-slate-500 mt-2.5" />
                      <Input
                        type="text"
                        placeholder={t("attachmentName")}
                        value={attachmentName}
                        onChange={(e) => setAttachmentName(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {t("save")}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
