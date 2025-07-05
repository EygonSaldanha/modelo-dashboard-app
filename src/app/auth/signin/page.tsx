"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github, Mail, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email inválido")
    .required("Email é obrigatório"),
  password: Yup.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória")
})

const initialValues = {
  email: "",
  password: ""
}

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleCredentialsLogin = async (values: typeof initialValues) => {
    setIsLoading(true)
    
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Credenciais inválidas. Tente novamente.")
      } else {
        toast.success("Login realizado com sucesso!")
        
        // Recarregar a sessão e redirecionar
        await getSession()
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.")
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGitHubLogin = async () => {
    setIsLoading(true)
    try {
      await signIn("github", { callbackUrl: "/" })
    } catch {
      toast.error("Erro ao fazer login com GitHub")
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/" })
    } catch {
      toast.error("Erro ao fazer login com Google")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Entrar na sua conta</CardTitle>
          <CardDescription>
            Escolha como você gostaria de fazer login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Providers externos */}
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGitHubLogin}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              Continuar com GitHub
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Mail className="mr-2 h-4 w-4" />
              Continuar com Google
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-background px-2 text-muted-foreground text-sm">
                ou
              </span>
            </div>
          </div>

          {/* Login com credenciais */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCredentialsLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    disabled={isLoading}
                  />
                  <ErrorMessage name="email">
                    {msg => <p className="text-sm text-destructive">{msg}</p>}
                  </ErrorMessage>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      disabled={isLoading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  <ErrorMessage name="password">
                    {msg => <p className="text-sm text-destructive">{msg}</p>}
                  </ErrorMessage>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading || isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Para testar o login, use:
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Email: <strong>admin@example.com</strong> | Senha: <strong>admin123</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Email: <strong>john@example.com</strong> | Senha: <strong>user123</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
