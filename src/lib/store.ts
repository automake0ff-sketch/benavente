import { MenuItem, GastroSpecialty, RestaurantConfig, ReservationSubmission } from '@/types';
import { INITIAL_CONFIG, INITIAL_MENU_ITEMS, INITIAL_SPECIALTIES } from '@/data/initialData';

const STORAGE_KEYS = {
  CONFIG: 'benavente_demo_config_v2',
  MENU: 'benavente_demo_menu_v2',
  SPECIALTIES: 'benavente_demo_specialties_v2',
  RESERVATIONS: 'benavente_demo_reservations_v2',
};

// Custom event para sincronización reactiva inmediata entre pestañas/vistas
export const emitStoreChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('benavente_store_updated'));
  }
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
      emitStoreChange();
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
      emitStoreChange();
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
      emitStoreChange();
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
      status: 'pending',
    };
    if (typeof window !== 'undefined') {
      try {
        const list = this.getReservations();
        const updated = [newEntry, ...list];
        localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));
        emitStoreChange();
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
      emitStoreChange();
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
    emitStoreChange();
  }
};
