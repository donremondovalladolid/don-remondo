import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Leaf,
  Wrench,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import {
  SITE_CONFIG,
  ESPARRAGOS_CONFIG,
  TALLER_CONFIG,
} from "@/lib/config";
import { getDynamicContacts, getDynamicSchedules } from "@/lib/db-config";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contacto | Espárragos y Taller en Valladolid",
  description:
    "Contacta con Don Remondo. Tienda de espárragos y taller mecánico en Valladolid. Teléfono, email y formulario de contacto.",
  openGraph: {
    title: "Contacto | Don Remondo Valladolid",
    url: `${SITE_CONFIG.url}/contacto`,
  },
};

export default async function ContactoPage() {
  const [dynamicContacts, dynamicSchedules] = await Promise.all([
    getDynamicContacts(),
    getDynamicSchedules()
  ]);
  const ESPARRAGOS_CONTACT = dynamicContacts.esparragos;
  const TALLER_CONTACT = dynamicContacts.taller;

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[var(--color-stone-700)] h-[420px] sm:h-[500px] flex flex-col justify-center">
        {/* Fondo decorativo */}
<div className="absolute inset-0 bg-gradient-to-b from-[var(--color-stone-900)]/30 to-transparent pointer-events-none" />

        <div className="container relative">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-6 animate-fade-up">
              <span className="inline-flex items-center gap-1.5 badge badge-ambar text-[0.7rem] px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ambar-500)] inline-block" />
                Estamos aquí para ayudarte
              </span>
            </div>
            <h1 className="text-white leading-[1.08] mb-6 animate-fade-up animate-delay-100">
              Contacta con
              <br />
              <span className="text-[var(--color-ambar-200)] italic">Don Remondo</span>
            </h1>
            <p className="text-[var(--color-stone-300)] text-lg sm:text-xl leading-relaxed max-w-xl animate-fade-up animate-delay-200">
              Llámanos, escríbenos o pásate por donde prefieras.
              Atendemos compra de espárragos, taller y compra-venta de coches.
            </p>
          </div>
        </div>

        {/* Ola inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[var(--color-stone-50)] wave-bottom" />
      </section>

      {/* ── CANALES DE CONTACTO RÁPIDO ── */}
      <section className="section-padding-sm bg-[var(--color-stone-50)] border-b border-[var(--color-border-light)]">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Teléfono Espárragos */}
            <a
              href={`tel:${ESPARRAGOS_CONTACT.phoneRaw}`}
              className="card p-6 flex items-start gap-4 hover:shadow-md transition-shadow group"
            >
              <Phone size={20} className="text-[var(--color-verde-600)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-0.5">
                  Teléfono General
                </p>
                <p className="font-display text-lg text-[var(--color-text)] group-hover:text-[var(--color-verde-700)] transition-colors">
                  {ESPARRAGOS_CONTACT.phone}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Llamar ahora</p>
              </div>
            </a>

            {/* Teléfono Taller */}
            <a
              href={`tel:${TALLER_CONTACT.phoneRaw}`}
              className="card p-6 flex items-start gap-4 hover:shadow-md transition-shadow group"
            >
              <Phone size={20} className="text-[var(--color-verde-600)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-0.5">
                  Teléfono Taller / Coches
                </p>
                <p className="font-display text-lg text-[var(--color-text)] group-hover:text-[var(--color-verde-700)] transition-colors">
                  {TALLER_CONTACT.phone}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Llamar ahora</p>
              </div>
            </a>

            {/* WhatsApp Taller */}
            <a
              href={`https://wa.me/34${TALLER_CONTACT.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 flex items-start gap-4 hover:shadow-md transition-shadow group"
            >
              <MessageSquare size={20} className="text-[var(--color-verde-600)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-0.5">
                  WhatsApp Taller
                </p>
                <p className="font-display text-lg text-[var(--color-text)] group-hover:text-[var(--color-verde-700)] transition-colors">
                  {TALLER_CONTACT.whatsapp}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Escríbenos por WhatsApp</p>
              </div>
            </a>

            {/* Email espárragos */}
            <a
              href={`mailto:${ESPARRAGOS_CONTACT.email}`}
              className="card p-6 flex items-start gap-4 hover:shadow-md transition-shadow group"
            >
              <Mail size={20} className="text-[var(--color-verde-600)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-0.5">
                  Email Productos
                </p>
                <p className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-verde-700)] transition-colors break-all">
                  {ESPARRAGOS_CONTACT.email}
                </p>
              </div>
            </a>

            {/* Email taller */}
            <a
              href={`mailto:${TALLER_CONTACT.email}`}
              className="card p-6 flex items-start gap-4 hover:shadow-md transition-shadow group"
            >
              <Mail size={20} className="text-[var(--color-verde-600)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-0.5">
                  Email taller / Coches
                </p>
                <p className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-verde-700)] transition-colors break-all">
                  {TALLER_CONTACT.email}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── FORMULARIO + UBICACIONES ── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16 items-start">

            {/* Formulario — columna ancha */}
            <div className="lg:col-span-3 animate-fade-up">
              <h2 className="font-display text-3xl text-[var(--color-text)] mb-2">
                Escríbenos
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                Rellena el formulario y te responderemos lo antes posible.
              </p>
              <div className="card p-7 sm:p-8">
                {/* Success message (hidden by default) */}
                <div
                  id="cf-success"
                  style={{ display: "none" }}
                  className="flex flex-col items-center justify-center py-12 text-center animate-fade-up"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--color-verde-100)] flex items-center justify-center mb-5">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-verde-700)]">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl text-[var(--color-text)] mb-2">Mensaje enviado</h3>
                  <p className="text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
                    Nos pondremos en contacto contigo en la mayor brevedad posible. Gracias por escribirnos.
                  </p>
                </div>

                {/* Form */}
                <div id="cf-form" className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5" htmlFor="cf-nombre">
                        Nombre <span className="text-[var(--color-azul-600)]">*</span>
                      </label>
                      <input id="cf-nombre" name="nombre" type="text" placeholder="Tu nombre" className="input" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5" htmlFor="cf-telefono">
                        Teléfono
                      </label>
                      <input id="cf-telefono" name="telefono" type="tel" placeholder="Tu teléfono" className="input" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5" htmlFor="cf-email">
                      Email <span className="text-[var(--color-azul-600)]">*</span>
                    </label>
                    <input id="cf-email" name="email" type="email" placeholder="tu@email.com" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5" htmlFor="cf-asunto">
                      Asunto <span className="text-[var(--color-azul-600)]">*</span>
                    </label>
                    <select id="cf-asunto" name="asunto" defaultValue="" className="input bg-white">
                      <option value="" disabled>Selecciona un asunto</option>
                      <option value="productos">Productos frescos</option>
                      <option value="taller">Taller mecánico</option>
                      <option value="coches">Compra-venta de coches</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5" htmlFor="cf-mensaje">
                      Mensaje <span className="text-[var(--color-azul-600)]">*</span>
                    </label>
                    <textarea id="cf-mensaje" name="mensaje" rows={5} placeholder="Escribe tu mensaje aquí..." className="input resize-none" />
                  </div>
                  <div id="cf-error" style={{ display: "none" }} className="p-4 bg-[var(--color-rojo-50)] text-[var(--color-rojo-800)] text-sm rounded-lg" />
                  <button id="cf-submit-btn" type="button" className="btn btn-verde btn-lg w-full">
                    Enviar mensaje
                  </button>
                  <p className="text-center text-xs text-[var(--color-text-muted)]">
                    Campos marcados con <span className="text-[var(--color-verde-600)] font-medium">*</span> son obligatorios
                  </p>
                </div>

                <Script id="contact-form-handler" strategy="afterInteractive">{`
                  (function() {
                    var btn = document.getElementById('cf-submit-btn');
                    if (!btn) return;
                    btn.addEventListener('click', function() {
                      var nombre = (document.getElementById('cf-nombre') || {}).value || '';
                      var email = (document.getElementById('cf-email') || {}).value || '';
                      var telefono = (document.getElementById('cf-telefono') || {}).value || '';
                      var asuntoVal = (document.getElementById('cf-asunto') || {}).value || '';
                      var mensaje = (document.getElementById('cf-mensaje') || {}).value || '';
                      var errorDiv = document.getElementById('cf-error');
                      var successDiv = document.getElementById('cf-success');
                      var formDiv = document.getElementById('cf-form');
                      if (!nombre.trim() || !email.trim() || !asuntoVal.trim() || !mensaje.trim()) {
                        if (errorDiv) { errorDiv.textContent = 'Por favor, rellena todos los campos obligatorios.'; errorDiv.style.display = 'block'; }
                        return;
                      }
                      btn.disabled = true;
                      btn.textContent = 'Enviando...';
                      if (errorDiv) errorDiv.style.display = 'none';
                      fetch('/api/contacto', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nombre: nombre.trim(), email: email.trim(), telefono: telefono.trim(), asunto: asuntoVal.trim(), mensaje: mensaje.trim() })
                      })
                      .then(function(res) {
                        if (!res.ok) return res.json().catch(function(){return {};}).then(function(d){throw new Error(d.error||'Error del servidor');});
                        if (formDiv) formDiv.style.display = 'none';
                        if (successDiv) successDiv.style.display = 'flex';
                      })
                      .catch(function(err) {
                        if (errorDiv) { errorDiv.textContent = err.message || 'Error al enviar.'; errorDiv.style.display = 'block'; }
                        btn.disabled = false;
                        btn.textContent = 'Enviar mensaje';
                      });
                    });
                  })();
                `}</Script>
              </div>
            </div>

            {/* Ubicaciones — columna lateral */}
            <div className="lg:col-span-2 space-y-6 animate-fade-up animate-delay-100">
              <h2 className="font-display text-3xl text-[var(--color-text)]">
                Dónde estamos
              </h2>

              {/* Espárragos Valladolid */}
              <div className="card overflow-hidden">
                <div className="p-5 border-b border-[var(--color-border-light)]">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-[var(--color-verde-700)] uppercase tracking-wide">
                      Espárragos · Valladolid
                    </span>
                  </div>
                  <div className="space-y-2.5 text-sm text-[var(--color-text-secondary)]">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                      <span>{ESPARRAGOS_CONFIG.address}</span>
                    </div>
                    {dynamicSchedules.esparragos_valladolid.map((linea, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Clock size={14} className="text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                        <span>{linea}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="map-container h-[180px]">
                  <iframe
                    src={ESPARRAGOS_CONFIG.mapsEmbed}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Espárragos Valladolid"
                  />
                </div>
                <div className="p-4">
                  <a
                    href={ESPARRAGOS_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-verde w-full text-sm justify-center"
                  >
                    <ExternalLink size={14} />
                    Cómo llegar
                  </a>
                </div>
              </div>

              {/* Taller */}
              <div className="card overflow-hidden">
                <div className="p-5 border-b border-[var(--color-border-light)]">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-[var(--color-verde-700)] uppercase tracking-wide">
                      Taller y Venta de Coches · Valladolid
                    </span>
                  </div>
                  <div className="space-y-2.5 text-sm text-[var(--color-text-secondary)]">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                      <span>{TALLER_CONFIG.address}</span>
                    </div>
                    {dynamicSchedules.taller.map((linea, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Clock size={14} className="text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                        <span>{linea}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="map-container h-[180px]">
                  <iframe
                    src={TALLER_CONFIG.mapsEmbed}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Taller Don Remondo"
                  />
                </div>
                <div className="p-4">
                  <a
                    href={TALLER_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-verde w-full text-sm justify-center"
                  >
                    <ExternalLink size={14} />
                    Cómo llegar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
