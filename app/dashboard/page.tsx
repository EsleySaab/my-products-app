"use client"

import { useAuth } from "@/hooks/useAuth"
import { useAuthStore } from "@/stores/authStore"
import DashboardChart from "@/app/dashboard/components/DashboardChart"

export default function DashboardPage() {
  const { authenticated, loading } = useAuth()
  const user = useAuthStore((state) => state.user)

  if (loading) return <p>Carregando...</p>
  if (!authenticated) return null

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-950 rounded-lg">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-lg">
        Bem-vindo{user?.name ? `, ${user.name}` : ""}! 🎉
      </p>

      <div className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
        <DashboardChart />
      </div>
    </div>
  )
}
