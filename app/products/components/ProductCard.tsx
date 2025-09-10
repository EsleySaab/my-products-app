"use client"

import { Avatar } from "@heroui/avatar"
import { Button } from "@heroui/button"
import { Eye } from "lucide-react"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal"
import { useState } from "react"
import { useRouter } from "next/navigation"

type ProductCardProps = {
  product: {
    id: string
    title: string
    description: string
    thumbnail?: string
  }
  onDelete: (id: string) => Promise<void>
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)

  const handleConfirmDelete = async () => {
    await onDelete(product.id)
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-2">
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
      <p className="text-gray-600 dark:text-gray-300">{product.description}</p>

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => router.push(`/products/${product.id}/edit`)}
            className="bg-blue-600 hover:bg-blue-700 text-gray-100"
          >
            Editar
          </Button>

          <Button size="sm" color="danger" onClick={handleOpenModal}>
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
  )
}
