'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Database,
  Mail,
  FileCode,
  Send,
  UserCheck,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useEmailStore } from '@/store/emailStore'

interface SidebarProps {
  mobileOpen?: boolean
  onCloseMobile?: () => void
}

export const Sidebar = ({ mobileOpen, onCloseMobile }: SidebarProps) => {
  const pathname = usePathname()
  const { logout, user } = useAuthStore()
  const { totalEmails, templates } = useEmailStore()

  const navItems = [
    {
      name: 'Overview',
      href: '/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Scraper Engine',
      href: '/scrape',
      icon: Database,
      badge: 'Live',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      name: 'Email Database',
      href: '/emails',
      icon: Mail,
      badge: totalEmails > 0 ? `${totalEmails}` : null,
      badgeColor: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    },
    {
      name: 'Template Studio',
      href: '/templates',
      icon: FileCode,
      badge: templates.length > 0 ? `${templates.length}` : null,
      badgeColor: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    },
    {
      name: 'Campaign Mailer',
      href: '/campaigns',
      icon: Send,
      badge: null,
    },
    {
      name: 'Account & Business',
      href: '/profile',
      icon: UserCheck,
      badge: null,
    },
  ]

  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 glass-panel border-r border-white/10 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 whitespace-nowrap">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">LeadFlow</span>
              <span className="block text-[10px] font-semibold text-blue-400 uppercase">
                UK Scrape Hub v1.1
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
            Command Center
          </p>

          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-400'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge ? (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                ) : isActive ? (
                  <ChevronRight className="w-4 h-4 text-white" />
                ) : null}
              </Link>
            )
          })}
        </div>

        {/* Quick System Health Box */}
        <div className="p-4 mx-4 mb-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-gray-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Service Status
            </span>
            <span className="text-emerald-400 font-bold">Online</span>
          </div>
          <p className="text-[11px] text-gray-400">Search engine & automated outreach pipeline active.</p>
        </div>

        {/* User Profile & Logout Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Alex Mercer'}</p>
              <p className="text-[11px] text-gray-400 truncate">{user?.email || 'alex@leadflow.uk'}</p>
            </div>
          </div>

          <button
            onClick={logout}
            title="Sign out"
            className="p-2 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors whitespace-nowrap"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  )
}

