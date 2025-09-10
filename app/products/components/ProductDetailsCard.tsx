"use client"

import { Button } from "@heroui/button"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: {
    id: string
    title: string
    description: string
    thumbnail?: { url: string }
  }
  onDelete?: () => void
  showActions?: boolean
}

export default function ProductCard({
  product,
  onDelete,
  showActions = true,
}: ProductCardProps) {
  const router = useRouter()

  return (
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

        {showActions && (
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              as="a"
              href={`/products/${product.id}/edit`}
              color="primary"
              className="flex-1 p-1.5"
            >
              Editar
            </Button>

            <Button onClick={onDelete} color="danger" className="flex-1 p-1.5">
              Deletar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
