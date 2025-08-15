import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/router.jsx'
import AuthProvider from './Contexts/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import AppThemeProvider from './theme-provider'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>  {/* <-- Wrap everything with ThemeProvider */}
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <ToastContainer />
      </AppThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)


