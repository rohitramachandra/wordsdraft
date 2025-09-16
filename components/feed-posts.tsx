'use client'

import { PostCard } from '@/components/post-card'
import { PollPost } from '@/components/poll-post'
import { usePostsStore } from '@/store/posts.store'
import { useEffect } from 'react'
import { fetchPosts } from '@/lib/posts'
import { PostCardSkeleton } from './postcard-skeleton'

const samplePosts = [
  {
    id: '1',
    author: {
      name: 'Tanzil Mukhtar',
      username: 'tanzil.m',
      avatar: '',
    },
    content:
      'How to write a script as a beginner... (Content repeated for scroll testing) ... How to write a script as a beginner How to write a script as a beginner How to write a script as a beginner How to write a script as a beginner How to write a script as a beginner',
    publishedIn: "Writer's Den",
    timeAgo: '25min ago',
    category: 'Novel',
    hasImage: true,
    reactions: {
      likes: 27,
      reposts: 12,
      comments: 26,
      views: 26,
    },
  },
  {
    id: '2',
    author: {
      name: 'Tanzil Mukhtar',
      username: 'tanzil.m',
      avatar: '',
    },
    content:
      'How to write a script as a beginner... (Content repeated for scroll testing) ... How to write a script as a beginner How to write a script as a beginner How to write a script as a beginner How to write a script as a beginner How to write a script as a beginner',
    publishedIn: "Writer's Den",
    timeAgo: '25min ago',
    category: 'Novel',
    hasImage: true,
    reactions: {
      likes: 27,
      reposts: 12,
      comments: 26,
      views: 26,
    },
  },
]

const samplePoll = {
  id: '2',
  author: {
    name: 'Tanzil Mukhtar',
    username: 'tanzil.m',
    avatar: '',
  },
  content: 'Question Question Question Question Question Question ?',
  publishedIn: "Writer's Den",
  timeAgo: '25min ago',
  category: 'Novel',
  poll: {
    options: [
      { text: 'Option 1', percentage: 100 },
      { text: 'Option 2', percentage: 62 },
      { text: 'Option 3', percentage: 71 },
    ],
  },
  reactions: {
    likes: 27,
    reposts: 12,
    comments: 26,
    views: 26,
  },
}

export function FeedPosts() {
  const { posts, setPosts, loading, setLoading, setError } = usePostsStore()
  useEffect(() => {
    async function loadPosts() {
      setLoading(true)
      try {
        const data = await fetchPosts({ limit: 10 })
        setPosts(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [setPosts, setLoading, setError])

  if (loading)
    return Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
  if (!posts.length) return <div>No posts found</div>
  return (
    <div className="space-y-1 pb-12">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {posts.length > 0 && (
        <p className="text-center text-xs text-uiacc font-semibold py-2">
          That's it, you're all caught up!
        </p>
      )}
      {/* <PollPost post={samplePoll} /> */}
    </div>
  )
}
