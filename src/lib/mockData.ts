import { EmailTemplate, EmailRecord, User, Profile, ScrapeToDbResponse } from '@/types'

export const INITIAL_MOCK_USER: User = {
  id: 'usr-98124-uk',
  name: 'Alex Mercer',
  email: 'alex.mercer@leadflow.uk',
  is_active: true,
  created_at: '2026-01-15T09:00:00Z',
}

export const INITIAL_MOCK_PROFILE: Profile = {
  id: 'prf-55102-uk',
  user_id: 'usr-98124-uk',
  business_name: 'LeadFlow Marketing UK',
  company_id: 'LF-UK-8821',
  phone: '+44 20 7946 0912',
  website: 'https://leadflow.co.uk',
  address: '100 Bishopsgate, Level 14',
  city: 'London',
  state: 'Greater London',
  postal_code: 'EC2N 4AG',
  country: 'United Kingdom',
  industry: 'Digital Marketing & B2B Leads',
  company_size: '10-50',
  description: 'Enterprise B2B Lead Scraping and High-Deliverability Automated Outreach Platform',
  logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
}

export const INITIAL_MOCK_EMAILS: string[] = [
  'contact@apex-solutions.co.uk',
  'support@brighton-tech.org.uk',
  'info@cambridge-analytics.co.uk',
  'sales@manchester-logistics.co.uk',
  'enquiries@edinburgh-consulting.co.uk',
  'hello@birmingham-agency.co.uk',
  'partnerships@oxford-innovations.co.uk',
  'careers@bristol-media.co.uk',
  'admin@leeds-manufacturing.co.uk',
  'office@glasgow-design.co.uk',
  'helpdesk@belfast-software.co.uk',
  'marketing@cardiff-fintech.co.uk',
  'info@surrey-biotech.co.uk',
  'contact@yorkshire-enterprises.co.uk',
  'sales@newcastle-digital.co.uk',
  'ceo@london-venture-capital.co.uk',
  'press@sussex-communications.co.uk',
  'leads@nottingham-retail.co.uk',
]

export const INITIAL_MOCK_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tpl-newsletter-01',
    name: 'Weekly B2B Growth Digest',
    template_type: 'NEWSLETTER',
    subject: '🚀 Top UK Industry Insights & Trends for {company_name}',
    body: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #1e293b;">
      <h2 style="color: #38bdf8; margin-top: 0;">Weekly Business Digest</h2>
      <p>Hello <strong>{recipient_name}</strong>,</p>
      <p>Here are the latest market trends impacting <strong>{company_name}</strong> this week in the UK tech sector.</p>
      <div style="background: rgba(56, 189, 248, 0.1); padding: 16px; border-left: 4px solid #38bdf8; border-radius: 6px; margin: 20px 0;">
        <h4 style="margin: 0 0 8px 0; color: #7dd3fc;">Key Highlight</h4>
        <p style="margin: 0; font-size: 14px; color: #cbd5e1;">Automation adoption across UK enterprises surged by 34% this quarter.</p>
      </div>
      <p>Best regards,<br/><strong>{sender_name}</strong><br/>LeadFlow Analytics</p>
    </div>`,
    description: 'Modern weekly digest template with highlights and actionable insights.',
    is_active: true,
    created_at: '2026-02-10T10:00:00Z',
  },
  {
    id: 'tpl-sales-02',
    name: 'Direct Cold B2B Outreach',
    template_type: 'SALES',
    subject: 'Quick question regarding lead acquisition at {company_name}',
    body: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
      <p>Hi <strong>{recipient_name}</strong>,</p>
      <p>I noticed <strong>{company_name}</strong> is currently expanding its market reach across the UK.</p>
      <p>Our platform helps companies discover verified UK decision-maker contacts with over 98% deliverability.</p>
      <p>Would you be open for a brief 5-minute call this Thursday?</p>
      <p>Best,<br/><strong>{sender_name}</strong></p>
    </div>`,
    description: 'High-converting personalized B2B outreach email template.',
    is_active: true,
    created_at: '2026-02-12T14:30:00Z',
  },
  {
    id: 'tpl-promo-03',
    name: 'Q3 Enterprise Discount Offer',
    template_type: 'PROMOTIONAL',
    subject: 'Exclusive {offer_percentage} Off Lead Engine for {company_name}',
    body: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
      <h2 style="color: #a78bfa;">Exclusive Special Offer</h2>
      <p>Dear Partner,</p>
      <p>Claim <strong>{offer_percentage} discount</strong> on our high-volume UK email scraping engine when upgrading your plan today.</p>
      <div style="text-align: center; margin: 24px 0;">
        <a href="#" style="background: #6366f1; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Claim Your Offer Now</a>
      </div>
      <p>Offer valid until the end of the month.</p>
    </div>`,
    description: 'Promotional discount banner template with CTA button.',
    is_active: true,
    created_at: '2026-02-15T11:20:00Z',
  },
  {
    id: 'tpl-onboard-04',
    name: 'New Client Onboarding Welcome',
    template_type: 'ONBOARDING',
    subject: 'Welcome to LeadFlow, {recipient_name}!',
    body: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
      <h2 style="color: #34d399;">Welcome Aboard! 🎉</h2>
      <p>Hi <strong>{recipient_name}</strong>,</p>
      <p>Thank you for choosing LeadFlow. Your account for <strong>{company_name}</strong> is fully activated and ready for scraping.</p>
      <p>Here are your next steps:</p>
      <ul>
        <li>Launch your first UK domain scrape campaign</li>
        <li>Browse pre-built professional outreach templates</li>
        <li>Export your clean leads to CSV</li>
      </ul>
      <p>Cheers,<br/>The Customer Success Team</p>
    </div>`,
    description: 'Warm welcome email template for onboarding new accounts.',
    is_active: true,
    created_at: '2026-02-18T08:15:00Z',
  },
]

export const MOCK_SCRAPE_RESPONSE: ScrapeToDbResponse = {
  total_processed: 25,
  successful_leads: 22,
  total_emails_found: 148,
  total_emails_saved: 124,
  duplicates_skipped: 24,
  errors: 3,
  results: [
    {
      domain: 'apex-solutions.co.uk',
      emails: ['contact@apex-solutions.co.uk', 'info@apex-solutions.co.uk'],
      status: 'success',
    },
    {
      domain: 'brighton-tech.org.uk',
      emails: ['support@brighton-tech.org.uk', 'dev@brighton-tech.org.uk'],
      status: 'success',
    },
    {
      domain: 'cambridge-analytics.co.uk',
      emails: ['info@cambridge-analytics.co.uk'],
      status: 'success',
    },
    {
      domain: 'failed-domain-example.co.uk',
      emails: [],
      status: 'error',
      error_message: 'Timeout connecting to web search server',
    },
  ],
}
