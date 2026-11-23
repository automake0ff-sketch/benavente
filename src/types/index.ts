export type VerificationStatus = 'verified' | 'pending' | 'unavailable';

export interface Allergen {
  id: string;
  name: string;
  icon?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number | null; // null if unconfirmed
  price_display?: string; // e.g. "Consultar precio" if pending
  image: string;
  allergens: string[];
  available: boolean;
  featured: boolean;
  verification_status: VerificationStatus;
  source: string;
  last_verified_at: string;
  notes?: string;
}

export interface GastroSpecialty {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  is_active: boolean;
  badge?: string; // e.g. "Sugerencia", "Temporada", "Plato estrella"
  updated_at: string;
}

export interface RestaurantConfig {
  name: string;
  subtitle: string;
  tagline: string;
  subtagline: string;
  about_heading: string;
  about_text: string;
  address: string;
  address_note: string;
  phone: string;
  phone_display: string;
  whatsapp_number: string;
  whatsapp_display: string;
  instagram_url: string;
  tripadvisor_url: string;
  google_maps_url: string;
  schedules: {
    days: string;
    hours: string;
    kitchen_note?: string;
  }[];
  hero_image: string;
  about_image_1: string;
  about_image_2: string;
  is_phone_verified: boolean;
  is_address_verified: boolean;
  is_hours_verified: boolean;
}

export interface ReservationSubmission {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  created_at: string;
  status: 'pending_contact' | 'contacted' | 'confirmed' | 'cancelled';
}
