'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export const LoginForm = () => {
  const [email, setEmail] = useState('alex.mercer@leadflow.uk')
  const [password, setPassword] = useState('SecurePass123!')
  const { login, isLoading, error, clearError } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    try {
      await login(email, password)
      toast.success('Successfully authenticated!')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.message || 'Login failed')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 mx-auto flex items-center justify-center glow-blue mb-3">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
        <p className="text-xs text-gray-400 mt-1">Sign in to your UK Email Scraper & Campaign Engine</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Work Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.co.uk"
              required
              className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm font-medium"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Password
            </label>
            <span className="text-xs text-cyan-400 hover:underline cursor-pointer">Forgot password?</span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm font-medium"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Authenticating...
            </>
          ) : (
            <>
              Sign In to Console
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <p className="text-xs text-gray-400">
          Don't have an account yet?{' '}
          <Link href="/signup" className="text-cyan-400 font-bold hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}
