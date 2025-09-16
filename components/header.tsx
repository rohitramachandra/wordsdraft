'use client'

import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import { translations } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Search, Bell, MessageSquare, MessageSquareShare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SettingsPopover } from './popovers/settings-popover'
import { UserPopover } from './popovers/user-popover'
import { motion } from 'motion/react'

export function Header() {
  const { language, getLanguageFont } = useLanguage()
  const t = translations[language]
  return (
    <header
      className="w-full bg-uibgf dark:bg-slate-900 border-b border-white dark:border-gray-800 flex-shrink-0 fixed top-0 z-50 shadow-sm"
      role="banner"
    >
      <div className="wordwise-container max-w-7xl mx-auto flex items-center justify-between gap-4 p-3 lg:p-4">
        {/* Brand */}
        <div className="flex items-center gap-3 sm:min-w-[140px]">
          <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-md flex items-center justify-center text-primary font-bold text-lg">
            <img src="Vector.png" />
          </div>
          <div
            className={cn(
              'hidden sm:block font-semibold text-foreground text-lg',
              getLanguageFont(t.siteName)
            )}
          >
            {t.siteName}
          </div>
        </div>

        {/* Search */}
        <div className="hidden sm:flex flex-1 justify-center">
          <div className="w-full max-w-[560px] relative">
            <div className="flex items-center gap-2 dark:bg-slate-950/25 border border-input dark:border-gray-800 rounded px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search everything"
                className="border-0 bg-transparent dark:bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                aria-label="Search everything"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 lg:gap-4 min-w-[200px] justify-end">
          {/* <Button
            className="bg-[#7d0f9d] hover:bg-[#6a0d85] text-white px-4 py-2 text-xs lg:text-sm font-semibold"
            size="sm"
          >
            <Download className="h-4 w-4 mr-1 lg:mr-2" />
            <span className="hidden sm:inline">Download App</span>
            <span className="sm:hidden">App</span>
          </Button> */}

          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-uibg dark:hover:bg-slate-950 p-0"
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 },
              }}
              className="relative flex items-center justify-center px-5 py-3.5 group"
            >
              <MessageSquare className="absolute opacity-100 group-hover:opacity-0 h-5 w-5" />
              <MessageSquareShare className="absolute group-hover:opacity-1000 opacity-0 h-5 w-5" />
            </motion.div>
          </Button>
          <SettingsPopover />
          <UserPopover />
        </div>
      </div>
    </header>
  )
}
