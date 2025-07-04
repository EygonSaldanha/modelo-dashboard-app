"use client"

import { MainForm } from "@/components/main-form"
import { FormData } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactFormPage() {
  const handleFormSubmit = (data: FormData) => {
    console.log("Dados do formulário de contato:", data)
    // Processar dados do formulário
  }

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Entre em Contato</CardTitle>
          <CardDescription>
            Estamos aqui para ajudar. Envie sua mensagem e retornaremos em breve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MainForm onSubmit={handleFormSubmit} />
        </CardContent>
      </Card>
    </div>
  )
}
