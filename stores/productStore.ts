import { create } from "zustand"
import { Product } from "@/types/Product"
import api from "@/lib/api"

interface ProductState {
  products: Product[]
  fetchProducts: () => Promise<void>
  createProduct: (
    data: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],

  fetchProducts: async () => {
    const response = await api.get("/products")
    set({ products: response.data.data })
  },

  createProduct: async (data) => {
    const response = await api.post("/products", data)
    set({ products: [...get().products, response.data] })
  },

  updateProduct: async (id, data) => {
    const response = await api.put(`/products/${id}`, data)
    set({
      products: get().products.map((p) => (p.id === id ? response.data : p)),
    })
  },

  deleteProduct: async (id) => {
    await api.delete(`/products/${id}`)
    set({ products: get().products.filter((p) => p.id !== id) })
  },
}))
