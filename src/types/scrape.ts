export interface ScrapeToDbPayload {
  email_limit?: number
  domain_limit?: number
  category?: string
}

export interface DomainScrapeResult {
  domain: string
  emails: string[]
  status: 'success' | 'error' | 'skipped'
  error_message?: string
}

export interface ScrapeToDbResponse {
  total_processed: number
  successful_leads: number
  total_emails_found: number
  total_emails_saved: number
  duplicates_skipped: number
  errors: number
  results: DomainScrapeResult[]
}
