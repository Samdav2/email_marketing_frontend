'use client'

import { useState, useEffect } from 'react'
import {
  UserCheck,
  Building,
  Globe,
  Phone,
  MapPin,
  Save,
  CheckCircle2,
  Shield,
  Loader2,
  Key,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, profile, fetchProfile, updateProfile, isLoading } = useAuthStore()

  const [businessName, setBusinessName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [industry, setIndustry] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  useEffect(() => {
    if (profile) {
      setBusinessName(profile.business_name || '')
      setCompanyId(profile.company_id || '')
      setPhone(profile.phone || '')
      setWebsite(profile.website || '')
      setAddress(profile.address || '')
      setCity(profile.city || '')
      setPostalCode(profile.postal_code || '')
      setCountry(profile.country || 'United Kingdom')
      setIndustry(profile.industry || '')
      setCompanySize(profile.company_size || '10-50')
      setDescription(profile.description || '')
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateProfile({
        business_name: businessName,
        company_id: companyId,
        phone,
        website,
        address,
        city,
        postal_code: postalCode,
        country,
        industry,
        company_size: companySize,
        description,
      })
      toast.success('Business profile updated successfully!')
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile.')
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-white/10">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-emerald-400" />
            Account & Business Settings
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage your company profile, industry classification, and API integration.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
            <Building className="w-5 h-5 text-emerald-400" />
            Business & Enterprise Identity
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="LeadFlow UK Ltd"
                  required
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Company Registration ID *
                </label>
                <input
                  type="text"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  placeholder="LF-UK-9021"
                  required
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Official Website
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://leadflow.co.uk"
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 20 7946 0912"
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="100 Bishopsgate, Level 14"
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="EC2N 4AG"
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Industry Sector
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="Digital Marketing & Lead Gen"
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Company Size
                </label>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white"
                >
                  <option value="1-10">1 - 10 Employees</option>
                  <option value="10-50">10 - 50 Employees</option>
                  <option value="50-200">50 - 200 Employees</option>
                  <option value="200+">200+ Employees</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Business Overview / Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Enterprise lead acquisition & marketing automation platform..."
                className="w-full glass-input p-3 rounded-xl text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Profile...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Business Profile Settings
                </>
              )}
            </button>
          </form>
        </div>

        {/* User Account Info Box (1 Col) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
            <Shield className="w-5 h-5 text-blue-400" />
            Account Security & API
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
              <p className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">User Account</p>
              <p className="text-white font-bold text-sm">{user?.name || 'Alex Mercer'}</p>
              <p className="text-gray-300 font-mono">{user?.email || 'alex@leadflow.uk'}</p>
              <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                Active Member
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
              <p className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">JWT Authentication</p>
              <p className="text-gray-300 font-mono break-all text-[11px]">
                Bearer Token Active (Valid 30 days)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
              <p className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Backend Server Status</p>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                FastAPI Port 8000 Connected
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
