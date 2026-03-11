import Link from "next/link";
import { Phone, ArrowRight, Leaf, Wrench, Car, Star, MapPin, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG, ESPARRAGOS_CONFIG, TALLER_CONFIG } from "@/lib/config";

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.phoneRaw,
  description:
    "Negocio familiar en Valladolid. Venta de espárragos frescos de Tudela de Duero y taller mecánico con compra-venta de coches.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Valladolid",
    addressRegion: "Castilla y León",
    addressCountry: "ES",
  },
  sameAs: [ESPARRAGOS_CONFIG.mapsUrl, TALLER_CONFIG.mapsUrl],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* HERO */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Valladolid · Desde 2014
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Don Remondo
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-4">
              Espárragos frescos de Tudela de Duero
              <br />
              <span className="text-gray-400">y Taller Mecánico de confianza</span>
            </p>
            <p className="text-gray-400 mb-10 max-w-xl">
              Más de {SITE_CONFIG.experience} años sirviendo a Valladolid con producto de calidad y
              servicio mecánico honesto. Negocio familiar, trato cercano.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-lg"
              >
                <Phone size={20} />
                {SITE_CONFIG.phone}
              </a>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Contactar
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DOS ACTIVIDADES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Espárragos */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="bg-gradient-to-br from-green-700 to-green-500 p-10 text-white">
                <Leaf size={40} className="mb-4 opacity-90" />
                <h2 className="text-2xl font-bold mb-2">Espárragos</h2>
                <p className="text-green-100 text-sm">Frescos · Tudela de Duero · Temporada</p>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Espárragos blancos y verdes directamente del campo de Tudela de Duero.
                  Producto de temporada, máxima frescura garantizada.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Origen Tudela de Duero",
                    "Cosecha de temporada (mar – jun)",
                    "Espárrago blanco y verde",
                    "Venta directa al público",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={15} className="text-green-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <MapPin size={14} className="text-green-600 shrink-0" />
                  {ESPARRAGOS_CONFIG.address}
                </div>
                <Link
                  href="/esparragos-valladolid"
                  className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                >
                  Ver espárragos
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Taller */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-10 text-white">
                <Wrench size={40} className="mb-4 opacity-90" />
                <h2 className="text-2xl font-bold mb-2">Taller y Coches</h2>
                <p className="text-blue-200 text-sm">Mecánica · Compra-venta · Garantía</p>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Taller mecánico multimarca con diagnóstico, mantenimiento y reparación.
                  Además, amplio catálogo de coches de segunda mano revisados.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Mecánica general y rápida",
                    "Diagnóstico electrónico",
                    "Coches revisados y garantizados",
                    "Compra-venta de vehículos",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={15} className="text-blue-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <MapPin size={14} className="text-blue-600 shrink-0" />
                  {TALLER_CONFIG.address}
                </div>
                <Link
                  href="/taller-coches-valladolid"
                  className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                >
                  Ver taller y coches
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIANZA */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Más de {SITE_CONFIG.experience} años en Valladolid avalando nuestro trabajo con resultados reales.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Star, value: "+10 años", label: "de experiencia", color: "text-yellow-500" },
              { icon: Leaf, value: "Temporada", label: "espárrago fresco", color: "text-green-600" },
              { icon: Car, value: "Catálogo", label: "coches en stock", color: "text-blue-600" },
              { icon: CheckCircle2, value: "Confianza", label: "trato cercano", color: "text-gray-700" },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="text-center p-6 bg-gray-50 rounded-2xl">
                <Icon size={32} className={`${color} mx-auto mb-3`} />
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-green-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Tienes alguna pregunta?</h2>
          <p className="text-green-100 mb-8 text-lg">
            Llámanos o escríbenos. Estaremos encantados de atenderte.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors text-lg"
            >
              <Phone size={20} />
              {SITE_CONFIG.phone}
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
            >
              Formulario de contacto
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
