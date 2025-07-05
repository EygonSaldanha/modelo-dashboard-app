"use client"

import * as React from "react"
import Link from "next/link"
import {
  Home,
  Settings,
  User,
  MessageCircle,
  FileText,
  HelpCircle,
  Calendar,
  BarChart3,
  ChevronRight,
  Users,
  Building,
  ShoppingCart,
  Package,
  CreditCard,
  TrendingUp,
  PieChart,
  Activity,
  Database,
  Shield,
  Bell,
  BookOpen,
  Phone,
  Mail,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ThemeToggle } from "@/components/theme-toggle"
import { useUserStore } from "@/stores"

// This is sample data for the sidebar
const data = {
  user: {
    name: "João Silva",
    email: "joao@empresa.com",
    avatar: "/avatars/avatar-01.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
      items: [
        {
          title: "Visão Geral",
          url: "/analytics/overview",
          icon: TrendingUp,
        },
        {
          title: "Relatórios",
          url: "/analytics/reports",
          icon: PieChart,
        },
        {
          title: "Métricas",
          url: "/analytics/metrics",
          icon: Activity,
        },
      ],
    },
    {
      title: "E-commerce",
      url: "/ecommerce",
      icon: ShoppingCart,
      items: [
        {
          title: "Produtos",
          url: "/ecommerce/products",
          icon: Package,
        },
        {
          title: "Pedidos",
          url: "/ecommerce/orders",
          icon: ShoppingCart,
        },
        {
          title: "Clientes",
          url: "/ecommerce/customers",
          icon: Users,
        },
        {
          title: "Pagamentos",
          url: "/ecommerce/payments",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "Formulários",
      url: "/forms",
      icon: FileText,
      items: [
        {
          title: "Formulário Completo",
          url: "/forms/complete",
          icon: FileText,
        },
        {
          title: "Contato",
          url: "/forms/contact",
          icon: MessageCircle,
        },
      ],
    },
    {
      title: "Gerenciamento",
      url: "/management",
      icon: Building,
      items: [
        {
          title: "Usuários",
          url: "/management/users",
          icon: Users,
        },
        {
          title: "Empresas",
          url: "/management/companies",
          icon: Building,
        },
        {
          title: "Dados",
          url: "/management/data",
          icon: Database,
        },
      ],
    },
    {
      title: "Calendário",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Demo Zustand",
      url: "/zustand-demo",
      icon: Database,
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "Perfil",
          url: "/settings/profile",
          icon: User,
        },
        {
          title: "Segurança",
          url: "/settings/security",
          icon: Shield,
        },
        {
          title: "Notificações",
          url: "/settings/notifications",
          icon: Bell,
        },
      ],
    },
    {
      title: "Suporte",
      url: "/support",
      icon: HelpCircle,
      items: [
        {
          title: "Central de Ajuda",
          url: "/support/help",
          icon: BookOpen,
        },
        {
          title: "Contato",
          url: "/support/contact",
          icon: Phone,
        },
        {
          title: "Feedback",
          url: "/support/feedback",
          icon: Mail,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUserStore()
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Home className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Modern Web App</span>
                  <span className="truncate text-xs">Built with Next.js</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <subItem.icon className="size-4" />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  <subItem.icon className="size-4" />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sidebar-primary/10">
                  <User className="h-3 w-3" />
                </div>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-medium">{user?.name || data.user.name}</span>
                  <span className="truncate text-[10px] text-muted-foreground">
                    {user?.email || data.user.email}
                  </span>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}
