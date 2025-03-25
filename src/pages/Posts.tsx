import { useEffect } from 'react'
import { usePostStore } from '../store/postStore'

export default function Posts() {
  const { posts, fetchPosts, likePost } = usePostStore()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const handleLike = (postId: number) => {
    likePost(postId)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📜 Publicaciones</h1>

      {posts.map(post => (
        <div
          key={post.id}
          className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <p className="text-gray-800 text-lg mb-4">{post.content}</p>
          <button
            onClick={() => handleLike(post.id)}
            className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition-colors"
          >
            ❤️ <span>{post.likesCount}</span>
          </button>
        </div>
      ))}

      {posts.length === 0 && (
        <p className="text-center text-gray-500">No hay publicaciones aún.</p>
      )}
    </div>
  )
}
