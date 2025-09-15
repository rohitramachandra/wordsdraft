'use client'

import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

const tabs = [
  { label: 'My Feed', active: true },
  { label: 'Following', active: false },
  { label: 'Literature', active: false },
  { label: 'Philosophy', active: false },
  { label: 'Science', active: false },
  { label: 'Art & Illustration', active: false },
  { label: 'Writing', active: false },
  { label: 'Fiction', active: false },
  { label: 'International', active: false },
  { label: 'News', active: false },
  { label: 'News2', active: false },
  { label: 'News3', active: false },
  { label: 'News4', active: false },
  { label: 'News5', active: false },
  { label: 'News6', active: false },
  { label: 'News7', active: false },
]

export function FeedTabs() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      console.log({ scrollLeft, scrollWidth, clientWidth })
      console.log(scrollLeft > 0, scrollLeft < scrollWidth - clientWidth - 1)
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
    <div className="relative w-full flex items-center rounded-md overflow-hidden">
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
            key={tab.label}
            className={cn(
              'flex-shrink-0 border rounded px-3 py-1.5 text-xs lg:text-sm font-medium transition-colors',
              tab.active
                ? 'bg-uibg dark:bg-slate-950 border-uiacc text-uiacc font-semibold shadow-sm'
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
