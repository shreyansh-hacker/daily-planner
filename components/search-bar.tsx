"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { type TranslationKey, getTranslation } from "@/lib/translations"

interface SearchBarProps {
  onSearch: (query: string) => void
  language: string
  onFocusChange?: (isFocused: boolean) => void
}

export function SearchBar({ onSearch, language, onFocusChange }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
    inputRef.current?.focus()
  }

  const handleFocus = () => {
    onFocusChange?.(true)
  }

  const handleBlur = () => {
    onFocusChange?.(false)
  }

  // Focus search when pressing / key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const t = (key: TranslationKey) => getTranslation(language, key)

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="search"
        placeholder={`${t("searchPlaceholder")} (${t("pressSlash")})`}
        className="w-full pl-9 pr-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full w-10 rounded-l-none"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">{t("cancel")}</span>
        </Button>
      )}
    </form>
  )
}
