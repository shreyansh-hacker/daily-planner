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
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { QRCodeSVG } from "qrcode.react"
import { Copy, Check, Facebook, Twitter, Linkedin, Mail } from "lucide-react"
import type { Task, Category } from "@/components/daily-planner"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import { motion } from "framer-motion"

interface ShareTaskDialogProps {
  task: Task
  category?: Category
  isOpen: boolean
  onClose: () => void
  language: string
}

export function ShareTaskDialog({ task, category, isOpen, onClose, language }: ShareTaskDialogProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("link")
  const t = (key: TranslationKey) => getTranslation(language, key)

  // Create a shareable task description
  const taskDescription = `${task.title} - ${t("priority")}: ${t(task.priority as TranslationKey)}${
    category ? `, ${t("category")}: ${category.name}` : ""
  }${task.date ? `, ${t("date")}: ${new Date(task.date).toLocaleDateString()}` : ""}${task.time ? ` ${task.time}` : ""}`

  // Create a shareable link (in a real app, this would be a proper URL)
  const shareableLink = `https://daily-planner.app/share?task=${encodeURIComponent(
    JSON.stringify({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: category?.name,
      date: task.date,
      time: task.time,
    }),
  )}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSocialShare = (platform: string) => {
    let url = ""
    const text = encodeURIComponent(`Check out my task: ${taskDescription}`)

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}&quote=${text}`
        break
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareableLink)}`
        break
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableLink)}`
        break
      case "email":
        url = `mailto:?subject=${encodeURIComponent(`Shared Task: ${task.title}`)}&body=${encodeURIComponent(
          `${taskDescription}\n\nLink: ${shareableLink}`,
        )}`
        break
    }

    if (url) window.open(url, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("shareTask")}</DialogTitle>
          <DialogDescription>{t("shareTaskDescription")}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="link">{t("link")}</TabsTrigger>
            <TabsTrigger value="qr">{t("qrCode")}</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4 mt-4">
            <div className="flex space-x-2">
              <Input value={shareableLink} readOnly className="flex-1" />
              <Button size="icon" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">{t("shareVia")}</h4>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
                  onClick={() => handleSocialShare("facebook")}
                >
                  <Facebook className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center"
                  onClick={() => handleSocialShare("twitter")}
                >
                  <Twitter className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center"
                  onClick={() => handleSocialShare("linkedin")}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center"
                  onClick={() => handleSocialShare("email")}
                >
                  <Mail className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qr" className="flex flex-col items-center justify-center py-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <QRCodeSVG value={shareableLink} size={200} />
            </motion.div>
            <p className="text-sm text-center mt-4 text-muted-foreground">{t("scanQrToShare")}</p>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>{t("close")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
