'use client'

import { motion } from 'motion/react'
import { Moon, Settings, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { useTheme } from 'next-themes'
import { LanguageSelector } from '@/components/language-selector'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function SettingsPopover() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark'

    if (isDark) setTheme('dark')
    else setTheme('light')
  }, [])

  const toggleTheme = () => {
    const isDark = localStorage.getItem('theme') === 'dark'

    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setTheme('light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'p-0 transition-colors',
            open
              ? 'bg-uiacc hover:bg-uiacchl dark:hover:bg-uiacchl text-accent-foreground rounded'
              : 'hover:bg-uibg dark:hover:bg-slate-950'
          )}
        >
          <motion.div
            whileHover={
              !open
                ? {
                    rotate: [0, -10, 10, -6, 6, 0],
                    transition: { duration: 0.5 },
                  }
                : {}
            }
            className="px-3"
          >
            <Settings
              className={cn(
                'h-5 w-5',
                open ? 'text-white' : 'text-black dark:text-white'
              )}
            />
          </motion.div>
        </Button>
      </PopoverTrigger>

      {/* Popup Content */}
      <PopoverContent
        className="w-56 p-4 bg-uibg dark:bg-slate-950 border-2 border-uiacc/30 dark:border-gray-800"
        align="end"
      >
        <div className="flex flex-col gap-2 text-sm">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="min-w-24 bg-uibgf hover:bg-uibg dark:bg-slate-950 dark:hover:bg-slate-900 border-2 border-gray-500/25"
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-between">
            <span>Language</span>
            <LanguageSelector />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
