'use client'

import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  BarChart3,
  Bold,
  ImageIcon,
  Italic,
  ItalicIcon,
  List,
  ListOrdered,
  MoreHorizontal,
  Smile,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { usePostsStore } from '@/store/posts.store'
import DOMPurify from 'dompurify'
import { ToolTippedButton } from './tooltipped-button'

function useEnhancedPostComposerSubmit(editor: any) {
  const { user } = useAuth()
  const { addPosts } = usePostsStore()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!editor) return
    const content = editor.getHTML().trim()

    if (!content) {
      toast({
        variant: 'destructive',
        title: 'Cannot post empty content',
        description: 'Write something before posting!',
      })
      return
    }

    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Login required',
        description: 'You need to be logged in to post content.',
      })
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('authorId', user.id)
      formData.append('content', content)
      formData.append('category', 'GENERAL') // you can make this dynamic

      const res = await axios.post('/api/post/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      addPosts([res.data.data])
      editor.commands.clearContent() // reset editor after post
      toast({
        title: 'Post created!',
        description: 'Your post was successfully uploaded.',
      })
    } catch (err: any) {
      console.error('Error uploading post:', err)
      toast({
        variant: 'destructive',
        title: 'Failed to upload post',
        description: err?.response?.data?.error || err.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return { loading, handleSubmit }
}

export function EnhancedPostComposer() {
  const { user } = useAuth()
  const [isPostEnabled, setIsPostEnabled] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
        strike: false,
      }),
    ],
    immediatelyRender: false,
    content: '',
  })

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx || !ctx.editor) return null
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  })

  useEffect(() => {
    if (!editor) return

    const updatePostEnabled = () => {
      const html = editor.getHTML().trim()
      const sanitizedHTML = DOMPurify.sanitize(html)
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = sanitizedHTML
      const text = tempDiv.textContent || ''

      setIsPostEnabled(text.length > 10)
    }

    // Initial check
    updatePostEnabled()

    // Subscribe to editor updates
    editor.on('update', updatePostEnabled)

    // Cleanup listener on unmount
    return () => {
      editor.off('update', updatePostEnabled)
    }
  }, [editor])

  const { loading, handleSubmit } = useEnhancedPostComposerSubmit(editor)

  if (!editor) return null
  return (
    <section className="bg-uibgf dark:bg-slate-900 border border-white dark:border-gray-800 rounded p-3 lg:p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          {/* toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Avatar className="w-7 h-7 flex-shrink-0">
                <AvatarImage
                  src={user?.dImage ?? '/placeholder.svg?height=32&width=32'}
                  alt={user?.name ?? 'User'}
                />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {user?.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-uiacc -mt-1 mb-1">
                  @{user?.penName}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <ToolTippedButton
                size="icon"
                label="Bold"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn(
                  'hover:bg-classic-200 dark:hover:bg-slate-950',
                  editorState?.isBold &&
                    'bg-uiacc/50 hover:bg-uiacc/50 dark:hover:bg-uiacc/50'
                )}
              >
                <Bold className="h-4 w-4" />
              </ToolTippedButton>

              <ToolTippedButton
                size="icon"
                label="Italic"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={cn(
                  'hover:bg-classic-200 dark:hover:bg-slate-950',
                  editorState?.isItalic &&
                    'bg-uiacc/50 hover:bg-uiacc/50 dark:hover:bg-uiacc/50'
                )}
              >
                <ItalicIcon />
              </ToolTippedButton>

              <ToolTippedButton
                size="icon"
                label="Unordered List"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(
                  'hover:bg-classic-200 dark:hover:bg-slate-950',
                  editorState?.isBulletList &&
                    'bg-uiacc/50 hover:bg-uiacc/50 dark:hover:bg-uiacc/50'
                )}
              >
                <List className="h-4 w-4" />
              </ToolTippedButton>

              <ToolTippedButton
                size="icon"
                label="Ordered List"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(
                  'hover:bg-classic-200 dark:hover:bg-slate-950',
                  editorState?.isOrderedList &&
                    'bg-uiacc/50 hover:bg-uiacc/50 dark:hover:bg-uiacc/50'
                )}
              >
                <ListOrdered className="h-4 w-4" />
              </ToolTippedButton>
            </div>
          </div>

          {/* EditorContent is the single box the user interacts with */}
          <EditorContent
            editor={editor}
            className={cn(
              'editor-box min-h-[120px] rounded text-sm max-w-none focus-within:ring-1 focus-within:ring-uiacc'
            )}
          />
        </div>
      </div>
      <div className="w-full flex justify-between mt-2">
        <div
          className="flex items-center gap-2 lg:gap-3"
          role="toolbar"
          aria-label="post tools"
        >
          <ToolTippedButton
            variant="ghost"
            size="icon"
            className={cn(
              'h-8 w-8 lg:h-9 lg:w-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded',
              'hover:bg-classic-200 dark:hover:bg-slate-950'
            )}
            label="Add media"
          >
            <ImageIcon className="h-4 w-4" />
          </ToolTippedButton>
          <ToolTippedButton
            variant="ghost"
            size="icon"
            className={cn(
              'h-8 w-8 lg:h-9 lg:w-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded',
              'hover:bg-classic-200 dark:hover:bg-slate-950'
            )}
            label="Create Poll"
          >
            <BarChart3 className="h-4 w-4" />
          </ToolTippedButton>
          <ToolTippedButton
            variant="ghost"
            size="icon"
            className={cn(
              'h-8 w-8 lg:h-9 lg:w-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded',
              'hover:bg-classic-200 dark:hover:bg-slate-950'
            )}
            label="Add Emoji"
          >
            <Smile className="h-4 w-4" />
          </ToolTippedButton>

          <ToolTippedButton
            variant="ghost"
            size="icon"
            className={cn(
              'h-8 w-8 lg:h-9 lg:w-9 text-muted-foreground hover:text-foreground hover:bg-muted rounded',
              'hover:bg-classic-200 dark:hover:bg-slate-950'
            )}
            label="More options"
          >
            <MoreHorizontal className="h-3 w-3 lg:h-4 lg:w-4" />
          </ToolTippedButton>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!isPostEnabled || loading}
          className={cn(
            'px-6 py-1.5 text-xs lg:text-sm font-semibold rounded transition-colors',
            isPostEnabled && 'bg-uiacc hover:bg-uiacchl text-white'
          )}
        >
          {loading ? 'Posting' : 'Post'}
        </Button>
      </div>
    </section>
  )
}
