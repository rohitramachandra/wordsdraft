'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function PostCardSkeleton() {
  return (
    <article
      className="bg-uibgf dark:bg-slate-900 border border-white dark:border-gray-800 rounded p-3 lg:p-4 shadow-sm animate-pulse"
      aria-label="Loading post"
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <Skeleton className="w-9 h-9 rounded-full" />

        <div className="flex flex-col gap-5 w-full">
          {/* Author info */}
          <div className="flex gap-3 items-start">
            <div className="flex-1 min-w-0">
              <Skeleton className="h-3 w-24 mb-1" />
              <Skeleton className="h-2 w-16" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      </div>
    </article>
  )
}
