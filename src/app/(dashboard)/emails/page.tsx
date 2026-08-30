'use client'

import { useState, useEffect } from 'react'
import {
  Mail,
  Search,
  Download,
  Send,
  CheckSquare,
  Square,
  Filter,
  RefreshCw,
  Trash2,
} from 'lucide-react'
import { useEmailStore } from '@/store/emailStore'
import { downloadCSV } from '@/lib/utils'
import { Modal } from '@/components/common/Modal'
import { apiClient } from '@/lib/api'
import toast from 'react-hot-toast'

export default function EmailsPage() {
  const { emails, totalEmails, isFetchingEmails, fetchEmails, templates } = useEmailStore()

  const [search, setSearch] = useState('')
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL')

  // Send single modal state
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [targetEmail, setTargetEmail] = useState('')
  const [selectedTemplateId, setSelectedTemplateId] = useState('')
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    fetchEmails()
  }, [])

  // Filter logic
  const filteredEmails = emails.filter((email) => {
    const matchesSearch = email.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false

    if (activeCategoryFilter === 'ALL') return true
    if (activeCategoryFilter === 'UK_CO') return email.endsWith('.co.uk')
    if (activeCategoryFilter === 'UK_ORG') return email.endsWith('.org.uk')
    return true
  })

  const toggleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([])
    } else {
      setSelectedEmails([...filteredEmails])
    }
  }

  const toggleSelect = (email: string) => {
    if (selectedEmails.includes(email)) {
      setSelectedEmails(selectedEmails.filter((e) => e !== email))
    } else {
      setSelectedEmails([...selectedEmails, email])
    }
  }

  const handleExportCSV = () => {
    const targetList = selectedEmails.length > 0 ? selectedEmails : filteredEmails
    if (targetList.length === 0) {
      toast.error('No emails available to export.')
      return
    }
    const csvContent = 'Email Address,Domain\n' + targetList.map((e) => `${e},${e.split('@')[1] || ''}`).join('\n')
    downloadCSV(`leadflow-emails-${Date.now()}.csv`, csvContent)
    toast.success(`Exported ${targetList.length} emails to CSV!`)
  }

  const openSendSingleModal = (email: string) => {
    setTargetEmail(email)
    if (templates.length > 0) {
      setSelectedTemplateId(templates[0].id)
    }
    setSendModalOpen(true)
  }

  const handleSendSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTemplateId) {
      toast.error('Please select an email template.')
      return
    }
    setIsSending(true)
    try {
      await apiClient.sendSingleEmail({
        recipient_email: targetEmail,
        template_id: selectedTemplateId,
        variables: { recipient_name: targetEmail.split('@')[0], company_name: targetEmail.split('@')[1] },
      })
      toast.success(`Email successfully sent to ${targetEmail}!`)
      setSendModalOpen(false)
    } catch (err: any) {
      toast.error(err.message || 'Failed to send email.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-400" />
              Scraped Email Lead Database
            </h2>
            <span className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-xs whitespace-nowrap">
              {totalEmails || emails.length} Total Verified
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Search, filter, export to CSV, or trigger targeted email campaigns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchEmails()}
            disabled={isFetchingEmails}
            className="p-2.5 rounded-xl bg-slate-800 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold whitespace-nowrap"
            title="Refresh lead database"
          >
            <RefreshCw className={`w-4 h-4 ${isFetchingEmails ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Export CSV ({selectedEmails.length > 0 ? selectedEmails.length : 'All'})
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by domain or email handle..."
            className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {[
            { id: 'ALL', label: 'All Leads' },
            { id: 'UK_CO', label: '.co.uk' },
            { id: 'UK_ORG', label: '.org.uk' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategoryFilter === cat.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-extrabold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Database Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-gray-400 uppercase font-bold text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="py-4 px-6 w-12 text-center">
                  <button onClick={toggleSelectAll} className="text-gray-400 hover:text-white whitespace-nowrap">
                    {selectedEmails.length > 0 && selectedEmails.length === filteredEmails.length ? (
                      <CheckSquare className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Domain</th>
                <th className="py-4 px-6">Verification</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {filteredEmails.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500 italic">
                    No emails found matching your query. Try running the UK Scraper to acquire new leads.
                  </td>
                </tr>
              ) : (
                filteredEmails.map((email, idx) => {
                  const domain = email.split('@')[1] || 'domain.co.uk'
                  const isSelected = selectedEmails.includes(email)

                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-white/5 transition-colors ${
                        isSelected ? 'bg-blue-600/10' : ''
                      }`}
                    >
                      <td className="py-3.5 px-6 text-center">
                        <button onClick={() => toggleSelect(email)} className="text-gray-400 hover:text-white whitespace-nowrap">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="py-3.5 px-6 font-bold text-white flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-blue-400" />
                        {email}
                      </td>
                      <td className="py-3.5 px-6 text-gray-300 font-mono text-[11px]">{domain}</td>
                      <td className="py-3.5 px-6">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold whitespace-nowrap">
                          Verified Lead
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          onClick={() => openSendSingleModal(email)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-all inline-flex items-center gap-1.5 whitespace-nowrap"
                        >
                          <Send className="w-3 h-3" />
                          Send Mail
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Send Single Email Modal */}
      <Modal
        isOpen={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
        title="Send Email to Contact"
        subtitle={`Recipient: ${targetEmail}`}
      >
        <form onSubmit={handleSendSingleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Select Email Template
            </label>
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              required
              className="w-full glass-input px-4 py-3 rounded-xl text-sm font-semibold bg-slate-900 text-white"
            >
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.name} ({tpl.template_type})
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-xs space-y-2">
            <p className="text-gray-400 font-semibold">Dynamic Variables Auto-Filled:</p>
            <p className="text-gray-300 font-mono">
              recipient_name: <span className="text-blue-400">{targetEmail.split('@')[0]}</span>
            </p>
            <p className="text-gray-300 font-mono">
              company_name: <span className="text-blue-400">{targetEmail.split('@')[1]}</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
          >
            {isSending ? 'Dispatching...' : 'Confirm & Send Email'}
          </button>
        </form>
      </Modal>
    </div>
  )
}

