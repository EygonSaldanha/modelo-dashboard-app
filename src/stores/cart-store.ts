import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  price: number
  image?: string
  category: string
  description?: string
  stock: number
}

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
  itemCount: number
  
  // Actions
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (isOpen: boolean) => void
  
  // Computed properties
  getCartTotal: () => number
  getCartItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,
      itemCount: 0,

      addItem: (product: Product, quantity = 1) => {
        const items = get().items
        const existingItem = items.find(item => item.id === product.id)

        if (existingItem) {
          // Se o item já existe, aumenta a quantidade
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) }
                : item
            )
          })
        } else {
          // Se é um item novo, adiciona ao carrinho
          set({
            items: [...items, { ...product, quantity: Math.min(quantity, product.stock) }]
          })
        }

        // Atualizar totais
        const newState = get()
        set({
          total: newState.getCartTotal(),
          itemCount: newState.getCartItemCount()
        })
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter(item => item.id !== productId)
        })

        // Atualizar totais
        const newState = get()
        set({
          total: newState.getCartTotal(),
          itemCount: newState.getCartItemCount()
        })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set({
          items: get().items.map(item =>
            item.id === productId
              ? { ...item, quantity: Math.min(quantity, item.stock) }
              : item
          )
        })

        // Atualizar totais
        const newState = get()
        set({
          total: newState.getCartTotal(),
          itemCount: newState.getCartItemCount()
        })
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0
        })
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen })
      },

      setCartOpen: (isOpen: boolean) => {
        set({ isOpen })
      },

      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      getCartItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        items: state.items 
      })
    }
  )
)
