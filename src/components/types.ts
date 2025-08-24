// Types pour les composants d'inscription Vue 3
export interface Establishment {
  id: string
  name: string
  address: string
  phone?: string
  website?: string
  rating?: number
  userRatingsTotal?: number
  priceLevel?: number
  types: string[]
  geometry?: any
  photos?: Array<{
    reference: string
    width: number
    height: number
  }>
}

export interface SignupFormData {
  email: string
  password: string
  confirmPassword: string
  restaurantName: string
  restaurantAddress: string
  ownerName: string
  phone: string
  cuisineType: string
  city: string
  heardFrom: string
}

export interface ValidationErrors {
  email?: string
  password?: string
  confirmPassword?: string
  restaurantName?: string
  restaurantAddress?: string
  ownerName?: string
  phone?: string
  city?: string
}

export interface SupabaseConfig {
  url: string
  anonKey: string
}

export interface SupabaseUser {
  id: string
  email: string
  user_metadata: {
    name: string
    phone: string
    restaurant_name: string
    restaurant_address: string
    city: string
    cuisine_type: string
    heard_from: string
  }
} 