"use client"

import { useEffect } from "react"
import { useProductStore } from "@/stores/productStore"
import { useRouter } from "next/navigation"
import { useToastStore } from "@/stores/toastStore"
import { useAuth } from "@/hooks/useAuth"
import { useAuthStore } from "@/stores/authStore"
import { ProductCard } from "./components/ProductCard"

export default function ProductsPage() {
  const { authenticated, loading } = useAuth()
  const user = useAuthStore((state) => state.user)
  const { products, fetchProducts, deleteProduct } = useProductStore()
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

  const handleDelete = async (id: string) => {
    await deleteProduct(id)
    addToast("Produto deletado com sucesso!", "danger")
  }

  if (loading || !authenticated) return <p>Carregando...</p>

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-950 h-full">
      <h1 className="text-2xl font-bold mb-6">Meus Produtos</h1>

      {products.length === 0 && <p>Nenhum produto encontrado.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
