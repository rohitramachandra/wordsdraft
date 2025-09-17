import { Visibility, MediaType, PostCategory } from '@prisma/client'
import prisma from '@/utils/db'

// Get posts, latest first.
// Optionally filter by category.
export async function getPosts(params?: {
  category?: PostCategory
  limit?: number
  offset?: number
}) {
  const { category, limit = 20, offset = 0 } = params || {}

  return prisma.post.findMany({
    where: category ? { category } : {},
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit,
    include: {
      author: {
        select: { id: true, name: true, penName: true, dImage: true },
      },
      media: true,
      _count: { select: { comments: true, likes: true } },
    },
  })
}

// Get a single post by ID (with author + media + counts).
export async function getPostById(postId: string) {
  return prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: { id: true, name: true, penName: true, dImage: true },
      },
      media: true,
      comments: {
        include: {
          author: {
            select: { id: true, name: true, penName: true, dImage: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
      _count: { select: { comments: true, likes: true } },
    },
  })
}

// Add a new post.
export async function addPost(params: {
  authorId: string
  content: string
  category?: PostCategory
  visibility?: Visibility
  media?: { url: string; type: MediaType }[]
  parentId?: string
}) {
  const {
    authorId,
    content,
    category = PostCategory.GENERAL,
    visibility = Visibility.PUBLIC,
    media = [],
    parentId,
  } = params

  // Enforce max 4 media
  if (media.length > 4) {
    throw new Error('A post can have at most 4 media items')
  }

  return prisma.post.create({
    data: {
      authorId,
      content,
      category,
      visibility,
      parentId,
      media: { create: media },
    },
    include: {
      author: {
        select: { id: true, name: true, penName: true, dImage: true },
      },
      media: true,
      _count: { select: { comments: true, likes: true } },
    },
  })
}

// Update a post (only if owned by the author).
export async function updatePost(params: {
  postId: string
  authorId: string
  content?: string
  category?: PostCategory
  visibility?: Visibility
}) {
  const { postId, authorId, content, category, visibility } = params

  const post = await prisma.post.findUnique({ where: { id: postId } })
  if (!post || post.authorId !== authorId) {
    throw new Error('Not authorized to update this post')
  }

  return prisma.post.update({
    where: { id: postId },
    data: {
      content,
      category,
      visibility,
    },
  })
}

// Delete a post (only if owned by the author).
export async function deletePost(postId: string, authorId: string) {
  const post = await prisma.post.findUnique({ where: { id: postId } })
  if (!post || post.authorId !== authorId) {
    throw new Error('Not authorized to delete this post')
  }

  return prisma.post.delete({ where: { id: postId } })
}
