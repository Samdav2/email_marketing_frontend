import Link from 'next/link'
import { Navbar } from '@/components/common/Navbar'
import {
  ArrowRight,
  Database,
  Mail,
  CheckCircle2,
  Send,
  ShieldCheck,
  Globe,
  BarChart3,
} from 'lucide-react'

export const metadata = {
  title: 'LeadFlow UK | UK B2B Email Scraping & Campaign Engine',
  description: 'Automated UK domain discovery, email scraping, HTML template studio, and bulk email outreach campaigns.',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070a11] text-slate-100 bg-grid-pattern overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-blue-500/30 text-blue-400 text-xs font-bold mb-8">
          <CheckCircle2 className="w-4 h-4 text-blue-400" />
          Automated UK B2B Lead Scraping & Campaign Engine
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight mb-8">
          Scrape Verified <span className="text-blue-500">UK Business Emails</span> & Automate Outreach
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Discover thousands of UK enterprise leads in seconds. Filter by domain, inspect verified contacts, craft dynamic responsive emails, and dispatch targeted campaigns with complete tracking.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base transition-all flex items-center justify-center gap-3 whitespace-nowrap"
          >
            Launch Free Engine
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel hover:bg-white/10 text-white font-bold text-base border border-white/10 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            View Live Dashboard
          </Link>
        </div>

        {/* Live Hero Stats Glass Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto glass-panel p-6 rounded-2xl border border-white/10 shadow-xl">
          <div className="text-center p-3">
            <p className="text-3xl font-extrabold text-white tracking-tight">100,000+</p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">UK Domains Indexed</p>
          </div>
          <div className="text-center p-3 border-l border-white/10">
            <p className="text-3xl font-extrabold text-blue-400 tracking-tight">98.4%</p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Inbox Deliverability</p>
          </div>
          <div className="text-center p-3 border-l border-white/10">
            <p className="text-3xl font-extrabold text-blue-400 tracking-tight">10 Batch</p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Parallel Streams</p>
          </div>
          <div className="text-center p-3 border-l border-white/10">
            <p className="text-3xl font-extrabold text-emerald-400 tracking-tight">0 ms</p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Duplicate Rate</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Engine Capabilities</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Built for High-Growth Sales & Marketing</h3>
          <p className="text-gray-300 text-sm mt-3">
            Everything you need from initial UK web discovery to campaign dispatch in a single unified console.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 hover:border-blue-500/40 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6">
              <Database className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Automated UK Scraper</h4>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Discover valid decision-maker emails with automated deduplication, domain verification, and category filtering.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                Custom email & domain limits
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                Live status progress monitor
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 hover:border-blue-500/40 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6">
              <Mail className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Template Studio</h4>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Access professional email templates (Newsletter, Cold Sales, Onboarding) or design custom HTML templates with dynamic tag replacement.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                Live HTML preview
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                Dynamic variables ({`{company_name}`})
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 hover:border-blue-500/40 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6">
              <Send className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Bulk Campaign Dispatch</h4>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Dispatch email campaigns to thousands of leads in optimized batches with complete delivery metrics and failure logs.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                Batched execution engine
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                Instant CSV export & reporting
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-blue-500/30 text-center relative overflow-hidden bg-slate-900">
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Ready to Supercharge Your UK B2B Pipeline?
          </h3>
          <p className="text-gray-300 text-base max-w-xl mx-auto mb-10">
            Sign in to start scraping UK leads, manage templates, and launch your first email campaign in minutes.
          </p>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base transition-all whitespace-nowrap"
          >
            Enter Scraping Console
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-4 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 LeadFlow UK Email Scraper & Campaign Engine. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-white whitespace-nowrap">
              Sign In
            </Link>
            <Link href="/signup" className="hover:text-white whitespace-nowrap">
              Sign Up
            </Link>
            <Link href="/dashboard" className="hover:text-white whitespace-nowrap">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

