"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { X, ArrowRight, ArrowLeft, CheckCircle, SkipForward, Lightbulb, Sparkles } from "lucide-react"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import confetti from "canvas-confetti"

interface StepData {
  title: string
  description: string
  image?: string
  highlight?: string
  icon: React.ReactNode
  showImage: boolean
  imageSize?: "small" | "medium" | "large"
}

interface OnboardingTourProps {
  language: string
  onComplete: () => void
}

export function OnboardingTour({ language, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const t = (key: TranslationKey) => getTranslation(language, key)

  // Define steps
  const steps: StepData[] = [
    {
      title: t("welcomeToPlanner"),
      description: t("welcomeToPlannerDescription"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20May%2018%2C%202025%2C%2005_33_15%20PM-zLVaDhtfDxr74vKYvVo7FrSgEvFwHy.png",
      icon: <Sparkles className="h-6 w-6 text-yellow-500" />,
      showImage: true,
      imageSize: "medium",
    },
    {
      title: t("addTasks"),
      description: t("addTasksDescription"),
      highlight: ".task-form",
      icon: <ArrowRight className="h-6 w-6 text-blue-500" />,
      showImage: false,
    },
    {
      title: t("organizeTasks"),
      description: t("organizeTasksDescription"),
      highlight: ".category-list",
      icon: <ArrowRight className="h-6 w-6 text-green-500" />,
      showImage: false,
    },
    {
      title: t("trackProgress"),
      description: t("trackProgressDescription"),
      highlight: ".task-stats",
      icon: <ArrowRight className="h-6 w-6 text-purple-500" />,
      showImage: false,
    },
    {
      title: t("visualizeData"),
      description: t("visualizeDataDescription"),
      highlight: ".analytics-tab",
      icon: <ArrowRight className="h-6 w-6 text-orange-500" />,
      showImage: false,
    },
    {
      title: t("dragAndDrop"),
      description: t("dragAndDropDescription"),
      image: "/placeholder.svg?height=120&width=200&text=Drag+and+Drop",
      icon: <ArrowRight className="h-6 w-6 text-pink-500" />,
      showImage: true,
      imageSize: "small",
    },
    {
      title: t("voiceCommands"),
      description: t("voiceCommandsDescription"),
      image: "/placeholder.svg?height=120&width=200&text=Voice+Commands",
      icon: <ArrowRight className="h-6 w-6 text-red-500" />,
      showImage: true,
      imageSize: "small",
    },
    {
      title: t("darkMode"),
      description: t("darkModeDescription"),
      image: "/placeholder.svg?height=120&width=200&text=Dark+Mode",
      icon: <ArrowRight className="h-6 w-6 text-indigo-500" />,
      showImage: true,
      imageSize: "small",
    },
    {
      title: t("readyToStart"),
      description: t("readyToStartDescription"),
      image: "/placeholder.svg?height=150&width=300&text=Ready+to+Start",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      showImage: true,
      imageSize: "medium",
    },
  ]

  // Handle highlight overlay positioning
  useEffect(() => {
    const currentStepData = steps[currentStep]

    if (currentStepData.highlight && overlayRef.current) {
      const element = document.querySelector(currentStepData.highlight)
      if (element) {
        const rect = element.getBoundingClientRect()
        overlayRef.current.style.top = `${rect.top - 10}px`
        overlayRef.current.style.left = `${rect.left - 10}px`
        overlayRef.current.style.width = `${rect.width + 20}px`
        overlayRef.current.style.height = `${rect.height + 20}px`
        overlayRef.current.style.opacity = "1"
      } else {
        overlayRef.current.style.opacity = "0"
      }
    } else if (overlayRef.current) {
      overlayRef.current.style.opacity = "0"
    }

    // Trigger confetti on the last step
    if (currentStep === steps.length - 1) {
      setShowConfetti(true)
    }
  }, [currentStep])

  // Trigger confetti effect
  useEffect(() => {
    if (showConfetti) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 }

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // Since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [showConfetti])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    setCurrentStep(steps.length - 1)
  }

  const handleComplete = () => {
    setIsVisible(false)
    // Save to localStorage that onboarding is complete
    localStorage.setItem("onboardingComplete", "true")
    // Call the onComplete callback
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  const currentStepData = steps[currentStep]

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {/* Highlight element if specified */}
          {currentStepData.highlight && (
            <motion.div
              ref={overlayRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute border-2 border-primary rounded-md"
              style={{
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7)",
                zIndex: 110,
              }}
            />
          )}

          {/* Tour card - always centered */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="z-[120] w-[90%] max-w-[380px]"
          >
            <Card className="border-slate-200 dark:border-slate-700 shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: `${(currentStep / steps.length) * 100}%` }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <CardHeader className="relative pb-2">
                <div className="absolute right-2 top-2 flex gap-2">
                  {currentStep < steps.length - 1 && (
                    <Button variant="ghost" size="icon" onClick={handleSkip} title={t("skipTour")}>
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={handleComplete} title={t("closeTour")}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10">{currentStepData.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                      {t("step")} {currentStep + 1} {t("of")} {steps.length}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 max-h-[250px] overflow-y-auto">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStepData.showImage && (
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={currentStepData.image || "/placeholder.svg"}
                        alt={currentStepData.title}
                        className={`w-full h-auto rounded-md mb-4 transition-transform duration-500 hover:scale-105 ${
                          currentStepData.imageSize === "small"
                            ? "max-h-[100px] object-contain"
                            : currentStepData.imageSize === "medium"
                              ? "max-h-[120px] object-contain"
                              : "max-h-[120px] object-cover"
                        }`}
                      />
                      {currentStep === steps.length - 1 && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                          animate={{
                            opacity: [0.2, 0.5, 0.2],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                        />
                      )}
                    </div>
                  )}
                  <p className="text-sm">{currentStepData.description}</p>

                  {currentStep === 0 && (
                    <motion.div
                      className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-md flex items-start gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Lightbulb className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 dark:text-amber-200">{t("tourTip")}</p>
                    </motion.div>
                  )}
                </motion.div>

                <div className="flex justify-center">
                  {steps.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-2 h-2 mx-1 rounded-full ${
                        index === currentStep ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
                      }`}
                      whileHover={{ scale: 1.5 }}
                      onClick={() => setCurrentStep(index)}
                    />
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="transition-all duration-300 hover:translate-x-[-5px]"
                  size="sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("previous")}
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    className="transition-all duration-300 hover:translate-x-[5px]"
                    size="sm"
                  >
                    {t("next")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105"
                    size="sm"
                  >
                    {t("getStarted")}
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
