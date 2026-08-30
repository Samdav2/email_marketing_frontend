'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/common/Sidebar'
import { Header } from '@/components/common/Header'
import { ToastProvider } from '@/components/common/ToastProvider'
import { useEmailStore } from '@/store/emailStore'
import { useAuthStore } from '@/store/authStore'
import { Loader2 } from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()
  const { fetchEmails, fetchTemplates } = useEmailStore()
  const { token, user, fetchProfile } = useAuthStore()

  useEffect(() => {
    // Check if token or user session is active
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user_data') : null

    if (!token && !storedToken && !user && !storedUser) {
      router.replace('/login')
      return
    }

    setIsCheckingAuth(false)
    fetchEmails()
    fetchTemplates()
    fetchProfile()
  }, [token, user, router])

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center animate-pulse">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        </div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Verifying Auth Session...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex overflow-hidden">
      <ToastProvider />

      {/* Sidebar Navigation */}
      <Sidebar mobileOpen={sidebarOpen} onCloseMobile={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-grid-pattern">
          {children}
        </main>
      </div>
    </div>
  )
}

