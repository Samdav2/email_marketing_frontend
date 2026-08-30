import Link from 'next/link'
import { Navbar } from '@/components/common/Navbar'
import {
  ArrowRight,
  Database,
  Mail,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Filter,
  BarChart3,
  Globe,
  Sparkles,
  Users,
  Send,
} from 'lucide-react'

export const metadata = {
  title: 'LeadFlow UK | Next-Gen UK B2B Email Scraping & Campaign Engine',
  description: 'Automated UK domain discovery, CDX email scraping, HTML template studio, and deliverability-optimized bulk email campaigns.',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 bg-grid-pattern bg-radial-glow overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-8 animate-pulse-subtle">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Powered by FastAPI + CDX UK Common Crawl Archive
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight mb-8">
          Scrape Verified <span className="text-gradient">UK Business Emails</span> & Automate Outreach
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Discover thousand of UK enterprise leads in seconds. Filter by domain, inspect verified contacts, craft dynamic responsive emails, and dispatch targeted campaigns with complete tracking.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-3 group"
          >
            Launch Free Engine
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel hover:bg-white/10 text-white font-bold text-base border border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            View Live Dashboard
          </Link>
        </div>

        {/* Live Hero Stats Glass Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl">
          <div className="text-center p-3">
            <p className="text-3xl font-extrabold text-white tracking-tight">100,000+</p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">UK Domains Indexed</p>
          </div>
          <div className="text-center p-3 border-l border-white/10">
            <p className="text-3xl font-extrabold text-cyan-400 tracking-tight">98.4%</p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">Inbox Deliverability</p>
          </div>
          <div className="text-center p-3 border-l border-white/10">
            <p className="text-3xl font-extrabold text-indigo-400 tracking-tight">10 Batch</p>
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
          <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">Engine Capabilities</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Built for High-Growth Sales & Marketing</h3>
          <p className="text-gray-400 text-sm mt-3">
            Everything you need from initial UK web discovery to campaign dispatch in a single unified console.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 hover:border-blue-500/40 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 glow-blue">
              <Database className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Automated UK Scraper</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Connect directly to UK web archives. Discover valid decision-maker emails with automated deduplication and domain verification.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Custom email & domain limits
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Live status progress monitor
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 glow-cyan">
              <Mail className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Template Studio</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Access 10+ professional email templates (Newsletter, Cold Sales, Onboarding, Webinar) or design custom HTML templates with dynamic tag replacement.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Live HTML WYSIWYG preview
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Dynamic variables ({`{company_name}`})
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-8 rounded-3xl border border-white/10 hover:border-purple-500/40 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6 glow-purple">
              <Send className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Bulk Campaign Dispatch</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Dispatch email campaigns to thousands of leads in optimized 10-mail batches with complete delivery metrics and failure logs.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Batched SMTP execution
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Instant CSV export & reporting
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-cyan-500/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Ready to Supercharge Your UK B2B Pipeline?
          </h3>
          <p className="text-gray-300 text-base max-w-xl mx-auto mb-10">
            Sign in to start scraping UK leads, manage templates, and launch your first email campaign in minutes.
          </p>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 transition-all"
          >
            Enter Scraping Console
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 LeadFlow UK Email Scraper & Campaign Engine. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-gray-300">
              Sign In
            </Link>
            <Link href="/signup" className="hover:text-gray-300">
              Sign Up
            </Link>
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
