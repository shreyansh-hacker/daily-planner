"use client"
import { Filter, SortAsc, SortDesc, Calendar, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type TranslationKey, getTranslation } from "@/lib/translations"

export type FilterOption = "all" | "today" | "upcoming" | "completed" | "incomplete"
export type SortOption = "priority" | "date" | "alphabetical" | "category"
export type SortDirection = "asc" | "desc"

interface TaskFiltersProps {
  onFilterChange: (filter: FilterOption) => void
  onSortChange: (sort: SortOption, direction: SortDirection) => void
  currentFilter: FilterOption
  currentSort: SortOption
  currentSortDirection: SortDirection
  language: string
}

export function TaskFilters({
  onFilterChange,
  onSortChange,
  currentFilter,
  currentSort,
  currentSortDirection,
  language,
}: TaskFiltersProps) {
  const t = (key: TranslationKey) => getTranslation(language, key)

  const toggleSortDirection = () => {
    onSortChange(currentSort, currentSortDirection === "asc" ? "desc" : "asc")
  }

  const filterIcons = {
    all: <Filter className="h-4 w-4 mr-2" />,
    today: <Calendar className="h-4 w-4 mr-2" />,
    upcoming: <Clock className="h-4 w-4 mr-2" />,
    completed: <CheckCircle2 className="h-4 w-4 mr-2" />,
    incomplete: <Clock className="h-4 w-4 mr-2" />,
  }

  const filterLabels = {
    all: t("all"),
    today: t("today"),
    upcoming: t("upcoming"),
    completed: t("completed"),
    incomplete: t("incomplete"),
  }

  const sortLabels = {
    priority: t("priority"),
    date: t("date"),
    alphabetical: t("taskTitle"),
    category: t("category"),
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1" data-filter-trigger="true">
            {filterIcons[currentFilter]}
            <span className="hidden sm:inline">{filterLabels[currentFilter]}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>{t("filter")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onFilterChange("all")}>
              <Filter className="h-4 w-4 mr-2" />
              {t("all")}
              {currentFilter === "all" && <CheckCircle2 className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange("today")}>
              <Calendar className="h-4 w-4 mr-2" />
              {t("today")}
              {currentFilter === "today" && <CheckCircle2 className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange("upcoming")}>
              <Clock className="h-4 w-4 mr-2" />
              {t("upcoming")}
              {currentFilter === "upcoming" && <CheckCircle2 className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange("completed")}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {t("completed")}
              {currentFilter === "completed" && <CheckCircle2 className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange("incomplete")}>
              <Clock className="h-4 w-4 mr-2" />
              {t("incomplete")}
              {currentFilter === "incomplete" && <CheckCircle2 className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1" data-sort-trigger="true">
            {currentSortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            <span className="hidden sm:inline">{sortLabels[currentSort]}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>{t("sort")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onSortChange("priority", currentSortDirection)}>
              {t("priority")}
              {currentSort === "priority" && <CheckCircle2 className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("date", currentSortDirection)}>
              {t("date")}
              {currentSort === "date" && <CheckCircle2 className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("alphabetical", currentSortDirection)}>
              {t("taskTitle")}
              {currentSort === "alphabetical" && <CheckCircle2 className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("category", currentSortDirection)}>
              {t("category")}
              {currentSort === "category" && <CheckCircle2 className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={toggleSortDirection}>
            {currentSortDirection === "asc" ? (
              <>
                <SortAsc className="h-4 w-4 mr-2" />
                {t("sort")} A-Z
              </>
            ) : (
              <>
                <SortDesc className="h-4 w-4 mr-2" />
                {t("sort")} Z-A
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
