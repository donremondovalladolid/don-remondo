import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, MapPin, Car, ArrowLeft, CheckCircle2, Fuel, Settings2, Gauge, Calendar } from "lucide-react";
import { TALLER_CONFIG, SITE_CONFIG } from "@/lib/config";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const coche = await prisma.coche.findUnique({ where: { slug } });
  if (!coche) return { title: "Coche no encontrado" };
  return {
    title: `${coche.marca} ${coche.modelo} ${coche.anio} — ${coche.precio.toLocaleString("es-ES")} €`,
    description: `${coche.marca} ${coche.modelo} del año ${coche.anio} con ${coche.km.toLocaleString("es-ES")} km. ${coche.combustible}. ${coche.descripcion ? coche.descripcion.slice(0, 120) : "Vehículo revisado por nuestro taller con garantía. Don Remondo Valladolid."}`,
    openGraph: {
      title: `${coche.marca} ${coche.modelo} ${coche.anio} | Don Remondo`,
      url: `${SITE_CONFIG.url}/coches-segunda-mano/${slug}`,
    },
  };
}

export default async function CocheDetallePage({ params }: Props) {
  const { slug } = await params;
  const coche = await prisma.coche.findUnique({ where: { slug } });
  if (!coche) notFound();

  const fotos = JSON.parse(coche.fotos) as string[];

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${coche.marca} ${coche.modelo} ${coche.anio}`,
    description: coche.descripcion || `${coche.marca} ${coche.modelo} ${coche.anio} en venta en Valladolid.`,
    vehicleModelDate: String(coche.anio),
    mileageFromOdometer: { "@type": "QuantitativeValue", value: coche.km, unitCode: "KMT" },
    fuelType: coche.combustible,
    offers: {
      "@type": "Offer",
      price: coche.precio,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: TALLER_CONFIG.name },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <Link
          href="/coches-segunda-mano"
          className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 mb-6 font-medium"
        >
          <ArrowLeft size={16} />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Fotos */}
          <div>
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-3 flex items-center justify-center">
              {fotos[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fotos[0]}
                  alt={`${coche.marca} ${coche.modelo} ${coche.anio}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Car size={52} className="text-gray-300" />
              )}
            </div>
            {fotos.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {fotos.slice(1).map((foto, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={foto}
                    alt={`Foto ${i + 2}`}
                    className="aspect-square rounded-xl object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Datos */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {coche.marca} {coche.modelo}
            </h1>
            <p className="text-gray-500 mb-4">Referencia #{coche.id} · {TALLER_CONFIG.city}</p>

            <p className="text-4xl font-bold text-blue-700 mb-6">
              {coche.precio.toLocaleString("es-ES")} €
            </p>

            {/* Ficha técnica */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Calendar, label: "Año", value: coche.anio },
                { icon: Gauge, label: "Kilómetros", value: `${coche.km.toLocaleString("es-ES")} km` },
                { icon: Fuel, label: "Combustible", value: coche.combustible },
                { icon: Settings2, label: "Cambio", value: coche.cambio },
                { icon: Car, label: "Puertas", value: coche.puertas },
                { icon: CheckCircle2, label: "Color", value: coche.color || "Consultar" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                  <Icon size={18} className="text-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="font-semibold text-gray-900 text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {coche.descripcion && (
              <div className="mb-6">
                <h2 className="font-bold text-gray-900 mb-2">Descripción</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{coche.descripcion}</p>
              </div>
            )}

            {/* Garantías */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6 space-y-2">
              {["Revisado por nuestro taller", "Garantía por escrito", "Historial disponible"].map((g) => (
                <div key={g} className="flex items-center gap-2 text-sm text-blue-800">
                  <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                  {g}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${TALLER_CONFIG.phoneRaw}`}
                className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                <Phone size={18} />
                Llamar: {TALLER_CONFIG.phone}
              </a>
              <Link
                href={`/contacto?asunto=Consulta+sobre+${encodeURIComponent(`${coche.marca} ${coche.modelo} ${coche.anio}`)}`}
                className="flex items-center justify-center gap-2 border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Preguntar por este coche
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
              <MapPin size={12} />
              {TALLER_CONFIG.address}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
