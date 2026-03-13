import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone, MapPin, Clock, ArrowRight, CheckCircle2, Wrench,
  Car, Shield, Star, Gauge, Zap, Settings, ExternalLink,
} from "lucide-react";
import { TALLER_CONFIG, SITE_CONFIG, IMAGES } from "@/lib/config";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Taller Mecánico Valladolid | Compra-Venta de Coches",
  description:
    "Taller mecánico de confianza en Valladolid. Servicio técnico multimarca y compra-venta de coches de segunda mano. Más de 7 años de experiencia. Don Remondo.",
  keywords: [
    "taller mecánico Valladolid",
    "taller coches Valladolid",
    "compra venta coches Valladolid",
    "coches segunda mano Valladolid",
    "reparación coches Valladolid",
    "revisión coche Valladolid",
  ],
  openGraph: {
    title: "Taller Mecánico y Compra-Venta de Coches en Valladolid | Don Remondo",
    description:
      "Taller mecánico multimarca con más de 7 años de experiencia. Compra-venta de coches revisados y con garantía en Valladolid.",
    url: `${SITE_CONFIG.url}/taller-coches-valladolid`,
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutoRepair",
      name: `${TALLER_CONFIG.name} — Taller Mecánico`,
      description: "Taller mecánico multimarca en Valladolid.",
      url: `${SITE_CONFIG.url}/taller-coches-valladolid`,
      telephone: TALLER_CONFIG.phoneRaw,
      address: {
        "@type": "PostalAddress",
        streetAddress: TALLER_CONFIG.addressShort,
        addressLocality: TALLER_CONFIG.city,
        addressRegion: "Castilla y León",
        postalCode: TALLER_CONFIG.cp,
        addressCountry: "ES",
      },
      geo: { "@type": "GeoCoordinates", latitude: TALLER_CONFIG.lat, longitude: TALLER_CONFIG.lng },
      openingHours: "Mo-Fr 09:00-13:00 Mo-Fr 16:00-20:00",
      hasMap: TALLER_CONFIG.mapsUrl,
      priceRange: "€€",
    },
    {
      "@type": "CarDealer",
      name: `${TALLER_CONFIG.name} — Compra-Venta Coches`,
      description: "Compra-venta de coches de segunda mano en Valladolid. Vehículos revisados con garantía.",
      url: `${SITE_CONFIG.url}/coches-segunda-mano`,
      telephone: TALLER_CONFIG.phoneRaw,
      address: {
        "@type": "PostalAddress",
        streetAddress: TALLER_CONFIG.addressShort,
        addressLocality: TALLER_CONFIG.city,
        postalCode: TALLER_CONFIG.cp,
        addressCountry: "ES",
      },
    },
  ],
};

const servicios = [
  {
    icon: Wrench,
    titulo: "Mecánica general",
    desc: "Frenos, embrague, distribución, amortiguadores y todo tipo de reparaciones.",
    color: "azul",
  },
  {
    icon: Gauge,
    titulo: "Mecánica rápida",
    desc: "Cambio de aceite, filtros, ruedas, baterías y revisiones en el día.",
    color: "azul",
  },
  {
    icon: Zap,
    titulo: "Diagnóstico electrónico",
    desc: "Lectura y borrado de códigos de error en todas las marcas y modelos.",
    color: "azul",
  },
  {
    icon: Settings,
    titulo: "Pre-ITV",
    desc: "Revisión completa antes de pasar la ITV para que no haya sorpresas.",
    color: "azul",
  },
  {
    icon: Shield,
    titulo: "Garantía en reparaciones",
    desc: "Todas nuestras reparaciones incluyen garantía por escrito.",
    color: "verde",
  },
  {
    icon: Car,
    titulo: "Compra-venta de coches",
    desc: "Vendemos coches revisados y con garantía. También compramos tu vehículo.",
    color: "verde",
  },
];

const garantias = [
  { valor: "+7", label: "años de experiencia" },
  { valor: "100%", label: "multimarca" },
  { valor: "Garantía", label: "por escrito siempre" },
  { valor: "Presupuesto", label: "sin compromiso" },
];

export default async function TallerPage() {
  const cochesDestacados = await prisma.coche.findMany({
    where: { vendido: false, destacado: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const cochesRecientes =
    cochesDestacados.length > 0
      ? cochesDestacados
      : await prisma.coche.findMany({
          where: { vendido: false },
          take: 3,
          orderBy: { createdAt: "desc" },
        });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-azul-900)] via-[var(--color-azul-800)] to-[var(--color-azul-600)]">
        <img
          src={IMAGES.taller.hero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-soft-light"
        />
        <div className="absolute inset-0 opacity-[0.06] pattern-diagonal-light" />
        <div className="container relative py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-5 animate-fade-up">
              <Wrench size={16} className="text-[var(--color-azul-300)]" />
              <span className="text-[var(--color-azul-200)] text-xs font-semibold uppercase tracking-[0.1em]">
                {TALLER_CONFIG.addressShort} · Valladolid
              </span>
            </div>
            <h1
              className="text-white mb-5 animate-fade-up animate-delay-100"
            >
              Taller Mecánico
              <br />
              <span className="text-[var(--color-azul-200)] italic">y Compra-Venta</span>
            </h1>
            <p className="font-display text-[var(--color-azul-200)] text-lg leading-relaxed mb-8 max-w-xl animate-fade-up animate-delay-200">
              Taller mecánico multimarca con más de {SITE_CONFIG.experience} años de experiencia
              en Valladolid. Reparamos tu coche con honestidad, presupuesto previo y garantía.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up animate-delay-300">
              <Link href="/coches-segunda-mano" className="btn btn-ghost-white btn-lg">
                <Car size={17} />
                Ver coches en venta
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-10 bg-[var(--color-bg)] wave-bottom"
        />
      </section>

      {/* ── SERVICIOS ────────────────────────────── */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-3">
              Lo que hacemos
            </p>
            <h2>
              Servicios del taller
            </h2>
            <p className="text-[var(--color-text-secondary)] mt-3 max-w-md mx-auto text-sm">
              Reparamos todo tipo de vehículos con garantía y presupuesto previo sin compromiso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicios.map(({ icon: Icon, titulo, desc, color }) => (
              <div
                key={titulo}
                className="card p-6 group hover:border-[var(--color-azul-200)] transition-colors"
              >
                <div
                  className={`w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center mb-4 transition-colors ${
                    color === "azul"
                      ? "bg-[var(--color-azul-100)] group-hover:bg-[var(--color-azul-200)]"
                      : "bg-[var(--color-verde-100)] group-hover:bg-[var(--color-verde-200)]"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      color === "azul"
                        ? "text-[var(--color-azul-700)]"
                        : "text-[var(--color-verde-700)]"
                    }
                  />
                </div>
                <h3
                  className="text-base mb-2"
                >
                  {titulo}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS / CONFIANZA ────────────────────── */}
      <section className="section-padding bg-[var(--color-azul-900)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {garantias.map(({ valor, label }) => (
              <div key={label} className="text-center">
                <p className="text-white leading-none mb-2 display-kpi">
                  {valor}
                </p>
                <p className="text-[var(--color-azul-300)] text-xs font-semibold uppercase tracking-[0.08em]">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[var(--color-azul-800)] rounded-[var(--radius-xl)] overflow-hidden max-w-2xl mx-auto">
            <div className="overflow-hidden">
              <img
                src={IMAGES.taller.interior}
                alt="Interior del taller mecánico Don Remondo"
                className="w-full h-48 sm:h-56 object-cover opacity-80"
              />
            </div>
            <div className="p-8 text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-ambar-100)] flex items-center justify-center mx-auto mb-4">
                <Star size={22} className="text-[var(--color-ambar-500)]" />
              </div>
              <h3
                className="text-white text-xl mb-3"
              >
                Taller de confianza en Valladolid
              </h3>
              <p className="text-[var(--color-azul-300)] text-sm leading-relaxed">
                Somos un taller familiar con más de {SITE_CONFIG.experience} años dando servicio
                en Valladolid. Trabajamos con honestidad y transparencia: siempre con
                presupuesto previo aprobado, sin sorpresas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA CONTACTO ─────────────────────────── */}
      <section className="section-padding-sm bg-[var(--color-azul-50)] border-y border-[var(--color-azul-100)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-[var(--color-azul-900)] mb-3"
            >
              ¿Necesitas presupuesto?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-7">
              Llámanos o escríbenos y te respondemos sin compromiso.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${TALLER_CONFIG.phoneRaw}`}
                className="btn btn-azul btn-lg"
              >
                <Phone size={17} />
                {TALLER_CONFIG.phone}
              </a>
              <Link
                href="/contacto?asunto=taller"
                className="btn btn-outline-azul btn-lg"
              >
                Formulario de contacto
                <ArrowRight size={16} />
              </Link>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mt-5">
              o escríbenos a{" "}
              <a
                href={`mailto:${TALLER_CONFIG.email}`}
                className="text-[var(--color-azul-700)] hover:underline font-medium"
              >
                {TALLER_CONFIG.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── COCHES EN VENTA — preview ────────────── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-2">
                Compra-venta
              </p>
              <h2>
                Coches en venta
              </h2>
              <p className="text-[var(--color-text-secondary)] mt-1 text-sm">
                Vehículos revisados por nuestro taller con garantía
              </p>
            </div>
            <Link
              href="/coches-segunda-mano"
              className="hidden sm:flex items-center gap-1.5 text-[var(--color-azul-700)] font-semibold text-sm hover:text-[var(--color-azul-900)] transition-colors"
            >
              Ver todos
              <ArrowRight size={15} />
            </Link>
          </div>

          {cochesRecientes.length === 0 ? (
            <div className="bg-[var(--color-stone-100)] rounded-[var(--radius-xl)] p-14 text-center border border-[var(--color-border)]">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-azul-100)] flex items-center justify-center mx-auto mb-4">
                <Car size={26} className="text-[var(--color-azul-400)]" />
              </div>
              <h3
                className="text-lg mb-2"
              >
                Próximamente tendremos coches en venta
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-6 max-w-sm mx-auto">
                Estamos preparando el catálogo. Llámanos para consultar disponibilidad.
              </p>
              <a
                href={`tel:${TALLER_CONFIG.phoneRaw}`}
                className="btn btn-azul"
              >
                <Phone size={15} />
                {TALLER_CONFIG.phone}
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cochesRecientes.map((coche) => {
                const fotos = JSON.parse(coche.fotos) as string[];
                return (
                  <Link
                    key={coche.id}
                    href={`/coches-segunda-mano/${coche.slug}`}
                    className="card group overflow-hidden"
                  >
                    <div className="aspect-video bg-[var(--color-stone-100)] relative overflow-hidden">
                      {fotos[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={fotos[0]}
                          alt={`${coche.marca} ${coche.modelo}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Car size={32} className="text-[var(--color-stone-300)]" />
                        </div>
                      )}
                      {coche.destacado && (
                        <span className="absolute top-2 left-2 badge badge-azul">
                          Destacado
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3
                        className="text-base mb-1"
                      >
                        {coche.marca} {coche.modelo}
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)] mb-3">
                        {coche.anio} · {coche.km.toLocaleString("es-ES")} km · {coche.combustible}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xl font-bold text-[var(--color-azul-700)] font-display"
                        >
                          {coche.precio.toLocaleString("es-ES")} €
                        </span>
                        <span className="text-xs text-[var(--color-azul-600)] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Ver ficha <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="text-center mt-6 sm:hidden">
            <Link
              href="/coches-segunda-mano"
              className="btn btn-outline-azul"
            >
              Ver todos los coches
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MAPA ─────────────────────────────────── */}
      <section className="section-padding bg-[var(--color-stone-100)]">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-3">
              Ubicación
            </p>
            <h2>
              Dónde estamos
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white rounded-[var(--radius-lg)] border border-[var(--color-border-light)]">
                <MapPin size={18} className="text-[var(--color-azul-600)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--color-text)] text-sm">Dirección</p>
                  <p className="text-[var(--color-text-secondary)] text-sm">{TALLER_CONFIG.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-[var(--radius-lg)] border border-[var(--color-border-light)]">
                <Clock size={18} className="text-[var(--color-azul-600)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--color-text)] text-sm">Horario</p>
                  {TALLER_CONFIG.horarioLineas.map((h) => (
                    <p key={h} className="text-[var(--color-text-secondary)] text-sm">{h}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-[var(--radius-lg)] border border-[var(--color-border-light)]">
                <CheckCircle2 size={18} className="text-[var(--color-verde-600)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--color-text)] text-sm">Presupuesto</p>
                  <p className="text-[var(--color-text-secondary)] text-sm">Sin compromiso, sin coste</p>
                </div>
              </div>
              <a
                href={TALLER_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-azul w-full justify-center"
              >
                <ExternalLink size={14} />
                Abrir en Google Maps
              </a>
            </div>

            {/* Mapa */}
            <div className="lg:col-span-2">
              <div className="map-container h-64 lg:h-80">
                <iframe
                  src={TALLER_CONFIG.mapsEmbed}
                  title="Taller Don Remondo — Valladolid"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
