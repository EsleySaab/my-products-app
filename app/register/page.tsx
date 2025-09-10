"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { registerSchema } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { useToastStore } from "@/stores/toastStore"
import { useAuth } from "@/hooks/useAuth"
import { Loading } from "@/components/Loading"
import NextLink from "next/link"

type RegisterFormData = {
  name: string
  email: string
  password: string
  verifyPassword: string
  phone: {
    country: string
    ddd: string
    number: string
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const { authenticated, loading } = useAuth({ requireAuth: false })
  const [error, setError] = useState("")
  const { addToast } = useToastStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  useEffect(() => {
    if (!loading && authenticated) {
      router.replace("/dashboard")
    }
  }, [authenticated, loading, router])

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.post("/users", data)
      addToast(
        "Usuário criado com sucesso! Você já pode fazer login.",
        "success"
      )
      setTimeout(() => router.push("/login"), 1500)
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar usuário")
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
          Criar Conta
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Nome */}
        <Input label="Nome" {...register("name")} className="mb-1" />
        {errors.name && (
          <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
        )}

        {/* Email */}
        <Input
          label="Email"
          type="email"
          {...register("email")}
          className="mb-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        {/* Senha */}
        <Input
          label="Senha"
          type="password"
          {...register("password")}
          className="mb-1"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        {/* Confirmar Senha */}
        <Input
          label="Confirmar Senha"
          type="password"
          {...register("verifyPassword")}
          className="mb-1"
        />
        {errors.verifyPassword && (
          <p className="text-red-500 text-sm mb-2">
            {errors.verifyPassword.message}
          </p>
        )}

        {/* País */}
        <Input
          label="País (ex: BR)"
          {...register("phone.country")}
          className="mb-1"
        />
        {errors.phone?.country && (
          <p className="text-red-500 text-sm mb-2">
            {errors.phone.country.message}
          </p>
        )}

        {/* DDD */}
        <Input label="DDD" {...register("phone.ddd")} className="mb-1" />
        {errors.phone?.ddd && (
          <p className="text-red-500 text-sm mb-2">
            {errors.phone.ddd.message}
          </p>
        )}

        <Input label="Número" {...register("phone.number")} className="mb-1" />
        {errors.phone?.number && (
          <p className="text-red-500 text-sm mb-2">
            {errors.phone.number.message}
          </p>
        )}

        <Button type="submit" className="w-full mt-4 mb-4">
          Registrar
        </Button>

        <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
          Já tem conta?{" "}
          <NextLink href="/login" className="text-blue-600 hover:underline">
            Faça login
          </NextLink>
        </p>
      </form>
    </div>
  )
}
