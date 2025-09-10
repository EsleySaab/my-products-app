"use client"

import { useEffect } from "react"
import { useProductStore } from "@/stores/productStore"
import { Avatar } from "@heroui/avatar"
import { Button } from "@heroui/button"
import { useRouter } from "next/navigation"

export default function ProductsPage() {
  const { products, fetchProducts, deleteProduct } = useProductStore()
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleDelete = async (id: string) => {
    if (confirm("Deseja realmente deletar este produto?")) {
      await deleteProduct(id)
    }
  }

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

            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                onClick={() => router.push(`/products/${product.id}`)}
              >
                Editar
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => handleDelete(product.id)}
              >
                Deletar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
