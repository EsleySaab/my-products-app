"use client"

import { useEffect, useState } from "react"
import { useProductStore } from "@/stores/productStore"
import { Avatar } from "@heroui/avatar"
import { Button } from "@heroui/button"
import { useRouter } from "next/navigation"
import ConfirmDeleteModal from "@/components/confirmDeleteModal"
import { useToastStore } from "@/stores/toastStore"
import { Eye } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useAuthStore } from "@/stores/authStore"

export default function ProductsPage() {
  const { authenticated, loading } = useAuth()
  const user = useAuthStore((state) => state.user)
  const { products, fetchProducts, deleteProduct } = useProductStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const router = useRouter()
  const { addToast } = useToastStore()

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login")
    }
  }, [authenticated, loading, router])

  useEffect(() => {
    if (authenticated) {
      fetchProducts()
    }
  }, [authenticated, fetchProducts])

  const handleOpenModal = (id: string) => {
    setSelectedId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedId) {
      await deleteProduct(selectedId)
      setIsModalOpen(false)
      setSelectedId(null)
      addToast("Produto deletado com sucesso!", "danger")
    }
  }

  if (loading || !authenticated) return <p>Carregando...</p>

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-950 h-full">
      <h1 className="text-2xl font-bold mb-6">Meus Produtos</h1>

      {products.length === 0 && <p>Nenhum produto encontrado.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-2"
          >
            {product.thumbnail && (
              <Avatar className="w-full h-48">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </Avatar>
            )}

            <h2 className="font-bold text-lg">{product.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {product.description}
            </p>

            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    router.push(
                      `/products/[id]/edit`.replace("[id]", product.id)
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-gray-100"
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => handleOpenModal(product.id)}
                >
                  Deletar
                </Button>

                <ConfirmDeleteModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onConfirm={handleConfirmDelete}
                />
              </div>

              <Button
                size="sm"
                className="flex items-center gap-1"
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <Eye size={16} />
                Ver Detalhes
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
