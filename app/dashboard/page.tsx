"use client"

import { useAuth } from "@/hooks/useAuth"
import { useAuthStore } from "@/stores/authStore"

export default function DashboardPage() {
  const { authenticated, loading } = useAuth()
  const user = useAuthStore((state) => state.user)

  if (loading) {
    return <p>Carregando...</p>
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-950 h-full">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-lg">
        Bem-vindo{user?.name ? `, ${user.name}` : ""}! 🎉
      </p>
    </div>
  )
}
