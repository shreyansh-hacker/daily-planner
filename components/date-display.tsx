"use client"
import { format, addDays, startOfWeek, endOfWeek, isToday, isSameDay } from "date-fns"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateDisplayProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export function DateDisplay({ selectedDate, onDateChange }: DateDisplayProps) {
  const today = new Date()

  // Get the current week's dates
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }) // Start from Monday
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const handlePrevWeek = () => {
    onDateChange(addDays(weekStart, -7))
  }

  const handleNextWeek = () => {
    onDateChange(addDays(weekStart, 7))
  }

  const handleTodayClick = () => {
    onDateChange(today)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Calendar
        </h2>
        <Button variant="outline" size="sm" onClick={handleTodayClick}>
          Today
        </Button>
      </div>

      <div className="flex items-center justify-between mb-2">
        <Button variant="ghost" size="icon" onClick={handlePrevWeek}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous week</span>
        </Button>
        <span className="text-sm font-medium">
          {format(weekStart, "MMM d")} - {format(endOfWeek(weekStart, { weekStartsOn: 1 }), "MMM d, yyyy")}
        </span>
        <Button variant="ghost" size="icon" onClick={handleNextWeek}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next week</span>
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <div key={i} className="text-xs font-medium text-slate-500">
            {day}
          </div>
        ))}

        {weekDates.map((date, i) => (
          <Button
            key={i}
            variant="ghost"
            size="sm"
            className={`p-0 h-8 w-8 rounded-full ${
              isSameDay(date, selectedDate)
                ? "bg-slate-200 dark:bg-slate-700"
                : isToday(date)
                  ? "border border-slate-300 dark:border-slate-600"
                  : ""
            }`}
            onClick={() => onDateChange(date)}
          >
            <span className={`text-xs ${isToday(date) ? "font-bold" : ""}`}>{format(date, "d")}</span>
          </Button>
        ))}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal mt-2">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(selectedDate, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onDateChange(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
