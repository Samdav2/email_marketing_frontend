export type TemplateType =
  | 'NEWSLETTER'
  | 'PROMOTIONAL'
  | 'ANNOUNCEMENT'
  | 'PRODUCT'
  | 'EVENT'
  | 'WEBINAR'
  | 'ONBOARDING'
  | 'FEEDBACK'
  | 'RETENTION'
  | 'SALES'

export interface EmailRecord {
  id?: string
  email: string
  domain?: string
  category?: string
  is_verified?: boolean
  created_at?: string
}

export interface EmailTemplate {
  id: string
  name: string
  template_type: TemplateType
  subject: string
  body: string
  description?: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface SendSingleEmailPayload {
  recipient_email: string
  template_id: string
  variables?: Record<string, string>
}

export interface SendBulkEmailPayload {
  recipient_emails: string[]
  template_id: string
  variables?: Record<string, string>
}

export interface BulkSendResult {
  total_recipients: number
  successful: number
  failed: number
  errors: Array<{ email: string; reason: string }>
}
