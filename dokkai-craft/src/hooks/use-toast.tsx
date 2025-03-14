import { useState } from "react"

type ToastVariant = "default" | "destructive" | "success" | "info"

interface Toast {
  title: string
  description: string
  variant?: ToastVariant
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (toast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, toast])

    // 自動でトーストを閉じる
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t !== toast))
    }, 5000) // 5秒後に消える
  }

  return {
    toasts,
    toast,
  }
}
