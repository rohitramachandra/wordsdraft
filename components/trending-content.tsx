'use client'

import { Button } from '@/components/ui/button'

const trendingItems = [
  {
    author: 'Tanzil Mukhtar',
    title: 'How to write a script as a beginner',
    thumbnail: '/placeholder.svg?height=64&width=64&text=Thumb',
  },
  {
    author: 'Another Author',
    title: 'A trending snippet here',
    thumbnail: '/placeholder.svg?height=64&width=64&text=Thumb',
  },
  {
    author: 'More Trending',
    title: 'Another trending item to make this box taller.',
    thumbnail: '/placeholder.svg?height=64&width=64&text=Thumb',
  },
]

export function TrendingContent() {
  return (
    <div className="bg-uibgf dark:bg-slate-900 border border-white dark:border-gray-800 rounded p-3 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold text-sm">Trending on WordsMyth</div>
        <div className="text-xs text-muted-foreground">Today</div>
      </div>

      <div className="space-y-3">
        {trendingItems.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div
              className="w-16 h-16 bg-muted rounded-md flex-shrink-0"
              style={{
                backgroundImage: `url('${item.thumbnail}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-foreground">
                {item.author}
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-3">
        <Button
          variant="link"
          className="h-auto p-0 text-primary text-sm font-normal"
        >
          All Topics ›
        </Button>
      </div>
    </div>
  )
}
