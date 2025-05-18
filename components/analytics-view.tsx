"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import type { Task } from "@/components/daily-planner"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"

interface AnalyticsViewProps {
  tasks: Task[]
  language: string
}

export function AnalyticsView({ tasks, language }: AnalyticsViewProps) {
  const t = (key: TranslationKey) => getTranslation(language, key)
  const [timeRange, setTimeRange] = useState<"week" | "month">("week")

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("analytics")}</CardTitle>
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
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-2">
              {t("completedTasks")} {t("progress")}
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" stackId="a" fill="#8884d8" name={t("completed")} />
                  <Bar dataKey="incomplete" stackId="a" fill="#82ca9d" name={t("incomplete")} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
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
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
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
                    >
                      <Cell fill="#ef4444" /> {/* High - Red */}
                      <Cell fill="#f97316" /> {/* Medium - Orange */}
                      <Cell fill="#22c55e" /> {/* Low - Green */}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
