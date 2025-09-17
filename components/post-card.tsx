'use client'

import {
  SquareChevronUp,
  SquareChevronDown,
  MessageSquareText,
  ChartColumn,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { timeAgo } from '@/utils/timeconverter'
import { useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import DOMPurify from 'dompurify'

interface PostCardProps {
  post: {
    id: string
    content: string
    author: { id: string; name: string; penName: string; dImage: string | null }
    media: { id: string; url: string; type: string }[]
    _count: { comments: number; likes: number }
    category: string
    visibility: string
    createdAt: string
    updatedAt: string
  }
}

export function PostCard({ post }: PostCardProps) {
  const [showFull, setShowFull] = useState(false)
  const isMobile = useIsMobile()

  // Strip HTML for truncation
  const textContent =
    new DOMParser().parseFromString(post.content, 'text/html').body
      .textContent || ''

  const shouldTruncate = textContent.length > 150
  const truncatedText = `${textContent.slice(0, 150)}...`

  // Sanitize HTML for safe rendering
  const sanitizedHTML = DOMPurify.sanitize(post.content)

  return (
    <article
      className="bg-uibgf dark:bg-slate-900 border border-white dark:border-gray-800 rounded p-3 lg:p-4 shadow-sm"
      aria-label="Post"
    >
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 items-start">
          <Avatar className="w-9 h-9 flex-shrink-0">
            {post.author.dImage ? (
              <img
                src={post.author.dImage}
                alt={post.author.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <AvatarFallback className="bg-muted text-muted-foreground">
                {post.author.name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 flex-wrap text-sm">
              <span className="font-semibold text-black dark:text-white">
                {post.author.name}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground text-xs">
                {/* Published in {post.publishedIn} */}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {timeAgo(post.createdAt)} · {post.category}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {!isMobile && <div className="min-w-9"></div>}
          <div className="flex flex-col gap-5">
            <div className="text-foreground leading-relaxed transition-all whitespace-pre-line text-sm show-content">
              {shouldTruncate && !showFull ? (
                truncatedText
              ) : (
                <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
              )}

              {shouldTruncate && (
                <div className="mt-1.5 flex justify-end">
                  <Button
                    onClick={() => setShowFull((prev) => !prev)}
                    variant="link"
                    className="h-auto p-0 text-xs font-normal text-uiacc"
                  >
                    {!showFull ? (
                      <span className="flex items-center gap-1">
                        Show more
                        <ChevronDown className="w-2 h-2" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        Show less
                        <ChevronUp className="w-2 h-2" />
                      </span>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Media rendering example (optional, uncomment if needed)
            {post.media.length > 0 && (
              <div
                className="w-full h-48 lg:h-64 bg-muted rounded-lg mb-3"
                style={{
                  backgroundImage: `url(${post.media[0].url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                role="img"
                aria-label="post image"
              />
            )} */}

            <div
              className="flex items-center gap-5 text-muted-foreground text-sm"
              aria-hidden="true"
            >
              <button className="flex items-center gap-1.5 hover:text-teal-500 transition-colors">
                <SquareChevronUp className="h-4 w-4" />
                <span>{post._count.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
                <SquareChevronDown className="h-4 w-4" />
                <span>25</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-classic-500 transition-colors">
                <MessageSquareText className="h-4 w-4" />
                <span>{post._count.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <ChartColumn className="h-4 w-4" />
                <span>40</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
