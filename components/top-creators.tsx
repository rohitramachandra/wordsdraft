'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { UserRoundPlus } from 'lucide-react'

const topCreators = [
  { name: 'Elon Musk', followers: '5M followers' },
  { name: 'Sundar Pichai', followers: '3.2M followers' },
  { name: 'Satya Nadella', followers: '2.8M followers' },
  { name: 'Mark Zuckerberg', followers: '4.5M followers' },
  { name: 'Tim Cook', followers: '2.1M followers' },
  { name: 'Jeff Bezos', followers: '4.7M followers' },
  { name: 'Jensen Huang', followers: '1.9M followers' },
  { name: 'Reed Hastings', followers: '1.3M followers' },
  { name: 'Patrick Collison', followers: '900k followers' },
  { name: 'Drew Houston', followers: '850k followers' },
]

export function TopCreators() {
  return (
    <div className="bg-uibgf dark:bg-slate-900 border border-white dark:border-gray-800 rounded p-3 h-fit shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold text-sm">Top Creators</div>
        <div className="text-xs text-muted-foreground">This week</div>
      </div>

      <div className="space-y-3">
        <div className="max-h-58 overflow-y-scroll scrollbar-hide flex flex-col gap-4">
          {/* Other creators */}
          {topCreators.slice(1).map((creator, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <Avatar className="w-9 h-9">
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {creator.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm">{creator.name}</div>
                <div className="text-xs text-muted-foreground">
                  {creator.followers}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shadow-none text-xs font-semibold px-2.5 py-1 h-auto border-transparent dark:border-transparent hover:border-uiacc dark:hover:border-uiacc hover:text-white bg-transparent text-white dark:bg-transparent hover:bg-uiacchl/25 dark:hover:bg-uiacchl/25 "
              >
                <UserRoundPlus className="text-black dark:text-white" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
