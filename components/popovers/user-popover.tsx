'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function UserPopover() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Avatar trigger */}
      <PopoverTrigger asChild>
        <button
          className={cn(
            'rounded-full focus:outline-none ring-offset-background transition',
            open && 'ring-2 ring-uiacc ring-offset-2'
          )}
        >
          <Avatar>
            <AvatarImage
              src={user?.dImage ?? '/placeholder.svg?height=32&width=32'}
              alt={user?.name ?? 'User'}
            />
            <AvatarFallback>{user?.name?.charAt(0) ?? 'U'}</AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>

      {/* Popover Content */}
      <PopoverContent
        className="w-fit p-3 rounded bg-uibg dark:bg-slate-950 border-2 border-uiacc/30 dark:border-gray-800"
        align="end"
      >
        <div className="flex flex-col gap-3 text-sm w-fit">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.dImage ?? '/placeholder.svg?height=32&width=32'}
                alt={user?.name ?? 'User'}
              />
              <AvatarFallback>{user?.name?.charAt(0) ?? 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user?.name ?? 'User'}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              logout()
              setOpen(false)
            }}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
