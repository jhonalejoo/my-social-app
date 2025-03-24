import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  if (!user) return <div>No estás logueado</div>

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div>
      <h1>Perfil</h1>
      <p>Nombre: {user.fullName}</p>
      <p>Email: {user.username}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}
