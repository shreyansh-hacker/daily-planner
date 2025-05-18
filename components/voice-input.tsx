"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import { v4 as uuidv4 } from "uuid"
import type { Task } from "@/components/daily-planner"

interface VoiceInputProps {
  onAddTask: (task: Task) => void
  language: string
  categories: { id: string; name: string; color: string }[]
}

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function VoiceInput({ onAddTask, language, categories }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const { toast } = useToast()
  const t = (key: TranslationKey) => getTranslation(language, key)

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang =
        language === "hi"
          ? "hi-IN"
          : language === "es"
            ? "es-ES"
            : language === "fr"
              ? "fr-FR"
              : language === "de"
                ? "de-DE"
                : "en-US"

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex
        const transcriptText = event.results[current][0].transcript
        setTranscript(transcriptText)
      }

      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start()
        }
      }

      setRecognition(recognitionInstance)
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [language])

  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser does not support speech recognition.",
        variant: "destructive",
      })
      return
    }

    if (isListening) {
      recognition.stop()
      setIsListening(false)

      if (transcript) {
        processVoiceCommand(transcript)
      }
    } else {
      setTranscript("")
      recognition.start()
      setIsListening(true)

      toast({
        title: t("listeningForTask"),
        description: t("addTaskVoice"),
      })
    }
  }

  const processVoiceCommand = (text: string) => {
    // Simple parsing logic - can be enhanced for more complex commands
    let title = text
    let priority: "low" | "medium" | "high" = "medium"
    let category = categories[0]?.id || ""

    // Check for priority keywords
    if (text.toLowerCase().includes("high priority") || text.toLowerCase().includes("important")) {
      priority = "high"
      title = title.replace(/high priority|important/gi, "").trim()
    } else if (text.toLowerCase().includes("low priority")) {
      priority = "low"
      title = title.replace(/low priority/gi, "").trim()
    }

    // Check for category keywords
    for (const cat of categories) {
      if (text.toLowerCase().includes(cat.name.toLowerCase())) {
        category = cat.id
        title = title.replace(new RegExp(cat.name, "gi"), "").trim()
        break
      }
    }

    // Create the task
    const newTask: Task = {
      id: uuidv4(),
      title,
      description: "",
      completed: false,
      category,
      priority,
      date: new Date(),
    }

    onAddTask(newTask)

    toast({
      title: t("taskAdded"),
      description: title,
    })
  }

  return (
    <div>
      <Button
        variant={isListening ? "destructive" : "outline"}
        size="icon"
        onClick={toggleListening}
        className="relative"
      >
        {isListening ? (
          <>
            <MicOff className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </>
        ) : (
          <Mic className="h-4 w-4" />
        )}
        <span className="sr-only">{isListening ? t("stopListening") : t("addTaskVoice")}</span>
      </Button>

      {isListening && transcript && (
        <div className="mt-2 p-2 bg-slate-100 dark:bg-slate-800 rounded text-sm">{transcript}</div>
      )}
    </div>
  )
}
