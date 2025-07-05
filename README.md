# Modern Web Application

A modern, responsive web application built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components.

## ✨ Features

- **🎨 Modern UI/UX**: Built with shadcn/ui components and Tailwind CSS
- **🌓 Dark/Light Mode**: System preference detection with manual toggle
- **📱 Responsive Design**: Mobile-first approach with responsive sidebar
- **📝 Contact Form**: Validated form with real-time error handling using Formik
- **🔔 Toast Notifications**: User feedback through sonner notifications
- **♿ Accessibility**: WCAG compliant with ARIA labels and keyboard navigation
- **⚡ Performance**: Optimized with Next.js 15 features and server components
- **🎯 TypeScript**: Full type safety throughout the application
- **🚀 Error Boundaries**: Graceful error handling with recovery options

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Formik** - Build forms with validation and Yup schema

### UI Components
- **shadcn/ui** - Reusable component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **next-themes** - Theme switching support
- **sonner** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **Tailwind Merge** - Utility merging
- **Class Variance Authority** - Component variants
- **clsx** - Conditional classnames

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with providers
│   └── page.tsx        # Dashboard page
├── components/         # Reusable components
│   ├── ui/            # shadcn/ui components
│   ├── app-sidebar.tsx # Application sidebar
│   ├── main-form.tsx  # Contact form component
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   ├── error-boundary.tsx
│   └── loading.tsx
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
│   └── utils.ts       # Shared utilities
├── types/             # TypeScript definitions
│   └── index.ts       # Type definitions
└── app/globals.css    # Global styles and CSS variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Features Explained

### Responsive Sidebar
- Collapsible sidebar with navigation items
- Mobile-responsive with overlay on small screens
- Accessible keyboard navigation

### Contact Form
- Real-time validation with Formik and Yup schemas
- Accessible error messages
- Loading states with visual feedback
- Toast notifications for success/error states

### Theme System
- System preference detection
- Manual light/dark mode toggle
- Smooth transitions between themes
- CSS variables for consistent theming

### Error Handling
- React Error Boundaries for graceful error recovery
- Development error details for debugging
- User-friendly error messages

## ♿ Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Semantic HTML**: Proper HTML structure
- **Color Contrast**: WCAG AA compliant colors
- **Focus Management**: Visible focus indicators

## 🎨 Customization

### Adding New Components
```bash
npx shadcn@latest add [component-name]
```

### Theming
Modify CSS variables in `src/app/globals.css` to customize the color scheme.

### Adding New Pages
Create new files in the `src/app` directory following Next.js App Router conventions.

## 📱 Responsive Design

The application uses a mobile-first approach:
- **Mobile (< 768px)**: Single column layout, overlay sidebar
- **Tablet (768px - 1024px)**: Responsive grid, collapsible sidebar
- **Desktop (> 1024px)**: Full layout with expanded sidebar

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific configurations:

```env
# Example configurations
NEXT_PUBLIC_APP_NAME="Modern Web App"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Built with ❤️ using Next.js and modern web technologies.
