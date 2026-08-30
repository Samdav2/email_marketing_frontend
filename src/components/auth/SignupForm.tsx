'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User as UserIcon, Mail, Lock, Loader2, ArrowRight, Sparkles } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export const SignupForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading, error, clearError } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }
    try {
      await signup(name, email, password)
      toast.success('Account created successfully! Welcome aboard.')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.message || 'Signup failed')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 mx-auto flex items-center justify-center glow-cyan mb-3">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-white">Create LeadFlow Account</h2>
        <p className="text-xs text-gray-400 mt-1">Start discovering UK leads & automated outreach</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Mercer"
              required
              className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Work Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@leadflow.uk"
              required
              className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Password (Min 8 characters)
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              minLength={8}
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
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-white/10 text-center">
        <p className="text-xs text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-cyan-400 font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
