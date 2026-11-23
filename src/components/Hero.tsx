'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, UtensilsCrossed, Calendar, QrCode } from 'lucide-react';
import { RestaurantConfig } from '@/types';

interface HeroProps {
  config: RestaurantConfig;
}

export const Hero: React.FC<HeroProps> = ({ config }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Fondo fotográfico con overlay editorial */}
      <div className="absolute inset-0 z-0">
        <img
          src={config.hero_image}
          alt="Benavente Gastrobar — Cocina andaluza creativa en Sevilla"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradiente editorial: más oscuro abajo para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#252923]/70 via-[#252923]/50 to-[#252923]/85" />
        {/* Overlay de textura verde oliva sutil */}
        <div className="absolute inset-0 bg-[#344536]/20 mix-blend-multiply" />
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 flex flex-col flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Espacio para la Navbar fija */}
        <div className="pt-24 sm:pt-28 flex-1 flex flex-col justify-center">

          <div
            className={`max-w-4xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {/* Etiqueta editorial */}
            <div className="inline-flex items-center gap-2.5 mb-6">
              <span className="w-8 h-px bg-[#89957C]" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#89957C]">
                Gastrobar en Sevilla — Cocina Andaluza Creativa
              </span>
            </div>

            {/* Titular principal */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#FCFAF5] leading-[1.03] tracking-tight mb-4">
              {config.tagline || 'La tradición tiene otro sabor'}
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-xl text-[#FCFAF5]/75 font-normal max-w-2xl leading-relaxed mb-8">
              {config.subtagline || 'Cocina con personalidad, platos para compartir y ese punto canalla que hace volver.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
              <Link
                href="/carta"
                className="inline-flex items-center justify-center gap-2.5 bg-[#FCFAF5] text-[#344536] hover:bg-[#F4F0E7] px-7 py-4 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-2xl group"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#B96F51]" />
                <span>Ver Nuestra Carta</span>
              </Link>
              <Link
                href="#reservas"
                className="inline-flex items-center justify-center gap-2.5 bg-[#344536]/70 text-[#FCFAF5] hover:bg-[#344536] border border-[#89957C]/50 px-7 py-4 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 backdrop-blur-sm"
              >
                <Calendar className="w-4 h-4 text-[#89957C]" />
                <span>Reservar Mesa</span>
              </Link>
            </div>

            {/* Micro-datos informativos */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#FCFAF5]/60 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B96F51]" />
                <span>Sevilla Este · Av. Ciencias</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#89957C]" />
                <span>Tapas de autor · Platos para compartir</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FCFAF5]/40" />
                <span>Cocina tradicional reinterpretada</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior: acceso QR + indicador de scroll */}
        <div
          className={`pb-8 flex items-end justify-between transition-all duration-700 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Acceso rápido QR */}
          <Link
            href="/carta"
            className="flex items-center gap-2 bg-[#FCFAF5]/10 hover:bg-[#FCFAF5]/20 backdrop-blur-sm border border-[#FCFAF5]/20 px-3.5 py-2 rounded-xl text-[#FCFAF5]/70 hover:text-[#FCFAF5] transition-all"
          >
            <QrCode className="w-4 h-4 shrink-0" />
            <div className="text-left">
              <span className="block text-[9px] uppercase tracking-widest font-semibold text-[#89957C]">Carta digital</span>
              <span className="block text-[11px] font-bold leading-none">Acceso directo</span>
            </div>
          </Link>

          {/* Indicador de desplazamiento */}
          <Link
            href="#presentacion"
            className="group flex flex-col items-center text-[#FCFAF5]/50 hover:text-[#FCFAF5] transition-colors"
            aria-label="Descubrir Benavente Gastrobar"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] font-semibold mb-2">Descubrir</span>
            <div className="w-8 h-8 rounded-full border border-[#FCFAF5]/30 flex items-center justify-center group-hover:border-[#FCFAF5]/70 transition-colors">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
