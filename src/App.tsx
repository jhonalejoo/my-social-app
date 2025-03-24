import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Posts from './pages/Posts'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAuthStore((state) => state.user)
  return user ? children : <Navigate to="/" />
}

function AppRoutes() {
  const fetchAuthenticatedUser = useAuthStore((state) => state.fetchAuthenticatedUser)
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        await fetchAuthenticatedUser()
      }
    }
    checkAuth()
  }, [token, fetchAuthenticatedUser])

  useEffect(() => {
    if (user) {
      navigate('/profile') // ✅ Redirige al perfil si hay usuario
    }
  }, [user, navigate])

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
