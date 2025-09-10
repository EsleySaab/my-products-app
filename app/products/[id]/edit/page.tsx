"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { updateProductSchema } from "@/utils/validation"
import api from "@/lib/api"

type ProductFormData = {
  title?: string
  description?: string
  thumbnail?: FileList
}

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(updateProductSchema),
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`)
        const product = response.data.data
        setValue("title", product.title)
        setValue("description", product.description)
        if (product.thumbnail?.url) {
          setThumbnailPreview(product.thumbnail.url)
        }
      } catch (err: any) {
        setError("Erro ao carregar produto")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id, setValue])

  const onSubmit = async (data: ProductFormData) => {
    try {
      const payload: any = {}

      if (data.title) {
        payload.title = data.title
      }

      if (data.description) {
        payload.description = data.description
      }

      payload.status = true

      if (Object.keys(payload).length > 0) {
        await api.put(`/products/${id}`, payload)
      }

      if (data.thumbnail && data.thumbnail.length > 0) {
        const formData = new FormData()
        formData.append("thumbnail", data.thumbnail[0])
        await api.patch(`/products/thumbnail/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }

      router.push("/products")
    } catch (err: any) {
      setError("Erro ao atualizar produto")
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Título</label>
          <Input {...register("title")} />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Descrição</label>
          <Input {...register("description")} />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Thumbnail</label>
          <input
            type="file"
            {...register("thumbnail")}
            accept="image/*"
            onChange={(e) =>
              setThumbnailPreview(
                e.target.files?.[0]
                  ? URL.createObjectURL(e.target.files[0])
                  : null
              )
            }
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Preview"
              className="mt-2 w-40 h-40 object-cover rounded-lg border"
            />
          )}
        </div>

        <Button type="submit" color="primary" className="w-full">
          Salvar Alterações
        </Button>
      </form>
    </div>
  )
}
