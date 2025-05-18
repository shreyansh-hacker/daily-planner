"use client"

import { useState, useRef, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import type { Task } from "@/components/daily-planner"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"
import { motion } from "framer-motion"

interface ThreeDAnalyticsViewProps {
  tasks: Task[]
  language: string
}

export function ThreeDAnalyticsView({ tasks, language }: ThreeDAnalyticsViewProps) {
  const t = (key: TranslationKey) => getTranslation(language, key)
  const [timeRange, setTimeRange] = useState<"week" | "month">("week")
  const [chartHover, setChartHover] = useState<number | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  // Get current week's date range
  const today = new Date()
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 })
  const endOfCurrentWeek = endOfWeek(today, { weekStartsOn: 1 })

  // Get days of the week
  const daysOfWeek = eachDayOfInterval({
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  })

  // Prepare data for the weekly chart
  const weeklyData = daysOfWeek.map((day) => {
    const dayTasks = tasks.filter((task) => {
      const taskDate = new Date(task.date)
      return taskDate.toDateString() === day.toDateString()
    })

    const completed = dayTasks.filter((task) => task.completed).length
    const incomplete = dayTasks.filter((task) => !task.completed).length

    return {
      name: format(day, "EEE"),
      completed,
      incomplete,
      total: dayTasks.length,
    }
  })

  // Prepare data for the category pie chart
  const categoryData = tasks.reduce((acc: any[], task) => {
    const existingCategory = acc.find((item) => item.name === task.category)
    if (existingCategory) {
      existingCategory.value++
    } else {
      acc.push({ name: task.category, value: 1 })
    }
    return acc
  }, [])

  // Prepare data for the priority pie chart
  const priorityData = [
    { name: t("high"), value: tasks.filter((task) => task.priority === "high").length },
    { name: t("medium"), value: tasks.filter((task) => task.priority === "medium").length },
    { name: t("low"), value: tasks.filter((task) => task.priority === "low").length },
  ]

  // Colors for the charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  // 3D tilt effect
  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = chart.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateY = ((x - centerX) / centerX) * 5
      const rotateX = ((centerY - y) / centerY) * 5

      chart.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const handleMouseLeave = () => {
      chart.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }

    chart.addEventListener("mousemove", handleMouseMove)
    chart.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      chart.removeEventListener("mousemove", handleMouseMove)
      chart.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{t("analytics")}</CardTitle>
        <CardDescription>{t("progress")}</CardDescription>
        <Tabs defaultValue="week" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="week" onClick={() => setTimeRange("week")}>
              {t("today")}
            </TabsTrigger>
            <TabsTrigger value="month" onClick={() => setTimeRange("month")}>
              {t("upcoming")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-8" ref={chartRef} style={{ transition: "transform 0.3s ease-out" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-lg font-medium mb-2">
              {t("completedTasks")} {t("progress")}
            </h3>
            <div className="h-64 rounded-lg overflow-hidden shadow-inner bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      border: "none",
                    }}
                  />
                  <Bar
                    dataKey="completed"
                    stackId="a"
                    fill="#8884d8"
                    name={t("completed")}
                    animationDuration={1500}
                    animationEasing="ease-out"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="incomplete"
                    stackId="a"
                    fill="#82ca9d"
                    name={t("incomplete")}
                    animationDuration={1500}
                    animationEasing="ease-out"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-4"
            >
              <h3 className="text-lg font-medium mb-2">
                {t("category")} {t("distribution")}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "none",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-4"
            >
              <h3 className="text-lg font-medium mb-2">
                {t("priority")} {t("distribution")}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priorityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    >
                      <Cell fill="#ef4444" stroke="rgba(255,255,255,0.3)" strokeWidth={2} /> {/* High - Red */}
                      <Cell fill="#f97316" stroke="rgba(255,255,255,0.3)" strokeWidth={2} /> {/* Medium - Orange */}
                      <Cell fill="#22c55e" stroke="rgba(255,255,255,0.3)" strokeWidth={2} /> {/* Low - Green */}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "none",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
