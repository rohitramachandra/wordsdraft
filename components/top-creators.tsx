'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const topCreators = [
  { name: 'tanzil.m', followers: '460 followers', isCurrentUser: true },
  { name: 'User.ID', followers: '1M followers', isCurrentUser: false },
  { name: 'User.ID', followers: '140k followers', isCurrentUser: false },
  { name: 'User.ID', followers: '700k followers', isCurrentUser: false },
  { name: 'User.ID', followers: '650k followers', isCurrentUser: false },
  { name: 'User.ID', followers: '540k followers', isCurrentUser: false },
]

export function TopCreators() {
  return (
    <div className="bg-uibgf border border-white rounded p-3 wordwise-shadow h-fit">
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold text-sm">Top Creators</div>
        <div className="text-xs text-muted-foreground">This week</div>
      </div>

      <div className="space-y-3">
        {/* Current user */}
        <div className="flex items-center gap-2.5">
          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-muted text-muted-foreground">
              T
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm">{topCreators[0].name}</div>
            <div className="text-xs text-muted-foreground">
              {topCreators[0].followers}
            </div>
          </div>
        </div>

        <hr className="border-border" />

        <div className="h-52 overflow-y-scroll scrollbar-hide flex flex-col gap-2">
          {/* Other creators */}
          {topCreators.slice(1).map((creator, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <Avatar className="w-9 h-9">
                <AvatarFallback className="bg-muted text-muted-foreground">
                  U
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
                className="text-xs px-2.5 py-1 h-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
