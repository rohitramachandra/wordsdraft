import { NextRequest, NextResponse } from 'next/server'
import { getPosts } from '@/services/post/post-actions.service'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const limit = Number(url.searchParams.get('limit') ?? 20)
    const offset = Number(url.searchParams.get('offset') ?? 0)
    const categoryParam = url.searchParams.get('category') as
      | 'GENERAL'
      | 'TECH'
      | 'ART'
      | 'LIFESTYLE'
      | 'EDUCATION'
      | 'ENTERTAINMENT'
      | null

    const posts = await getPosts({
      limit,
      offset,
      category: categoryParam ?? undefined,
    })

    return NextResponse.json({ success: true, data: posts })
  } catch (error: any) {
    console.error('GET /api/post error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}
