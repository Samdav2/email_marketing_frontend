'use client'

import Link from 'next/link'
import { Mail, Sparkles, ArrowRight, ShieldCheck, Database } from 'lucide-react'

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center glow-blue group-hover:scale-105 transition-transform">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">LeadFlow</span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                UK Scraper
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">B2B Email Intelligence</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#features" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Features
          </Link>
          <Link href="#scraping" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <Database className="w-4 h-4 text-blue-400" />
            UK Engine
          </Link>
          <Link href="#security" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Compliance
          </Link>
          <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
            Live Demo
          </Link>
        </nav>

        {/* Auth CTA Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 flex items-center gap-2 group"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </header>
  )
}
