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
  refreshSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

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

  refreshSession: async () => {
    try {
      const response = await api.post("/auth/session")
      const { token, user } = response.data

      set({ token, user })
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
    } catch (err) {
      set({ token: null, user: null })
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
  },
}))
