'use client'

import { useAuth } from '@/contexts/auth-context'
import { useLanguage } from '@/contexts/language-context'
import { translations } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { getLanguageFontClass } from '@/lib/font-utils'
import { Header } from '@/components/header'
import { LeftSidebar } from '@/components/left-sidebar'
import { MainContent } from '@/components/main-content'
import { RightSidebar } from '@/components/right-sidebar'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProfileBanner } from '@/components/profile-banner'
import { FeedTabs } from '@/components/feed-tabs'

export default function HomePage() {
  const { user } = useAuth()
  const { language } = useLanguage()
  const t = translations[language]

  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/login')
    else if (!user?.onboardAt) router.push('/onboarding')
  }, [user, router])

  if (!user) return null

  return (
    <div
      className={cn(
        'bg-uibg dark:bg-slate-950 min-h-screen',
        getLanguageFontClass(language)
      )}
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-uibg">
        <Header />
      </div>

      <div className="h-20"></div>
      <div className="wordwise-container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr]">
        {/* Sidebar (sticky) */}
        <div className="hidden lg:block sticky top-16 self-start h-[calc(100vh-4rem)] overflow-hidden">
          <LeftSidebar />
        </div>

        {/* Main content area */}
        <div className="flex flex-col gap-6 min-h-0">
          {/* Full-width top section spanning main+right */}
          <div className="sticky top-16 self-start z-40 bg-uibg/75 dark:bg-slate-950/85 backdrop-blur-sm pt-4 pb-2 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 lg:gap-6">
              <div className="lg:col-span-2 flex flex-col gap-4">
                {!user.onboardAt && <ProfileBanner />}
                <FeedTabs />
              </div>
            </div>
          </div>

          {/* Bottom grid: main + right sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 lg:gap-6 flex-1 min-h-0">
            {/* Main feed scrolls indefinitely */}
            <div className="min-h-0 overflow-y-auto">
              <MainContent />
            </div>

            {/* Right sidebar scrolls only within viewport */}
            <div className="sticky top-32 self-start max-h-[calc(100vh-4rem)] overflow-y-auto">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
