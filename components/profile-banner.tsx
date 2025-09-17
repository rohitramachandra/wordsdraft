'use client'

import { Button } from '@/components/ui/button'

export function ProfileBanner() {
  return (
    <div className="bg-[#fdecea] dark:bg-red-500/10 border border-[#f5cfcf] dark:border-red-500/25 rounded p-3 flex items-center justify-between gap-3 text-sm text-[#6b2b2b] dark:text-red-300">
      <span>Complete your Profile to access full potential of Community</span>
      <Button
        className="bg-uiacc hover:bg-uiacchl text-white px-3 py-1.5 text-xs"
        size="sm"
      >
        Update
      </Button>
    </div>
  )
}
