import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Navbar() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) return null // No mostrar el navbar si no hay usuario

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        <div className="flex items-center">
          <Link to="/posts" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Posts</Link>
        </div>
        <div className="flex items-center space-x-4">
          <span>{user?.username}</span>
          <button onClick={handleLogout} className="bg-red-600 px-3 py-2 rounded hover:bg-red-700">Logout</button>
        </div>
      </div>
    </nav>
  )
}
