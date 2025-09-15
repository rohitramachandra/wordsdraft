'use client'

import { PostCard } from '@/components/post-card'
import { PollPost } from '@/components/poll-post'

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
  return (
    <div className="space-y-4 lg:space-y-5 pb-12">
      {samplePosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <PollPost post={samplePoll} />
    </div>
  )
}
