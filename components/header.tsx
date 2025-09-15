'use client'

import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import { translations } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Search, Bell, Mail, User, Download, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LanguageSelector } from '@/components/language-selector'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export function Header() {
  const { user } = useAuth()
  const { language, getLanguageFont } = useLanguage()
  const t = translations[language]
  return (
    <header
      className="w-full bg-uibgf border-b border-white flex-shrink-0 fixed top-0 z-50"
      role="banner"
    >
      <div className="wordwise-container max-w-7xl mx-auto flex items-center gap-4 p-3 lg:p-4">
        {/* Brand */}
        <div className="flex items-center gap-3 min-w-[140px]">
          <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-md flex items-center justify-center text-primary font-bold text-lg">
            <img src="Vector.png" />
          </div>
          <div
            className={cn(
              'font-semibold text-foreground text-lg',
              getLanguageFont(t.siteName)
            )}
          >
            {t.siteName}
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[560px] relative">
            <div className="flex items-center gap-2 bg-card border border-input rounded-md px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search everything"
                className="border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                aria-label="Search everything"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 lg:gap-4 min-w-[200px] justify-end">
          <Button
            className="bg-[#7d0f9d] hover:bg-[#6a0d85] text-white px-3 py-2 text-xs lg:text-sm font-semibold"
            size="sm"
          >
            <Download className="h-4 w-4 mr-1 lg:mr-2" />
            <span className="hidden sm:inline">Download App</span>
            <span className="sm:hidden">App</span>
          </Button>

          <LanguageSelector />
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage
              src={user?.dImage ?? '/placeholder.svg?height=32&width=32'}
            />
            <AvatarFallback>{user?.name?.charAt(0) ?? 'U'}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
