"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@heroui/button"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal"
import ProductCard from "../components/ProductDetailsCard"
import api from "@/lib/api"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useAuthStore } from "@/stores/authStore"

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState("")

  const { authenticated, loading: authLoading } = useAuth()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (!authLoading && !authenticated) {
      router.push("/login")
    }
  }, [authenticated, authLoading, router])

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

    if (id && authenticated) fetchProduct()
  }, [id, authenticated])

  if (loading || authLoading || !authenticated)
    return <p className="p-6">Carregando...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>
  if (!product)
    return <p className="p-6 text-red-500">Produto não encontrado</p>

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

      <ProductCard
        product={product}
        onDelete={() => setIsModalOpen(true)}
        showActions
      />

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
