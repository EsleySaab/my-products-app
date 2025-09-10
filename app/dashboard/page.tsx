"use client"

import { useAuth } from "@/hooks/useAuth"

export default function DashboardPage() {
  const { authenticated, loading } = useAuth()

  if (loading) {
    return <p>Carregando...</p>
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-950">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bem-vindo! 🎉</p>
    </div>
  )
}
