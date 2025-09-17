'use client'

import { cn } from '@/lib/utils'
import { usePostsStore } from '@/store/posts.store'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

export const tabs = [
  { key: null, label: 'My Feed' },
  { key: 'FOLLOWING', label: 'Following' },
  { key: 'GENERAL', label: 'General' },
  { key: 'TECH', label: 'Technology' },
  { key: 'ART', label: 'Art & Illustration' },
  { key: 'LIFESTYLE', label: 'Lifestyle' },
  { key: 'EDUCATION', label: 'Education' },
  { key: 'ENTERTAINMENT', label: 'Entertainment' },
]

export function FeedTabs() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const { category, setCategory } = usePostsStore()

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollability()
    const handleResize = () => checkScrollability()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full flex items-center rounded-md overflow-hidden px-3 sm:px-0">
      <button
        onClick={scrollLeft}
        className={cn(
          'absolute left-0 z-10 flex items-center justify-center pl-2 pr-12 py-2 bg-gradient-to-r from-uibg dark:from-slate-950 via-uibg dark:via-slate-950 to-transparent rounded-md transition-opacity',
          canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex w-full gap-2 items-center px-1 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={checkScrollability}
        aria-label="Feed Tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCategory(tab.key)}
            className={cn(
              'flex-shrink-0 border rounded px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors',
              tab.key === category
                ? 'bg-uibg dark:bg-slate-950 border-uiacc text-uiacc '
                : 'bg-uibgf dark:bg-slate-900 text-foreground border-gray-400 dark:border-gray-800 hover:bg-muted'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className={cn(
          'absolute right-0 z-10 flex items-center justify-center pr-2 pl-12 py-2 bg-gradient-to-r from-transparent via-uibg dark:via-slate-950 to-uibg dark:to-slate-950 rounded-md transition-opacity',
          canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
