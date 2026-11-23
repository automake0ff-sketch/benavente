import React from 'react';
import Link from 'next/link';
import { MenuItem } from '@/types';
import { ArrowRight, Flame, AlertCircle } from 'lucide-react';

interface FeaturedDishesProps {
  items: MenuItem[];
}

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({ items }) => {
  const featured = items.filter(item => item.featured).slice(0, 5);

  if (featured.length === 0) return null;

  const [hero, ...rest] = featured;

  return (
    <section id="platos-destacados" className="py-20 sm:py-28 bg-[#FCFAF5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#89957C]">
              <Flame className="w-4 h-4 text-[#B96F51]" />
              <span>Selección de la Casa</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#344536] leading-tight">
              Platos Protagonistas
            </h2>
            <p className="text-base text-[#252923]/75">
              Creaciones que resumen el espíritu de Benavente: sabor reconocible, técnica actual y ese giro original que invita a compartir.
            </p>
          </div>
          <Link
            href="/carta"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-[#344536] hover:text-[#B96F51] transition-colors group shrink-0"
          >
            <span>Ver Carta Completa</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Layout editorial: Plato hero grande + 4 tarjetas secundarias */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Plato Hero — ocupa 7 columnas, imagen vertical grande */}
          {hero && (
            <div className="lg:col-span-7 group relative rounded-2xl overflow-hidden bg-[#F4F0E7] border border-[#89957C]/20 shadow-sm hover:shadow-xl transition-all duration-500 cursor-default">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[380px] overflow-hidden">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Overlay de degradado editorial */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#252923]/90 via-[#252923]/30 to-transparent" />

                {/* Badge categoría */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#344536]/95 text-[#FCFAF5] backdrop-blur-sm">
                    {hero.category}
                  </span>
                  {hero.verification_status === 'pending' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#B96F51]/90 text-white backdrop-blur-sm">
                      Ref. provisional
                    </span>
                  )}
                </div>

                {/* Contenido sobre imagen */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FCFAF5] leading-snug mb-2 drop-shadow-lg">
                        {hero.name}
                      </h3>
                      <p className="text-sm text-[#FCFAF5]/80 leading-relaxed line-clamp-2 drop-shadow">
                        {hero.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      {hero.price !== null ? (
                        <span className="font-serif text-2xl font-bold text-[#FCFAF5] drop-shadow-lg">
                          {hero.price_display?.replace(' (Ref. provisional)', '') || `${hero.price.toFixed(2).replace('.', ',')} €`}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FCFAF5]/20 text-[#FCFAF5] backdrop-blur-sm">
                          Consultar precio
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Platos secundarios — 4 tarjetas en 5 columnas */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
            {rest.map((dish) => (
              <div
                key={dish.id}
                className="group bg-white rounded-xl overflow-hidden border border-[#89957C]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-default"
              >
                {/* Imagen pequeña */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#F4F0E7]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#344536]/90 text-[#FCFAF5]">
                      {dish.category}
                    </span>
                  </div>
                </div>

                {/* Información */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#344536] group-hover:text-[#B96F51] transition-colors leading-snug">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#252923]/65 leading-relaxed mt-1 line-clamp-2">
                      {dish.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    {dish.price !== null ? (
                      <span className="font-serif text-sm font-bold text-[#344536]">
                        {dish.price_display?.replace(' (Ref. provisional)', '') || `${dish.price.toFixed(2).replace('.', ',')} €`}
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-[#89957C] bg-[#F4F0E7] px-2 py-0.5 rounded">
                        Consultar precio
                      </span>
                    )}
                    {dish.verification_status === 'pending' && (
                      <span className="text-[10px] text-[#B96F51]/70 font-semibold">
                        Ref.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nota de transparencia editorial */}
        <div className="mt-8 p-4 rounded-xl bg-[#F4F0E7]/60 border border-[#89957C]/20 flex items-center gap-3 text-xs text-[#252923]/70">
          <AlertCircle className="w-4 h-4 text-[#89957C] shrink-0" />
          <span>
            <strong>Catálogo de demostración comercial:</strong> Los precios marcados como referencia provisional están pendientes de ratificación por parte de Benavente Gastrobar y podrán actualizarse desde el panel de gestión.
          </span>
        </div>

      </div>
    </section>
  );
};
