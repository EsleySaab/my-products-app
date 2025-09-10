import { create } from "zustand"

interface Toast {
  id: string
  message: string
  variant?: "success" | "danger" | "info"
}

interface ToastState {
  toasts: Toast[]
  addToast: (message: string, variant?: Toast["variant"]) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, variant = "success") =>
    set((state) => ({
      toasts: [...state.toasts, { id: crypto.randomUUID(), message, variant }],
    })),
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))
