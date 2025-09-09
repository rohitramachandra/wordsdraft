"use client";

import { useLanguage } from "@/contexts/language-context";
import type { Language } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en" as Language, name: "English", fontClass: "font-english" },
  { code: "kn" as Language, name: "ಕನ್ನಡ", fontClass: "font-kannada" },
  { code: "te" as Language, name: "తెలుగు", fontClass: "font-telugu" },
  { code: "hi" as Language, name: "हिंदी", fontClass: "font-devanagari" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find((l) => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent min-w-32 rounded"
        >
          <Globe className="h-4 w-4" />
          <span className={cn(currentLang?.fontClass)}>
            {currentLang?.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:bg-slate-900 space-y-1 rounded"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "dark:hover:bg-slate-800 min-w-36 rounded",
              language === lang.code ? "bg-accent dark:bg-slate-950" : "",
              lang.fontClass,
            )}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
