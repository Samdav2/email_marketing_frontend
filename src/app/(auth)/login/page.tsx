import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Sign In | LeadFlow UK Email Scraper',
  description: 'Access your LeadFlow UK email scraping and campaign dashboard.',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-grid-pattern bg-radial-glow flex flex-col items-center justify-center p-4 relative">
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors glass-panel px-4 py-2 rounded-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-md my-12">
        <LoginForm />
      </div>
    </main>
  )
}
