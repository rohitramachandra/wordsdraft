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
  const { user, logout } = useAuth()
  const { language } = useLanguage()
  const t = translations[language]

  const router = useRouter()

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }

    // If user onboarding not complete reroute to onboarding
    if (!user?.onboardAt) router.push('/onboarding')
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div
      className={cn(
        'h-[100dvh] overflow-hidden bg-uibg',
        getLanguageFontClass(language)
      )}
    >
      <Header />
      <div className="wordwise-container pt-20 px-3 pb-3 lg:px-4 lg:pb-4 max-w-7xl overflow-x-hidden mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4 lg:gap-6 align-start flex-grow min-h-0 h-full">
        <LeftSidebar />

        <div className="main-content-area flex flex-col gap-4 lg:gap-5 min-h-0 h-full">
          {/* Fixed top section with profile banner and tabs */}
          <div className="content-top-section flex flex-col gap-3 lg:gap-4 flex-shrink-0">
            <ProfileBanner />
            <FeedTabs />
          </div>
          {/* Bottom section with feed and right sidebar side by side */}
          <div className="content-bottom-section grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 lg:gap-6 align-start flex-grow min-h-0 h-full overflow-hidden">
            <MainContent />
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
