'use client'

import { useState } from 'react'
import { Menu, Bell, RefreshCw, Zap } from 'lucide-react'
import { useEmailStore } from '@/store/emailStore'

interface HeaderProps {
  onMenuClick?: () => void
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { fetchEmails, isFetchingEmails } = useEmailStore()
  const [hasNotifications, setHasNotifications] = useState(true)

  return (
    <header className="h-20 glass-panel border-b border-white/10 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile toggle */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 lg:hidden whitespace-nowrap"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Header Title & Subtitle */}
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            Email Scraping & Outreach Console
            <span className="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-md">
              Active
            </span>
          </h1>
          <p className="text-xs text-gray-400">Discover leads, manage templates, and send campaigns</p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Sync Emails button */}
        <button
          onClick={() => fetchEmails()}
          disabled={isFetchingEmails}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-semibold text-gray-200 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isFetchingEmails ? 'animate-spin' : ''}`} />
          <span className="hidden md:inline">Sync Leads</span>
        </button>

        {/* Quick Launch CTA */}
        <a
          href="/scrape"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-all whitespace-nowrap"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          Scrape UK Leads
        </a>

        {/* Notifications Icon */}
        <button
          onClick={() => setHasNotifications(false)}
          className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-gray-300 hover:text-white transition-colors whitespace-nowrap"
        >
          <Bell className="w-4 h-4" />
          {hasNotifications && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
          )}
        </button>
      </div>
    </header>
  )
}

