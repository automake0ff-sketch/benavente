'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Sparkles,
  Settings,
  CalendarCheck,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  Save,
  RotateCcw,
  ShieldAlert,
  Search,
  Lock,
  LogIn,
  LogOut,
  Info
} from 'lucide-react';
import { benaventeStore } from '@/lib/store';
import { MenuItem, GastroSpecialty, RestaurantConfig, ReservationSubmission, VerificationStatus } from '@/types';
import { MENU_CATEGORIES } from '@/data/initialData';

export default function AdminPage() {
  // Estado de acceso simulado a la demo
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState<string>('gerencia@benaventegastrobar.es');

  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'specialties' | 'reservations' | 'config'>('dashboard');

  const [config, setConfig] = useState<RestaurantConfig | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [specialties, setSpecialties] = useState<GastroSpecialty[]>([]);
  const [reservations, setReservations] = useState<ReservationSubmission[]>([]);

  // Notificación de estado guardado
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Estados de edición de plato
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreatingItem, setIsCreatingItem] = useState(false);

  // Estados de edición de especialidad
  const [editingSpecialty, setEditingSpecialty] = useState<GastroSpecialty | null>(null);
  const [isCreatingSpecialty, setIsCreatingSpecialty] = useState(false);

  // Filtro en tabla de carta
  const [filterCategory, setFilterCategory] = useState<string>('Todos');
  const [searchAdmin, setSearchAdmin] = useState<string>('');

  useEffect(() => {
    loadData();

    // Sincronización si cambian datos en otra ventana
    const handleSync = () => loadData();
    window.addEventListener('benavente_store_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('benavente_store_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const loadData = () => {
    setConfig(benaventeStore.getConfig());
    setMenuItems(benaventeStore.getMenuItems());
    setSpecialties(benaventeStore.getSpecialties());
    setReservations(benaventeStore.getReservations());
  };

  const triggerToast = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  // Guardar configuración
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    benaventeStore.saveConfig(config);
    triggerToast('¡Configuración del gastrobar guardada localmente!');
  };

  // Acciones de Carta
  const handleSaveMenuItem = (item: MenuItem) => {
    let updated: MenuItem[];
    if (editingItem && !isCreatingItem) {
      updated = menuItems.map(m => m.id === item.id ? item : m);
    } else {
      updated = [item, ...menuItems];
    }
    setMenuItems(updated);
    benaventeStore.saveMenuItems(updated);
    setEditingItem(null);
    setIsCreatingItem(false);
    triggerToast('Plato guardado con éxito. Reflejado en la carta pública.');
  };

  const handleDeleteMenuItem = (id: string) => {
    if (confirm('¿Eliminar este plato de la carta?')) {
      const updated = menuItems.filter(m => m.id !== id);
      setMenuItems(updated);
      benaventeStore.saveMenuItems(updated);
      triggerToast('Plato eliminado.');
    }
  };

  const handleToggleAvailable = (id: string) => {
    const updated = menuItems.map(m => m.id === id ? { ...m, available: !m.available } : m);
    setMenuItems(updated);
    benaventeStore.saveMenuItems(updated);
    triggerToast('Visibilidad actualizada.');
  };

  const handleToggleFeatured = (id: string) => {
    const updated = menuItems.map(m => m.id === id ? { ...m, featured: !m.featured } : m);
    setMenuItems(updated);
    benaventeStore.saveMenuItems(updated);
    triggerToast('Estado de plato destacado actualizado.');
  };

  // Acciones de Especialidades
  const handleSaveSpecialty = (item: GastroSpecialty) => {
    let updated: GastroSpecialty[];
    if (editingSpecialty && !isCreatingSpecialty) {
      updated = specialties.map(s => s.id === item.id ? item : s);
    } else {
      updated = [item, ...specialties];
    }
    setSpecialties(updated);
    benaventeStore.saveSpecialties(updated);
    setEditingSpecialty(null);
    setIsCreatingSpecialty(false);
    triggerToast('Especialidad guardada con éxito.');
  };

  const handleDeleteSpecialty = (id: string) => {
    if (confirm('¿Eliminar esta publicación?')) {
      const updated = specialties.filter(s => s.id !== id);
      setSpecialties(updated);
      benaventeStore.saveSpecialties(updated);
      triggerToast('Publicación eliminada.');
    }
  };

  const handleToggleSpecialtyActive = (id: string) => {
    const updated = specialties.map(s => s.id === id ? { ...s, is_active: !s.is_active } : s);
    setSpecialties(updated);
    benaventeStore.saveSpecialties(updated);
    triggerToast('Estado de especialidad actualizado.');
  };

  // Actualizar estado de reserva
  const handleReservationStatusChange = (id: string, status: ReservationSubmission['status']) => {
    benaventeStore.updateReservationStatus(id, status);
    setReservations(benaventeStore.getReservations());
    triggerToast('Estado de solicitud actualizado.');
  };

  const handleResetDefaults = () => {
    if (confirm('¿Restablecer todos los datos del gastrobar a los valores originales de la demo? Se eliminarán los cambios locales guardados en este navegador.')) {
      benaventeStore.resetToDefaults();
      loadData();
      triggerToast('Datos de demostración restablecidos.');
    }
  };

  if (!config) return null;

  // Pantalla de acceso simulado si se cierra sesión
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FCFAF5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-[#89957C]/25 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#344536] text-[#FCFAF5] rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#344536]">
              Panel de Demostración
            </h1>
            <p className="text-xs text-[#252923]/70">
              Acceso simulado para presentación comercial de Benavente Gastrobar.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F4F0E7] border border-[#89957C]/20 text-xs text-[#252923]/80 space-y-1">
            <span className="font-bold text-[#344536] block">Modo de Demostración:</span>
            <p>No se requiere contraseña real. Pulsa en acceder para explorar las herramientas de gestión.</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsAuthenticated(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-[#344536] mb-1 uppercase tracking-wider">
                Usuario / Correo
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#89957C]/30 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#344536] mb-1 uppercase tracking-wider">
                Contraseña (Simulada)
              </label>
              <input
                type="password"
                defaultValue="demo1234"
                className="w-full p-2.5 rounded-xl border border-[#89957C]/30 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#344536] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#252923] transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar al Panel Demo</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-[#89957C] hover:text-[#344536] underline">
              ← Volver a la web pública
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Métricas reales calculadas desde los datos locales
  const totalProducts = menuItems.length;
  const publishedProducts = menuItems.filter(m => m.available).length;
  const hiddenProducts = menuItems.filter(m => !m.available).length;
  const specialtiesCount = specialties.length;
  const reservationsCount = reservations.length;

  return (
    <div className="min-h-screen bg-[#F4F0E7]/50 flex flex-col">
      {/* Toast de confirmación flotante */}
      {saveMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#344536] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Barra Superior del Panel */}
      <header className="bg-[#344536] text-[#FCFAF5] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FCFAF5] transition-colors"
              title="Volver a la web pública"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider uppercase block leading-none">
                {config.name}
              </span>
              <span className="text-[10px] tracking-widest text-[#89957C] uppercase font-semibold">
                Panel de Demostración Comercial
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-[#89957C] hover:text-white px-3 py-1.5 rounded-lg border border-white/15 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver Web Pública</span>
            </Link>
            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1 text-[11px] text-[#FCFAF5]/70 hover:text-rose-300 transition-colors px-2 py-1.5 rounded border border-white/10"
              title="Restablecer datos originales"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar Demo</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FCFAF5] transition-colors"
              title="Cerrar sesión demo"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Aviso de entorno y limitaciones de seguridad */}
      <div className="bg-[#252923] text-[#FCFAF5]/90 px-4 py-2 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Simulación Local Activa:</strong> Esta aplicación no cuenta con base de datos externa ni backend. Los cambios se persisten en el navegador mediante <code>localStorage</code> para ilustrar la operativa del producto al cliente.
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex flex-col md:flex-row gap-8">
        
        {/* Navegación lateral de pestañas */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <button
            onClick={() => { setActiveTab('dashboard'); setEditingItem(null); setEditingSpecialty(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#344536] text-[#FCFAF5] shadow'
                : 'bg-white text-[#252923] hover:bg-[#F4F0E7] border border-[#89957C]/20'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => { setActiveTab('menu'); setEditingSpecialty(null); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'menu'
                ? 'bg-[#344536] text-[#FCFAF5] shadow'
                : 'bg-white text-[#252923] hover:bg-[#F4F0E7] border border-[#89957C]/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Gestión de Carta</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10">
              {menuItems.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('specialties'); setEditingItem(null); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'specialties'
                ? 'bg-[#344536] text-[#FCFAF5] shadow'
                : 'bg-white text-[#252923] hover:bg-[#F4F0E7] border border-[#89957C]/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4" />
              <span>Especialidades</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10">
              {specialties.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('reservations'); setEditingItem(null); setEditingSpecialty(null); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'reservations'
                ? 'bg-[#344536] text-[#FCFAF5] shadow'
                : 'bg-white text-[#252923] hover:bg-[#F4F0E7] border border-[#89957C]/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <CalendarCheck className="w-4 h-4" />
              <span>Reservas Demo</span>
            </div>
            {reservations.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#B96F51] text-white font-bold">
                {reservations.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('config'); setEditingItem(null); setEditingSpecialty(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'config'
                ? 'bg-[#344536] text-[#FCFAF5] shadow'
                : 'bg-white text-[#252923] hover:bg-[#F4F0E7] border border-[#89957C]/20'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configuración</span>
          </button>
        </aside>

        {/* Área de Contenido Principal */}
        <main className="flex-1 bg-white rounded-2xl border border-[#89957C]/25 shadow-sm p-6 sm:p-8">
          
          {/* TAB 1: DASHBOARD CON MÉTRICAS LOCALES REALES */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#344536]">
                  Panel de Control del Establecimiento
                </h2>
                <p className="text-xs text-[#252923]/70 mt-1">
                  Estadísticas calculadas en tiempo real a partir del estado de la carta y reservas locales.
                </p>
              </div>

              {/* Tarjetas de métricas precisas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-[#FCFAF5] border border-[#89957C]/20 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#89957C]">
                    Total Productos
                  </span>
                  <p className="font-serif text-3xl font-bold text-[#344536]">
                    {totalProducts}
                  </p>
                  <p className="text-[11px] text-[#252923]/60">
                    Registrados en la carta local
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#FCFAF5] border border-[#89957C]/20 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Productos Visibles
                  </span>
                  <p className="font-serif text-3xl font-bold text-emerald-800">
                    {publishedProducts}
                  </p>
                  <p className="text-[11px] text-[#252923]/60">
                    Mostrados en la carta pública
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#FCFAF5] border border-[#89957C]/20 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                    Productos Ocultos
                  </span>
                  <p className="font-serif text-3xl font-bold text-rose-800">
                    {hiddenProducts}
                  </p>
                  <p className="text-[11px] text-[#252923]/60">
                    Pausados o fuera de temporada
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#FCFAF5] border border-[#89957C]/20 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B96F51]">
                    Especialidades / Reservas
                  </span>
                  <p className="font-serif text-3xl font-bold text-[#B96F51]">
                    {specialtiesCount} / {reservationsCount}
                  </p>
                  <p className="text-[11px] text-[#252923]/60">
                    Novedades y solicitudes registradas
                  </p>
                </div>
              </div>

              {/* Estado general del contenido para propuesta comercial */}
              <div className="p-5 rounded-xl bg-[#F4F0E7]/60 border border-[#89957C]/25 space-y-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#B96F51]" />
                  <h3 className="font-serif text-lg font-bold text-[#344536]">
                    Resumen de la Demostración Comercial
                  </h3>
                </div>
                <div className="space-y-2 text-xs text-[#252923]/80">
                  <div className="flex items-center justify-between py-1 border-b border-gray-200">
                    <span>• Sincronización en tiempo real</span>
                    <span className="font-semibold text-emerald-700">Activa (React + LocalStorage)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-gray-200">
                    <span>• Catálogo de platos de demostración</span>
                    <span className="font-semibold text-emerald-700">18 platos catalogados</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-gray-200">
                    <span>• Verificación de precios y datos de contacto</span>
                    <span className="font-semibold text-amber-700">Pendiente de ratificar por el propietario</span>
                  </div>
                </div>
              </div>

              {/* Accesos rápidos */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => { setActiveTab('menu'); setIsCreatingItem(true); }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#344536] text-[#FCFAF5] hover:bg-[#252923] text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Plato a la Carta</span>
                </button>
                <button
                  onClick={() => { setActiveTab('reservations'); }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#89957C]/30 text-[#344536] hover:bg-[#F4F0E7] text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <CalendarCheck className="w-4 h-4 text-[#B96F51]" />
                  <span>Ver Solicitudes de Reserva ({reservations.length})</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: GESTIÓN DE CARTA */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#344536]">
                    Catálogo de Carta Digital
                  </h2>
                  <p className="text-xs text-[#252923]/70 mt-1">
                    Crea, modifica precios, cambia fotos, categorías, descripciones y oculta platos.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingItem({
                      id: 'plato_' + Date.now(),
                      name: '',
                      description: '',
                      category: 'Para empezar',
                      price: null,
                      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
                      allergens: [],
                      available: true,
                      featured: false,
                      verification_status: 'pending',
                      source: 'Administración Benavente (Demo)',
                      last_verified_at: new Date().toISOString().split('T')[0],
                    });
                    setIsCreatingItem(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#344536] text-[#FCFAF5] hover:bg-[#252923] text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Plato</span>
                </button>
              </div>

              {/* Formulario en línea de creación/edición */}
              {(editingItem || isCreatingItem) && (
                <div className="p-6 rounded-2xl bg-[#FCFAF5] border-2 border-[#89957C]/40 space-y-4 shadow-md">
                  <div className="flex items-center justify-between pb-3 border-b border-[#89957C]/20">
                    <h3 className="font-serif text-lg font-bold text-[#344536]">
                      {isCreatingItem ? 'Nuevo Plato para la Carta' : `Editar: ${editingItem?.name}`}
                    </h3>
                    <button
                      onClick={() => { setEditingItem(null); setIsCreatingItem(false); }}
                      className="text-xs text-[#89957C] hover:text-[#344536] font-semibold"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-[#344536] mb-1">Nombre del plato *</label>
                      <input
                        type="text"
                        value={editingItem?.name || ''}
                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, name: e.target.value } : null)}
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                        placeholder="Ej. Salmorejo tradicional con jamón"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#344536] mb-1">Categoría</label>
                      <select
                        value={editingItem?.category || 'Para empezar'}
                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, category: e.target.value } : null)}
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      >
                        {MENU_CATEGORIES.filter(c => c !== 'Todos').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-[#344536] mb-1">
                        Precio (€) — Dejar vacío si está pendiente
                      </label>
                      <input
                        type="number"
                        step="0.10"
                        value={editingItem?.price !== null && editingItem?.price !== undefined ? editingItem.price : ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : parseFloat(e.target.value);
                          setEditingItem(prev => prev ? {
                            ...prev,
                            price: val,
                            price_display: val !== null ? `${val.toFixed(2).replace('.', ',')} €` : 'Consultar precio'
                          } : null);
                        }}
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                        placeholder="Ej. 9.50"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#344536] mb-1">Estado de Verificación</label>
                      <select
                        value={editingItem?.verification_status || 'pending'}
                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, verification_status: e.target.value as VerificationStatus } : null)}
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      >
                        <option value="verified">Confirmado por el restaurante</option>
                        <option value="pending">Pendiente de confirmación (Ref. provisional)</option>
                        <option value="unavailable">No disponible</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#344536] mb-1">Descripción gastronómica</label>
                      <textarea
                        rows={2}
                        value={editingItem?.description || ''}
                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                        placeholder="Ingredientes principales, preparación y toque característico..."
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#344536] mb-1">URL Fotografía</label>
                      <input
                        type="text"
                        value={editingItem?.image || ''}
                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, image: e.target.value } : null)}
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-[#344536]">
                        <input
                          type="checkbox"
                          checked={editingItem?.available ?? true}
                          onChange={(e) => setEditingItem(prev => prev ? { ...prev, available: e.target.checked } : null)}
                          className="rounded"
                        />
                        <span>Visible en Carta Pública</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer font-bold text-[#344536]">
                        <input
                          type="checkbox"
                          checked={editingItem?.featured ?? false}
                          onChange={(e) => setEditingItem(prev => prev ? { ...prev, featured: e.target.checked } : null)}
                          className="rounded"
                        />
                        <span>Plato Protagonista (Home)</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => { setEditingItem(null); setIsCreatingItem(false); }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-[#89957C] hover:bg-gray-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => editingItem && handleSaveMenuItem(editingItem)}
                      className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#344536] text-white hover:bg-[#252923]"
                    >
                      Guardar Plato
                    </button>
                  </div>
                </div>
              )}

              {/* Filtros de la tabla */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#89957C]" />
                  <input
                    type="text"
                    value={searchAdmin}
                    onChange={(e) => setSearchAdmin(e.target.value)}
                    placeholder="Buscar plato..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-[11px] text-[#89957C] font-semibold">Categoría:</span>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="text-xs p-1.5 rounded-lg border border-[#89957C]/30 bg-white"
                  >
                    {MENU_CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tabla de Productos de la Carta */}
              <div className="overflow-x-auto rounded-xl border border-[#89957C]/25">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4F0E7] text-[#344536] uppercase tracking-wider font-semibold border-b border-[#89957C]/20">
                    <tr>
                      <th className="p-3">Plato</th>
                      <th className="p-3">Categoría</th>
                      <th className="p-3">Precio</th>
                      <th className="p-3">Verificación</th>
                      <th className="p-3">Protagonista</th>
                      <th className="p-3">Visibilidad</th>
                      <th className="p-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {menuItems
                      .filter(m => filterCategory === 'Todos' || m.category === filterCategory)
                      .filter(m => searchAdmin === '' || m.name.toLowerCase().includes(searchAdmin.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                              />
                              <div>
                                <span className="font-bold text-[#344536] block">{item.name}</span>
                                <span className="text-[10px] text-[#89957C] line-clamp-1 max-w-xs">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-[#252923]">{item.category}</td>
                          <td className="p-3 font-semibold text-[#344536]">
                            {item.price !== null ? `${item.price.toFixed(2)} €` : (
                              <span className="text-[10px] text-[#89957C]">Consultar</span>
                            )}
                          </td>
                          <td className="p-3">
                            {item.verification_status === 'verified' ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                <CheckCircle2 className="w-3 h-3" /> Oficial
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#89957C] bg-[#F4F0E7] px-2 py-0.5 rounded">
                                <Clock className="w-3 h-3" /> Provisional
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handleToggleFeatured(item.id)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${
                                item.featured
                                  ? 'bg-[#B96F51] text-white'
                                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                              }`}
                            >
                              {item.featured ? 'Sí' : 'No'}
                            </button>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handleToggleAvailable(item.id)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                                item.available
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {item.available ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              <span>{item.available ? 'Visible' : 'Oculto'}</span>
                            </button>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => { setEditingItem(item); setIsCreatingItem(false); }}
                                className="p-1.5 text-[#344536] hover:text-[#B96F51] hover:bg-gray-100 rounded"
                                title="Editar plato"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteMenuItem(item.id)}
                                className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                                title="Eliminar plato"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: GESTIÓN DE ESPECIALIDADES */}
          {activeTab === 'specialties' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#344536]">
                    Gestión de Especialidades
                  </h2>
                  <p className="text-xs text-[#252923]/70 mt-1">
                    Crea, publica, oculta o edita platos especiales y recomendaciones del gastrobar.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingSpecialty({
                      id: 'esp_' + Date.now(),
                      title: '',
                      tagline: 'Sugerencia de cocina',
                      description: '',
                      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
                      is_active: true,
                      badge: 'Especialidad',
                      updated_at: new Date().toISOString().split('T')[0],
                    });
                    setIsCreatingSpecialty(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#344536] text-[#FCFAF5] hover:bg-[#252923] text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Especialidad</span>
                </button>
              </div>

              {/* Formulario de Especialidad */}
              {(editingSpecialty || isCreatingSpecialty) && (
                <div className="p-6 rounded-2xl bg-[#FCFAF5] border-2 border-[#89957C]/40 space-y-4 shadow-md text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#89957C]/20">
                    <h3 className="font-serif text-lg font-bold text-[#344536]">
                      {isCreatingSpecialty ? 'Crear Especialidad' : `Editar: ${editingSpecialty?.title}`}
                    </h3>
                    <button
                      onClick={() => { setEditingSpecialty(null); setIsCreatingSpecialty(false); }}
                      className="text-xs text-[#89957C] hover:text-[#344536] font-semibold"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#344536] mb-1">Título principal *</label>
                      <input
                        type="text"
                        value={editingSpecialty?.title || ''}
                        onChange={(e) => setEditingSpecialty(prev => prev ? { ...prev, title: e.target.value } : null)}
                        placeholder="Ej. Arroz meloso de marisco"
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#344536] mb-1">Subtítulo / Tagline</label>
                      <input
                        type="text"
                        value={editingSpecialty?.tagline || ''}
                        onChange={(e) => setEditingSpecialty(prev => prev ? { ...prev, tagline: e.target.value } : null)}
                        placeholder="Ej. Propuesta del fin de semana"
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#344536] mb-1">Insignia / Badge</label>
                      <input
                        type="text"
                        value={editingSpecialty?.badge || ''}
                        onChange={(e) => setEditingSpecialty(prev => prev ? { ...prev, badge: e.target.value } : null)}
                        placeholder="Plato de Demostración, Especialidad..."
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#344536] mb-1">URL Fotografía</label>
                      <input
                        type="text"
                        value={editingSpecialty?.image || ''}
                        onChange={(e) => setEditingSpecialty(prev => prev ? { ...prev, image: e.target.value } : null)}
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#344536] mb-1">Descripción</label>
                      <textarea
                        rows={3}
                        value={editingSpecialty?.description || ''}
                        onChange={(e) => setEditingSpecialty(prev => prev ? { ...prev, description: e.target.value } : null)}
                        placeholder="Detalle de la elaboración..."
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-[#344536]">
                      <input
                        type="checkbox"
                        checked={editingSpecialty?.is_active ?? true}
                        onChange={(e) => setEditingSpecialty(prev => prev ? { ...prev, is_active: e.target.checked } : null)}
                        className="rounded"
                      />
                      <span>Publicar en la sección web</span>
                    </label>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => { setEditingSpecialty(null); setIsCreatingSpecialty(false); }}
                        className="px-4 py-2 rounded-lg text-xs font-semibold text-[#89957C]"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => editingSpecialty && handleSaveSpecialty(editingSpecialty)}
                        className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#344536] text-white hover:bg-[#252923]"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lista de Novedades */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialties.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-[#89957C]/25 bg-white flex gap-4 items-start justify-between"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 bg-gray-100"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#B96F51] uppercase">
                          {item.badge}
                        </span>
                        <h4 className="font-serif font-bold text-[#344536] text-sm">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#252923]/70 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleSpecialtyActive(item.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {item.is_active ? 'Publicado' : 'Oculto'}
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { setEditingSpecialty(item); setIsCreatingSpecialty(false); }}
                          className="p-1 text-[#344536] hover:text-[#B96F51]"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSpecialty(item.id)}
                          className="p-1 text-rose-600 hover:text-rose-800"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SOLICITUDES DE RESERVA (DEMO) */}
          {activeTab === 'reservations' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#344536]">
                  Solicitudes de Reserva de Demostración
                </h2>
                <p className="text-xs text-[#252923]/70 mt-1">
                  Peticiones generadas desde el formulario público de la web. Puedes cambiar el estado de cada solicitud.
                </p>
              </div>

              {reservations.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-[#89957C]/25">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F0E7] text-[#344536] uppercase tracking-wider font-semibold border-b border-[#89957C]/20">
                      <tr>
                        <th className="p-3">Cliente</th>
                        <th className="p-3">Fecha y Hora</th>
                        <th className="p-3">Comensales</th>
                        <th className="p-3">Observaciones</th>
                        <th className="p-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {reservations.map((r) => (
                        <tr key={r.id} className="hover:bg-gray-50">
                          <td className="p-3">
                            <span className="font-bold text-[#344536] block">{r.name}</span>
                            <span className="text-[10px] text-[#89957C]">{r.phone}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-[#344536] block">{r.date}</span>
                            <span className="text-[10px] text-[#89957C]">{r.time} h</span>
                          </td>
                          <td className="p-3 font-bold text-[#344536]">
                            {r.guests} personas
                          </td>
                          <td className="p-3 text-[11px] text-[#252923]/70 max-w-xs">
                            {r.notes || 'Sin observaciones'}
                          </td>
                          <td className="p-3">
                            <select
                              value={r.status}
                              onChange={(e) => handleReservationStatusChange(r.id, e.target.value as ReservationSubmission['status'])}
                              className="text-xs font-semibold p-1.5 rounded-lg border border-[#89957C]/30 bg-white"
                            >
                              <option value="pending">Pendiente</option>
                              <option value="contacted">Contactado</option>
                              <option value="accepted">Aceptada</option>
                              <option value="rejected">Rechazada</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-[#89957C]/30 rounded-xl p-6">
                  <CalendarCheck className="w-8 h-8 text-[#89957C] mx-auto mb-2" />
                  <p className="font-serif text-base font-bold text-[#344536]">
                    No hay solicitudes de demostración aún
                  </p>
                  <p className="text-xs text-[#252923]/60 mt-1">
                    Ve a la web pública, rellena el formulario de reserva y verás cómo aparece aquí de inmediato.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CONFIGURACIÓN GENERAL */}
          {activeTab === 'config' && (
            <form onSubmit={handleSaveConfig} className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#344536]">
                  Configuración del Establecimiento
                </h2>
                <p className="text-xs text-[#252923]/70 mt-1">
                  Personaliza los datos visibles del gastrobar. Los cambios se guardan localmente para la demostración.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-[#344536] mb-1">Nombre Comercial</label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#344536] mb-1">Subtítulo de Marca</label>
                  <input
                    type="text"
                    value={config.subtitle}
                    onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#344536] mb-1">Titular Portada (Tagline)</label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#344536] mb-1">Subtítulo Portada</label>
                  <input
                    type="text"
                    value={config.subtagline}
                    onChange={(e) => setConfig({ ...config, subtagline: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-[#344536] mb-1">Texto de Presentación</label>
                  <textarea
                    rows={3}
                    value={config.about_text}
                    onChange={(e) => setConfig({ ...config, about_text: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#344536] mb-1">Dirección</label>
                  <input
                    type="text"
                    value={config.address}
                    onChange={(e) => setConfig({ ...config, address: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#344536] mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={config.instagram_url}
                    onChange={(e) => setConfig({ ...config, instagram_url: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#344536] mb-1">Teléfono Oficial (dejar vacío si no confirmado)</label>
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => setConfig({ ...config, phone: e.target.value, phone_display: e.target.value || "Teléfono pendiente de confirmación" })}
                    placeholder="Ej. +34 954 00 00 00"
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#344536] mb-1">WhatsApp Oficial (dígitos sin +)</label>
                  <input
                    type="text"
                    value={config.whatsapp_number}
                    onChange={(e) => setConfig({ ...config, whatsapp_number: e.target.value, whatsapp_display: e.target.value ? `WhatsApp (${e.target.value})` : "WhatsApp en fase de configuración" })}
                    placeholder="Ej. 34612345678"
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div className="sm:col-span-2 pt-2 flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-[#344536]">
                    <input
                      type="checkbox"
                      checked={config.is_phone_verified}
                      onChange={(e) => setConfig({ ...config, is_phone_verified: e.target.checked })}
                      className="rounded"
                    />
                    <span>Activar teléfono y WhatsApp en la web pública (sólo si han sido validados con el propietario)</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#344536] text-[#FCFAF5] hover:bg-[#252923] text-xs font-semibold tracking-wider uppercase transition-colors shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Configuración Demo</span>
                </button>
              </div>
            </form>
          )}

        </main>

      </div>
    </div>
  );
}
