import axios from 'axios'
import { Post } from '@/store/posts.store'

export async function fetchPosts(params?: {
  limit?: number
  offset?: number
  category?: string
}): Promise<Post[]> {
  const query = new URLSearchParams()
  if (params?.limit) query.append('limit', params.limit.toString())
  if (params?.offset) query.append('offset', params.offset.toString())
  if (params?.category) query.append('category', params.category)

  const res = await axios.get(`/api/post/query?${query.toString()}`)
  if (!res.data.success)
    throw new Error(res.data.error || 'Failed to fetch posts')
  return res.data.data
}
