import type { Metadata } from "next";
import Link from "next/link";
import { Car, Phone, Filter, ArrowRight, CheckCircle2 } from "lucide-react";
import { TALLER_CONFIG, SITE_CONFIG } from "@/lib/config";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Coches Segunda Mano Valladolid | Compra-Venta de Vehículos",
  description:
    "Coches de segunda mano en Valladolid. Amplio catálogo de vehículos revisados y con garantía. Compra-venta con Don Remondo. Consúltanos sin compromiso.",
  keywords: [
    "coches segunda mano Valladolid",
    "comprar coches Valladolid",
    "coches usados Valladolid",
    "venta coches Valladolid",
    "coches baratos Valladolid",
    "compra venta coches Valladolid",
  ],
  openGraph: {
    title: "Coches Segunda Mano Valladolid | Don Remondo",
    description:
      "Catálogo de coches de segunda mano revisados y con garantía en Valladolid.",
    url: `${SITE_CONFIG.url}/coches-segunda-mano`,
  },
};

const schemaItemList = (coches: { id: number; marca: string; modelo: string; anio: number; precio: number; slug: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Coches de segunda mano en Valladolid — Don Remondo",
  url: `${SITE_CONFIG.url}/coches-segunda-mano`,
  numberOfItems: coches.length,
  itemListElement: coches.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_CONFIG.url}/coches-segunda-mano/${c.slug}`,
    name: `${c.marca} ${c.modelo} ${c.anio}`,
  })),
});

export default async function CochesPage() {
  const coches = await prisma.coche.findMany({
    where: { vendido: false },
    orderBy: [{ destacado: "desc" }, { createdAt: "desc" }],
  });

  return (
    <>
      {coches.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList(coches)) }}
        />
      )}

      {/* HERO */}
      <section className="bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-center gap-2 mb-3">
            <Car size={18} className="text-blue-300" />
            <span className="text-blue-300 text-sm font-medium uppercase tracking-wide">
              Don Remondo · Valladolid
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Coches Segunda Mano en Valladolid
          </h1>
          <p className="text-blue-200 max-w-xl text-lg mb-6">
            Vehículos revisados por nuestro taller mecánico. Garantía, transparencia y buen precio.
          </p>
          <a
            href={`tel:${TALLER_CONFIG.phoneRaw}`}
            className="inline-flex items-center gap-2 bg-white text-blue-800 font-bold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <Phone size={16} />
            {TALLER_CONFIG.phone} — Consultar disponibilidad
          </a>
        </div>
      </section>

      {/* GARANTÍAS BANNER */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {[
              "Vehículos revisados por nuestro taller",
              "Garantía por escrito",
              "Financiación disponible",
              "Tasamos tu coche",
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-sm text-blue-800">
                <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CATÁLOGO */}
      <section className="py-12 bg-gray-50 min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {coches.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
              <Car size={52} className="text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Próximamente tendremos coches en venta
              </h2>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
                Estamos preparando el catálogo. Llámanos para consultar qué vehículos tenemos disponibles.
              </p>
              <a
                href={`tel:${TALLER_CONFIG.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors"
              >
                <Phone size={16} />
                Llamar: {TALLER_CONFIG.phone}
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold text-gray-900">{coches.length}</span>{" "}
                  {coches.length === 1 ? "vehículo disponible" : "vehículos disponibles"}
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Filter size={14} />
                  <span>Ordenado por disponibilidad</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {coches.map((coche) => {
                  const fotos = JSON.parse(coche.fotos) as string[];
                  return (
                    <Link
                      key={coche.id}
                      href={`/coches-segunda-mano/${coche.slug}`}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
                    >
                      <div className="aspect-video bg-gray-100 relative overflow-hidden">
                        {fotos[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={fotos[0]}
                            alt={`${coche.marca} ${coche.modelo} ${coche.anio}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car size={36} className="text-gray-300" />
                          </div>
                        )}
                        {coche.destacado && (
                          <span className="absolute top-2 left-2 bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded-lg">
                            Destacado
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h2 className="font-bold text-gray-900 text-lg">
                          {coche.marca} {coche.modelo}
                        </h2>
                        <div className="flex flex-wrap gap-2 mt-1 mb-3">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {coche.anio}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {coche.km.toLocaleString("es-ES")} km
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {coche.combustible}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {coche.cambio}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-700">
                            {coche.precio.toLocaleString("es-ES")} €
                          </span>
                          <span className="text-sm text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Ver ficha <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-gray-500 mb-6">
            Dinos qué coche necesitas y te avisamos cuando tengamos algo disponible.
            También compramos tu vehículo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${TALLER_CONFIG.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <Phone size={16} />
              {TALLER_CONFIG.phone}
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Escribirnos
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
