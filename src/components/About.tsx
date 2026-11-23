import React from 'react';
import { RestaurantConfig } from '@/types';
import { Compass, Sparkles, HeartHandshake } from 'lucide-react';

interface AboutProps {
  config: RestaurantConfig;
}

export const About: React.FC<AboutProps> = ({ config }) => {
  return (
    <section id="presentacion" className="py-20 sm:py-28 bg-[#F4F0E7]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Mosaico editorial de 2 fotografías */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white aspect-[3/4] bg-white">
                <img
                  src={config.about_image_1}
                  alt="Benavente Gastrobar ambiente y barra"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="bg-[#344536] text-[#FCFAF5] p-5 rounded-2xl shadow-md">
                <p className="font-serif text-2xl font-bold leading-tight">100%</p>
                <p className="text-xs text-[#89957C] uppercase tracking-wider font-semibold mt-0.5">
                  Esencia de Gastrobar
                </p>
                <p className="text-xs text-[#FCFAF5]/80 mt-2">
                  Cocina viva, servicio cercano y ambiente para alargar la sobremesa.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-[#FCFAF5] p-5 rounded-2xl shadow-md border border-[#89957C]/20">
                <Sparkles className="w-5 h-5 text-[#B96F51] mb-2" />
                <p className="font-serif text-lg font-bold text-[#344536]">
                  Toques Canallas
                </p>
                <p className="text-xs text-[#252923]/80 mt-1">
                  Combinaciones creativas sin perder los sabores de siempre.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white aspect-[3/4] bg-white">
                <img
                  src={config.about_image_2}
                  alt="Benavente Gastrobar emplatado y cocina"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Bloque Textual Editorial */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#B96F51]">
              <Compass className="w-4 h-4" />
              <span>Nuestra Filosofía</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#344536] leading-tight">
              {config.about_heading || 'Una cocina con personalidad propia'}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#252923]/85 leading-relaxed font-normal">
              <p>
                {config.about_text ||
                  'En Benavente Gastrobar nos gusta partir de lo que conocemos y darle una vuelta. Una cocina de inspiración tradicional donde conviven sabores reconocibles, combinaciones creativas y platos pensados para disfrutar y compartir.'}
              </p>
              <p className="text-sm sm:text-base text-[#252923]/75">
                Cuidamos cada detalle desde la elección del producto hasta el emplatado, buscando que cada visita a nuestra mesa en Sevilla sea una pausa agradable, llena de sabor y buen rollo.
              </p>
            </div>

            {/* Pilares */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#89957C]/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#89957C]/20 text-[#344536] shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#344536]">Platos para compartir</h4>
                  <p className="text-xs text-[#252923]/70 mt-0.5">Raciones y tapas diseñadas para degustar en buena compañía.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#B96F51]/15 text-[#B96F51] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#344536]">Sabor con sello propio</h4>
                  <p className="text-xs text-[#252923]/70 mt-0.5">Recetas de toda la vida reinterpretadas con originalidad.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
