export type VerificationStatus = 'verified' | 'pending' | 'unavailable';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number | null; // null si no está confirmado
  price_display?: string; // Ej: "Consultar precio" si es provisional
  image: string;
  allergens: string[]; // Sólo los comprobados o vacíos con nota de consulta en sala
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
  badge?: string;
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
  phone: string; // Vacío si no está confirmado oficialmente
  phone_display: string;
  whatsapp_number: string; // Vacío si no está confirmado oficialmente
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
  status: 'pending' | 'contacted' | 'accepted' | 'rejected';
}
