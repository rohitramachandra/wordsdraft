'use client'

import type React from 'react'

import { useState, useRef, useEffect } from 'react'
import { ImageIcon, BarChart3, Smile, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { usePostsStore } from '@/store/posts.store'

export function PostComposer() {
  const { user } = useAuth()
  const { addPosts } = usePostsStore()

  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()

  const isPostEnabled = content.trim().length > 0

  async function uploadPost(files: File[], content: string, category: string) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Login to add post!',
        description: 'You need to be logged in to post content.',
      })
      return
    }

    try {
      const formData = new FormData()
      formData.append('authorId', user.id)
      formData.append('content', content)
      formData.append('category', category)
      files.forEach((file) => formData.append('media', file))

      const res = await axios.post('/api/post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return res.data
    } catch (err: any) {
      console.error('Error uploading post:', err)
      toast({
        variant: 'destructive',
        title: 'Failed to upload post',
        description: err?.response?.data?.error || err.message,
      })
    }
  }

  const handleSubmit = async () => {
    if (!isPostEnabled) return
    setLoading(true)
    const res = await uploadPost([], content, 'GENERAL')
    addPosts([res.data])
    setContent('')
    setLoading(false)
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
      className="bg-uibgf dark:bg-slate-900 border border-white dark:border-gray-800 rounded p-3 lg:p-4 shadow-sm"
      aria-label="Create Post"
    >
      <div className="flex gap-3 items-start">
        <Avatar className="w-9 h-9 lg:w-10 lg:h-10 flex-shrink-0">
          <AvatarImage
            src={user?.dImage ?? '/placeholder.svg?height=32&width=32'}
            alt={user?.name ?? 'User'}
          />
          <AvatarFallback className="bg-muted text-muted-foreground">
            {user?.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 flex flex-col gap-2">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share your thoughts..."
            className="min-h-32 resize-none dark:bg-slate-950/50 border-[#e9efee] dark:border-gray-800 bg-card text-sm leading-relaxed focus-visible:ring-1 focus-visible:ring-uiacc rounded"
            rows={4}
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
              disabled={!isPostEnabled || loading}
              className={cn(
                'px-4 py-1.5 text-xs lg:text-sm font-semibold rounded transition-colors',
                isPostEnabled && 'bg-uiacc hover:bg-uiacchl text-white'
              )}
              size="sm"
            >
              {loading ? 'Posting' : 'Post'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
