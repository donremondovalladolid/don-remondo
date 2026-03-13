import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone, MapPin, Clock, ArrowRight, CheckCircle2, Wrench,
  Car, Shield, Star, Gauge, Zap, Settings, ExternalLink,
} from "lucide-react";
import { TALLER_CONFIG, SITE_CONFIG } from "@/lib/config";
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
      description: "Taller mecánico multimarca en Valladolid. Reparación, mantenimiento y diagnóstico electrónico.",
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
  { icon: Wrench, titulo: "Mecánica general", desc: "Frenos, embrague, distribución, amortiguadores y todo tipo de reparaciones." },
  { icon: Gauge, titulo: "Mecánica rápida", desc: "Cambio de aceite, filtros, ruedas, baterías y revisiones rápidas." },
  { icon: Zap, titulo: "Diagnóstico electrónico", desc: "Lectura y borrado de códigos de error en todas las marcas y modelos." },
  { icon: Settings, titulo: "PreITV", desc: "Revisión completa antes de pasar la ITV para que no haya sorpresas." },
  { icon: Shield, titulo: "Garantía en reparaciones", desc: "Todas nuestras reparaciones incluyen garantía por escrito." },
  { icon: Car, titulo: "Compra-venta de coches", desc: "Vendemos coches revisados. También compramos tu vehículo." },
];

const garantias = [
  { valor: "+7", unidad: "años", label: "de experiencia" },
  { valor: "100%", unidad: "", label: "multimarca" },
  { valor: "Garantía", unidad: "", label: "en cada reparación" },
  { valor: "Presupuesto", unidad: "", label: "sin compromiso" },
];

export default async function TallerPage() {
  // Cargar 3 coches destacados para preview
  const cochesDestacados = await prisma.coche.findMany({
    where: { vendido: false, destacado: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const cochesRecientes = cochesDestacados.length > 0
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

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Wrench size={18} className="text-blue-200" />
              <span className="text-blue-200 text-sm font-medium uppercase tracking-wide">
                C. Villacarralón, 14 · Valladolid
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Taller Mecánico
              <br />
              <span className="text-blue-200">y Compra-Venta de Coches</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Taller mecánico multimarca con más de {SITE_CONFIG.experience} años de experiencia en Valladolid.
              Reparamos tu coche y también tenemos vehículos de segunda mano revisados.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/coches-segunda-mano"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors"
              >
                <Car size={18} />
                Ver coches en venta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Servicios del Taller
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Reparamos todo tipo de vehículos con garantía y presupuesto previo sin compromiso.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicios.map(({ icon: Icon, titulo, desc }) => (
              <div key={titulo} className="bg-gray-50 rounded-2xl p-6 hover:bg-blue-50 transition-colors group">
                <Icon size={28} className="text-blue-700 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-gray-900 mb-2">{titulo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTÍAS */}
      <section className="py-16 bg-blue-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {garantias.map(({ valor, unidad, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white">
                  {valor}
                  {unidad && <span className="text-blue-300 text-2xl ml-1">{unidad}</span>}
                </p>
                <p className="text-blue-300 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-800 rounded-2xl p-8 text-center">
            <Star size={32} className="text-yellow-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Taller de confianza en Valladolid</h3>
            <p className="text-blue-200 max-w-xl mx-auto text-sm leading-relaxed">
              Somos un taller familiar con más de {SITE_CONFIG.experience} años dando servicio a los vecinos de Valladolid.
              Trabajamos con honestidad, transparencia y siempre con presupuesto previo aprobado.
            </p>
          </div>
        </div>
      </section>

      {/* PLACEHOLDER GALERÍA TALLER */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuestras instalaciones</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-video bg-blue-50 rounded-xl flex flex-col items-center justify-center text-blue-300 border-2 border-dashed border-blue-100"
              >
                <Wrench size={28} className="mb-2 opacity-50" />
                <span className="text-xs font-medium">Foto taller {i}</span>
                <span className="text-xs text-blue-200">(pendiente)</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-3">
            Galería del taller — pendiente de añadir fotos reales
          </p>
        </div>
      </section>

      {/* CTA CONTACTO */}
      <section className="py-12 bg-blue-50 border-y border-blue-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            ¿Necesitas presupuesto o tienes alguna consulta?
          </h2>
          <p className="text-gray-600 mb-6">
            Llámanos o escríbenos y te respondemos sin compromiso.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href={`tel:${TALLER_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <Phone size={16} />
              {TALLER_CONFIG.phone}
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Formulario de contacto
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            o escríbenos a{" "}
            <a href={`mailto:${TALLER_CONFIG.email}`} className="text-blue-700 hover:underline font-medium">
              {TALLER_CONFIG.email}
            </a>
          </p>
        </div>
      </section>

      {/* COCHES EN VENTA — preview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Coches en Venta</h2>
              <p className="text-gray-500">Vehículos revisados y con garantía</p>
            </div>
            <Link
              href="/coches-segunda-mano"
              className="hidden sm:inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors"
            >
              Ver todos
              <ArrowRight size={16} />
            </Link>
          </div>

          {cochesRecientes.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-12 text-center">
              <Car size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Próximamente tendremos coches en venta</p>
              <p className="text-gray-400 text-sm mt-1">
                Llámanos para consultar disponibilidad: {TALLER_CONFIG.phone}
              </p>
              <a
                href={`tel:${TALLER_CONFIG.phoneRaw}`}
                className="inline-flex items-center gap-2 mt-4 bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl hover:bg-blue-800 transition-colors text-sm"
              >
                <Phone size={15} />
                Llamar
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
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                  >
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      {fotos[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={fotos[0]} alt={`${coche.marca} ${coche.modelo}`} className="w-full h-full object-cover" />
                      ) : (
                        <Car size={32} className="text-gray-300" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900">
                        {coche.marca} {coche.modelo}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {coche.anio} · {coche.km.toLocaleString("es-ES")} km · {coche.combustible}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-700">
                          {coche.precio.toLocaleString("es-ES")} €
                        </span>
                        <span className="text-xs text-blue-600 font-semibold group-hover:underline">
                          Ver ficha →
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
              className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800"
            >
              Ver todos los coches
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* DIRECCIÓN + MAPA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Dónde estamos</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Dirección</p>
                  <p className="text-gray-600 text-sm">{TALLER_CONFIG.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Horario</p>
                  {TALLER_CONFIG.horarioLineas.map((h) => (
                    <p key={h} className="text-gray-600 text-sm">{h}</p>
                  ))}
                </div>
              </div>
              <a
                href={TALLER_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 font-medium"
              >
                <ExternalLink size={14} />
                Abrir en Google Maps
              </a>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-72 bg-blue-50 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin size={32} className="mx-auto mb-2 text-blue-300" />
                  <p className="text-sm font-medium">Mapa — C. Villacarralón, 14</p>
                  <p className="text-xs text-gray-300 mt-1">Insertar iframe de Google Maps aquí</p>
                  <a
                    href={TALLER_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-3"
                  >
                    <ExternalLink size={12} />
                    Ver en Google Maps
                  </a>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Pendiente: insertar iframe embed de Google Maps con la dirección exacta
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
