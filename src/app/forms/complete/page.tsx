"use client"

import { CompleteForm } from "@/components/complete-form"
import { type CompleteFormData } from "@/lib/actions"

export default function CompleteFormPage() {
  const handleFormSubmit = (data: CompleteFormData) => {
    console.log("Dados do formulário completo:", data)
    // Aqui você pode processar os dados, enviar para API, etc.
  }

  return (
    <div className="container mx-auto py-6">
      <CompleteForm onSubmit={handleFormSubmit} />
    </div>
  )
}
