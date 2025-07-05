"use server"

import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

// Tipos para os formulários
export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface CompleteFormData {
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

// Simulação de base de dados
const submissions: Array<{
  id: string
  type: "contact" | "complete"
  data: ContactFormData | CompleteFormData
  userId?: string
  createdAt: Date
}> = []

// Server Action para formulário de contato
export async function submitContactForm(data: ContactFormData) {
  try {
    // Validação no servidor
    if (!data.name || !data.email || !data.message) {
      throw new Error("Todos os campos são obrigatórios")
    }

    if (data.name.length < 2) {
      throw new Error("Nome deve ter pelo menos 2 caracteres")
    }

    if (data.message.length < 10) {
      throw new Error("Mensagem deve ter pelo menos 10 caracteres")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      throw new Error("Email inválido")
    }

    const session = await getServerSession(authOptions)

    // Simular salvamento no banco de dados
    const submission = {
      id: Date.now().toString(),
      type: "contact" as const,
      data,
      userId: session?.user?.id,
      createdAt: new Date()
    }

    submissions.push(submission)

    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log("Formulário de contato enviado:", submission)

    // Revalidar cache se necessário
    revalidatePath("/forms/contact")

    return { 
      success: true, 
      message: "Mensagem enviada com sucesso!",
      submissionId: submission.id
    }
  } catch (error) {
    console.error("Erro ao enviar formulário de contato:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro interno do servidor" 
    }
  }
}

// Server Action para formulário completo
export async function submitCompleteForm(data: CompleteFormData) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      throw new Error("Usuário não autenticado")
    }

    // Validação no servidor
    if (!data.firstName || !data.lastName || !data.email) {
      throw new Error("Campos obrigatórios não preenchidos")
    }

    if (!data.terms || !data.privacy) {
      throw new Error("Você deve aceitar os termos e a política de privacidade")
    }

    if (data.interests.length === 0) {
      throw new Error("Selecione pelo menos um interesse")
    }

    if (data.interests.length > 5) {
      throw new Error("Máximo de 5 interesses permitidos")
    }

    // Simular salvamento no banco de dados
    const submission = {
      id: Date.now().toString(),
      type: "complete" as const,
      data,
      userId: session.user.id,
      createdAt: new Date()
    }

    submissions.push(submission)

    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log("Formulário completo enviado:", submission)

    // Revalidar cache
    revalidatePath("/forms/complete")

    return { 
      success: true, 
      message: "Formulário enviado com sucesso! Seus dados foram salvos.",
      submissionId: submission.id
    }
  } catch (error) {
    console.error("Erro ao enviar formulário completo:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro interno do servidor" 
    }
  }
}

// Server Action para buscar submissões do usuário
export async function getUserSubmissions() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return { success: false, error: "Usuário não autenticado" }
    }

    const userSubmissions = submissions.filter(s => s.userId === session.user.id)

    return { 
      success: true, 
      submissions: userSubmissions.map(s => ({
        id: s.id,
        type: s.type,
        createdAt: s.createdAt,
        // Não retornar dados sensíveis, apenas metadados
      }))
    }
  } catch (error) {
    console.error("Erro ao buscar submissões:", error)
    return { 
      success: false, 
      error: "Erro interno do servidor" 
    }
  }
}

// Server Action para login personalizado (se necessário)
export async function signInWithCredentials(_email: string, _password: string) {
  try {
    // Esta função seria usada se você quisesse lógica customizada de login
    // Por enquanto, o NextAuth cuida disso
    redirect("/auth/signin")
  } catch {
    return { 
      success: false, 
      error: "Erro ao fazer login" 
    }
  }
}

// Server Action para registrar novo usuário
export async function registerUser(_userData: {
  name: string
  email: string
  password: string
}) {
  try {
    // Aqui você implementaria a lógica de registro
    // Por simplicidade, não implementaremos registro dinâmico
    return { 
      success: false, 
      error: "Registro não implementado nesta demo" 
    }
  } catch {
    return { 
      success: false, 
      error: "Erro ao registrar usuário" 
    }
  }
}
