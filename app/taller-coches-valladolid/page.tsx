import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone, MapPin, Clock, ArrowRight, CheckCircle2, Wrench,
  Car, Shield, Star, Gauge, Zap, Settings, ExternalLink,
} from "lucide-react";
import { TALLER_CONFIG, SITE_CONFIG, IMAGES } from "@/lib/config";
import { getDynamicSchedules, getDynamicImages, getDynamicContacts } from "@/lib/db-config";
import { prisma } from "@/lib/prisma";
import { Coche } from "@/lib/types";
import ScrollAnimation from "@/components/ScrollAnimation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Taller Mecánico Valladolid | Venta de Coches",
  description:
    "Taller mecánico de confianza en Valladolid. Servicio técnico multimarca y venta de coches de segunda mano. Más de 7 años de experiencia. Don Remondo.",
  keywords: [
    "taller mecánico Valladolid",
    "taller coches Valladolid",
    "venta coches Valladolid",
    "coches segunda mano Valladolid",
    "reparación coches Valladolid",
    "revisión coche Valladolid",
  ],
  openGraph: {
    title: "Taller Mecánico y Venta de Coches en Valladolid | Don Remondo",
    description:
      "Taller mecánico multimarca con más de 7 años de experiencia. Venta de coches revisados y con garantía en Valladolid.",
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
      name: `${TALLER_CONFIG.name} — Venta de Coches`,
      description: "Venta de coches de segunda mano en Valladolid. Vehículos revisados con garantía.",
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
    desc: "Transmisión, embrague, distribución, motor, suspensión y dirección.",
    color: "azul",
  },
  {
    icon: Gauge,
    titulo: "Diagnosis",
    desc: "Diagnóstico de motores y sistemas electrónicos de todas las marcas.",
    color: "azul",
  },
  {
    icon: Zap,
    titulo: "Averías eléctricas",
    desc: "Reparación de sistemas eléctricos, centralitas y electrónica del vehículo.",
    color: "azul",
  },
  {
    icon: Settings,
    titulo: "Baterías",
    desc: "Cambio de baterías, diagnosis de carga y sistemas de arranque.",
    color: "azul",
  },
  {
    icon: Shield,
    titulo: "Frenos",
    desc: "Servicio y reparación de frenos: discos, pastillas y líquido de frenos.",
    color: "azul",
  },
  {
    icon: Car,
    titulo: "Neumáticos",
    desc: "Neumáticos, calibración de ruedas, alineación y equilibrado.",
    color: "azul",
  },
  {
    icon: Wrench,
    titulo: "Cambio de aceite",
    desc: "Cambio de aceite, filtros de motor y filtros de habitáculo.",
    color: "verde",
  },
  {
    icon: Wrench,
    titulo: "Aire acondicionado",
    desc: "Recarga de gas, reparación de climatización y mantenimiento.",
    color: "verde",
  },
  {
    icon: Shield,
    titulo: "Suspensión y dirección",
    desc: "Reparación de amortiguadores, rótulas, dirección y tren delantero.",
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
  const dynamicSchedules = await getDynamicSchedules();
  const dynamicImages = await getDynamicImages();
  const dynamicContacts = await getDynamicContacts();
  const TALLER_CONTACT = dynamicContacts.taller;

  const rawDestacados = await prisma.coche.findMany({
    where: { vendido: false, destacado: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
  const cochesDestacados: Coche[] = rawDestacados as Coche[];

  const rawRecientes = await prisma.coche.findMany({
    where: { vendido: false },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
  const cochesRecientes: Coche[] = rawRecientes as Coche[];

  return (
    <>
      <ScrollAnimation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-950 h-[420px] sm:h-[500px] flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
        
        {/* Decorative green glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-verde-500)] rounded-full blur-[150px] opacity-20 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-verde-600)] rounded-full blur-[120px] opacity-10 pointer-events-none transform -translate-x-1/2 translate-y-1/2" />
        
        <div
          className="absolute right-0 top-0 bottom-0 w-[50%] hidden md:flex justify-center items-center pointer-events-none p-10 lg:p-20"
        >
          <img
            src="/images/logo-taller.jpeg"
            alt="Logo Taller Mecánico Don Remondo"
            className="max-w-full max-h-full object-contain animate-fade-in mix-blend-lighten"
            style={{
              filter: "drop-shadow(0 0 40px rgba(0,255,0,0.15))",
              maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            }}
          />
        </div>
        

        <div className="container relative">
          <div className="max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[var(--color-verde-400)] text-sm font-semibold mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-[var(--color-verde-500)] animate-pulse" />
              Servicio profesional multimarca
            </div>
            <h1
              className="text-white mb-5 animate-fade-up animate-delay-100 drop-shadow-lg"
            >
              Taller Mecánico
              <br />
              <span className="text-[var(--color-verde-400)] italic">y Venta de coches</span>
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8 max-w-lg animate-fade-up animate-delay-200 drop-shadow">
              Expertos en mantenimiento, reparación y diagnosis multimarca. Garantía y confianza en cada trabajo.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up animate-delay-300">
              <Link href="/coches-segunda-mano" className="btn btn-verde-light btn-lg">
                Ver coches en venta
              </Link>
              <a href={`tel:${TALLER_CONTACT.phoneRaw}`} className="btn btn-ghost-white btn-lg">
                <Phone size={16} />
                {TALLER_CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-10 bg-[var(--color-bg)] wave-bottom"
        />
      </section >

      {/* ── SERVICIOS ────────────────────────────── */}
      < section className="section-padding-sm bg-[var(--color-bg)]" >
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
                className="card p-6 group hover:border-[var(--color-verde-300)] transition-colors"
              >
                <div className="mb-4 pb-3 border-b-2 border-[var(--color-stone-200)] group-hover:border-[var(--color-verde-400)] transition-colors inline-block">
                  <Icon
                    size={22}
                    className="text-[var(--color-stone-500)] group-hover:text-[var(--color-verde-600)] transition-colors"
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
      </section >

      {/* ── FOTOS DEL TALLER ───────────────────────── */}
      < section className="section-padding-sm bg-zinc-950" >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden">
              <img
                src={dynamicImages.taller.equipo}
                alt="Equipo de mecánicos Don Remondo"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden">
              <img
                src={dynamicImages.taller.interior}
                alt="Interior taller Don Remondo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden">
              <img
                src={dynamicImages.taller.interior2}
                alt="Taller zona 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden">
              <img
                src={dynamicImages.taller.interior3}
                alt="Taller zona 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section >

      {/* ── CTA CONTACTO ─────────────────────────── */}
      < section className="section-padding-sm bg-[var(--color-stone-100)] border-y border-[var(--color-border)]" >
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-[var(--color-stone-900)] mb-3"
            >
              ¿Necesitas presupuesto?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-7">
              Llámanos o escríbenos y te respondemos sin compromiso.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${TALLER_CONTACT.phoneRaw}`}
                className="btn btn-verde btn-lg"
              >
                <Phone size={17} />
                {TALLER_CONTACT.phone}
              </a>
              <a
                href={`https://wa.me/34${TALLER_CONTACT.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-verde btn-lg"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {TALLER_CONTACT.whatsapp}
              </a>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mt-5 flex flex-col items-center gap-1">
              <span>o escríbenos a:</span>
              <a
                href={`mailto:${TALLER_CONTACT.email}`}
                className="text-[var(--color-verde-700)] hover:underline font-medium"
              >
                {TALLER_CONTACT.email}
              </a>
            </p>
          </div>
        </div>
      </section >

      {/* ── COCHES EN VENTA — preview ────────────── */}
      < section className="section-padding-sm bg-white" >
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-2">
                Venta de coches
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
              className="hidden sm:flex items-center gap-1.5 text-[var(--color-verde-600)] font-semibold text-sm hover:text-[var(--color-verde-800)] transition-colors"
            >
              Ver todos
              <ArrowRight size={15} />
            </Link>
          </div>

          {cochesRecientes.length === 0 ? (
            <div className="bg-[var(--color-stone-100)] rounded-[var(--radius-xl)] p-14 text-center border border-[var(--color-border)]">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-verde-100)] flex items-center justify-center mx-auto mb-4">
                <Car size={26} className="text-[var(--color-verde-500)]" />
              </div>
              <h3
                className="text-lg mb-2"
              >
                Próximamente tendremos coches en venta
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm mb-6 max-w-sm mx-auto">
                Estamos preparando el catálogo. Llámanos para consultar disponibilidad.
              </p>
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
                        <span className="absolute top-2 left-2 badge badge-verde">
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
                          className="text-xl font-bold text-[var(--color-stone-800)] font-display"
                        >
                          {coche.precio.toLocaleString("es-ES")} €
                        </span>
                        <span className="text-xs text-[var(--color-verde-600)] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
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
              className="btn btn-outline-verde"
            >
              Ver todos los coches
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section >

      {/* ── MAPA ─────────────────────────────────── */}
      < section className="section-padding-sm bg-[var(--color-stone-100)]" >
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
              <div className="flex items-start gap-3 p-4 bg-white rounded-[var(--radius-lg)] border border-[var(--color-border-light)] hover:border-[var(--color-verde-300)] transition-colors">
                <MapPin size={18} className="text-[var(--color-verde-600)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--color-text)] text-sm">Dirección</p>
                  <p className="text-[var(--color-text-secondary)] text-sm">{TALLER_CONTACT.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-[var(--radius-lg)] border border-[var(--color-border-light)] hover:border-[var(--color-verde-300)] transition-colors">
                <Clock size={18} className="text-[var(--color-verde-600)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--color-text)] text-sm">Horario</p>
                  {dynamicSchedules.taller.map((h) => (
                    <p key={h} className="text-[var(--color-text-secondary)] text-sm">{h}</p>
                  ))}
                </div>
              </div>

              <a
                href={TALLER_CONFIG.mapsUrl}
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
      </section >
    </>
  );
}
