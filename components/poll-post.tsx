'use client'

import { Heart, Repeat2, MessageCircle, Eye } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface PollPostProps {
  post: {
    id: string
    author: {
      name: string
      username: string
      avatar: string
    }
    content: string
    publishedIn: string
    timeAgo: string
    category: string
    poll: {
      options: Array<{
        text: string
        percentage: number
      }>
    }
    reactions: {
      likes: number
      reposts: number
      comments: number
      views: number
    }
  }
}

export function PollPost({ post }: PollPostProps) {
  return (
    <article
      className="bg-uibgf border border-white rounded p-3 lg:p-4 wordwise-shadow"
      aria-label="Poll Post"
    >
      <div className="flex gap-3 items-start mb-3">
        <Avatar className="w-9 h-9 flex-shrink-0">
          <AvatarFallback className="bg-muted text-muted-foreground">
            {post.author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap text-sm">
            <span className="font-semibold text-[#0f2b2a]">
              {post.author.name}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground text-xs">
              Published in {post.publishedIn}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Posted {post.timeAgo} · Category: {post.category}
          </div>
        </div>
      </div>

      <div className="text-sm text-foreground leading-relaxed mb-4">
        {post.content}
      </div>

      <div className="space-y-3 mb-4">
        {post.poll.options.map((option, index) => (
          <div key={index} className="text-sm">
            <div className="mb-1.5">{option.text}</div>
            <div className="w-full h-4 bg-[#e9efee] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#053d36] flex items-center justify-end pr-2 text-white text-xs leading-4"
                style={{ width: `${option.percentage}%` }}
              >
                {option.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="flex items-center gap-4 text-muted-foreground text-sm"
        aria-hidden="true"
      >
        <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <Heart className="h-4 w-4" />
          <span>{post.reactions.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <Repeat2 className="h-4 w-4" />
          <span>{post.reactions.reposts}</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span>{post.reactions.comments}</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <Eye className="h-4 w-4" />
          <span>{post.reactions.views}</span>
        </button>
      </div>
    </article>
  )
}
