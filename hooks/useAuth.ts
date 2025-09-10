"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

interface UseAuthProps {
  redirectTo?: string
  requireAuth?: boolean
}

export function useAuth({
  redirectTo = "/login",
  requireAuth = true,
}: UseAuthProps = {}) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        if (requireAuth) router.replace(redirectTo)
        setLoading(false)
        return
      }

      try {
        const response = await api.post(
          "/auth/session",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const { token: newToken, user: sessionUser } = response.data

        localStorage.setItem("token", newToken)
        localStorage.setItem("user", JSON.stringify(sessionUser))

        setAuthenticated(true)
        setUser(sessionUser)
      } catch (err) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        if (requireAuth) router.replace(redirectTo)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [router, redirectTo, requireAuth])

  return { authenticated, loading, user }
}
