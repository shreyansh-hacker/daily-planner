"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { Category } from "@/components/daily-planner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from "uuid"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type TranslationKey, getTranslation } from "@/lib/translations"

interface CategoryListProps {
  categories: Category[]
  activeCategory: string
  onCategorySelect: (categoryId: string) => void
  onAddCategory: (category: Category) => void
  language: string
}

export function CategoryList({
  categories,
  activeCategory,
  onCategorySelect,
  onAddCategory,
  language,
}: CategoryListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [selectedColor, setSelectedColor] = useState("bg-blue-500")
  const t = (key: TranslationKey) => getTranslation(language, key)

  const colorOptions = [
    { value: "bg-blue-500", label: "Blue" },
    { value: "bg-green-500", label: "Green" },
    { value: "bg-red-500", label: "Red" },
    { value: "bg-yellow-500", label: "Yellow" },
    { value: "bg-purple-500", label: "Purple" },
    { value: "bg-pink-500", label: "Pink" },
    { value: "bg-indigo-500", label: "Indigo" },
    { value: "bg-orange-500", label: "Orange" },
  ]

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return

    const newCategory: Category = {
      id: uuidv4(),
      name: newCategoryName.trim(),
      color: selectedColor,
    }

    onAddCategory(newCategory)
    setNewCategoryName("")
    setSelectedColor("bg-blue-500")
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-2">
      <div
        className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
          activeCategory === "all" ? "bg-slate-200 dark:bg-slate-700" : "hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
        onClick={() => onCategorySelect("all")}
      >
        <div className="w-3 h-3 rounded-full bg-slate-400 mr-2" />
        <span>{t("all")}</span>
      </div>

      {categories.map((category) => (
        <div
          key={category.id}
          className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
            activeCategory === category.id
              ? "bg-slate-200 dark:bg-slate-700"
              : "hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
          onClick={() => onCategorySelect(category.id)}
        >
          <div className={`w-3 h-3 rounded-full ${category.color} mr-2`} />
          <span>{t(category.id as TranslationKey) || category.name}</span>
        </div>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("addCategory")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("addCategory")}</DialogTitle>
            <DialogDescription>{t("categoryName")}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                {t("categoryName")}
              </label>
              <Input
                id="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder={t("categoryName")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("color")}</label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((color) => (
                  <div
                    key={color.value}
                    className={`w-full h-8 rounded-md cursor-pointer ${color.value} ${
                      selectedColor === color.value ? "ring-2 ring-offset-2 ring-slate-500" : ""
                    }`}
                    onClick={() => setSelectedColor(color.value)}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={handleAddCategory}>{t("save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
