'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MenuSection } from '@/components/MenuSection';
import { benaventeStore } from '@/lib/store';
import { MenuItem, RestaurantConfig } from '@/types';
import { ArrowLeft, QrCode, UtensilsCrossed } from 'lucide-react';

export default function CartaPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [config, setConfig] = useState<RestaurantConfig | null>(null);

  useEffect(() => {
    const refreshData = () => {
      setMenuItems(benaventeStore.getMenuItems());
      setConfig(benaventeStore.getConfig());
    };
    refreshData();
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
    <div className="min-h-screen bg-[#FCFAF5] flex flex-col">
      {/* Header compacto para /carta (ideal para acceso QR) */}
      <header className="sticky top-0 z-30 bg-[#FCFAF5]/95 backdrop-blur-md border-b border-[#89957C]/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#344536] hover:text-[#B96F51] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Volver</span>
          </Link>

          <div className="flex flex-col items-center">
            <span className="font-serif text-base font-bold text-[#344536] tracking-widest uppercase leading-none">
              Benavente
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#89957C]">
              Gastrobar · Carta Digital
            </span>
          </div>

          <Link
            href="#reservas"
            onClick={() => { window.location.href = '/#reservas'; }}
            className="inline-flex items-center gap-1.5 bg-[#344536] text-[#FCFAF5] hover:bg-[#252923] px-3.5 py-2 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all"
          >
            <UtensilsCrossed className="w-3 h-3 text-[#89957C]" />
            <span className="hidden sm:inline">Reservar</span>
            <span className="sm:hidden">Mesa</span>
          </Link>
        </div>
      </header>

      {/* Banner QR discreto */}
      <div className="bg-[#344536] text-[#FCFAF5] py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs">
          <QrCode className="w-3.5 h-3.5 text-[#89957C] shrink-0" />
          <span className="text-[#FCFAF5]/80">
            Carta digital de <strong className="text-[#FCFAF5]">Benavente Gastrobar</strong> — Sevilla
          </span>
        </div>
      </div>

      {/* Carta completa */}
      <main className="flex-1">
        <MenuSection items={menuItems} />
      </main>

      {/* Footer mínimo */}
      <footer className="py-6 border-t border-[#89957C]/20 bg-[#FCFAF5]">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="font-serif text-sm font-bold text-[#344536]">Benavente Gastrobar · Sevilla</p>
          <div className="flex items-center justify-center gap-4 text-xs text-[#89957C]">
            <Link href="/" className="hover:text-[#344536] transition-colors">Inicio</Link>
            <span>·</span>
            <a
              href={config.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#344536] transition-colors"
            >
              @benaventegastrobar
            </a>
            <span>·</span>
            <a
              href={config.tripadvisor_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#344536] transition-colors"
            >
              Tripadvisor
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
