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
  category: string | null
  posts: Post[]
  loading: boolean
  error: string | null
  setCategory: (category: string | null) => void
  setPosts: (posts: Post[]) => void
  addPosts: (posts: Post[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const usePostsStore = create<PostsState>((set) => ({
  category: null,
  posts: [],
  loading: true,
  error: null,
  setCategory: (category: string | null) => set({ category }),
  setPosts: (posts) => set({ posts }),
  addPosts: (posts) => set((state) => ({ posts: [...posts, ...state.posts] })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
