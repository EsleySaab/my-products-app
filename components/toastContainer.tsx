"use client"

import { useToastStore } from "@/stores/toastStore"
import { Alert } from "@heroui/alert"
import { useEffect } from "react"

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore()

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => removeToast(toast.id), 3000)
      return () => clearTimeout(timer)
    })
  }, [toasts, removeToast])

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <Alert
          key={toast.id}
          variant={toast.variant}
          className={`
            min-w-[250px] 
            ${toast.variant === "success" ? "bg-green-500 text-white" : ""}
            ${toast.variant === "danger" ? "bg-red-500 text-white" : ""}
            ${toast.variant === "info" ? "bg-blue-500 text-white" : ""}
          `}
        >
          {toast.message}
        </Alert>
      ))}
    </div>
  )
}
