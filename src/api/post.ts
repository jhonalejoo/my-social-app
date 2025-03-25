import axios from 'axios'

const POST_API_URL = 'http://localhost:8081/api'

export interface Post {
  id: number
  content: string
  likesCount: number
}

export const getOtherPosts = async (token: string): Promise<Post[]> => {
  const response = await axios.get<Post[]>(`${POST_API_URL}/posts/other-posts`,
    {
      headers: { Authorization: `Bearer ${token}`,    'Content-Type': 'application/json' },
    }
  )
  return response.data
}

export const likePost = async (token: string,postId: number): Promise<void> => {
  await axios.post(`${POST_API_URL}/posts/${postId}/like`,{},
    {
      headers: { Authorization: `Bearer ${token}`,    'Content-Type': 'application/json' },
    })
}
