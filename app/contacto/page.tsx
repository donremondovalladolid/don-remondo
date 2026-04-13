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
  ESPARRAGOS_REMONDO_CONFIG,
  TALLER_CONFIG,
} from "@/lib/config";
import ContactForm from "@/components/contacto/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Espárragos y Taller en Valladolid",
  description:
    "Contacta con Don Remondo. Dos ubicaciones en Valladolid: tienda de espárragos y taller mecánico. Teléfono, email y formulario de contacto.",
  openGraph: {
    title: "Contacto | Don Remondo Valladolid",
    url: `${SITE_CONFIG.url}/contacto`,
  },
};

export default function ContactoPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[var(--color-stone-900)] text-white section-padding">
        <div className="container">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-stone-200)] mb-6">
              <MessageSquare size={14} />
              Estamos aquí para ayudarte
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-white mb-4 leading-tight">
              Contacta con
              <br />
              Don Remondo
            </h1>
            <p className="text-[var(--color-stone-300)] text-lg leading-relaxed">
              Llámanos, escríbenos o pásate por donde prefieras.
              Atendemos espárragos, taller y compra-venta de coches.
            </p>
          </div>
        </div>
      </section>

      {/* ── CANALES DE CONTACTO RÁPIDO ── */}
      <section className="section-padding-sm bg-[var(--color-stone-50)] border-b border-[var(--color-border-light)]">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Teléfono */}
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="card p-6 flex items-start gap-4 hover:shadow-md transition-shadow group"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--color-azul-100)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-azul-200)] transition-colors">
                <Phone size={20} className="text-[var(--color-azul-700)]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-0.5">
                  Teléfono
                </p>
                <p className="font-display text-lg text-[var(--color-text)] group-hover:text-[var(--color-azul-700)] transition-colors">
                  {SITE_CONFIG.phone}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Llamar ahora</p>
              </div>
            </a>

            {/* Email espárragos */}
            <a
              href={`mailto:${ESPARRAGOS_CONFIG.email}`}
              className="card p-6 flex items-start gap-4 hover:shadow-md transition-shadow group"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--color-verde-100)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-verde-200)] transition-colors">
                <Mail size={20} className="text-[var(--color-verde-700)]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-0.5">
                  Email espárragos
                </p>
                <p className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-verde-700)] transition-colors break-all">
                  {ESPARRAGOS_CONFIG.email}
                </p>
              </div>
            </a>

            {/* Email taller */}
            <a
              href={`mailto:${TALLER_CONFIG.email},${TALLER_CONFIG.email2}`}
              className="card p-6 flex items-start gap-4 hover:shadow-md transition-shadow group"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--color-azul-100)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-azul-200)] transition-colors">
                <Mail size={20} className="text-[var(--color-azul-700)]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-0.5">
                  Email taller
                </p>
                <p className="text-[0.8rem] leading-tight font-medium text-[var(--color-text)] group-hover:text-[var(--color-azul-700)] transition-colors break-all">
                  {TALLER_CONFIG.email}<br />
                  <span className="mt-1 block">{TALLER_CONFIG.email2}</span>
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
                <ContactForm />
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
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[var(--color-verde-100)] flex items-center justify-center">
                      <Leaf size={14} className="text-[var(--color-verde-700)]" />
                    </div>
                    <span className="text-xs font-semibold text-[var(--color-verde-700)] uppercase tracking-wide">
                      Espárragos · Valladolid
                    </span>
                  </div>
                  <div className="space-y-2.5 text-sm text-[var(--color-text-secondary)]">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                      <span>{ESPARRAGOS_CONFIG.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock size={14} className="text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                      <span>{ESPARRAGOS_CONFIG.horario}</span>
                    </div>
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

              {/* Espárragos Remondo */}
              <div className="card overflow-hidden">
                <div className="p-5 border-b border-[var(--color-border-light)]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[var(--color-verde-100)] flex items-center justify-center">
                      <Leaf size={14} className="text-[var(--color-verde-700)]" />
                    </div>
                    <span className="text-xs font-semibold text-[var(--color-verde-700)] uppercase tracking-wide">
                      Espárragos · Remondo
                    </span>
                  </div>
                  <div className="space-y-2.5 text-sm text-[var(--color-text-secondary)]">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                      <span>{ESPARRAGOS_REMONDO_CONFIG.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock size={14} className="text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                      <span>{ESPARRAGOS_REMONDO_CONFIG.horario}</span>
                    </div>
                  </div>
                </div>
                <div className="map-container h-[180px]">
                  <iframe
                    src={ESPARRAGOS_REMONDO_CONFIG.mapsEmbed}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Espárragos Remondo"
                  />
                </div>
                <div className="p-4">
                  <a
                    href={ESPARRAGOS_REMONDO_CONFIG.mapsUrl}
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
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-[var(--color-azul-100)] flex items-center justify-center">
                      <Wrench size={14} className="text-[var(--color-azul-700)]" />
                    </div>
                    <span className="text-xs font-semibold text-[var(--color-azul-700)] uppercase tracking-wide">
                      Taller y Coches · Valladolid
                    </span>
                  </div>
                  <div className="space-y-2.5 text-sm text-[var(--color-text-secondary)]">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                      <span>{TALLER_CONFIG.address}</span>
                    </div>
                    {TALLER_CONFIG.horarioLineas.map((linea) => (
                      <div key={linea} className="flex items-start gap-2">
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
                    className="btn btn-outline-azul w-full text-sm justify-center"
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
