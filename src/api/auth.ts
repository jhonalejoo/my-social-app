import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

export interface LoginResponse {
  token: string
  expiresIn: number
}

export const loginRequest = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, password })
  return response.data
}

export interface UserResponse {
  fullName: string
  username: string
}

export const fetchUser = async (token: string): Promise<UserResponse> => {
  const response = await axios.get<UserResponse>(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}
