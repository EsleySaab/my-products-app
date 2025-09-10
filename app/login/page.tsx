"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/authStore"
import { loginSchema } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"

type LoginFormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const login = useAuthStore((state) => state.login)
  const router = useRouter()
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login")
    }
  }

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-950">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
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
          <a href="/register" className="text-blue-600 hover:underline">
            Crie aqui
          </a>
        </p>
      </form>
    </div>
  )
}
