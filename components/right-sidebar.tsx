'use client'

import { TopCreators } from '@/components/top-creators'
import { TrendingContent } from '@/components/trending-content'

export function RightSidebar() {
  return (
    <aside
      className="h-full overflow-hidden scrollbar-hide space-y-4 flex flex-col"
      aria-label="Right Column"
    >
      <TopCreators />
      <TrendingContent />
    </aside>
  )
}
