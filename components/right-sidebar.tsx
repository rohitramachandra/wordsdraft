'use client'

import { TopCreators } from '@/components/top-creators'
import { TrendingContent } from '@/components/trending-content'

export function RightSidebar() {
  return (
    <aside
      className="h-full overflow-hidden scrollbar-hide space-y-1 sm:flex flex-col shadow-sm pb-2 hidden"
      aria-label="Right Column"
    >
      <TopCreators />
      <TrendingContent />
    </aside>
  )
}
