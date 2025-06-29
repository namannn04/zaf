import * as React from "react"

interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

interface Toast {
  (props: ToastProps): void
}

const useToast = () => {
  const toast: Toast = React.useCallback(({ title, description, variant = "default" }: ToastProps) => {
    const message = title + (description ? `\n${description}` : "")
    
    if (variant === "destructive") {
      console.error(`ERROR: ${message}`)
      alert(`Error: ${message}`)
    } else {
      console.log(`SUCCESS: ${message}`)
      alert(`Success: ${message}`)
    }
  }, [])

  return { toast }
}

export { useToast }
