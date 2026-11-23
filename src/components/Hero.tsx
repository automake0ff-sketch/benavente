import React from 'react';
import Link from 'next/link';
import { ArrowDown, UtensilsCrossed, Calendar, Sparkles } from 'lucide-react';
import { RestaurantConfig } from '@/types';

interface HeroProps {
  config: RestaurantConfig;
}

export const Hero: React.FC<HeroProps> = ({ config }) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Decorativo Suave */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#89957C] blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#B96F51] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Texto de Impacto */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#89957C]/15 border border-[#89957C]/30 text-xs font-semibold tracking-wider text-[#344536] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#B96F51]" />
              <span>Gastrobar en Sevilla · Cocina Andaluza Creativa</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#344536] leading-[1.08] tracking-tight">
                {config.tagline || 'La tradición tiene otro sabor'}
              </h1>
              <p className="text-lg sm:text-xl text-[#344536]/80 font-normal max-w-xl leading-relaxed">
                {config.subtagline || 'Cocina con personalidad, platos para compartir y ese punto canalla que hace volver.'}
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="#carta"
                className="inline-flex items-center justify-center gap-2 bg-[#344536] text-[#FCFAF5] hover:bg-[#252923] px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#89957C]" />
                <span>Ver Nuestra Carta</span>
              </Link>
              <Link
                href="#reservas"
                className="inline-flex items-center justify-center gap-2 bg-[#FCFAF5] text-[#344536] hover:bg-[#F4F0E7] border border-[#344536]/30 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300"
              >
                <Calendar className="w-4 h-4 text-[#B96F51]" />
                <span>Reservar Mesa</span>
              </Link>
            </div>

            {/* Micro datos informativos */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#89957C] font-medium border-t border-[#89957C]/20 w-full">
              <div>
                <span className="block text-[#344536] font-bold">Ubicación</span>
                <span>Sevilla Este (Av. Ciencias)</span>
              </div>
              <div className="w-px h-6 bg-[#89957C]/30" />
              <div>
                <span className="block text-[#344536] font-bold">Concepto</span>
                <span>Tapas de autor & Compartir</span>
              </div>
              <div className="w-px h-6 bg-[#89957C]/30" />
              <div>
                <span className="block text-[#344536] font-bold">Ambiente</span>
                <span>Cálido, desenfadado y actual</span>
              </div>
            </div>
          </div>

          {/* Imagen Gastronómica Protagonista con Composición Editorial */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Marco fotográfico principal */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FCFAF5] aspect-[4/5] bg-[#F4F0E7]">
                <img
                  src={config.hero_image}
                  alt="Benavente Gastrobar - Experiencia gastronómica"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <span className="inline-block px-2.5 py-1 rounded bg-[#344536]/80 backdrop-blur-sm uppercase tracking-widest font-semibold text-[10px] mb-1">
                    Propuesta de la Casa
                  </span>
                  <p className="font-serif text-base font-semibold leading-tight drop-shadow">
                    Sabor andaluz reinterpretado con técnica y frescura
                  </p>
                </div>
              </div>

              {/* Tarjeta flotante decorativa */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-[#FCFAF5] p-4 rounded-xl shadow-xl border border-[#89957C]/20 max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B96F51] animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#344536]">
                    El punto canalla
                  </span>
                </div>
                <p className="text-xs text-[#252923]/80 leading-snug">
                  Platos pensados para compartir en el centro de la mesa.
                </p>
              </div>

              {/* Marco de fondo decorativo */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-[#89957C]/40 -z-0 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Indicador de desplazamiento */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center">
          <Link
            href="#presentacion"
            className="group flex flex-col items-center text-[#89957C] hover:text-[#344536] transition-colors"
            aria-label="Descubrir Benavente Gastrobar"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-2">
              Descubrir experiencia
            </span>
            <div className="w-8 h-8 rounded-full border border-[#89957C]/40 flex items-center justify-center group-hover:border-[#344536] transition-colors">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
