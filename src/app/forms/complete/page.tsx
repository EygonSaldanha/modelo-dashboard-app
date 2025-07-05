"use client"

import { CompleteForm } from "@/components/complete-form"

interface CompleteFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  occupation: string
  company?: string
  income: string
  interests: string[]
  bio?: string
  website?: string
  linkedin?: string
  newsletter: boolean
  terms: boolean
  privacy: boolean
}

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
