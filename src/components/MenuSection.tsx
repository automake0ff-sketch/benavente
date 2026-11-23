'use client';

import React, { useState, useMemo } from 'react';
import { MenuItem } from '@/types';
import { MENU_CATEGORIES } from '@/data/initialData';
import { Search, Sparkles, AlertCircle, CheckCircle2, Clock, Info } from 'lucide-react';

interface MenuSectionProps {
  items: MenuItem[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtrado reactivo de platos en cliente
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Si el plato está marcado como no disponible/oculto, no mostrarlo en la carta pública
      if (!item.available) return false;

      // Filtro de categoría
      if (selectedCategory !== 'Todos' && item.category !== selectedCategory) {
        return false;
      }

      // Búsqueda por texto (nombre, ingredientes o categoría)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <section id="carta" className="py-20 sm:py-28 bg-[#F4F0E7]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Carta */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#B96F51]">
            Experiencia Gastronómica
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#344536]">
            Nuestra Carta Digital
          </h2>
          <p className="text-sm sm:text-base text-[#252923]/75">
            Explora nuestras propuestas de cocina andaluza contemporánea. Consulta precios orientativos de demostración y sugerencias de la casa.
          </p>
        </div>

        {/* Buscador & Barra de controles */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Input de Búsqueda */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#89957C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar plato o ingrediente..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs sm:text-sm bg-white border border-[#89957C]/30 focus:border-[#344536] focus:outline-none transition-colors shadow-sm placeholder-[#89957C]"
            />
          </div>

          {/* Contador y distintivo de demo */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4 text-xs text-[#89957C]">
            <span>
              Mostrando <strong className="text-[#344536]">{filteredItems.length}</strong> platos en carta
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] bg-white border border-[#89957C]/20 px-2.5 py-1 rounded-full text-[#344536]">
              <Info className="w-3 h-3 text-[#B96F51]" />
              <span>Actualizable desde /admin</span>
            </span>
          </div>
        </div>

        {/* Barra de Categorías estilo Pills con scroll horizontal táctil */}
        <div className="mb-12 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#344536] text-[#FCFAF5] shadow-md scale-105'
                      : 'bg-white text-[#252923] hover:bg-[#F4F0E7] border border-[#89957C]/20'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grilla de Platos de la Carta */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isVerified = item.verification_status === 'verified';
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#89957C]/20 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  {/* Foto del plato */}
                  <div className="relative aspect-[16/10] bg-[#F4F0E7] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#344536]/90 text-white uppercase tracking-wider backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>

                    {item.featured && (
                      <div className="absolute top-2.5 right-2.5 bg-[#B96F51] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                        <Sparkles className="w-3 h-3" />
                        <span>Destacado</span>
                      </div>
                    )}
                  </div>

                  {/* Detalle del plato */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-lg font-bold text-[#344536] group-hover:text-[#B96F51] transition-colors leading-snug">
                          {item.name}
                        </h3>
                        <div className="shrink-0 text-right">
                          {item.price !== null ? (
                            <span className="font-serif text-base font-bold text-[#344536]">
                              {item.price_display || `${item.price.toFixed(2).replace('.', ',')} €`}
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-[#89957C] bg-[#F4F0E7] px-2 py-0.5 rounded">
                              Consultar precio
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-[#252923]/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Alérgenos y estado discreto de verificación */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-[10px] text-[#89957C]">
                        Información de alérgenos: consultar en sala
                      </span>

                      {/* Insignia discreta */}
                      <div>
                        {isVerified ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Confirmado
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#89957C] bg-[#F4F0E7] px-1.5 py-0.5 rounded"
                            title="Precio pendiente de ratificación en carta oficial"
                          >
                            <Clock className="w-2.5 h-2.5" />
                            Ref. provisional
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#89957C]/20 p-8 max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-[#89957C] mx-auto mb-3" />
            <p className="font-serif text-lg font-bold text-[#344536]">
              No se encontraron platos
            </p>
            <p className="text-xs text-[#252923]/70 mt-1 mb-4">
              Prueba a cambiar el término de búsqueda o selecciona otra categoría de la carta.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className="text-xs font-semibold uppercase tracking-wider text-[#344536] underline hover:text-[#B96F51]"
            >
              Restablecer filtros
            </button>
          </div>
        )}

        {/* Nota informativa de alérgenos respetuosa y profesional */}
        <div className="mt-12 text-center text-[11px] text-[#89957C] max-w-2xl mx-auto">
          En cumplimiento del Reglamento (UE) nº 1169/2011, la información detallada sobre alérgenos e ingredientes específicos está a disposición del cliente en el establecimiento y será facilitada por el equipo de sala al tomar la comanda.
        </div>

      </div>
    </section>
  );
};
