"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ShoppingCart, 
  User, 
  Bell, 
  Plus, 
  Minus, 
  Trash2,
  UserCheck,
  LogIn,
  LogOut 
} from "lucide-react"
import { 
  useUserStore, 
  useCartStore, 
  useNotificationStore,
  type Product 
} from "@/stores"
import { Cart, CartButton } from "@/components/cart"
import { NotificationBell, useAutoNotifications } from "@/components/notifications"

// Produtos de exemplo
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone Premium",
    price: 2499.99,
    category: "Eletrônicos",
    description: "Smartphone com câmera avançada e bateria de longa duração",
    stock: 15
  },
  {
    id: "2", 
    name: "Notebook Gamer",
    price: 3999.99,
    category: "Informática",
    description: "Notebook para jogos com placa de vídeo dedicada",
    stock: 8
  },
  {
    id: "3",
    name: "Headset Bluetooth",
    price: 299.99,
    category: "Acessórios",
    description: "Fone de ouvido sem fio com cancelamento de ruído",
    stock: 25
  }
]

export default function ZustandDemoPage() {
  // Auto notifications hook
  useAutoNotifications()

  // User store
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout,
    setUser 
  } = useUserStore()

  // Cart store
  const { 
    items, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart,
    getCartTotal,
    getCartItemCount
  } = useCartStore()

  // Notification store
  const { 
    success, 
    error, 
    warning, 
    info, 
    notifications, 
    unreadCount 
  } = useNotificationStore()

  // Login form state
  const [loginForm, setLoginForm] = React.useState({
    email: 'joao@empresa.com',
    password: '123456'
  })

  const handleLogin = async () => {
    try {
      await login(loginForm.email, loginForm.password)
      success("Login realizado!", "Bem-vindo de volta!")
    } catch {
      error("Erro no login", "Credenciais inválidas")
    }
  }

  const handleLogout = () => {
    logout()
    info("Logout realizado", "Até a próxima!")
  }

  const handleAddToCart = (product: Product) => {
    addItem(product)
    success("Produto adicionado!", `${product.name} foi adicionado ao carrinho`)
  }

  const simulateUser = () => {
    const mockUser = {
      id: '1',
      name: 'João Silva',
      email: 'joao@empresa.com', 
      avatar: '/avatars/user.jpg',
      role: 'admin' as const,
      preferences: {
        theme: 'system' as const,
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        notifications: {
          email: true,
          push: true,
          sms: false
        }
      }
    }
    setUser(mockUser)
    success("Usuário simulado!", "Estado do usuário foi definido")
  }

  const testNotifications = () => {
    success("Sucesso!", "Esta é uma notificação de sucesso")
    setTimeout(() => error("Erro!", "Esta é uma notificação de erro"), 500)
    setTimeout(() => warning("Atenção!", "Esta é uma notificação de aviso"), 1000)
    setTimeout(() => info("Informação", "Esta é uma notificação informativa"), 1500)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Demo do Zustand</h1>
        <p className="text-muted-foreground">
          Exemplo prático de gerenciamento de estado global com Zustand
        </p>
      </div>

      {/* Header com botões de ação */}
      <div className="flex justify-center space-x-2">
        <CartButton />
        <NotificationBell />
        <Cart />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Store Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Store
            </CardTitle>
            <CardDescription>
              Gerenciamento de autenticação e dados do usuário
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isAuthenticated ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleLogin} 
                    disabled={isLoading}
                    className="flex-1"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={simulateUser}
                    className="flex-1"
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Simular
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <Badge variant="secondary">{user?.role}</Badge>
                </div>
                <Button onClick={handleLogout} variant="outline" className="w-full">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Store Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Store
            </CardTitle>
            <CardDescription>
              Sistema de notificações com diferentes tipos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => success("Sucesso!", "Operação realizada com sucesso")}
              >
                Sucesso
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => error("Erro!", "Algo deu errado")}
              >
                Erro
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => warning("Atenção!", "Verifique os dados")}
              >
                Aviso
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => info("Info", "Informação importante")}
              >
                Info
              </Button>
            </div>
            
            <Button onClick={testNotifications} className="w-full">
              Testar Todas
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Notificações: {notifications.length}</p>
              <p>Não lidas: {unreadCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cart Store Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Cart Store
          </CardTitle>
          <CardDescription>
            Gerenciamento de carrinho de compras com persistência
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            {sampleProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <p className="font-semibold text-lg">{formatPrice(product.price)}</p>
                  <p className="text-xs text-muted-foreground">
                    Estoque: {product.stock} unidades
                  </p>
                </div>
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Resumo do Carrinho</h4>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearCart}
                disabled={items.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Itens</p>
                <p className="text-xl font-bold">{getCartItemCount()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Produtos</p>
                <p className="text-xl font-bold">{items.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-xl font-bold">{formatPrice(getCartTotal())}</p>
              </div>
            </div>

            {items.length > 0 && (
              <div className="space-y-2">
                <h5 className="font-medium">Itens no carrinho:</h5>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(item.price)} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
