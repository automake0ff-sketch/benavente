import React from 'react';
import { RestaurantConfig } from '@/types';
import { MapPin, Phone, Clock, ExternalLink, Navigation, Info } from 'lucide-react';

interface ContactProps {
  config: RestaurantConfig;
}

export const Contact: React.FC<ContactProps> = ({ config }) => {
  return (
    <section id="ubicacion" className="py-20 sm:py-28 bg-[#F4F0E7]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#B96F51] mb-2">
            Encuéntranos en Sevilla
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#344536]">
            Ubicación y Horarios
          </h2>
          <p className="text-sm sm:text-base text-[#252923]/75 mt-2">
            Disfruta de la mejor cocina andaluza en un rincón acogedor de Sevilla Este.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Bloque de Información & Horarios */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dirección */}
            <div className="bg-white p-6 rounded-2xl border border-[#89957C]/25 shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#344536] text-[#FCFAF5] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#89957C]">
                    Dirección de Referencia
                  </h3>
                  <p className="font-serif text-lg font-bold text-[#344536]">
                    {config.address}
                  </p>
                  <p className="text-xs text-[#252923]/70">
                    {config.address_note}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
                <a
                  href={config.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#344536] hover:text-[#B96F51] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#B96F51]" />
                  <span>Cómo llegar con Google Maps</span>
                </a>
              </div>
            </div>

            {/* Horarios de Apertura */}
            <div className="bg-white p-6 rounded-2xl border border-[#89957C]/25 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#89957C]">
                  <Clock className="w-4 h-4 text-[#344536]" />
                  <span>Horario Estimado de Demostración</span>
                </div>
                <span className="text-[10px] text-[#B96F51] bg-[#B96F51]/10 px-2 py-0.5 rounded font-semibold">
                  Sujeto a confirmación
                </span>
              </div>

              <div className="space-y-3 divide-y divide-gray-100 text-xs">
                {config.schedules.map((item, idx) => (
                  <div key={idx} className="pt-2.5 first:pt-0 flex items-start justify-between gap-4">
                    <div>
                      <span className="font-bold text-[#344536] block">
                        {item.days}
                      </span>
                      {item.kitchen_note && (
                        <span className="text-[10px] text-[#89957C]">
                          {item.kitchen_note}
                        </span>
                      )}
                    </div>
                    <span className="text-[#252923]/80 font-medium text-right shrink-0">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Redes y Enlaces Oficiales Públicos */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={config.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#89957C]/25 hover:border-[#344536] transition-all group"
              >
                <div className="p-2 rounded-lg bg-pink-50 text-pink-700 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-[#89957C]">
                    Instagram
                  </span>
                  <span className="text-xs font-semibold text-[#344536]">
                    @benaventegastrobar
                  </span>
                </div>
              </a>

              <a
                href={config.tripadvisor_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#89957C]/25 hover:border-[#344536] transition-all group"
              >
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 group-hover:scale-110 transition-transform">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-[#89957C]">
                    Opiniones
                  </span>
                  <span className="text-xs font-semibold text-[#344536]">
                    Tripadvisor
                  </span>
                </div>
              </a>
            </div>

          </div>

          {/* Bloque de Mapa Interactivo con Georreferenciación Real */}
          <div className="lg:col-span-7 bg-white p-2 rounded-2xl border border-[#89957C]/25 shadow-sm overflow-hidden flex flex-col h-[400px] lg:h-auto">
            <div className="w-full h-full min-h-[350px] rounded-xl overflow-hidden relative">
              <iframe
                title="Ubicación Benavente Gastrobar en Sevilla"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.833596541624!2d-5.918987323565011!3d37.40248237208119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126f5d81b29a21%3A0xc47ff421a1f0a2e!2sAv.%20de%20las%20Ciencias%2C%2022%2C%2041020%20Sevilla!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
