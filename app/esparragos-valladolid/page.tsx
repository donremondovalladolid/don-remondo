import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MapPin, Clock, ArrowRight, CheckCircle2, Leaf, CalendarDays, ExternalLink } from "lucide-react";
import { ESPARRAGOS_CONFIG, SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Espárragos Valladolid | Espárragos Frescos de Tudela de Duero",
  description:
    "Compra espárragos frescos en Valladolid. Origen Tudela de Duero, temporada de primavera. Espárragos blancos y verdes de máxima calidad. Don Remondo.",
  keywords: [
    "espárragos Valladolid",
    "espárragos Tudela de Duero",
    "comprar espárragos Valladolid",
    "espárragos frescos Valladolid",
    "verdulería espárragos Valladolid",
  ],
  openGraph: {
    title: "Espárragos Frescos de Tudela de Duero | Don Remondo Valladolid",
    description:
      "Espárragos blancos y verdes directamente del campo. Temporada marzo-junio en Valladolid.",
    url: `${SITE_CONFIG.url}/esparragos-valladolid`,
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
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
  openingHours: "Mo-Sa 09:00-14:00 Mo-Sa 17:00-20:00",
  hasMap: ESPARRAGOS_CONFIG.mapsUrl,
  priceRange: "€",
  servesCuisine: "Espárragos frescos",
};

const caracteristicas = [
  { titulo: "Espárrago blanco", desc: "El clásico de Tudela de Duero. Sabor delicado y textura suave." },
  { titulo: "Espárrago verde", desc: "Más intenso y con más fibra. Ideal para parrilla y salteados." },
  { titulo: "100% de temporada", desc: "Solo vendemos producto fresco de la cosecha del año." },
  { titulo: "Origen garantizado", desc: "Directamente de los campos de la Ribera del Duero." },
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

      {/* HERO */}
      <section className="bg-gradient-to-br from-green-800 to-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Leaf size={18} className="text-green-200" />
              <span className="text-green-200 text-sm font-medium uppercase tracking-wide">
                Tudela de Duero · Valladolid
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Espárragos Frescos
              <br />
              <span className="text-green-200">de Tudela de Duero</span>
            </h1>
            <p className="text-green-100 text-lg mb-8 leading-relaxed">
              Espárragos blancos y verdes directamente del campo. Producto de temporada
              con el sabor auténtico de la Ribera del Duero. Disponibles en Valladolid.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${ESPARRAGOS_CONFIG.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
              >
                <Phone size={18} />
                Llamar para pedir: {ESPARRAGOS_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PLACEHOLDER GALERÍA */}
      <section className="py-12 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-green-100 rounded-xl flex flex-col items-center justify-center text-green-400 border-2 border-dashed border-green-200"
              >
                <Leaf size={32} className="mb-2 opacity-50" />
                <span className="text-xs text-green-400 font-medium">Foto {i}</span>
                <span className="text-xs text-green-300">(pendiente)</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-3">
            Galería de fotos — pendiente de añadir imágenes reales
          </p>
        </div>
      </section>

      {/* DESCRIPCIÓN DEL PRODUCTO */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nuestros Espárragos
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                En <strong>Don Remondo</strong> ofrecemos espárragos frescos de <strong>Tudela de Duero</strong>,
                una de las zonas productoras más reconocidas de Castilla y León. El suelo arenoso y el
                microclima de la Ribera del Duero hacen de esta zona el lugar ideal para el cultivo del espárrago.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Solo trabajamos con producto de <strong>temporada</strong>, disponible desde marzo hasta junio.
                Cuando termina la temporada, no vendemos espárragos. Así garantizamos la máxima frescura
                y el mejor sabor en cada compra.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caracteristicas.map((c) => (
                  <div key={c.titulo} className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                      <h3 className="font-semibold text-gray-900 text-sm">{c.titulo}</h3>
                    </div>
                    <p className="text-xs text-gray-500 pl-6">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Origen + Datos */}
            <div>
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-green-600" />
                  Origen: Tudela de Duero
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Tudela de Duero es un municipio de la provincia de Valladolid situado a orillas del río Duero,
                  conocido por sus cultivos de espárragos y sus vinos de la D.O. Cigales.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  El espárrago de esta zona se caracteriza por su blancura, su calibre y su sabor suave,
                  consecuencia directa del tipo de suelo y del clima continental de la meseta.
                </p>
              </div>

              <div className="bg-green-700 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <CalendarDays size={18} />
                  Temporada de venta
                </h3>
                <div className="grid grid-cols-6 gap-1.5 mb-3">
                  {meses.map(({ mes, activo }) => (
                    <div
                      key={mes}
                      className={`text-center py-1.5 px-1 rounded-lg text-xs font-semibold ${
                        activo
                          ? "bg-white text-green-700"
                          : "bg-green-600 text-green-300"
                      }`}
                    >
                      {mes}
                    </div>
                  ))}
                </div>
                <p className="text-green-200 text-sm">
                  Disponible de <strong className="text-white">marzo a junio</strong>. Fuera de temporada no tenemos existencias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA LLAMAR */}
      <section className="py-12 bg-green-50 border-y border-green-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            ¿Quieres pedir espárragos?
          </h2>
          <p className="text-gray-600 mb-6">
            Llámanos y te indicamos disponibilidad. También puedes pasarte por la tienda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${ESPARRAGOS_CONFIG.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <Phone size={18} />
              {ESPARRAGOS_CONFIG.phone}
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Formulario de contacto
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* DIRECCIÓN + MAPA */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Dónde encontrarnos</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Dirección</p>
                  <p className="text-gray-600 text-sm">{ESPARRAGOS_CONFIG.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Horario</p>
                  {ESPARRAGOS_CONFIG.horarioLineas.map((h) => (
                    <p key={h} className="text-gray-600 text-sm">{h}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Teléfono</p>
                  <a
                    href={`tel:${ESPARRAGOS_CONFIG.phoneRaw}`}
                    className="text-green-700 font-medium hover:underline text-sm"
                  >
                    {ESPARRAGOS_CONFIG.phone}
                  </a>
                </div>
              </div>
              <a
                href={ESPARRAGOS_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-700 hover:text-green-800 font-medium mt-2"
              >
                <ExternalLink size={14} />
                Abrir en Google Maps
              </a>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-72 bg-green-50 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin size={32} className="mx-auto mb-2 text-green-300" />
                  <p className="text-sm font-medium">Mapa — Av. del Euro, 24</p>
                  <p className="text-xs text-gray-300 mt-1">
                    Insertar iframe de Google Maps aquí
                  </p>
                  <a
                    href={ESPARRAGOS_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-green-600 hover:underline mt-3"
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
