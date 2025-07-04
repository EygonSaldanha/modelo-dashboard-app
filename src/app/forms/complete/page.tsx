"use client"

import { CompleteForm } from "@/components/complete-form"

export default function CompleteFormPage() {
  const handleFormSubmit = (data: Record<string, unknown>) => {
    console.log("Dados do formulário completo:", data)
    // Aqui você pode processar os dados, enviar para API, etc.
  }

  return (
    <div className="container mx-auto py-6">
      <CompleteForm onSubmit={handleFormSubmit} />
    </div>
  )
}
