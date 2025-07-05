import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'moderator'
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: string
    timezone: string
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
  }
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
  clearUser: () => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updatePreferences: (preferences: Partial<User['preferences']>) => void
}

const defaultUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@empresa.com',
  avatar: '/avatars/user.jpg',
  role: 'admin',
  preferences: {
    theme: 'system',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  }
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },

      clearUser: () => {
        set({ user: null, isAuthenticated: false })
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        
        try {
          // Simular chamada de API
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Simular autenticação bem-sucedida
          if (email === 'joao@empresa.com' && password === '123456') {
            set({ 
              user: defaultUser, 
              isAuthenticated: true, 
              isLoading: false 
            })
          } else {
            throw new Error('Credenciais inválidas')
          }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updatePreferences: (preferences: Partial<User['preferences']>) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              preferences: {
                ...currentUser.preferences,
                ...preferences
              }
            }
          })
        }
      }
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
