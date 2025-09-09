import { create } from "zustand"
import api from "@/lib/api"

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  token: string | null
  user: User | null
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

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  },

  logout: () => {
    set({ token: null, user: null })
    delete api.defaults.headers.common["Authorization"]
  },
}))
