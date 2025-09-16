'use client'

import {
  Home,
  Users,
  Edit,
  BriefcaseBusiness,
  Calendar,
  Book,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

const navigationItems = [
  { icon: Home, label: 'Society', active: true },
  { icon: Users, label: 'Circles', active: false },
  { icon: Edit, label: 'Handpost', active: false },
  { icon: BriefcaseBusiness, label: 'Jobs', active: false },
  { icon: Calendar, label: 'Events', active: false },
  { icon: Book, label: 'Book Store', active: false },
]

export function LeftSidebar() {
  return (
    <aside
      className="fixed z-40 bg-uibgf dark:bg-slate-900 border border-white dark:border-gray-800 rounded p-3 h-fit flex flex-col gap-24 shadow-sm"
      aria-label="Main Navigation"
    >
      <nav className="flex-1">
        <ul className="space-y-1" role="list">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.label}>
                <motion.button
                  initial="initial"
                  whileHover="hover"
                  className={cn(
                    'w-full flex items-center gap-3 border border-transparent px-2 py-2.5 rounded text-sm font-medium transition-colors group',
                    item.active
                      ? 'text-white bg-uiacc font-semibold'
                      : 'text-foreground hover:bg-uibg dark:hover:bg-slate-950/25 hover:border-uiacc'
                  )}
                >
                  {/* Icon wiggle animation */}
                  <motion.div
                    variants={{
                      initial: { rotate: 0 },
                      hover: item.active
                        ? {}
                        : {
                            rotate: [0, -10, 10, -6, 6, 0],
                            transition: { duration: 0.5 },
                          },
                    }}
                    className="flex-shrink-0"
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4',
                        item.active
                          ? 'text-white'
                          : 'text-muted-foreground group-hover:text-uiacc'
                      )}
                    />
                  </motion.div>

                  {item.label}
                </motion.button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* CTA Section */}
      <div className="mt-4 bg-uibg dark:bg-slate-800 border border-uiacc/25 dark:border-gray-700 rounded p-3">
        <div className="text-sm text-uiacc dark:text-uiacc font-medium mb-2">
          <strong>
            Get recognized,
            <br />
            and standout from the rest
          </strong>
        </div>
        <Button
          className="w-full bg-uiacc dark:bg-uiacc hover:bg-[#042d28] text-white text-xs"
          size="sm"
        >
          Learn more
        </Button>
      </div>
    </aside>
  )
}
