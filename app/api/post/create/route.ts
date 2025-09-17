import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import { addPost } from '@/services/post/post-actions.service'
import { MediaType, PostCategory, Visibility } from '@prisma/client'

export const config = { api: { bodyParser: false } }

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    // Helper to get single field
    const getSingleField = (key: string) => {
      const val = formData.get(key)
      if (!val || typeof val !== 'string')
        throw new Error(`Missing field: ${key}`)
      return val
    }

    const authorId = getSingleField('authorId')
    const content = getSingleField('content')
    const category =
      (formData.get('category') as string | null) || PostCategory.GENERAL
    const visibility =
      (formData.get('visibility') as string | null) || Visibility.PUBLIC
    const parentId = formData.get('parentId') as string | null | undefined

    // Handle files
    const media: { url: string; type: MediaType }[] = []

    for (const file of formData.getAll('media')) {
      if (!(file instanceof File)) continue
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const filename = `${Date.now()}-${file.name}`
      const filepath = `./public/uploads/${filename}`

      fs.writeFileSync(filepath, buffer)

      media.push({
        url: `/uploads/${filename}`,
        type: file.type.startsWith('image') ? MediaType.IMAGE : MediaType.VIDEO,
      })
    }

    const post = await addPost({
      authorId,
      content,
      category: category as PostCategory,
      visibility: visibility as Visibility,
      media,
      parentId: parentId || undefined,
    })

    return NextResponse.json({ success: true, data: post })
  } catch (err: any) {
    console.error('POST /api/posts error:', err)
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to add post' },
      { status: 500 }
    )
  }
}
