import { useState } from 'react'

interface Post {
  id: number
  content: string
  likes: number
}

const initialPosts: Post[] = [
  { id: 1, content: 'Primera publicación', likes: 0 },
  { id: 2, content: 'Segunda publicación', likes: 0 },
]

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  const handleLike = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  return (
    <div>
      <h1>Publicaciones</h1>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.content}</p>
          <button onClick={() => handleLike(post.id)}>❤️ {post.likes}</button>
        </div>
      ))}
    </div>
  )
}
