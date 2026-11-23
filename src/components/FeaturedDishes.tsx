import React from 'react';
import Link from 'next/link';
import { MenuItem } from '@/types';
import { ArrowRight, Star, AlertCircle, Info } from 'lucide-react';

interface FeaturedDishesProps {
  items: MenuItem[];
}

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({ items }) => {
  // Mostramos los 5 platos protagonistas solicitados
  const featured = items.filter(item => item.featured).slice(0, 5);

  return (
    <section id="platos-destacados" className="py-20 sm:py-28 bg-[#FCFAF5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#89957C]">
              <Star className="w-4 h-4 text-[#B96F51] fill-[#B96F51]" />
              <span>Selección de la Casa</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#344536] leading-tight">
              Platos Protagonistas
            </h2>
            <p className="text-base text-[#252923]/80">
              Creaciones que resumen el espíritu de Benavente: sabor reconocible, técnica actual y ese giro original que invita a compartir.
            </p>
          </div>

          <Link
            href="#carta"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-[#344536] hover:text-[#B96F51] transition-colors group"
          >
            <span>Ver Carta Completa</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Rejilla de Platos Protagonistas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((dish, idx) => {
            return (
              <div
                key={dish.id}
                className={`group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#89957C]/25 shadow-sm hover:shadow-xl transition-all duration-300 ${
                  idx === 0 ? 'lg:col-span-2 lg:flex-row' : ''
                }`}
              >
                {/* Imagen del plato */}
                <div
                  className={`relative overflow-hidden bg-[#F4F0E7] ${
                    idx === 0 ? 'lg:w-1/2 aspect-[4/3] lg:aspect-auto' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#344536]/90 text-[#FCFAF5] backdrop-blur-sm">
                      {dish.category}
                    </span>
                    {dish.verification_status === 'pending' && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-[#F4F0E7] text-[#89957C] border border-[#89957C]/30">
                        Ref. provisional
                      </span>
                    )}
                  </div>
                </div>

                {/* Contenido descriptivo */}
                <div
                  className={`p-6 sm:p-7 flex flex-col justify-between flex-1 ${
                    idx === 0 ? 'lg:w-1/2' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#344536] group-hover:text-[#B96F51] transition-colors leading-snug">
                        {dish.name}
                      </h3>
                      <div className="text-right shrink-0">
                        {dish.price !== null ? (
                          <span className="font-serif text-lg sm:text-xl font-bold text-[#344536]">
                            {dish.price_display || `${dish.price.toFixed(2).replace('.', ',')} €`}
                          </span>
                        ) : (
                          <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F4F0E7] text-[#89957C]">
                            Consultar precio
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-[#252923]/75 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Pie de tarjeta con verificación responsable */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#89957C]">
                    <div className="flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#89957C]" />
                      <span className="text-[11px] truncate max-w-[200px]" title={dish.source}>
                        {dish.source}
                      </span>
                    </div>

                    <Link
                      href="#reservas"
                      className="text-[#344536] hover:text-[#B96F51] font-semibold text-xs flex items-center gap-1"
                    >
                      <span>Reservar mesa</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Nota de transparencia editorial */}
        <div className="mt-8 p-4 rounded-xl bg-[#F4F0E7]/60 border border-[#89957C]/20 flex items-center gap-3 text-xs text-[#252923]/75">
          <AlertCircle className="w-4 h-4 text-[#89957C] shrink-0" />
          <span>
            <strong>Catálogo de demostración comercial:</strong> Los precios y selecciones se basan en referencias públicas iniciales y podrán ser personalizados y ratificados por la gerencia de Benavente Gastrobar desde el panel de gestión.
          </span>
        </div>

      </div>
    </section>
  );
};
