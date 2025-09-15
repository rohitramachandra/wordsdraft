'use client'

import { Heart, Repeat2, MessageCircle, Eye } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface PostCardProps {
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
    hasImage?: boolean
    reactions: {
      likes: number
      reposts: number
      comments: number
      views: number
    }
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article
      className="bg-uibgf border border-white rounded p-3 lg:p-4 wordwise-shadow"
      aria-label="Post"
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

      <div className="text-sm text-foreground leading-relaxed mb-3">
        {post.content}
        <div className="mt-1.5">
          <Button
            variant="link"
            className="h-auto p-0 text-primary text-xs font-normal"
          >
            View more
          </Button>
        </div>
      </div>

      {post.hasImage && (
        <div
          className="w-full h-48 lg:h-64 bg-muted rounded-lg mb-3"
          style={{
            backgroundImage:
              "url('/placeholder.svg?height=260&width=860&text=Post+Image')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          role="img"
          aria-label="post image"
        />
      )}

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
