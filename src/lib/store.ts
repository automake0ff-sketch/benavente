import { MenuItem, GastroSpecialty, RestaurantConfig, ReservationSubmission } from '@/types';
import { INITIAL_CONFIG, INITIAL_MENU_ITEMS, INITIAL_SPECIALTIES } from '@/data/initialData';

const STORAGE_KEYS = {
  CONFIG: 'benavente_config_v1',
  MENU: 'benavente_menu_v1',
  SPECIALTIES: 'benavente_specialties_v1',
  RESERVATIONS: 'benavente_reservations_v1',
  AUTH: 'benavente_admin_auth_v1',
};

export const benaventeStore = {
  getConfig(): RestaurantConfig {
    if (typeof window === 'undefined') return INITIAL_CONFIG;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return data ? JSON.parse(data) : INITIAL_CONFIG;
    } catch {
      return INITIAL_CONFIG;
    }
  },

  saveConfig(config: RestaurantConfig): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error('Error saving config', e);
    }
  },

  getMenuItems(): MenuItem[] {
    if (typeof window === 'undefined') return INITIAL_MENU_ITEMS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MENU);
      return data ? JSON.parse(data) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  },

  saveMenuItems(items: MenuItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving menu', e);
    }
  },

  getSpecialties(): GastroSpecialty[] {
    if (typeof window === 'undefined') return INITIAL_SPECIALTIES;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SPECIALTIES);
      return data ? JSON.parse(data) : INITIAL_SPECIALTIES;
    } catch {
      return INITIAL_SPECIALTIES;
    }
  },

  saveSpecialties(specialties: GastroSpecialty[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.SPECIALTIES, JSON.stringify(specialties));
    } catch (e) {
      console.error('Error saving specialties', e);
    }
  },

  getReservations(): ReservationSubmission[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addReservation(reservation: Omit<ReservationSubmission, 'id' | 'created_at' | 'status'>): ReservationSubmission {
    const newEntry: ReservationSubmission = {
      ...reservation,
      id: 'res_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      created_at: new Date().toISOString(),
      status: 'pending_contact',
    };
    if (typeof window !== 'undefined') {
      try {
        const list = this.getReservations();
        const updated = [newEntry, ...list];
        localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving reservation', e);
      }
    }
    return newEntry;
  },

  updateReservationStatus(id: string, status: ReservationSubmission['status']): void {
    if (typeof window === 'undefined') return;
    try {
      const list = this.getReservations();
      const updated = list.map(r => r.id === id ? { ...r, status } : r);
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));
    } catch (e) {
      console.error('Error updating reservation', e);
    }
  },

  resetToDefaults(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.MENU);
    localStorage.removeItem(STORAGE_KEYS.SPECIALTIES);
    localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
  }
};
