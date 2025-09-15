'use client'

import {
  Home,
  Users,
  BookOpen,
  Edit,
  MessageCircle,
  Folder,
  Calendar,
  Book,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigationItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Users, label: 'Circles', active: false },
  { icon: BookOpen, label: 'News', active: false },
  { icon: Edit, label: 'Handpost', active: false },
  { icon: MessageCircle, label: 'Messages', active: false },
  { icon: Folder, label: 'Projects', active: false },
  { icon: Calendar, label: 'Events', active: false },
  { icon: Book, label: 'Book Store', active: false },
]

export function LeftSidebar() {
  return (
    <aside
      className="bg-uibgf border border-white rounded p-3 wordwise-shadow h-fit flex flex-col gap-24"
      aria-label="Main Navigation"
    >
      <nav className="flex-1">
        <ul className="space-y-1" role="list">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.label}>
                <button
                  className={cn(
                    'w-full flex items-center gap-3 px-2 py-2.5 rounded-md text-sm font-medium transition-colors',
                    item.active
                      ? 'bg-[#e9f4f1] text-[#053d36] border-l-4 border-primary font-semibold'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 flex-shrink-0',
                      item.active ? 'text-[#053d36]' : 'text-muted-foreground'
                    )}
                  />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* CTA Section */}
      <div className="mt-4 bg-[#eef7f6] border border-[#dcefe9] rounded-lg p-3">
        <div className="text-sm text-[#0a3c36] font-medium mb-2">
          <strong>
            Get recognized,
            <br />
            and standout from the rest
          </strong>
        </div>
        <Button
          className="w-full bg-[#053d36] hover:bg-[#042d28] text-white text-xs"
          size="sm"
        >
          Learn more
        </Button>
      </div>
    </aside>
  )
}
