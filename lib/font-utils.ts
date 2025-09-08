import { cn } from "@/lib/utils"

export function getLanguageFontClass(language: string): string {
  switch (language) {
    case "en":
      return "font-english"
    case "kn":
      return "font-kannada"
    case "te":
      return "font-telugu"
    case "hi":
      return "font-devanagari"
    default:
      return "font-english"
  }
}

export function withLanguageFont(language: string, additionalClasses?: string): string {
  return cn(getLanguageFontClass(language), additionalClasses)
}
