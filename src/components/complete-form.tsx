"use client"

import * as React from "react"
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik"
import * as Yup from "yup"
import { toast } from "sonner"
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building,
  DollarSign,
  Heart,
  Globe,
  Linkedin,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const interestOptions = [
  "Tecnologia",
  "Esportes", 
  "Música",
  "Arte",
  "Culinária",
  "Viagem",
  "Leitura",
  "Cinema",
  "Fotografia",
  "Natureza"
]

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

interface CompleteFormProps {
  onSubmit?: (data: CompleteFormData) => void
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("Nome é obrigatório"),
  lastName: Yup.string().required("Sobrenome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: Yup.string().required("Telefone é obrigatório"),
  dateOfBirth: Yup.string().required("Data de nascimento é obrigatória"),
  gender: Yup.string().required("Gênero é obrigatório"),
  address: Yup.object({
    street: Yup.string().required("Endereço é obrigatório"),
    number: Yup.string().required("Número é obrigatório"),
    complement: Yup.string(),
    neighborhood: Yup.string().required("Bairro é obrigatório"),
    city: Yup.string().required("Cidade é obrigatória"),
    state: Yup.string().required("Estado é obrigatório").max(2, "Use a sigla do estado"),
    zipCode: Yup.string().required("CEP é obrigatório")
  }),
  occupation: Yup.string().required("Profissão é obrigatória"),
  company: Yup.string(),
  income: Yup.string().required("Renda é obrigatória"),
  interests: Yup.array().min(1, "Selecione pelo menos um interesse").max(5, "Máximo 5 interesses"),
  bio: Yup.string(),
  website: Yup.string().url("URL inválida"),
  linkedin: Yup.string().url("URL inválida"),
  newsletter: Yup.boolean(),
  terms: Yup.boolean().oneOf([true], "Você deve aceitar os termos de uso"),
  privacy: Yup.boolean().oneOf([true], "Você deve aceitar a política de privacidade")
})

const initialValues: CompleteFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: {
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: ""
  },
  occupation: "",
  company: "",
  income: "",
  interests: [],
  bio: "",
  website: "",
  linkedin: "",
  newsletter: false,
  terms: false,
  privacy: false
}

export function CompleteForm({ onSubmit }: CompleteFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleFormSubmit = async (values: CompleteFormData, { resetForm }: FormikHelpers<CompleteFormData>) => {
    setIsSubmitting(true)
    
    try {
      // Simular envio de dados
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (onSubmit) {
        onSubmit(values)
      }
      
      toast.success("Formulário enviado com sucesso!", {
        description: "Seus dados foram salvos e processados.",
      })
      
      console.log("Dados do formulário:", values)
      resetForm()
    } catch {
      toast.error("Erro ao enviar formulário!", {
        description: "Tente novamente em alguns instantes.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Formulário Completo</h1>
        <p className="text-muted-foreground">
          Preencha todos os campos abaixo para completar seu cadastro
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched, setFieldValue, isSubmitting: formikSubmitting }) => (
          <Form className="space-y-6">
            {/* Informações Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>
                  Dados básicos sobre você
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome *</Label>
                    <Field
                      as={Input}
                      id="firstName"
                      name="firstName"
                      placeholder="Seu nome"
                      aria-invalid={errors.firstName && touched.firstName ? "true" : "false"}
                    />
                    <ErrorMessage name="firstName">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome *</Label>
                    <Field
                      as={Input}
                      id="lastName"
                      name="lastName"
                      placeholder="Seu sobrenome"
                      aria-invalid={errors.lastName && touched.lastName ? "true" : "false"}
                    />
                    <ErrorMessage name="lastName">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        className="pl-10"
                        aria-invalid={errors.email && touched.email ? "true" : "false"}
                      />
                    </div>
                    <ErrorMessage name="email">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Field
                        as={Input}
                        id="phone"
                        name="phone"
                        placeholder="(11) 99999-9999"
                        className="pl-10"
                        aria-invalid={errors.phone && touched.phone ? "true" : "false"}
                      />
                    </div>
                    <ErrorMessage name="phone">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Data de Nascimento *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Field
                        as={Input}
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        className="pl-10"
                        aria-invalid={errors.dateOfBirth && touched.dateOfBirth ? "true" : "false"}
                      />
                    </div>
                    <ErrorMessage name="dateOfBirth">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gênero *</Label>
                    <Field name="gender">
                      {({ field }: { field: { value: string } }) => (
                        <Select onValueChange={(value) => setFieldValue('gender', value)} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o gênero" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="feminino">Feminino</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                            <SelectItem value="prefiro-nao-dizer">Prefiro não dizer</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage name="gender">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Endereço */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Endereço
                </CardTitle>
                <CardDescription>
                  Informações de localização
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address.street">Endereço *</Label>
                    <Field
                      as={Input}
                      id="address.street"
                      name="address.street"
                      placeholder="Rua, avenida..."
                    />
                    <ErrorMessage name="address.street">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address.number">Número *</Label>
                    <Field
                      as={Input}
                      id="address.number"
                      name="address.number"
                      placeholder="123"
                    />
                    <ErrorMessage name="address.number">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address.complement">Complemento</Label>
                    <Field
                      as={Input}
                      id="address.complement"
                      name="address.complement"
                      placeholder="Apartamento, sala..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address.neighborhood">Bairro *</Label>
                    <Field
                      as={Input}
                      id="address.neighborhood"
                      name="address.neighborhood"
                      placeholder="Seu bairro"
                    />
                    <ErrorMessage name="address.neighborhood">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address.city">Cidade *</Label>
                    <Field
                      as={Input}
                      id="address.city"
                      name="address.city"
                      placeholder="Sua cidade"
                    />
                    <ErrorMessage name="address.city">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address.state">Estado *</Label>
                    <Field
                      as={Input}
                      id="address.state"
                      name="address.state"
                      placeholder="SP"
                      maxLength={2}
                    />
                    <ErrorMessage name="address.state">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address.zipCode">CEP *</Label>
                    <Field
                      as={Input}
                      id="address.zipCode"
                      name="address.zipCode"
                      placeholder="00000-000"
                    />
                    <ErrorMessage name="address.zipCode">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações Profissionais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Informações Profissionais
                </CardTitle>
                <CardDescription>
                  Dados sobre sua carreira
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Profissão *</Label>
                    <Field
                      as={Input}
                      id="occupation"
                      name="occupation"
                      placeholder="Sua profissão"
                      aria-invalid={errors.occupation && touched.occupation ? "true" : "false"}
                    />
                    <ErrorMessage name="occupation">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Field
                      as={Input}
                      id="company"
                      name="company"
                      placeholder="Nome da empresa (opcional)"
                    />
                    <ErrorMessage name="company">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income">Renda Mensal *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Field
                      as={Input}
                      id="income"
                      name="income"
                      placeholder="0000.00"
                      className="pl-10"
                      aria-invalid={errors.income && touched.income ? "true" : "false"}
                    />
                  </div>
                  <ErrorMessage name="income">
                    {msg => <p className="text-sm text-destructive">{msg}</p>}
                  </ErrorMessage>
                </div>
              </CardContent>
            </Card>

            {/* Interesses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Interesses
                </CardTitle>
                <CardDescription>
                  Selecione de 1 a 5 áreas de interesse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {interestOptions.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Field name="interests">
                        {({ field }: { field: { value: string[] } }) => (
                          <Checkbox
                            id={interest}
                            checked={field.value.includes(interest)}
                            onCheckedChange={(checked) => {
                              const newInterests = checked
                                ? [...field.value, interest]
                                : field.value.filter((i: string) => i !== interest)
                              
                              if (checked && field.value.length >= 5) {
                                toast.error("Você pode selecionar no máximo 5 interesses")
                                return
                              }
                              
                              setFieldValue('interests', newInterests)
                            }}
                          />
                        )}
                      </Field>
                      <Label htmlFor={interest} className="text-sm font-normal">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
                <ErrorMessage name="interests">
                  {msg => <p className="text-sm text-destructive mt-2">{msg}</p>}
                </ErrorMessage>
              </CardContent>
            </Card>

            {/* Informações Adicionais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Informações Adicionais
                </CardTitle>
                <CardDescription>
                  Conte-nos mais sobre você (opcional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <Field
                    as={Textarea}
                    id="bio"
                    name="bio"
                    placeholder="Conte um pouco sobre você..."
                    rows={4}
                  />
                  <ErrorMessage name="bio">
                    {msg => <p className="text-sm text-destructive">{msg}</p>}
                  </ErrorMessage>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Field
                        as={Input}
                        id="website"
                        name="website"
                        type="url"
                        placeholder="https://seusite.com"
                        className="pl-10"
                      />
                    </div>
                    <ErrorMessage name="website">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Field
                        as={Input}
                        id="linkedin"
                        name="linkedin"
                        type="url"
                        placeholder="https://linkedin.com/in/seu-perfil"
                        className="pl-10"
                      />
                    </div>
                    <ErrorMessage name="linkedin">
                      {msg => <p className="text-sm text-destructive">{msg}</p>}
                    </ErrorMessage>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Termos e Condições */}
            <Card>
              <CardHeader>
                <CardTitle>Termos e Condições</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Field name="newsletter">
                    {({ field }: { field: { value: boolean } }) => (
                      <Checkbox
                        id="newsletter"
                        checked={field.value}
                        onCheckedChange={(checked) => setFieldValue('newsletter', checked)}
                      />
                    )}
                  </Field>
                  <Label htmlFor="newsletter" className="text-sm font-normal">
                    Desejo receber newsletter e novidades por email
                  </Label>
                </div>

                <Separator />

                <div className="flex items-center space-x-2">
                  <Field name="terms">
                    {({ field }: { field: { value: boolean } }) => (
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={(checked) => setFieldValue('terms', checked)}
                      />
                    )}
                  </Field>
                  <Label htmlFor="terms" className="text-sm font-normal">
                    Eu aceito os <a href="#" className="text-primary underline">termos de uso</a> *
                  </Label>
                </div>
                <ErrorMessage name="terms">
                  {msg => <p className="text-sm text-destructive">{msg}</p>}
                </ErrorMessage>

                <div className="flex items-center space-x-2">
                  <Field name="privacy">
                    {({ field }: { field: { value: boolean } }) => (
                      <Checkbox
                        id="privacy"
                        checked={field.value}
                        onCheckedChange={(checked) => setFieldValue('privacy', checked)}
                      />
                    )}
                  </Field>
                  <Label htmlFor="privacy" className="text-sm font-normal">
                    Eu aceito a <a href="#" className="text-primary underline">política de privacidade</a> *
                  </Label>
                </div>
                <ErrorMessage name="privacy">
                  {msg => <p className="text-sm text-destructive">{msg}</p>}
                </ErrorMessage>
              </CardContent>
            </Card>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button type="button" variant="outline" className="sm:w-auto">
                Salvar Rascunho
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || formikSubmitting}
                className="sm:w-auto"
              >
                {isSubmitting || formikSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Enviar Formulário
                  </>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
