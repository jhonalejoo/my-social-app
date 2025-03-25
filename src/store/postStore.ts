import { create } from 'zustand'
import { getOtherPosts, likePost as likePostApi } from '../api/post'
import { useAuthStore } from './authStore'

interface Post {
  id: number
  content: string
  likesCount: number
}

interface PostState {
  posts: Post[]
  fetchPosts: () => Promise<void>
  likePost: (postId: number) => Promise<void>
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  fetchPosts: async () => {
    const token = useAuthStore.getState().token
    if (!token) return
    const data = await getOtherPosts(token)
    set({ posts: data })
  },
  likePost: async (postId) => {
    const token = useAuthStore.getState().token
    if (!token) return
    await likePostApi(token,postId) 
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, likesCount: post.likesCount + 1 } : post
      ),
    }))
  },
}))
