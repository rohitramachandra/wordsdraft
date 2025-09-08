"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { type Language, useTranslation } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: ReturnType<typeof useTranslation>
  getLanguageFont: (text?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const t = useTranslation(language)

  const getLanguageFont = (text?: string) => {
    if (!text) return ""

    const hasDevanagari = /[\u0900-\u097F]/.test(text)
    const hasKannada = /[\u0C80-\u0CFF]/.test(text)
    const hasTelugu = /[\u0C00-\u0C7F]/.test(text)

    if (hasDevanagari) return "font-devanagari"
    if (hasKannada) return "font-kannada"
    if (hasTelugu) return "font-telugu"

    return ""
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLanguageFont }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
