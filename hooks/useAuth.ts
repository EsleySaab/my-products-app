"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useAuth(redirectTo: string = "/login") {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.replace(redirectTo)
    } else {
      setAuthenticated(true)
    }

    setLoading(false)
  }, [router, redirectTo])

  return { authenticated, loading }
}
