import React from 'react';
import Link from 'next/link';
import { RestaurantConfig } from '@/types';
import { MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  config: RestaurantConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  return (
    <footer className="bg-[#252923] text-[#FCFAF5] pt-16 pb-12 border-t border-[#344536]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Marca */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-col items-start">
              <span className="font-serif tracking-[0.25em] text-2xl font-bold uppercase text-[#FCFAF5]">
                {config.name}
              </span>
              <span className="text-[11px] tracking-[0.35em] text-[#89957C] font-semibold uppercase mt-0.5">
                {config.subtitle}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#FCFAF5]/70 max-w-md leading-relaxed font-light">
              «{config.tagline}». Cocina tradicional andaluza con toques creativos, combinaciones originales y una personalidad desenfadada en Sevilla.
            </p>
          </div>

          {/* Navegación Rápida */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#89957C]">
              Explorar
            </h4>
            <ul className="space-y-2 text-xs text-[#FCFAF5]/80">
              <li>
                <Link href="#presentacion" className="hover:text-[#B96F51] transition-colors">
                  Concepto & Cocina
                </Link>
              </li>
              <li>
                <Link href="#platos-destacados" className="hover:text-[#B96F51] transition-colors">
                  Platos Protagonistas
                </Link>
              </li>
              <li>
                <Link href="#carta" className="hover:text-[#B96F51] transition-colors">
                  Carta Digital de Tapas
                </Link>
              </li>
              <li>
                <Link href="#novedades" className="hover:text-[#B96F51] transition-colors">
                  Lo que se cuece
                </Link>
              </li>
              <li>
                <Link href="#reservas" className="hover:text-[#B96F51] transition-colors">
                  Solicitud de Reserva
                </Link>
              </li>
            </ul>
          </div>

          {/* Enlaces & Administración */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#89957C]">
              Establecimiento
            </h4>
            <div className="space-y-2 text-xs text-[#FCFAF5]/80">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B96F51] shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </p>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#344536] hover:bg-[#89957C]/30 text-xs text-[#FCFAF5] transition-colors border border-[#89957C]/30"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#89957C]" />
                  <span>Panel de Gestión Demo</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Créditos y Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FCFAF5]/60 gap-4">
          <p>© {new Date().getFullYear()} Benavente Gastrobar. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Propuesta de experiencia digital gastronómica para Sevilla</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
