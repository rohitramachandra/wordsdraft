'use client'

import { Button } from '@/components/ui/button'

export function ProfileBanner() {
  return (
    <div className="bg-[#fdecea] border border-[#f5cfcf] rounded-md p-3 flex items-center justify-between gap-3 text-sm text-[#6b2b2b]">
      <span>Complete your Profile to access full potential of Community</span>
      <Button
        className="bg-[#3b3b3b] hover:bg-[#2b2b2b] text-white px-3 py-1.5 text-xs"
        size="sm"
      >
        Update
      </Button>
    </div>
  )
}
