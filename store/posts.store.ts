import { create } from 'zustand'

export interface Post {
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

interface PostsState {
  posts: Post[]
  loading: boolean
  error: string | null
  setPosts: (posts: Post[]) => void
  addPosts: (posts: Post[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  loading: true,
  error: null,
  setPosts: (posts) => set({ posts }),
  addPosts: (posts) => set((state) => ({ posts: [...posts, ...state.posts] })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
