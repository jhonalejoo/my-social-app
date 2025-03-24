import { create } from 'zustand'
import { loginRequest, fetchUser, UserResponse } from '../api/auth'

interface AuthState {
  user: UserResponse | null
  token: string | null
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  fetchAuthenticatedUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  error: null,

  login: async (email, password) => {
    try {
      const { token } = await loginRequest(email, password)
      set({ token, error: null })
      localStorage.setItem('token', token)
      await get().fetchAuthenticatedUser()
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Login failed' })
    }
  },

  fetchAuthenticatedUser: async () => {
    try {
      const token = get().token
      if (!token) return
      const user = await fetchUser(token)
      set({ user })
    } catch (err) {
      console.error('Error fetching user', err)
      set({ user: null })
    }
  },

  logout: () => {
    set({ user: null, token: null })
    localStorage.removeItem('token')
  },
}))
