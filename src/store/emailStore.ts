import { create } from 'zustand'
import { EmailTemplate, ScrapeToDbResponse, BulkSendResult } from '@/types'
import { apiClient } from '@/lib/api'

interface EmailState {
  emails: string[]
  templates: EmailTemplate[]
  totalEmails: number
  isFetchingEmails: boolean
  isFetchingTemplates: boolean
  isScraping: boolean
  lastScrapeResult: ScrapeToDbResponse | null
  lastCampaignResult: BulkSendResult | null
  error: string | null

  fetchEmails: () => Promise<void>
  fetchTemplates: () => Promise<void>
  createTemplate: (template: Partial<EmailTemplate>) => Promise<EmailTemplate>
  deleteTemplate: (id: string) => Promise<void>
  runScrape: (emailLimit: number, domainLimit: number, category: string) => Promise<ScrapeToDbResponse>
  sendBulkCampaign: (emails: string[], templateId: string, variables?: Record<string, string>) => Promise<BulkSendResult>
  clearError: () => void
}

export const useEmailStore = create<EmailState>((set, get) => ({
  emails: [],
  templates: [],
  totalEmails: 0,
  isFetchingEmails: false,
  isFetchingTemplates: false,
  isScraping: false,
  lastScrapeResult: null,
  lastCampaignResult: null,
  error: null,

  fetchEmails: async () => {
    set({ isFetchingEmails: true, error: null })
    try {
      const data = await apiClient.getAllEmails()
      set({
        emails: data.emails || [],
        totalEmails: data.total || (data.emails ? data.emails.length : 0),
        isFetchingEmails: false,
      })
    } catch (err: any) {
      set({
        error: err.response?.data?.detail || 'Failed to fetch email database.',
        isFetchingEmails: false,
      })
    }
  },

  fetchTemplates: async () => {
    set({ isFetchingTemplates: true, error: null })
    try {
      const templates = await apiClient.getTemplates()
      set({ templates: templates || [], isFetchingTemplates: false })
    } catch (err: any) {
      set({
        error: err.response?.data?.detail || 'Failed to fetch templates.',
        isFetchingTemplates: false,
      })
    }
  },

  createTemplate: async (templateData) => {
    set({ error: null })
    try {
      const newTemplate = await apiClient.createTemplate(templateData)
      set((state) => ({ templates: [newTemplate, ...state.templates] }))
      return newTemplate
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Failed to create template.'
      set({ error: msg })
      throw new Error(msg)
    }
  },

  deleteTemplate: async (id) => {
    set({ error: null })
    try {
      await apiClient.deleteTemplate(id)
      set((state) => ({ templates: state.templates.filter((t) => t.id !== id) }))
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to delete template.' })
    }
  },

  runScrape: async (emailLimit, domainLimit, category) => {
    set({ isScraping: true, error: null })
    try {
      const res = await apiClient.scrapeToDb({ email_limit: emailLimit, domain_limit: domainLimit, category })
      set({ lastScrapeResult: res, isScraping: false })
      // Refresh email list after scrape completes
      get().fetchEmails()
      return res
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Scraping failed.'
      set({ error: msg, isScraping: false })
      throw new Error(msg)
    }
  },

  sendBulkCampaign: async (recipientEmails, templateId, variables) => {
    set({ error: null })
    try {
      const res = await apiClient.sendBulkEmails({
        recipient_emails: recipientEmails,
        template_id: templateId,
        variables,
      })
      set({ lastCampaignResult: res })
      return res
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Failed to dispatch bulk campaign.'
      set({ error: msg })
      throw new Error(msg)
    }
  },

  clearError: () => set({ error: null }),
}))
