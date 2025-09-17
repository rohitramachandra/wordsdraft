'use client'

import { PostCard } from '@/components/post-card'
import { PollPost } from '@/components/poll-post'
import { usePostsStore } from '@/store/posts.store'
import { useEffect } from 'react'
import { fetchPosts } from '@/lib/posts'
import { PostCardSkeleton } from './postcard-skeleton'
import { Card } from './ui/card'
import { SearchX } from 'lucide-react'
import { tabs } from './feed-tabs'

export function FeedPosts() {
  const { category, posts, setPosts, loading, setLoading, setError } =
    usePostsStore()
  useEffect(() => {
    async function loadPosts() {
      setLoading(true)
      try {
        const objectToSend: {
          limit: number
          offset?: number
          category?: string
        } = { limit: 50 }
        if (category && category !== 'FOLLOWING')
          objectToSend['category'] = category
        const data = await fetchPosts(objectToSend)
        setPosts(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [category, setPosts, setLoading, setError])

  if (loading)
    return Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
  if (!posts.length)
    return (
      <Card className="text-center bg-uibgf dark:bg-slate-900 border border-white dark:border-gray-800 text-gray-400 dark:text-gray-700 text-sm font-semibold flex flex-row gap-2 items-center justify-center">
        <SearchX className="w-4 h-4" /> No posts found in{' '}
        {tabs.find((t) => t.key === category)?.label ?? 'Feed'}
      </Card>
    )

  return (
    <div className="space-y-1 pb-12">
      {posts.map((post) =>
        !post.poll ? (
          <PostCard key={post.id} post={post} />
        ) : (
          <PollPost post={post} />
        )
      )}
      {posts.length > 0 && (
        <p className="text-center text-xs text-uiacc font-semibold py-2">
          That's it, you're all caught up!
        </p>
      )}
    </div>
  )
}
