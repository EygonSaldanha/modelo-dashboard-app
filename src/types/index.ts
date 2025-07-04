export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface SidebarItem {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  items?: SidebarItem[];
}

export interface AppConfig {
  name: string;
  description: string;
  version: string;
}

export type Theme = 'light' | 'dark' | 'system';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
