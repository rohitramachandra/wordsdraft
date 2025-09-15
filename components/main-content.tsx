'use client'

import { PostComposer } from '@/components/post-composer'
import { FeedPosts } from '@/components/feed-posts'

export function MainContent() {
  return (
    <main className="" role="main">
      <div className="space-y-4 lg:space-y-5">
        {/* Profile Banner Image */}
        <div
          className="h-32 lg:h-40 bg-uibgf border border-white rounded flex items-center justify-center text-[#bfcfd0] text-sm"
          style={{
            backgroundImage:
              "url('/placeholder.svg?height=160&width=900&text=Profile+Banner+Image')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />

        <PostComposer />

        <div className="text-sm font-semibold text-foreground mb-2">
          My Feed
        </div>

        <FeedPosts />
      </div>
    </main>
  )
}
