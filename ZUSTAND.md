# Zustand - Gerenciamento de Estado Global

Este projeto utiliza **Zustand** para gerenciamento de estado global, proporcionando uma solução simples e eficiente para compartilhar dados entre componentes.

## 📁 Estrutura das Stores

```
src/stores/
├── index.ts              # Exportações centralizadas
├── user-store.ts         # Gerenciamento de usuário e autenticação
├── cart-store.ts         # Carrinho de compras
└── notification-store.ts # Sistema de notificações
```

## 🔧 Stores Implementadas

### 1. User Store (`user-store.ts`)

Gerencia autenticação e dados do usuário com persistência local.

**Estados:**
- `user`: Dados do usuário logado
- `isAuthenticated`: Status de autenticação
- `isLoading`: Estado de carregamento

**Ações:**
- `setUser()`: Define dados do usuário
- `updateUser()`: Atualiza dados parciais
- `login()`: Realiza autenticação
- `logout()`: Remove autenticação
- `updatePreferences()`: Atualiza preferências

**Exemplo de uso:**
```tsx
import { useUserStore } from '@/stores'

function LoginComponent() {
  const { user, isAuthenticated, login, logout } = useUserStore()
  
  if (isAuthenticated) {
    return (
      <div>
        <p>Olá, {user?.name}!</p>
        <button onClick={logout}>Sair</button>
      </div>
    )
  }
  
  return (
    <button onClick={() => login('email@test.com', '123456')}>
      Entrar
    </button>
  )
}
```

### 2. Cart Store (`cart-store.ts`)

Gerencia carrinho de compras com cálculos automáticos e persistência.

**Estados:**
- `items`: Lista de produtos no carrinho
- `isOpen`: Estado do painel lateral
- `total`: Valor total calculado automaticamente
- `itemCount`: Número total de itens

**Ações:**
- `addItem()`: Adiciona produto ao carrinho
- `removeItem()`: Remove produto
- `updateQuantity()`: Atualiza quantidade
- `clearCart()`: Limpa carrinho
- `toggleCart()`: Alterna visibilidade

**Exemplo de uso:**
```tsx
import { useCartStore } from '@/stores'

function ProductCard({ product }) {
  const { addItem, items, total } = useCartStore()
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>R$ {product.price}</p>
      <button onClick={() => addItem(product)}>
        Adicionar ao Carrinho
      </button>
      <p>Total no carrinho: R$ {total.toFixed(2)}</p>
    </div>
  )
}
```

### 3. Notification Store (`notification-store.ts`)

Sistema de notificações com auto-remoção e diferentes tipos.

**Estados:**
- `notifications`: Lista de notificações
- `unreadCount`: Contador de não lidas

**Ações:**
- `addNotification()`: Adiciona notificação
- `removeNotification()`: Remove notificação
- `markAsRead()`: Marca como lida
- `success()`, `error()`, `warning()`, `info()`: Helpers para tipos específicos

**Exemplo de uso:**
```tsx
import { useNotificationStore } from '@/stores'

function ActionButton() {
  const { success, error } = useNotificationStore()
  
  const handleAction = async () => {
    try {
      await someApiCall()
      success("Sucesso!", "Operação realizada com sucesso")
    } catch (err) {
      error("Erro!", "Algo deu errado")
    }
  }
  
  return <button onClick={handleAction}>Executar Ação</button>
}
```

## 🎯 Características do Zustand

### ✅ Vantagens

1. **Simplicidade**: API mínima e intuitiva
2. **Performance**: Re-renderizações otimizadas
3. **TypeScript**: Suporte nativo completo
4. **Tamanho**: Apenas ~2.5KB minificado
5. **Flexibilidade**: Funciona com qualquer paradigma React
6. **Devtools**: Integração com Redux DevTools

### 🔧 Funcionalidades Utilizadas

#### Persistência
```typescript
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // estado e ações
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)
```

#### Computed Values
```typescript
getCartTotal: () => {
  return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
}
```

#### Async Actions
```typescript
login: async (email: string, password: string) => {
  set({ isLoading: true })
  try {
    const user = await authAPI.login(email, password)
    set({ user, isAuthenticated: true, isLoading: false })
  } catch (error) {
    set({ isLoading: false })
    throw error
  }
}
```

## 🚀 Demo Interativa

Acesse `/zustand-demo` para ver um exemplo completo e interativo de todas as funcionalidades implementadas:

- **User Store**: Login/logout com simulação de API
- **Cart Store**: Adicionar/remover produtos com persistência
- **Notification Store**: Diferentes tipos de notificações

## 📱 Componentes Integrados

### CartButton & Cart
- Botão com badge de contador
- Painel lateral com gerenciamento de itens
- Integração completa com a store

### NotificationBell & NotificationList
- Sino de notificações com contador
- Lista expandível com ações
- Auto-remoção por tempo

### Sidebar Integration
- Exibe dados do usuário logado
- Atualização reativa do estado

## 🎨 Padrões de Uso

### 1. Hooks Personalizados
```typescript
// Custom hook para notificações automáticas
export function useAutoNotifications() {
  const { info } = useNotificationStore()
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      info("Bem-vindo!", "Explore as funcionalidades")
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [info])
}
```

### 2. Seletores Específicos
```typescript
// Selecionar apenas partes específicas do estado
const itemCount = useCartStore(state => state.itemCount)
const isLoggedIn = useUserStore(state => state.isAuthenticated)
```

### 3. Actions Outside Components
```typescript
// Usar actions fora de componentes
import { useCartStore } from '@/stores'

export function addProductToCart(product: Product) {
  useCartStore.getState().addItem(product)
}
```

## 🔄 Fluxo de Dados

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │───▶│    Actions      │───▶│     State       │
│                 │    │                 │    │                 │
│ - User actions  │    │ - login()       │    │ - user          │
│ - UI events     │    │ - addItem()     │    │ - cart items    │
│ - Form submits  │    │ - notify()      │    │ - notifications │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                                              │
         │              ┌─────────────────┐              │
         └──────────────│   Subscribers   │◀─────────────┘
                        │                 │
                        │ - Re-renders    │
                        │ - Side effects  │
                        │ - Persistence   │
                        └─────────────────┘
```

## 🎯 Melhores Práticas

1. **Organize por domínio**: Uma store por área de funcionalidade
2. **Use TypeScript**: Defina interfaces claras para states
3. **Implemente persistência seletiva**: Apenas dados importantes
4. **Crie actions específicas**: Evite manipulação direta do estado
5. **Use computed values**: Para cálculos derivados
6. **Implemente loading states**: Para melhor UX em operações async

## 🚀 Próximos Passos

- [ ] Implementar middleware de logging
- [ ] Adicionar testes unitários para stores
- [ ] Integrar com React Query para cache de servidor
- [ ] Implementar undo/redo para cart
- [ ] Adicionar websockets para notificações em tempo real

---

O Zustand oferece uma solução elegante e performática para gerenciamento de estado, mantendo a simplicidade sem sacrificar funcionalidades avançadas.
