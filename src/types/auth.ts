export interface User {
  id: string
  name: string
  email: string
  is_active: boolean
  created_at: string
}

export interface Profile {
  id: string
  user_id: string
  business_name: string
  company_id: string
  phone?: string
  website?: string
  address?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
  industry?: string
  company_size?: string
  description?: string
  logo_url?: string
  created_at?: string
  updated_at?: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}
