import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone, MapPin, Clock, CheckCircle2, Leaf,
  CalendarDays, ExternalLink, ArrowRight, Sprout
} from "lucide-react";
import { ESPARRAGOS_CONFIG, ESPARRAGOS_REMONDO_CONFIG, SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Espárragos Valladolid | Espárragos Frescos de Tudela de Duero",
  description:
    "Compra espárragos frescos en Valladolid y Remondo (Segovia). Origen Tudela de Duero, temporada de primavera. Espárragos blancos y verdes de máxima calidad. Don Remondo.",
  keywords: [
    "espárragos Valladolid",
    "espárragos Tudela de Duero",
    "comprar espárragos Valladolid",
    "espárragos frescos Valladolid",
    "verdulería espárragos Valladolid",
    "espárragos Remondo Segovia",
  ],
  openGraph: {
    title: "Espárragos Frescos de Tudela de Duero | Don Remondo",
    description:
      "Espárragos blancos y verdes directamente del campo. Temporada marzo-junio. Tiendas en Valladolid y Remondo (Segovia).",
    url: `${SITE_CONFIG.url}/esparragos-valladolid`,
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: ESPARRAGOS_CONFIG.name,
      description:
        "Venta de espárragos frescos en Valladolid. Origen Tudela de Duero. Espárragos blancos y verdes de temporada.",
      url: `${SITE_CONFIG.url}/esparragos-valladolid`,
      telephone: ESPARRAGOS_CONFIG.phoneRaw,
      email: ESPARRAGOS_CONFIG.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: ESPARRAGOS_CONFIG.addressShort,
        addressLocality: ESPARRAGOS_CONFIG.city,
        addressRegion: "Castilla y León",
        postalCode: ESPARRAGOS_CONFIG.cp,
        addressCountry: "ES",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: ESPARRAGOS_CONFIG.lat,
        longitude: ESPARRAGOS_CONFIG.lng,
      },
      openingHours: "Mo-Su 05:00-10:00",
      hasMap: ESPARRAGOS_CONFIG.mapsUrl,
      priceRange: "€",
    },
    {
      "@type": "LocalBusiness",
      name: ESPARRAGOS_REMONDO_CONFIG.name,
      description:
        "Venta de espárragos frescos en Remondo, Segovia. Origen Tudela de Duero.",
      url: `${SITE_CONFIG.url}/esparragos-valladolid`,
      telephone: ESPARRAGOS_REMONDO_CONFIG.phoneRaw,
      address: {
        "@type": "PostalAddress",
        streetAddress: ESPARRAGOS_REMONDO_CONFIG.addressShort,
        addressLocality: ESPARRAGOS_REMONDO_CONFIG.city,
        addressRegion: "Castilla y León",
        postalCode: ESPARRAGOS_REMONDO_CONFIG.cp,
        addressCountry: "ES",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: ESPARRAGOS_REMONDO_CONFIG.lat,
        longitude: ESPARRAGOS_REMONDO_CONFIG.lng,
      },
      openingHours: "Mo-Su 15:00-19:30",
      hasMap: ESPARRAGOS_REMONDO_CONFIG.mapsUrl,
      priceRange: "€",
    },
  ],
};

const variedades = [
  {
    titulo: "Espárrago blanco",
    desc: "El clásico de Tudela de Duero. Sabor delicado, textura suave y color marfil. Se cosecha antes de que asome a la superficie.",
    badge: "El más valorado",
  },
  {
    titulo: "Espárrago verde",
    desc: "Más intenso y con mayor contenido en fibra. Ideal para parrilla, salteados y revueltos. Carácter más pronunciado.",
    badge: "Ideal para cocinar",
  },
];

const caracteristicas = [
  { titulo: "Origen Tudela de Duero", desc: "Ribera del Duero, Valladolid" },
  { titulo: "100% de temporada", desc: "Solo producto fresco de la cosecha del año" },
  { titulo: "Dos variedades", desc: "Blanco y verde, cada uno con su carácter" },
  { titulo: "Venta directa", desc: "Sin intermediarios, desde el campo" },
];

const meses = [
  { mes: "Ene", activo: false },
  { mes: "Feb", activo: false },
  { mes: "Mar", activo: true },
  { mes: "Abr", activo: true },
  { mes: "May", activo: true },
  { mes: "Jun", activo: true },
  { mes: "Jul", activo: false },
  { mes: "Ago", activo: false },
  { mes: "Sep", activo: false },
  { mes: "Oct", activo: false },
  { mes: "Nov", activo: false },
  { mes: "Dic", activo: false },
];

export default function EsparragosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-verde-900)] via-[var(--color-verde-800)] to-[var(--color-verde-600)]">
        {/* Patrón fondo */}
        <div className="absolute inset-0 opacity-[0.06] pattern-diagonal-light" />

        <div className="container relative py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5 animate-fade-up">
              <Leaf size={16} className="text-[var(--color-verde-300)]" />
              <span className="text-[var(--color-verde-200)] text-xs font-semibold uppercase tracking-[0.1em]">
                Tudela de Duero · Ribera del Duero
              </span>
            </div>
            <h1
              className="text-white mb-5 animate-fade-up animate-delay-100"
            >
              Espárragos Frescos
              <br />
              <span className="text-[var(--color-verde-200)] italic">de temporada</span>
            </h1>
            <p className="font-display text-[var(--color-verde-200)] text-lg leading-relaxed mb-8 max-w-xl animate-fade-up animate-delay-200">
              Espárragos blancos y verdes directamente del campo. Solo vendemos
              producto de temporada, de marzo a junio, con el sabor auténtico
              de la Ribera del Duero.
            </p>
          </div>
        </div>

        {/* Ola inferior */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 bg-[var(--color-bg)] wave-bottom"
        />
      </section>

      {/* ── VARIEDADES ───────────────────────────── */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-3">
              El producto
            </p>
            <h2>
              Dos variedades,<br />
              <span className="text-[var(--color-verde-700)] italic">un mismo origen</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {variedades.map((v) => (
              <div
                key={v.titulo}
                className="card p-0 overflow-hidden"
              >
                {/* Franja visual */}
                <div className="h-2 bg-gradient-to-r from-[var(--color-verde-700)] to-[var(--color-verde-400)]" />
                <div className="p-7">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-verde-100)] flex items-center justify-center shrink-0">
                      <Sprout size={22} className="text-[var(--color-verde-700)]" />
                    </div>
                    <span className="badge badge-verde mt-1">{v.badge}</span>
                  </div>
                  <h3
                    className="text-xl mb-3"
                  >
                    {v.titulo}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Características */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {caracteristicas.map((c) => (
              <div
                key={c.titulo}
                className="flex flex-col items-center text-center p-5 rounded-[var(--radius-xl)] bg-[var(--color-verde-50)] border border-[var(--color-verde-200)]"
              >
                <CheckCircle2 size={20} className="text-[var(--color-verde-600)] mb-3" />
                <p className="font-semibold text-[var(--color-verde-900)] text-sm mb-1">{c.titulo}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORIGEN + TEMPORADA ───────────────────── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Origen */}
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-4">
                Dónde nacen
              </p>
              <h2 className="mb-5">
                Tudela de Duero,<br />
                <span className="text-[var(--color-verde-700)] italic">tierra de espárragos</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                Tudela de Duero es un municipio de la provincia de Valladolid situado a orillas
                del río Duero. Su suelo arenoso y el microclima de la Ribera del Duero crean
                las condiciones perfectas para el cultivo del espárrago.
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
                El espárrago de esta zona se distingue por su blancura, su calibre uniforme y
                su sabor suave, con la dulzura característica del terreno arenoso. Trabajamos
                directamente con productores de la zona para traerte el mejor género.
              </p>

              <div className="flex items-center gap-4 p-5 rounded-[var(--radius-xl)] bg-[var(--color-stone-100)] border border-[var(--color-border)]">
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-verde-100)] flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[var(--color-verde-700)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-text)] text-sm">Origen certificado</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Tudela de Duero · Ribera del Duero · Valladolid
                  </p>
                </div>
              </div>
            </div>

            {/* Temporada */}
            <div className="space-y-5">
              <div className="bg-[var(--color-verde-800)] rounded-[var(--radius-xl)] p-7">
                <div className="flex items-center gap-2.5 mb-5">
                  <CalendarDays size={20} className="text-[var(--color-verde-300)]" />
                  <h3
                    className="text-lg text-white"
                  >
                    Temporada de venta
                  </h3>
                </div>
                <div className="grid grid-cols-6 gap-1.5 mb-4">
                  {meses.map(({ mes, activo }) => (
                    <div
                      key={mes}
                      className={`text-center py-2 rounded-[var(--radius-sm)] text-xs font-semibold transition-colors ${
                        activo
                          ? "bg-white text-[var(--color-verde-800)] shadow-sm"
                          : "bg-[var(--color-verde-700)] text-[var(--color-verde-200)]"
                      }`}
                    >
                      {mes}
                    </div>
                  ))}
                </div>
                <p className="text-[var(--color-verde-200)] text-sm leading-relaxed">
                  Disponible de{" "}
                  <strong className="text-white">marzo a junio</strong>.
                  Fuera de temporada no tenemos existencias: así garantizamos
                  que cada espárrago es fresco de la cosecha del año.
                </p>
              </div>

              <div className="bg-[var(--color-stone-100)] rounded-[var(--radius-xl)] p-6 border border-[var(--color-border)]">
                <p className="font-semibold text-[var(--color-text)] mb-2 flex items-center gap-2">
                  <Leaf size={16} className="text-[var(--color-verde-600)]" />
                  ¿Por qué solo producto de temporada?
                </p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Un espárrago fuera de temporada ha viajado miles de kilómetros
                  y ha perdido gran parte de su sabor. Preferimos no vender antes
                  que vender mal. Cuando empieza la temporada, lo notarás.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA CONTACTO ─────────────────────────── */}
      <section className="section-padding-sm bg-[var(--color-verde-50)] border-y border-[var(--color-verde-200)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-[var(--color-verde-900)] mb-3"
            >
              ¿Quieres pedir espárragos?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-7">
              Llámanos y te indicamos disponibilidad o pásate por cualquiera
              de nuestras tiendas durante la temporada.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${ESPARRAGOS_CONFIG.phoneRaw}`}
                className="btn btn-verde btn-lg"
              >
                <Phone size={17} />
                {ESPARRAGOS_CONFIG.phone}
              </a>
              <Link
                href="/contacto?asunto=esparragos"
                className="btn btn-outline-verde btn-lg"
              >
                Formulario de contacto
                <ArrowRight size={16} />
              </Link>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mt-5">
              O escríbenos a{" "}
              <a
                href={`mailto:${ESPARRAGOS_CONFIG.email}`}
                className="text-[var(--color-verde-700)] hover:underline font-medium"
              >
                {ESPARRAGOS_CONFIG.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── PUNTOS DE VENTA ──────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-3">
              Dónde encontrarnos
            </p>
            <h2>
              Dos puntos de venta
            </h2>
            <p className="text-[var(--color-text-secondary)] mt-3 max-w-md mx-auto text-sm">
              Horarios complementarios para que siempre puedas conseguir tus espárragos.
            </p>
          </div>

          <div className="space-y-12">
            {/* Tienda 1 — Valladolid */}
            <div>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-8 rounded-full bg-[var(--color-verde-700)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  1
                </div>
                <div>
                  <h3
                    className="text-xl"
                  >
                    Valladolid
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">Av. del Euro, 24</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-[var(--color-stone-100)] rounded-[var(--radius-lg)] border border-[var(--color-border-light)]">
                    <MapPin size={18} className="text-[var(--color-verde-600)] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[var(--color-text)] text-sm">Dirección</p>
                      <p className="text-[var(--color-text-secondary)] text-sm">{ESPARRAGOS_CONFIG.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-[var(--color-stone-100)] rounded-[var(--radius-lg)] border border-[var(--color-border-light)]">
                    <Clock size={18} className="text-[var(--color-verde-600)] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[var(--color-text)] text-sm">Horario</p>
                      {ESPARRAGOS_CONFIG.horarioLineas.map((h) => (
                        <p key={h} className="text-[var(--color-text-secondary)] text-sm">{h}</p>
                      ))}
                    </div>
                  </div>
                  <a
                    href={ESPARRAGOS_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-verde w-full justify-center"
                  >
                    <ExternalLink size={14} />
                    Abrir en Google Maps
                  </a>
                </div>

                {/* Mapa */}
                <div className="lg:col-span-2">
                  <div className="map-container h-64 lg:h-72">
                    <iframe
                      src={ESPARRAGOS_CONFIG.mapsEmbed}
                      title="Espárragos Don Remondo — Valladolid"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="divider" />

            {/* Tienda 2 — Remondo */}
            <div>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-8 rounded-full bg-[var(--color-verde-700)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  2
                </div>
                <div>
                  <h3
                    className="text-xl"
                  >
                    Remondo
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">C. Calvario, 8 · Segovia</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-[var(--color-stone-100)] rounded-[var(--radius-lg)] border border-[var(--color-border-light)]">
                    <MapPin size={18} className="text-[var(--color-verde-600)] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[var(--color-text)] text-sm">Dirección</p>
                      <p className="text-[var(--color-text-secondary)] text-sm">{ESPARRAGOS_REMONDO_CONFIG.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-[var(--color-stone-100)] rounded-[var(--radius-lg)] border border-[var(--color-border-light)]">
                    <Clock size={18} className="text-[var(--color-verde-600)] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[var(--color-text)] text-sm">Horario</p>
                      {ESPARRAGOS_REMONDO_CONFIG.horarioLineas.map((h) => (
                        <p key={h} className="text-[var(--color-text-secondary)] text-sm">{h}</p>
                      ))}
                    </div>
                  </div>
                  <a
                    href={ESPARRAGOS_REMONDO_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-verde w-full justify-center"
                  >
                    <ExternalLink size={14} />
                    Abrir en Google Maps
                  </a>
                </div>

                {/* Mapa */}
                <div className="lg:col-span-2">
                  <div className="map-container h-64 lg:h-72">
                    <iframe
                      src={ESPARRAGOS_REMONDO_CONFIG.mapsEmbed}
                      title="Espárragos Don Remondo — Remondo, Segovia"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
