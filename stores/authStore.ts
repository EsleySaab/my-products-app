import { create } from "zustand"
import api from "@/lib/api"

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  token: string | null
  user: any | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password })
    const { token, user } = response.data

    set({ token, user })

    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
  },

  logout: () => {
    set({ token: null, user: null })
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },
}))
