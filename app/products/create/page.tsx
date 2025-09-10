"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { useProductStore } from "@/stores/productStore"
import { productSchema } from "@/utils/validation"
import { useToastStore } from "@/stores/toastStore"
import { ArrowLeft } from "lucide-react"

type ProductFormData = {
  title: string
  description: string
  thumbnail: FileList
}

export default function CreateProductPage() {
  const router = useRouter()
  const createProduct = useProductStore((state) => state.createProduct)
  const [error, setError] = useState("")

  const { register, handleSubmit, formState } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("description", data.description)
      formData.append("thumbnail", data.thumbnail[0])

      await createProduct(formData)

      addToast("Produto criado com sucesso!", "success")

      router.push("/products")
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar produto")
    }
  }

  const { addToast } = useToastStore()

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md ">
      <Button
        variant="ghost"
        startContent={<ArrowLeft className="w-4 h-4" />}
        onClick={() => router.push("/products")}
        className="mb-4"
      >
        Voltar
      </Button>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Criar Produto
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Título" {...register("title")} />
        {formState.errors.title && (
          <p className="text-red-500 text-sm">
            {formState.errors.title.message}
          </p>
        )}

        <Input label="Descrição" {...register("description")} />
        {formState.errors.description && (
          <p className="text-red-500 text-sm">
            {formState.errors.description.message}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="thumbnail"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            Thumbnail
          </label>

          <input
            id="thumbnail"
            type="file"
            {...register("thumbnail")}
            accept="image/*"
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {formState.errors.thumbnail && (
            <p className="text-red-500 text-sm">
              {formState.errors.thumbnail.message}
            </p>
          )}
        </div>

        <Button type="submit" className="mt-4">
          Criar Produto
        </Button>
      </form>
    </div>
  )
}
