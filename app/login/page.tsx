"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/authStore"
import { loginSchema } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { useToastStore } from "@/stores/toastStore"
import { useAuth } from "@/hooks/useAuth"
import { Loading } from "@/components/Loading"
import NextLink from "next/link"

type LoginFormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const login = useAuthStore((state) => state.login)
  const router = useRouter()
  const [error, setError] = useState("")
  const { authenticated, loading } = useAuth({ requireAuth: false })
  const { addToast } = useToastStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && authenticated) {
      router.replace("/dashboard")
    }
  }, [authenticated, loading, router])

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
      router.push("/dashboard")
      addToast("Login realizado com sucesso!", "success")
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login")
    }
  }

  if (loading) return <Loading />

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-950">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-950 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Login
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <Input label="Email" type="email" {...register("email")} />
        </div>

        <div className="mb-6">
          <Input label="Senha" type="password" {...register("password")} />
        </div>

        <Button type="submit" className="w-full">
          Entrar
        </Button>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Não tem conta?{" "}
          <NextLink href="/register" className="text-blue-600 hover:underline">
            Crie aqui
          </NextLink>
        </p>
      </form>
    </div>
  )
}
