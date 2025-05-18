"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import { motion } from "framer-motion"
import { Clock, ListTodo, Calendar, Mic, Tag, BarChart, Share2, Lightbulb } from "lucide-react"

interface ProductivityTipsDialogProps {
  isOpen: boolean
  onClose: () => void
  language: string
}

export function ProductivityTipsDialog({ isOpen, onClose, language }: ProductivityTipsDialogProps) {
  const t = (key: TranslationKey) => getTranslation(language, key)

  const tips = [
    {
      title: t("timeBlockingTip"),
      description: t("timeBlockingDescription"),
      icon: <Clock className="h-5 w-5 text-blue-500" />,
    },
    {
      title: t("categoriesTip"),
      description: t("categoriesDescription"),
      icon: <ListTodo className="h-5 w-5 text-green-500" />,
    },
    {
      title: t("planAheadTip"),
      description: t("planAheadDescription"),
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
    },
    {
      title: t("voiceInputTip"),
      description: t("voiceInputDescription"),
      icon: <Mic className="h-5 w-5 text-red-500" />,
    },
    {
      title: t("tagsTip"),
      description: t("tagsDescription"),
      icon: <Tag className="h-5 w-5 text-orange-500" />,
    },
    {
      title: t("analyticsTip"),
      description: t("analyticsDescription"),
      icon: <BarChart className="h-5 w-5 text-indigo-500" />,
    },
    {
      title: t("shareTip"),
      description: t("shareDescription"),
      icon: <Share2 className="h-5 w-5 text-pink-500" />,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            {t("productivityTips")}
          </DialogTitle>
          <DialogDescription>{t("productivityTipsDescription")}</DialogDescription>
        </DialogHeader>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {tips.map((tip, index) => (
            <motion.div key={index} variants={item}>
              <Card className="p-4 h-full border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="flex gap-3">
                  <div className="mt-1">{tip.icon}</div>
                  <div>
                    <h3 className="font-medium mb-1">{tip.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{tip.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <DialogFooter>
          <Button onClick={onClose}>{t("close")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
