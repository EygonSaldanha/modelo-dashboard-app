import { create } from 'zustand'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  createdAt: Date
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => string
  removeNotification: (id: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
  
  // Toast helpers
  success: (title: string, message?: string, duration?: number) => string
  error: (title: string, message?: string, duration?: number) => string
  warning: (title: string, message?: string, duration?: number) => string
  info: (title: string, message?: string, duration?: number) => string
}

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => {
    const id = generateId()
    const newNotification: Notification = {
      ...notification,
      id,
      createdAt: new Date(),
      read: false
    }

    set(state => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }))

    // Auto remove após duração especificada
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(id)
      }, notification.duration)
    }

    return id
  },

  removeNotification: (id) => {
    set(state => {
      const notification = state.notifications.find(n => n.id === id)
      const wasUnread = notification && !notification.read
      
      return {
        notifications: state.notifications.filter(n => n.id !== id),
        unreadCount: wasUnread ? state.unreadCount - 1 : state.unreadCount
      }
    })
  },

  markAsRead: (id) => {
    set(state => {
      const notification = state.notifications.find(n => n.id === id)
      if (!notification || notification.read) return state

      return {
        notifications: state.notifications.map(n =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: state.unreadCount - 1
      }
    })
  },

  markAllAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0
    }))
  },

  clearAll: () => {
    set({
      notifications: [],
      unreadCount: 0
    })
  },

  // Toast helpers
  success: (title, message, duration = 5000) => {
    return get().addNotification({
      title,
      message: message || '',
      type: 'success',
      duration
    })
  },

  error: (title, message, duration = 0) => {
    return get().addNotification({
      title,
      message: message || '',
      type: 'error',
      duration
    })
  },

  warning: (title, message, duration = 7000) => {
    return get().addNotification({
      title,
      message: message || '',
      type: 'warning',
      duration
    })
  },

  info: (title, message, duration = 5000) => {
    return get().addNotification({
      title,
      message: message || '',
      type: 'info',
      duration
    })
  }
}))
