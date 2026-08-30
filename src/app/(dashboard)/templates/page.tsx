'use client'

import { useState, useEffect } from 'react'
import {
  FileCode,
  Plus,
  Eye,
  Trash2,
  Send,
  CheckCircle2,
  Code,
  Tag,
} from 'lucide-react'
import { useEmailStore } from '@/store/emailStore'
import { EmailTemplate, TemplateType } from '@/types'
import { Modal } from '@/components/common/Modal'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function TemplatesPage() {
  const { templates, fetchTemplates, createTemplate, deleteTemplate } = useEmailStore()

  const [activeCategory, setActiveCategory] = useState<string>('ALL')

  // Preview Modal state
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null)

  // Create Modal state
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [templateType, setTemplateType] = useState<TemplateType>('PROMOTIONAL')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const categories: Array<{ id: string; label: string }> = [
    { id: 'ALL', label: 'All Templates' },
    { id: 'NEWSLETTER', label: 'Newsletters' },
    { id: 'SALES', label: 'Sales Outreach' },
    { id: 'PROMOTIONAL', label: 'Promotional' },
    { id: 'ONBOARDING', label: 'Onboarding' },
    { id: 'ANNOUNCEMENT', label: 'Announcements' },
  ]

  const filteredTemplates = templates.filter((t) => {
    if (activeCategory === 'ALL') return true
    return t.template_type === activeCategory
  })

  const openPreview = (tpl: EmailTemplate) => {
    setPreviewTemplate(tpl)
    setPreviewModalOpen(true)
  }

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete template "${name}"?`)) {
      try {
        await deleteTemplate(id)
        toast.success(`Deleted template "${name}".`)
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete template.')
      }
    }
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await createTemplate({
        name,
        template_type: templateType,
        subject,
        description,
        body: body || `<div style="font-family: sans-serif; padding: 20px;"><h2>${subject}</h2><p>Hello {recipient_name},</p></div>`,
      })
      toast.success(`Template "${name}" created successfully!`)
      setCreateModalOpen(false)
      setName('')
      setSubject('')
      setDescription('')
      setBody('')
    } catch (err: any) {
      toast.error(err.message || 'Failed to create template.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const insertVariable = (varName: string) => {
    setBody((prev) => prev + ` {${varName}}`)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-white/10">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <FileCode className="w-6 h-6 text-blue-400" />
            Email Template Studio
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Browse pre-built professional outreach templates or design custom HTML templates.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Create New Template
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-extrabold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Template Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-blue-500/40 transition-all space-y-4 group bg-slate-900/60"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-md">
                  {tpl.template_type}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                {tpl.name}
              </h3>
              <p className="text-xs text-gray-300 line-clamp-2 mb-4 font-mono bg-slate-950 p-2.5 rounded-xl border border-white/5">
                Subject: {tpl.subject}
              </p>
              {tpl.description && <p className="text-xs text-gray-400">{tpl.description}</p>}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openPreview(tpl)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-gray-200 transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  Preview
                </button>
                <button
                  onClick={() => handleDelete(tpl.id, tpl.name)}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors whitespace-nowrap"
                  title="Delete Template"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <Link
                href={`/campaigns?templateId=${tpl.id}`}
                className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                Use in Campaign
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Live HTML Preview Modal */}
      <Modal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        title={previewTemplate?.name || 'Template Preview'}
        subtitle={`Subject Line: ${previewTemplate?.subject || ''}`}
        maxWidth="2xl"
      >
        {previewTemplate && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-gray-300 flex items-center justify-between">
              <span>Category: <strong className="text-blue-400">{previewTemplate.template_type}</strong></span>
              <span className="font-mono text-gray-400 text-[11px]">ID: {previewTemplate.id}</span>
            </div>

            <div className="border border-white/10 rounded-2xl overflow-hidden bg-slate-950 p-6 min-h-[300px]">
              <div
                className="prose prose-invert max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: previewTemplate.body }}
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-gray-300 hover:text-white whitespace-nowrap"
              >
                Close Preview
              </button>
              <Link
                href={`/campaigns?templateId=${previewTemplate.id}`}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center gap-2 whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                Launch Campaign with Template
              </Link>
            </div>
          </div>
        )}
      </Modal>

      {/* Create New Template Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Design Custom Email Template"
        subtitle="Create responsive outreach templates with dynamic placeholder tags"
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Template Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Q3 UK Enterprise Outreach"
                required
                className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Category Type
              </label>
              <select
                value={templateType}
                onChange={(e) => setTemplateType(e.target.value as TemplateType)}
                className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white"
              >
                <option value="PROMOTIONAL">PROMOTIONAL</option>
                <option value="SALES">SALES</option>
                <option value="NEWSLETTER">NEWSLETTER</option>
                <option value="ONBOARDING">ONBOARDING</option>
                <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
                <option value="EVENT">EVENT</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Subject Line (Supports Variables)
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Special Offer for {company_name}"
              required
              className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of template purpose"
              className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-medium"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                HTML Email Body Content
              </label>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <span>Insert tag:</span>
                {['recipient_name', 'company_name', 'sender_name', 'offer_percentage'].map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => insertVariable(v)}
                    className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 font-mono text-[10px] whitespace-nowrap"
                  >
                    {`{${v}}`}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              placeholder="<div style='font-family: sans-serif;'><h1>Hello {recipient_name}</h1>...</div>"
              required
              className="w-full glass-input p-4 rounded-xl text-xs font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
          >
            {isSubmitting ? 'Saving Template...' : 'Save & Publish Template'}
          </button>
        </form>
      </Modal>
    </div>
  )
}

