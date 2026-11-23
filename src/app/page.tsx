'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { FeaturedDishes } from '@/components/FeaturedDishes';
import { MenuSection } from '@/components/MenuSection';
import { Specialties } from '@/components/Specialties';
import { Reservations } from '@/components/Reservations';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { benaventeStore } from '@/lib/store';
import { RestaurantConfig, MenuItem, GastroSpecialty } from '@/types';
import { MessageCircle } from 'lucide-react';

export default function HomePage() {
  const [config, setConfig] = useState<RestaurantConfig | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [specialties, setSpecialties] = useState<GastroSpecialty[]>([]);

  useEffect(() => {
    const refreshData = () => {
      setConfig(benaventeStore.getConfig());
      setMenuItems(benaventeStore.getMenuItems());
      setSpecialties(benaventeStore.getSpecialties());
    };

    // Carga inicial en cliente
    refreshData();

    // Escuchar cambios reactivos producidos desde el panel /admin en este mismo navegador
    window.addEventListener('benavente_store_updated', refreshData);
    window.addEventListener('storage', refreshData);

    return () => {
      window.removeEventListener('benavente_store_updated', refreshData);
      window.removeEventListener('storage', refreshData);
    };
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFAF5]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#344536] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg text-[#344536] tracking-widest uppercase">
            Benavente Gastrobar
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFAF5] flex flex-col relative">
      <Navbar config={config} />
      
      <Hero config={config} />
      
      <About config={config} />
      
      <FeaturedDishes items={menuItems} />
      
      <MenuSection items={menuItems} />
      
      <Specialties specialties={specialties} />
      
      <Reservations config={config} />
      
      <Contact config={config} />
      
      <Footer config={config} />

      {/* Botón Flotante de WhatsApp para conversión inmediata móvil: Sólo si está verificado */}
      {config.is_phone_verified && config.whatsapp_number && (
        <a
          href={`https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}?text=Hola%20Benavente%20Gastrobar,%20quisiera%20información`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir WhatsApp oficial"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      )}
    </main>
  );
}
