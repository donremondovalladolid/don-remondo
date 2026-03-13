import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone, MapPin, Car, ArrowLeft, CheckCircle2,
  Fuel, Settings2, Gauge, Calendar, Shield, ArrowRight,
} from "lucide-react";
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

  // Coches relacionados: hasta 3 coches disponibles distintos al actual
  const relacionados = await prisma.coche.findMany({
    where: { vendido: false, slug: { not: slug } },
    take: 3,
    orderBy: [{ destacado: "desc" }, { createdAt: "desc" }],
  });

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${coche.marca} ${coche.modelo} ${coche.anio}`,
    description:
      coche.descripcion ||
      `${coche.marca} ${coche.modelo} ${coche.anio} en venta en Valladolid.`,
    vehicleModelDate: String(coche.anio),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: coche.km,
      unitCode: "KMT",
    },
    fuelType: coche.combustible,
    offers: {
      "@type": "Offer",
      price: coche.precio,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: TALLER_CONFIG.name },
    },
  };

  const specs = [
    { icon: Calendar, label: "Año", value: String(coche.anio) },
    { icon: Gauge, label: "Kilómetros", value: `${coche.km.toLocaleString("es-ES")} km` },
    { icon: Fuel, label: "Combustible", value: coche.combustible },
    { icon: Settings2, label: "Cambio", value: coche.cambio },
    { icon: Car, label: "Puertas", value: String(coche.puertas) },
    { icon: CheckCircle2, label: "Color", value: coche.color || "Consultar" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <div className="bg-[var(--color-bg)] min-h-screen">
        <div className="container py-8">

          {/* Breadcrumb */}
          <Link
            href="/coches-segunda-mano"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-azul-700)] hover:text-[var(--color-azul-900)] mb-8 font-semibold transition-colors"
          >
            <ArrowLeft size={15} />
            Volver al catálogo
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

            {/* ── COLUMNA IZQUIERDA: Fotos ── */}
            <div className="lg:col-span-7">
              {/* Foto principal */}
              <div className="aspect-video bg-[var(--color-stone-100)] rounded-[var(--radius-xl)] overflow-hidden mb-3 border border-[var(--color-border-light)] shadow-[var(--shadow-sm)]">
                {fotos[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={fotos[0]}
                    alt={`${coche.marca} ${coche.modelo} ${coche.anio}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Car size={56} className="text-[var(--color-stone-300)]" />
                  </div>
                )}
              </div>

              {/* Miniaturas */}
              {fotos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {fotos.slice(1).map((foto, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={foto}
                      alt={`Foto ${i + 2}`}
                      className="aspect-square rounded-[var(--radius-lg)] object-cover border border-[var(--color-border-light)]"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── COLUMNA DERECHA: Info + CTA ── */}
            <div className="lg:col-span-5">

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {coche.destacado && (
                  <span className="badge badge-azul">Destacado</span>
                )}
                <span className="badge badge-verde">
                  <CheckCircle2 size={11} />
                  Revisado por taller
                </span>
              </div>

              {/* Título */}
              <h1
                className="mb-1 leading-tight"
              >
                {coche.marca} {coche.modelo}
              </h1>
              <p className="text-sm text-[var(--color-text-muted)] mb-5">
                Ref. #{coche.id} · {TALLER_CONFIG.city}
              </p>

              {/* Precio */}
              <div className="bg-[var(--color-azul-50)] rounded-[var(--radius-xl)] px-6 py-5 mb-6 border border-[var(--color-azul-200)]">
                <p className="text-xs text-[var(--color-azul-600)] font-semibold uppercase tracking-[0.08em] mb-1">
                  Precio
                </p>
                <p
                  className="text-[var(--color-azul-800)] leading-none font-display"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 2.75rem)",
                  }}
                >
                  {coche.precio.toLocaleString("es-ES")} €
                </p>
              </div>

              {/* Ficha técnica */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3 bg-white rounded-[var(--radius-lg)] border border-[var(--color-border-light)]"
                  >
                    <div className="w-7 h-7 rounded-[var(--radius-sm)] bg-[var(--color-azul-100)] flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-[var(--color-azul-700)]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.65rem] text-[var(--color-text-muted)] uppercase tracking-wide leading-none mb-0.5">
                        {label}
                      </p>
                      <p className="font-semibold text-[var(--color-text)] text-sm truncate">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Descripción */}
              {coche.descripcion && (
                <div className="mb-6">
                  <h2
                    className="text-base mb-2"
                  >
                    Descripción
                  </h2>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {coche.descripcion}
                  </p>
                </div>
              )}

              {/* Garantías */}
              <div className="bg-[var(--color-verde-50)] rounded-[var(--radius-xl)] p-4 mb-6 border border-[var(--color-verde-200)]">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={15} className="text-[var(--color-verde-700)]" />
                  <p className="text-sm font-semibold text-[var(--color-verde-800)]">
                    Nuestras garantías
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {[
                    "Revisado por nuestro taller mecánico",
                    "Garantía por escrito incluida",
                    "Historial del vehículo disponible",
                  ].map((g) => (
                    <li key={g} className="flex items-center gap-2 text-sm text-[var(--color-verde-800)]">
                      <CheckCircle2 size={13} className="text-[var(--color-verde-600)] shrink-0" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${TALLER_CONFIG.phoneRaw}`}
                  className="btn btn-azul btn-lg justify-center"
                >
                  <Phone size={18} />
                  Llamar: {TALLER_CONFIG.phone}
                </a>
                <Link
                  href={`/contacto?asunto=${encodeURIComponent(
                    `Consulta sobre ${coche.marca} ${coche.modelo} ${coche.anio}`
                  )}`}
                  className="btn btn-outline-azul btn-lg justify-center"
                >
                  Preguntar por este coche
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Dirección */}
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mt-5">
                <MapPin size={12} className="shrink-0" />
                {TALLER_CONFIG.address}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── COCHES RELACIONADOS ───────────────── */}
      {relacionados.length > 0 && (
        <section className="section-padding bg-white border-t border-[var(--color-border-light)]">
          <div className="container">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-1">
                  Más coches disponibles
                </p>
                <h2 className="text-2xl">También te puede interesar</h2>
              </div>
              <Link
                href="/coches-segunda-mano"
                className="hidden sm:flex items-center gap-1.5 text-[var(--color-azul-700)] font-semibold text-sm hover:text-[var(--color-azul-900)] transition-colors"
              >
                Ver todos
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relacionados.map((rel) => {
                const relFotos = JSON.parse(rel.fotos) as string[];
                return (
                  <Link
                    key={rel.id}
                    href={`/coches-segunda-mano/${rel.slug}`}
                    className="card group overflow-hidden"
                  >
                    <div className="aspect-video bg-[var(--color-stone-100)] relative overflow-hidden">
                      {relFotos[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={relFotos[0]}
                          alt={`${rel.marca} ${rel.modelo} ${rel.anio}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Car size={36} className="text-[var(--color-stone-300)]" />
                        </div>
                      )}
                      {rel.destacado && (
                        <span className="absolute top-2.5 left-2.5 badge badge-azul shadow-sm">
                          Destacado
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-base mb-1 leading-snug">
                        {rel.marca} {rel.modelo}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {[
                          rel.anio,
                          `${rel.km.toLocaleString("es-ES")} km`,
                          rel.combustible,
                        ].map((tag) => (
                          <span key={String(tag)} className="badge badge-stone">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-light)]">
                        <span className="text-xl font-bold text-[var(--color-azul-700)] font-display">
                          {rel.precio.toLocaleString("es-ES")} €
                        </span>
                        <span className="text-sm text-[var(--color-azul-600)] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Ver ficha <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
