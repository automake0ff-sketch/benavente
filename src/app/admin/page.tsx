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
  ExternalLink
} from 'lucide-react';
import { benaventeStore } from '@/lib/store';
import { MenuItem, GastroSpecialty, RestaurantConfig, ReservationSubmission, VerificationStatus } from '@/types';
import { MENU_CATEGORIES } from '@/data/initialData';

export default function AdminPage() {
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
    triggerToast('¡Configuración del gastrobar guardada correctamente!');
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
    triggerToast('Plato guardado con éxito en la carta.');
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
  };

  const handleToggleFeatured = (id: string) => {
    const updated = menuItems.map(m => m.id === id ? { ...m, featured: !m.featured } : m);
    setMenuItems(updated);
    benaventeStore.saveMenuItems(updated);
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
    triggerToast('Novedad gastronómica guardada.');
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
  };

  // Actualizar estado de reserva
  const handleReservationStatusChange = (id: string, status: ReservationSubmission['status']) => {
    benaventeStore.updateReservationStatus(id, status);
    setReservations(benaventeStore.getReservations());
    triggerToast('Estado de reserva actualizado.');
  };

  const handleResetDefaults = () => {
    if (confirm('¿Restablecer todos los datos del gastrobar a los valores iniciales de demostración? Se borrarán tus cambios locales.')) {
      benaventeStore.resetToDefaults();
      loadData();
      triggerToast('Datos restablecidos.');
    }
  };

  if (!config) return null;

  // Métricas para el Dashboard
  const totalProducts = menuItems.length;
  const publishedProducts = menuItems.filter(m => m.available).length;
  const pendingVerificationProducts = menuItems.filter(m => m.verification_status === 'pending').length;
  const featuredProducts = menuItems.filter(m => m.featured).length;

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
                Panel de Gestión & Control Editorial
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
              <span>Ver Web Pública</span>
            </Link>
            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1 text-[11px] text-[#FCFAF5]/70 hover:text-rose-300 transition-colors p-1"
              title="Restablecer datos demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
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
              <strong>Entorno de Demostración Local:</strong> Los cambios se persisten en el almacenamiento del navegador (LocalStorage). Para producción multiusuario, se conecta con Supabase (Auth + Postgres + RLS).
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-[#89957C]">
            Modo Demo Activo
          </span>
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
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">
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
              <span>Lo que se cuece</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">
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
              <span>Solicitudes Reserva</span>
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
            <span>Configuración Local</span>
          </button>
        </aside>

        {/* Área de Contenido Principal */}
        <main className="flex-1 bg-white rounded-2xl border border-[#89957C]/25 shadow-sm p-6 sm:p-8">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#344536]">
                  Resumen y Estado del Gastrobar
                </h2>
                <p className="text-xs text-[#252923]/70 mt-1">
                  Métricas clave del catálogo gastronómico, estado de verificación y solicitudes de clientes.
                </p>
              </div>

              {/* Tarjetas de métricas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-[#FCFAF5] border border-[#89957C]/20 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#89957C]">
                    Total Productos
                  </span>
                  <p className="font-serif text-3xl font-bold text-[#344536]">
                    {totalProducts}
                  </p>
                  <p className="text-[11px] text-[#252923]/60">
                    Platos registrados en el catálogo
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#FCFAF5] border border-[#89957C]/20 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Productos Publicados
                  </span>
                  <p className="font-serif text-3xl font-bold text-emerald-800">
                    {publishedProducts}
                  </p>
                  <p className="text-[11px] text-[#252923]/60">
                    Visibles para los clientes en la carta
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#FCFAF5] border border-[#89957C]/20 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B96F51]">
                    Pendientes de Confirmar
                  </span>
                  <p className="font-serif text-3xl font-bold text-[#B96F51]">
                    {pendingVerificationProducts}
                  </p>
                  <p className="text-[11px] text-[#252923]/60">
                    Precios o ingredientes no validados
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#FCFAF5] border border-[#89957C]/20 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#89957C]">
                    Platos Protagonistas
                  </span>
                  <p className="font-serif text-3xl font-bold text-[#344536]">
                    {featuredProducts}
                  </p>
                  <p className="text-[11px] text-[#252923]/60">
                    Destacados en la sección de inicio
                  </p>
                </div>
              </div>

              {/* Estado general del contenido */}
              <div className="p-5 rounded-xl bg-[#F4F0E7]/60 border border-[#89957C]/25 space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#344536]">
                  Diagnóstico Editorial de Contenidos
                </h3>
                <div className="space-y-2 text-xs text-[#252923]/80">
                  <div className="flex items-center justify-between">
                    <span>• Platos Protagonistas del Gastrobar</span>
                    <span className="font-semibold text-emerald-700">5 configurados</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Estado de precios verificados en carta oficial</span>
                    <span className="font-semibold text-amber-700">Pendiente de ratificación con gerencia</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Georreferenciación en Sevilla Este</span>
                    <span className="font-semibold text-emerald-700">Avenida de las Ciencias, 22</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Canales directos de conversión móvil</span>
                    <span className="font-semibold text-emerald-700">WhatsApp + Teléfono + Formulario</span>
                  </div>
                </div>
              </div>

              {/* Accesos directos de acción */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => { setActiveTab('menu'); setIsCreatingItem(true); }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#344536] text-[#FCFAF5] hover:bg-[#252923] text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Nuevo Plato</span>
                </button>
                <button
                  onClick={() => { setActiveTab('specialties'); setIsCreatingSpecialty(true); }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#89957C]/30 text-[#344536] hover:bg-[#F4F0E7] text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#B96F51]" />
                  <span>Crear Novedad Gastronómica</span>
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
                    Edita precios, categorías, alérgenos, fotos y estados de verificación.
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
                      source: 'Administración Benavente',
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

              {/* Formulario Modal / En línea de creación/edición */}
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
                        <option value="verified">Verified (Confirmado por el restaurante)</option>
                        <option value="pending">Pending (Pendiente de confirmación)</option>
                        <option value="unavailable">Unavailable (No disponible)</option>
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

                    <div>
                      <label className="block font-bold text-[#344536] mb-1">URL Fotografía</label>
                      <input
                        type="text"
                        value={editingItem?.image || ''}
                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, image: e.target.value } : null)}
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#344536] mb-1">Alérgenos (separados por comas)</label>
                      <input
                        type="text"
                        value={editingItem?.allergens?.join(', ') || ''}
                        onChange={(e) => {
                          const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setEditingItem(prev => prev ? { ...prev, allergens: arr } : null);
                        }}
                        placeholder="Gluten, Lácteos, Huevos..."
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#344536] mb-1">Fuente de datos / Origen</label>
                      <input
                        type="text"
                        value={editingItem?.source || ''}
                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, source: e.target.value } : null)}
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-5">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-[#344536]">
                        <input
                          type="checkbox"
                          checked={editingItem?.available ?? true}
                          onChange={(e) => setEditingItem(prev => prev ? { ...prev, available: e.target.checked } : null)}
                          className="rounded"
                        />
                        <span>Disponible en Carta</span>
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
                      <th className="p-3">Home</th>
                      <th className="p-3">Disponible</th>
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
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                                <Clock className="w-3 h-3" /> Pendiente
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
                    Lo que se cuece en Benavente
                  </h2>
                  <p className="text-xs text-[#252923]/70 mt-1">
                    Crea, publica, oculta o edita sugerencias del día, recomendaciones y novedades gastronómicas.
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
                      badge: 'Sugerencia',
                      updated_at: new Date().toISOString().split('T')[0],
                    });
                    setIsCreatingSpecialty(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#344536] text-[#FCFAF5] hover:bg-[#252923] text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Publicación</span>
                </button>
              </div>

              {/* Formulario de Especialidad */}
              {(editingSpecialty || isCreatingSpecialty) && (
                <div className="p-6 rounded-2xl bg-[#FCFAF5] border-2 border-[#89957C]/40 space-y-4 shadow-md text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#89957C]/20">
                    <h3 className="font-serif text-lg font-bold text-[#344536]">
                      {isCreatingSpecialty ? 'Crear Publicación Especial' : `Editar: ${editingSpecialty?.title}`}
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
                        placeholder="Ej. Arroz meloso de marisco de lonja"
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#344536] mb-1">Subtítulo / Tagline</label>
                      <input
                        type="text"
                        value={editingSpecialty?.tagline || ''}
                        onChange={(e) => setEditingSpecialty(prev => prev ? { ...prev, tagline: e.target.value } : null)}
                        placeholder="Ej. Fuera de carta del fin de semana"
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#344536] mb-1">Insignia / Badge</label>
                      <input
                        type="text"
                        value={editingSpecialty?.badge || ''}
                        onChange={(e) => setEditingSpecialty(prev => prev ? { ...prev, badge: e.target.value } : null)}
                        placeholder="Plato Estrella, Temporada, Sugerencia..."
                        className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#344536] mb-1">URL Imagen</label>
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
                        placeholder="Explica qué hace especial a este plato o novedad..."
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
                        Guardar Novedad
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

          {/* TAB 4: SOLICITUDES DE RESERVA */}
          {activeTab === 'reservations' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#344536]">
                  Solicitudes de Reserva Recibidas
                </h2>
                <p className="text-xs text-[#252923]/70 mt-1">
                  Gestiona el contacto y la confirmación de mesas solicitadas a través de la web.
                </p>
              </div>

              {reservations.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-[#89957C]/25">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F0E7] text-[#344536] uppercase tracking-wider font-semibold border-b border-[#89957C]/20">
                      <tr>
                        <th className="p-3">Cliente</th>
                        <th className="p-3">Fecha y Hora</th>
                        <th className="p-3">Personas</th>
                        <th className="p-3">Observaciones</th>
                        <th className="p-3">Estado</th>
                        <th className="p-3 text-right">Contactar</th>
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
                            {r.guests} comensales
                          </td>
                          <td className="p-3 text-[11px] text-[#252923]/70 max-w-xs">
                            {r.notes || '—'}
                          </td>
                          <td className="p-3">
                            <select
                              value={r.status}
                              onChange={(e) => handleReservationStatusChange(r.id, e.target.value as ReservationSubmission['status'])}
                              className="text-[10px] font-bold p-1 rounded border border-gray-200 bg-white"
                            >
                              <option value="pending_contact">Pendiente de contacto</option>
                              <option value="contacted">Contactado</option>
                              <option value="confirmed">Confirmada</option>
                              <option value="cancelled">Cancelada</option>
                            </select>
                          </td>
                          <td className="p-3 text-right">
                            <a
                              href={`https://wa.me/${r.phone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(r.name)},%20nos%20ponemos%20en%20contacto%20desde%20Benavente%20Gastrobar%20respecto%20a%20tu%20solicitud%20de%20mesa`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded hover:bg-emerald-100"
                            >
                              <span>WhatsApp</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
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
                    No hay solicitudes pendientes
                  </p>
                  <p className="text-xs text-[#252923]/60 mt-1">
                    Cuando un usuario envíe el formulario de reserva en la página de inicio, aparecerá aquí.
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
                  Actualiza datos de contacto, enlaces oficiales, textos de marca y fotos de portada.
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
                  <label className="block font-bold text-[#344536] mb-1">Frase de Marca (Titular Home)</label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#344536] mb-1">Subtítulo de Marca (Home)</label>
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
                  <label className="block font-bold text-[#344536] mb-1">Dirección Física</label>
                  <input
                    type="text"
                    value={config.address}
                    onChange={(e) => setConfig({ ...config, address: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#344536] mb-1">Teléfono Oficial</label>
                  <input
                    type="text"
                    value={config.phone_display}
                    onChange={(e) => setConfig({ ...config, phone_display: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#344536] mb-1">Número de WhatsApp (con prefijo sin +)</label>
                  <input
                    type="text"
                    value={config.whatsapp_number}
                    onChange={(e) => setConfig({ ...config, whatsapp_number: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                    placeholder="34600000000"
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
                  <label className="block font-bold text-[#344536] mb-1">Foto Hero Principal (URL)</label>
                  <input
                    type="text"
                    value={config.hero_image}
                    onChange={(e) => setConfig({ ...config, hero_image: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#89957C]/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#344536] mb-1">Foto Filosofía 1 (URL)</label>
                  <input
                    type="text"
                    value={config.about_image_1}
                    onChange={(e) => setConfig({ ...config, about_image_1: e.target.value })}
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
                    <span>Teléfono y WhatsApp oficiales verificados (Activa botón flotante WhatsApp)</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#344536] text-[#FCFAF5] hover:bg-[#252923] text-xs font-semibold tracking-wider uppercase transition-colors shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Toda la Configuración</span>
                </button>
              </div>
            </form>
          )}

        </main>

      </div>
    </div>
  );
}
