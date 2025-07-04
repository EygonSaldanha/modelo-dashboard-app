import { z } from "zod"

export const completeFormSchema = z.object({
  // Informações Pessoais
  firstName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome não pode ter mais de 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  
  lastName: z
    .string()
    .min(2, "Sobrenome deve ter pelo menos 2 caracteres")
    .max(50, "Sobrenome não pode ter mais de 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Sobrenome deve conter apenas letras"),
  
  email: z
    .string()
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  
  phone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(15, "Telefone não pode ter mais de 15 dígitos")
    .regex(/^[\d\s\-\(\)\+]+$/, "Formato de telefone inválido"),
  
  dateOfBirth: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 18 && age <= 120
    }, "Idade deve estar entre 18 e 120 anos"),
  
  gender: z.enum(["masculino", "feminino", "outro", "prefiro-nao-dizer"], {
    required_error: "Selecione o gênero",
  }),
  
  // Endereço
  address: z.object({
    street: z
      .string()
      .min(5, "Endereço deve ter pelo menos 5 caracteres")
      .max(100, "Endereço não pode ter mais de 100 caracteres"),
    
    number: z
      .string()
      .min(1, "Número é obrigatório")
      .max(10, "Número não pode ter mais de 10 caracteres"),
    
    complement: z
      .string()
      .max(50, "Complemento não pode ter mais de 50 caracteres")
      .optional(),
    
    neighborhood: z
      .string()
      .min(2, "Bairro deve ter pelo menos 2 caracteres")
      .max(50, "Bairro não pode ter mais de 50 caracteres"),
    
    city: z
      .string()
      .min(2, "Cidade deve ter pelo menos 2 caracteres")
      .max(50, "Cidade não pode ter mais de 50 caracteres"),
    
    state: z
      .string()
      .min(2, "Estado deve ter pelo menos 2 caracteres")
      .max(2, "Estado deve ter exatamente 2 caracteres"),
    
    zipCode: z
      .string()
      .regex(/^\d{5}-?\d{3}$/, "CEP deve ter o formato 00000-000")
      .transform((val) => val.replace(/\D/g, "")),
  }),
  
  // Informações Profissionais
  occupation: z
    .string()
    .min(2, "Profissão deve ter pelo menos 2 caracteres")
    .max(50, "Profissão não pode ter mais de 50 caracteres"),
  
  company: z
    .string()
    .max(100, "Nome da empresa não pode ter mais de 100 caracteres")
    .optional(),
  
  income: z
    .string()
    .regex(/^\d+(\.\d{2})?$/, "Renda deve ser um valor numérico válido")
    .refine((val) => parseFloat(val) >= 0, "Renda deve ser um valor positivo"),
  
  // Preferências
  interests: z
    .array(z.string())
    .min(1, "Selecione pelo menos um interesse")
    .max(5, "Selecione no máximo 5 interesses"),
  
  newsletter: z.boolean().default(false),
  
  terms: z
    .boolean()
    .refine((val) => val === true, "Você deve aceitar os termos de uso"),
  
  privacy: z
    .boolean()
    .refine((val) => val === true, "Você deve aceitar a política de privacidade"),
  
  // Informações Adicionais
  bio: z
    .string()
    .max(500, "Biografia não pode ter mais de 500 caracteres")
    .optional(),
  
  website: z
    .string()
    .url("URL inválida")
    .optional()
    .or(z.literal("")),
  
  linkedin: z
    .string()
    .url("URL do LinkedIn inválida")
    .optional()
    .or(z.literal("")),
})

export type CompleteFormData = z.infer<typeof completeFormSchema>

// Schema simplificado para contato
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome não pode ter mais de 100 caracteres"),
  
  email: z
    .string()
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  
  subject: z
    .string()
    .min(5, "Assunto deve ter pelo menos 5 caracteres")
    .max(100, "Assunto não pode ter mais de 100 caracteres"),
  
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(1000, "Mensagem não pode ter mais de 1000 caracteres"),
  
  urgency: z.enum(["baixa", "media", "alta"], {
    required_error: "Selecione o nível de urgência",
  }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
