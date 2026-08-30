'use client'

import { ReactNode, useState, useEffect } from 'react'
import { Sidebar } from '@/components/common/Sidebar'
import { Header } from '@/components/common/Header'
import { ToastProvider } from '@/components/common/ToastProvider'
import { useEmailStore } from '@/store/emailStore'
import { useAuthStore } from '@/store/authStore'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { fetchEmails, fetchTemplates } = useEmailStore()
  const { fetchProfile } = useAuthStore()

  useEffect(() => {
    fetchEmails()
    fetchTemplates()
    fetchProfile()
  }, [])

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
