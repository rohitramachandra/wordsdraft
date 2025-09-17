'use client'

import { PostComposer } from '@/components/post-composer'
import { FeedPosts } from '@/components/feed-posts'
import { useAuth } from '@/contexts/auth-context'
import { EnhancedPostComposer } from './enhanced-post-composer'

export function MainContent() {
  const { user } = useAuth()

  return (
    <main className="px-3 sm:px-0" role="main">
      <div className="space-y-1">
        {/* Profile Banner Image */}
        <div
          className="h-32 lg:h-40 bg-uibgf border border-white dark:border-gray-800 rounded flex items-center justify-center text-[#bfcfd0] text-sm"
          style={{
            backgroundImage:
              "url('/signup_old.png?height=160&width=900&text=Profile+Banner+Image')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />

        <EnhancedPostComposer />
        {/* <PostComposer /> */}

        <div className="text-sm font-semibold text-foreground mt-6 px-2">
          My Feed
        </div>

        <FeedPosts />
      </div>
    </main>
  )
}
