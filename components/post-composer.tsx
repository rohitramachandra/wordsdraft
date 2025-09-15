'use client'

import type React from 'react'

import { useState, useRef, useEffect } from 'react'
import { ImageIcon, BarChart3, Smile, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export function PostComposer() {
  const [content, setContent] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isPostEnabled = content.trim().length > 0

  const handleSubmit = () => {
    if (!isPostEnabled) return
    console.log('Post submitted:', content)
    setContent('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit()
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [content])

  return (
    <section
      className="bg-uibgf border border-white rounded p-3 lg:p-4 wordwise-shadow"
      aria-label="Create Post"
    >
      <div className="flex gap-3 items-start">
        <Avatar className="w-9 h-9 lg:w-10 lg:h-10 flex-shrink-0">
          <AvatarFallback className="bg-muted text-muted-foreground">
            U
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 flex flex-col gap-2">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share your thoughts..."
            className="min-h-[42px] resize-none border-[#e9efee] bg-card text-sm leading-relaxed focus-visible:ring-1 focus-visible:ring-primary"
            rows={1}
          />

          <div className="flex items-center justify-between gap-3">
            <div
              className="flex items-center gap-2 lg:gap-3"
              role="toolbar"
              aria-label="post tools"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 lg:h-9 lg:w-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                title="Add media"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 lg:h-9 lg:w-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                title="Create poll"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 lg:h-9 lg:w-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                title="Add emoji"
              >
                <Smile className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 lg:h-9 lg:w-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                title="More options"
              >
                <MoreHorizontal className="h-3 w-3 lg:h-4 lg:w-4" />
              </Button>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isPostEnabled}
              className={cn(
                'px-4 py-1.5 text-xs lg:text-sm font-semibold rounded-md transition-colors',
                isPostEnabled
                  ? 'bg-[#053d36] hover:bg-[#042d28] text-white'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
              size="sm"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
