"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
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

interface CompleteFormProps {
  onSubmit?: (data: Record<string, unknown>) => void
}

export function CompleteForm({ onSubmit }: CompleteFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [selectedInterests, setSelectedInterests] = React.useState<string[]>([])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Record<string, unknown>>({
    defaultValues: {
      newsletter: false,
      terms: false,
      privacy: false,
      interests: [],
    }
  })


  const handleInterestChange = (interest: string, checked: boolean) => {
    let newInterests: string[]
    
    if (checked) {
      if (selectedInterests.length >= 5) {
        toast.error("Você pode selecionar no máximo 5 interesses")
        return
      }
      newInterests = [...selectedInterests, interest]
    } else {
      newInterests = selectedInterests.filter(i => i !== interest)
    }
    
    setSelectedInterests(newInterests)
  }

  const onFormSubmit = async (data: Record<string, unknown>) => {
    setIsSubmitting(true)
    
    try {
      // Simular envio de dados
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (onSubmit) {
        onSubmit(data)
      }
      
      toast.success("Formulário enviado com sucesso!", {
        description: "Seus dados foram salvos e processados.",
      })
      
      console.log("Dados do formulário:", data)
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

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
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
                <Input
                  id="firstName"
                  placeholder="Seu nome"
                  {...register("firstName")}
                  aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome *</Label>
                <Input
                  id="lastName"
                  placeholder="Seu sobrenome"
                  {...register("lastName")}
                  aria-invalid={errors.lastName ? "true" : "false"}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="(11) 99999-9999"
                    className="pl-10"
                    {...register("phone")}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Data de Nascimento *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    className="pl-10"
                    {...register("dateOfBirth")}
                    aria-invalid={errors.dateOfBirth ? "true" : "false"}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gênero *</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value as string}>
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
                />
                {errors.gender && (
                  <p className="text-sm text-destructive">{errors.gender.message}</p>
                )}
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
                <Input
                  id="address.street"
                  placeholder="Rua, avenida..."
                  {...register("address.street")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.number">Número *</Label>
                <Input
                  id="address.number"
                  placeholder="123"
                  {...register("address.number")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.complement">Complemento</Label>
                <Input
                  id="address.complement"
                  placeholder="Apartamento, sala..."
                  {...register("address.complement")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.neighborhood">Bairro *</Label>
                <Input
                  id="address.neighborhood"
                  placeholder="Seu bairro"
                  {...register("address.neighborhood")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.city">Cidade *</Label>
                <Input
                  id="address.city"
                  placeholder="Sua cidade"
                  {...register("address.city")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.state">Estado *</Label>
                <Input
                  id="address.state"
                  placeholder="SP"
                  maxLength={2}
                  {...register("address.state")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.zipCode">CEP *</Label>
                <Input
                  id="address.zipCode"
                  placeholder="00000-000"
                  {...register("address.zipCode")}
                />
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
                <Input
                  id="occupation"
                  placeholder="Sua profissão"
                  {...register("occupation")}
                  aria-invalid={errors.occupation ? "true" : "false"}
                />
                {errors.occupation && (
                  <p className="text-sm text-destructive">{errors.occupation.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  placeholder="Nome da empresa (opcional)"
                  {...register("company")}
                />
                {errors.company && (
                  <p className="text-sm text-destructive">{errors.company.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="income">Renda Mensal *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="income"
                  placeholder="0000.00"
                  className="pl-10"
                  {...register("income")}
                  aria-invalid={errors.income ? "true" : "false"}
                />
              </div>
              {errors.income && (
                <p className="text-sm text-destructive">{errors.income.message}</p>
              )}
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
                  <Checkbox
                    id={interest}
                    checked={selectedInterests.includes(interest)}
                    onCheckedChange={(checked) => 
                      handleInterestChange(interest, checked as boolean)
                    }
                  />
                  <Label htmlFor={interest} className="text-sm font-normal">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
            {errors.interests && (
              <p className="text-sm text-destructive mt-2">{errors.interests.message}</p>
            )}
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
              <Textarea
                id="bio"
                placeholder="Conte um pouco sobre você..."
                rows={4}
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-destructive">{errors.bio.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://seusite.com"
                    className="pl-10"
                    {...register("website")}
                  />
                </div>
                {errors.website && (
                  <p className="text-sm text-destructive">{errors.website.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/seu-perfil"
                    className="pl-10"
                    {...register("linkedin")}
                  />
                </div>
                {errors.linkedin && (
                  <p className="text-sm text-destructive">{errors.linkedin.message}</p>
                )}
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
              <Controller
                name="newsletter"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="newsletter"
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="newsletter" className="text-sm font-normal">
                Desejo receber newsletter e novidades por email
              </Label>
            </div>

            <Separator />

            <div className="flex items-center space-x-2">
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="terms"
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                Eu aceito os <a href="#" className="text-primary underline">termos de uso</a> *
              </Label>
            </div>
            {errors.terms && (
              <p className="text-sm text-destructive">{errors.terms.message}</p>
            )}

            <div className="flex items-center space-x-2">
              <Controller
                name="privacy"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="privacy"
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="privacy" className="text-sm font-normal">
                Eu aceito a <a href="#" className="text-primary underline">política de privacidade</a> *
              </Label>
            </div>
            {errors.privacy && (
              <p className="text-sm text-destructive">{errors.privacy.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button type="button" variant="outline" className="sm:w-auto">
            Salvar Rascunho
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="sm:w-auto"
          >
            {isSubmitting ? (
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
      </form>
    </div>
  )
}
