'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, UtensilsCrossed, Calendar, ShieldCheck } from 'lucide-react';
import { RestaurantConfig } from '@/types';

interface NavbarProps {
  config: RestaurantConfig;
}

export const Navbar: React.FC<NavbarProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FCFAF5]/95 backdrop-blur-md shadow-sm border-b border-[#89957C]/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Tipográfico */}
          <Link href="/" className="group flex flex-col items-start focus:outline-none">
            <span className="font-serif tracking-[0.25em] text-xl sm:text-2xl font-bold text-[#344536] group-hover:text-[#B96F51] transition-colors uppercase">
              {config.name.replace(' Gastrobar', '')}
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.35em] text-[#89957C] font-semibold uppercase -mt-0.5">
              {config.subtitle || 'GASTROBAR'}
            </span>
          </Link>

          {/* Enlaces de escritorio */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider text-[#252923]">
            <Link
              href="#presentacion"
              className="hover:text-[#B96F51] transition-colors py-1"
            >
              CONCEPTO
            </Link>
            <Link
              href="#platos-destacados"
              className="hover:text-[#B96F51] transition-colors py-1"
            >
              PROTAGONISTAS
            </Link>
            <Link
              href="/carta"
              className="hover:text-[#B96F51] transition-colors py-1 flex items-center gap-1.5 font-semibold text-[#344536]"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#B96F51]" />
              CARTA DIGITAL
            </Link>
            <Link
              href="#novedades"
              className="hover:text-[#B96F51] transition-colors py-1"
            >
              LO QUE SE CUECE
            </Link>
            <Link
              href="#ubicacion"
              className="hover:text-[#B96F51] transition-colors py-1"
            >
              UBICACIÓN
            </Link>
          </nav>

          {/* Botón CTA Reservar y Enlace Admin */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin"
              className="text-xs font-semibold tracking-wider text-[#89957C] hover:text-[#344536] transition-colors flex items-center gap-1 px-2 py-1 rounded"
              title="Panel de administración"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Panel</span>
            </Link>

            <Link
              href="#reservas"
              className="inline-flex items-center gap-2 bg-[#344536] text-[#FCFAF5] hover:bg-[#252923] text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200"
            >
              <Calendar className="w-3.5 h-3.5 text-[#89957C]" />
              <span>Reservar Mesa</span>
            </Link>
          </div>

          {/* Botón Hamburguesa móvil */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="#reservas"
              className="inline-flex items-center text-xs font-semibold bg-[#344536] text-[#FCFAF5] px-3 py-1.5 rounded-full"
            >
              <span>Reservar</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#344536] hover:text-[#252923] focus:outline-none"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil desplegable */}
      {isOpen && (
        <div className="md:hidden bg-[#FCFAF5] border-b border-[#89957C]/20 px-6 pt-3 pb-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#252923]">
            <Link
              href="#presentacion"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#B96F51] py-1 border-b border-gray-100"
            >
              Concepto & Identidad
            </Link>
            <Link
              href="#platos-destacados"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#B96F51] py-1 border-b border-gray-100"
            >
              Platos Protagonistas
            </Link>
            <Link
              href="/carta"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#B96F51] py-1 text-[#344536] font-semibold flex items-center justify-between border-b border-gray-100"
            >
              <span>Carta Digital Completa</span>
              <span className="text-xs bg-[#89957C]/20 text-[#344536] px-2 py-0.5 rounded">Ver</span>
            </Link>
            <Link
              href="#novedades"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#B96F51] py-1 border-b border-gray-100"
            >
              Lo que se cuece en Benavente
            </Link>
            <Link
              href="#ubicacion"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#B96F51] py-1 border-b border-gray-100"
            >
              Ubicación y Horarios
            </Link>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="#reservas"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-[#344536] text-[#FCFAF5] py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase shadow"
            >
              Solicitar Reserva
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-xs text-[#89957C] hover:text-[#344536] py-1.5 flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Acceso Panel de Gestión</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
