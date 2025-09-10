"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@heroui/button"
import ConfirmDeleteModal from "@/components/confirmDeleteModal"
import api from "@/lib/api"
import { ArrowLeft } from "lucide-react"

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`)
        setProduct(response.data.data)
      } catch (err: any) {
        console.error(err)
        setError("Erro ao carregar produto")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id])

  if (loading) return <p className="p-6">Carregando...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>
  if (!product)
    return <p className="p-6 text-red-500">Produto não encontrado</p>

  const handleOpenModal = () => setIsModalOpen(true)
  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/products/${product.id}`)
      router.push("/products")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 dark:bg-gray-950 h-full space-y-6 rounded-lg">
      <Button
        variant="ghost"
        startContent={<ArrowLeft className="w-4 h-4" />}
        onClick={() => router.back()}
        className="mb-4"
      >
        Voltar
      </Button>
      <div className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
        {product.thumbnail && (
          <div className="w-full h-64 md:h-[550px] overflow-hidden rounded-t-xl">
            <img
              src={product.thumbnail.url}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {product.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              as="a"
              href={`/products/${product.id}/edit`}
              color="primary"
              className="flex-1 p-1.5"
            >
              Editar
            </Button>

            <Button onClick={handleOpenModal} color="danger" className="flex-1 p-1.5">
              Deletar
            </Button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
