'use client';

import React, { useState } from 'react';
import { RestaurantConfig } from '@/types';
import { benaventeStore } from '@/lib/store';
import { Phone, MessageCircle, Calendar, Users, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ReservationsProps {
  config: RestaurantConfig;
}

export const Reservations: React.FC<ReservationsProps> = ({ config }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '14:00',
    guests: 2,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Guardar en el store local para gestión del administrador
    benaventeStore.addReservation({
      name: formData.name,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: Number(formData.guests),
      notes: formData.notes,
    });

    // Formatear mensaje pre-construido para WhatsApp
    const message = `¡Hola Benavente Gastrobar! Quisiera solicitar una reserva con estos datos:%0A%0A` +
      `👤 *Nombre:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Teléfono:* ${encodeURIComponent(formData.phone)}%0A` +
      `📅 *Fecha:* ${encodeURIComponent(formData.date)}%0A` +
      `⏰ *Hora:* ${encodeURIComponent(formData.time)}%0A` +
      `👥 *Comensales:* ${formData.guests} personas%0A` +
      (formData.notes ? `📝 *Observaciones:* ${encodeURIComponent(formData.notes)}%0A%0A` : '%0A') +
      `_Quedo pendiente de su confirmación. ¡Muchas gracias!_`;

    const cleanNumber = config.whatsapp_number.replace(/\D/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${message}`;

    setWhatsappUrl(url);
    setSubmitted(true);
  };

  return (
    <section id="reservas" className="py-20 sm:py-28 bg-[#FCFAF5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Columna Izquierda: Información de Reserva y Accesos Rápidos */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#B96F51]">
                Planifica tu visita
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#344536]">
                Solicitar Reserva
              </h2>
              <p className="text-sm sm:text-base text-[#252923]/75 leading-relaxed">
                Asegura tu mesa en Benavente Gastrobar. Para grupos o peticiones especiales, también puedes contactarnos directamente.
              </p>
            </div>

            {/* Aviso ético y transparente */}
            <div className="p-4 rounded-xl bg-[#F4F0E7] border border-[#89957C]/25 text-xs text-[#252923]/80 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-[#344536]">
                <AlertCircle className="w-4 h-4 text-[#B96F51]" />
                <span>Importante sobre la disponibilidad</span>
              </div>
              <p>
                La solicitud enviada mediante este formulario <strong>no constituye una reserva automática confirmada</strong>. Nuestro equipo revisará el libro de reservas y te confirmará la disponibilidad vía WhatsApp o llamada telefónica.
              </p>
            </div>

            {/* Vías de contacto directo */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#89957C]">
                Contacto Directo
              </p>

              {/* Botón WhatsApp */}
              <a
                href={`https://wa.me/${config.whatsapp_number.replace(/\D/g, '')}?text=Hola%20Benavente%20Gastrobar,%20quisiera%20consultar%20disponibilidad%20de%20mesa`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-[#344536] text-[#FCFAF5] hover:bg-[#252923] transition-all shadow-sm group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/30 flex items-center justify-center text-emerald-300">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs uppercase tracking-wider font-semibold text-[#89957C]">
                      WhatsApp Directo
                    </span>
                    <span className="text-sm font-bold text-white">
                      {config.whatsapp_display}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#89957C] group-hover:text-white transition-colors">
                  Abrir chat →
                </span>
              </a>

              {/* Botón Llamada */}
              <a
                href={`tel:${config.phone}`}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white border border-[#89957C]/30 text-[#344536] hover:bg-[#F4F0E7] transition-all shadow-sm group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#89957C]/15 flex items-center justify-center text-[#344536]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[11px] uppercase tracking-wider font-semibold text-[#89957C]">
                      Llamada Telefónica
                    </span>
                    <span className="text-sm font-bold text-[#344536]">
                      {config.phone_display}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[#89957C] group-hover:text-[#344536] transition-colors">
                  Llamar →
                </span>
              </a>
            </div>

          </div>

          {/* Columna Derecha: Formulario de Solicitud de Reserva */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#89957C]/25 shadow-md">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="font-serif text-2xl font-bold text-[#344536]">
                    Formulario de Solicitud de Mesa
                  </h3>
                  <p className="text-xs text-[#252923]/70 mt-1">
                    Rellena tus datos para generar la petición y contactar con el local.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#344536]">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carmen Rodríguez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#89957C]/30 text-sm focus:border-[#344536] focus:outline-none"
                    />
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#344536]">
                      Teléfono de contacto *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 612 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#89957C]/30 text-sm focus:border-[#344536] focus:outline-none"
                    />
                  </div>

                  {/* Fecha */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#344536] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#89957C]" />
                      <span>Fecha deseada *</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#89957C]/30 text-sm focus:border-[#344536] focus:outline-none"
                    />
                  </div>

                  {/* Hora */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#344536] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#89957C]" />
                      <span>Hora solicitada *</span>
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#89957C]/30 text-sm focus:border-[#344536] focus:outline-none bg-white"
                    >
                      <optgroup label="Almuerzo">
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                      </optgroup>
                      <optgroup label="Cena">
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                        <option value="21:30">21:30</option>
                        <option value="22:00">22:00</option>
                        <option value="22:30">22:30</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Comensales */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#344536] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#89957C]" />
                    <span>Número de comensales *</span>
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setFormData({ ...formData, guests: num })}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          formData.guests === num
                            ? 'bg-[#344536] text-[#FCFAF5] border-[#344536]'
                            : 'bg-white text-[#252923] border-[#89957C]/30 hover:bg-[#F4F0E7]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#89957C]">
                    Para grupos de más de 6 personas recomendamos llamar directamente.
                  </p>
                </div>

                {/* Observaciones */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#344536]">
                    Observaciones (alergias, carritos, ubicación preferida)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Indícanos si tienes alguna preferencia o necesidad especial..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#89957C]/30 text-sm focus:border-[#344536] focus:outline-none"
                  />
                </div>

                {/* Botón de Enviar */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#344536] text-[#FCFAF5] hover:bg-[#252923] py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#89957C]" />
                  <span>Enviar Solicitud de Reserva</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-[#344536]">
                    ¡Solicitud Registrada con Éxito!
                  </h3>
                  <p className="text-sm text-[#252923]/75 max-w-md mx-auto">
                    Hemos guardado los detalles para <strong>{formData.name}</strong> ({formData.guests} personas) para el día <strong>{formData.date}</strong> a las <strong>{formData.time}</strong>.
                  </p>
                </div>

                {/* Paso siguiente con WhatsApp */}
                <div className="p-4 rounded-xl bg-[#F4F0E7] border border-[#89957C]/30 max-w-md mx-auto space-y-3">
                  <p className="text-xs text-[#344536] font-medium">
                    Para agilizar la respuesta del restaurante, puedes abrir WhatsApp con el mensaje ya redactado:
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs tracking-wider uppercase shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Abrir WhatsApp con mi reserva</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      date: '',
                      time: '14:00',
                      guests: 2,
                      notes: '',
                    });
                  }}
                  className="text-xs text-[#89957C] hover:text-[#344536] font-semibold underline"
                >
                  Realizar otra solicitud
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
