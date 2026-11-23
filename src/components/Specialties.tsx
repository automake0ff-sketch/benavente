import React from 'react';
import { GastroSpecialty } from '@/types';
import { Sparkles, Flame, Clock } from 'lucide-react';

interface SpecialtiesProps {
  specialties: GastroSpecialty[];
}

export const Specialties: React.FC<SpecialtiesProps> = ({ specialties }) => {
  const activeSpecialties = specialties.filter((s) => s.is_active);

  if (activeSpecialties.length === 0) return null;

  return (
    <section id="novedades" className="py-20 sm:py-28 bg-[#344536] text-[#FCFAF5] relative overflow-hidden">
      {/* Elementos lumínicos de fondo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#89957C]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B96F51]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera de Sección */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#89957C] mb-3">
            <Flame className="w-4 h-4 text-[#B96F51]" />
            <span>Sugerencias de Temporada & Novedades</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FCFAF5]">
            Lo que se cuece en Benavente
          </h2>
          <p className="text-sm sm:text-base text-[#FCFAF5]/80 mt-3 font-light leading-relaxed">
            Platos fuera de carta, creaciones que acaban de salir de cocina y propuestas especiales pensadas para sorprender en cada visita.
          </p>
        </div>

        {/* Tarjetas de Especialidades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeSpecialties.map((item, index) => (
            <div
              key={item.id}
              className="group bg-[#252923]/60 rounded-2xl overflow-hidden border border-[#89957C]/30 flex flex-col justify-between hover:border-[#89957C]/70 transition-all duration-300"
            >
              {/* Imagen */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#252923]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                {item.badge && (
                  <div className="absolute top-3 left-3 bg-[#B96F51] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    {item.badge}
                  </div>
                )}
              </div>

              {/* Información */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#89957C]">
                    {item.tagline}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FCFAF5] leading-snug group-hover:text-[#89957C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FCFAF5]/75 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#89957C]/20 flex items-center justify-between text-xs text-[#89957C]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B96F51]" />
                    <span>Disponibilidad limitada</span>
                  </span>
                  <a
                    href="#reservas"
                    className="text-[#FCFAF5] hover:text-[#B96F51] font-semibold text-xs transition-colors"
                  >
                    Consultar en mesa →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
