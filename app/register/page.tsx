"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { registerSchema } from "@/utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"

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
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.post("/users", data)
      setSuccess("Usuário criado com sucesso! Você já pode fazer login.")
      setTimeout(() => router.push("/login"), 1500)
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar usuário")
    }
  }

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-950">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Criar Conta
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4 text-center">{success}</p>
        )}

        <Input label="Nome" {...register("name")} />
        <div className="mt-4">
          <Input label="Email" type="email" {...register("email")} />
        </div>

        <div className="mt-4">
          <Input label="Senha" type="password" {...register("password")} />
        </div>

        <div className="mt-4">
          <Input
            label="Confirmar Senha"
            type="password"
            {...register("verifyPassword")}
          />
        </div>

        <div className="mt-4">
          <Input label="País (ex: BR)" {...register("phone.country")} />
        </div>
        <div className="mt-4">
          <Input label="DDD" {...register("phone.ddd")} />
        </div>
        <div className="mt-4">
          <Input label="Número" {...register("phone.number")} />
        </div>

        <Button type="submit" className="w-full mt-6">
          Registrar
        </Button>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Já tem conta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Faça login
          </a>
        </p>
      </form>
    </div>
  )
}
