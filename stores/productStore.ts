import { create } from "zustand"
import { Product } from "@/types/Product"
import api from "@/lib/api"

interface ProductState {
  products: Product[]
  fetchProducts: () => Promise<void>
  createProduct: (data: FormData) => Promise<void>
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],

  fetchProducts: async () => {
    const response = await api.get("/products")
    const products = response.data.data.map((p: any) => ({
      ...p,
      thumbnail: p.thumbnail?.url || "",
    }))
    set({ products })
  },

  createProduct: async (data: FormData) => {
    const response = await api.post("/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    const newProduct = {
      ...response.data,
      thumbnail: response.data.thumbnail?.url || "",
    }
    set({ products: [...get().products, newProduct] })
  },

  updateProduct: async (id: string, data: Partial<Product>) => {
    const response = await api.put(`/products/${id}`, data)
    const updatedProduct = {
      ...response.data,
      thumbnail: response.data.thumbnail?.url || "",
    }
    set({
      products: get().products.map((p) => (p.id === id ? updatedProduct : p)),
    })
  },

  deleteProduct: async (id) => {
    await api.delete(`/products/${id}`)
    set({ products: get().products.filter((p) => p.id !== id) })
  },
}))
