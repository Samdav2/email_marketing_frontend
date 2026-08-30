'use client'

import { useState } from 'react'
import { Menu, Search, Bell, Sparkles, RefreshCw, Zap } from 'lucide-react'
import { useEmailStore } from '@/store/emailStore'

interface HeaderProps {
  onMenuClick?: () => void
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { fetchEmails, isFetchingEmails, totalEmails } = useEmailStore()
  const [hasNotifications, setHasNotifications] = useState(true)

  return (
    <header className="h-20 glass-panel border-b border-white/10 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile toggle */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Header Title & Subtitle */}
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            Email Scraping & Outreach Console
            <span className="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">
              UK Active
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
          className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-xs font-semibold text-gray-200 transition-all flex items-center gap-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isFetchingEmails ? 'animate-spin' : ''}`} />
          <span className="hidden md:inline">Sync Leads</span>
        </button>

        {/* Quick Launch CTA */}
        <a
          href="/scrape"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          Scrape UK Leads
        </a>

        {/* Notifications Icon */}
        <button
          onClick={() => setHasNotifications(false)}
          className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-gray-300 hover:text-white transition-colors"
        >
          <Bell className="w-4 h-4" />
          {hasNotifications && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          )}
        </button>
      </div>
    </header>
  )
}
