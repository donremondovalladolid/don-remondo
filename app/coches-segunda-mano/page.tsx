import type { Metadata } from "next";
import Link from "next/link";
import { Car, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { TALLER_CONFIG, SITE_CONFIG } from "@/lib/config";
import { prisma } from "@/lib/prisma";
import { Coche } from "@/lib/types";

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

const schemaItemList = (
  coches: {
    id: number;
    marca: string;
    modelo: string;
    anio: number;
    precio: number;
    slug: string;
  }[]
) => ({
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
  const rawCoches = await prisma.coche.findMany({
    where: { vendido: false },
    orderBy: [{ destacado: "desc" }, { createdAt: "desc" }],
  });
  const coches: Coche[] = rawCoches as Coche[];

  return (
    <>
      {coches.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList(coches)) }}
        />
      )}

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-azul-900)]">
        <div className="absolute inset-0 opacity-[0.05] pattern-diagonal-light" />
        <div className="container relative py-16 sm:py-20">
          <div className="flex items-center gap-2 mb-4 animate-fade-up">
            <Car size={16} className="text-[var(--color-azul-300)]" />
            <span className="text-[var(--color-azul-200)] text-xs font-semibold uppercase tracking-[0.1em]">
              Don Remondo · Valladolid
            </span>
          </div>
          <h1
            className="text-white mb-4 animate-fade-up animate-delay-100"
          >
            Coches Segunda Mano
            <br />
            <span className="text-[var(--color-azul-200)] italic">en Valladolid</span>
          </h1>
          <p className="font-display text-[var(--color-azul-200)] text-lg max-w-xl leading-relaxed animate-fade-up animate-delay-200">
            Vehículos revisados por nuestro propio taller mecánico.
            Garantía, transparencia y buen precio.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-8 bg-[var(--color-bg)] wave-bottom"
        />
      </section>

      {/* ── CATÁLOGO ─────────────────────────────── */}
      <section className="section-padding bg-[var(--color-bg)] min-h-[60vh]">
        <div className="container">
          {coches.length === 0 ? (
            <div className="bg-white rounded-[var(--radius-xl)] p-16 text-center border border-[var(--color-border-light)] shadow-[var(--shadow-sm)]">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-azul-100)] flex items-center justify-center mx-auto mb-5">
                <Car size={30} className="text-[var(--color-azul-400)]" />
              </div>
              <h2
                className="text-xl mb-3"
              >
                Próximamente tendremos coches en venta
              </h2>
              <p className="text-[var(--color-text-muted)] mb-7 max-w-sm mx-auto text-sm">
                Estamos preparando el catálogo. Llámanos para consultar qué vehículos
                tenemos disponibles.
              </p>
              <a
                href={`tel:${TALLER_CONFIG.phoneRaw}`}
                className="btn btn-azul btn-lg"
              >
                <Phone size={16} />
                Llamar: {TALLER_CONFIG.phone}
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-7">
                <p className="text-[var(--color-text-muted)] text-sm">
                  <span className="font-semibold text-[var(--color-text)]">{coches.length}</span>{" "}
                  {coches.length === 1 ? "vehículo disponible" : "vehículos disponibles"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {coches.map((coche) => {
                  const fotos = JSON.parse(coche.fotos) as string[];
                  return (
                    <Link
                      key={coche.id}
                      href={`/coches-segunda-mano/${coche.slug}`}
                      className="card group overflow-hidden"
                    >
                      {/* Imagen */}
                      <div className="aspect-video bg-[var(--color-stone-100)] relative overflow-hidden">
                        {fotos[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={fotos[0]}
                            alt={`${coche.marca} ${coche.modelo} ${coche.anio}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car size={36} className="text-[var(--color-stone-300)]" />
                          </div>
                        )}
                        {coche.destacado && (
                          <span className="absolute top-2.5 left-2.5 badge badge-azul shadow-sm">
                            Destacado
                          </span>
                        )}
                      </div>

                      {/* Datos */}
                      <div className="p-5">
                        <h2
                          className="text-lg mb-1 leading-snug"
                        >
                          {coche.marca} {coche.modelo}
                        </h2>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {[
                            coche.anio,
                            `${coche.km.toLocaleString("es-ES")} km`,
                            coche.combustible,
                            coche.cambio,
                          ].map((tag) => (
                            <span key={tag} className="badge badge-stone">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-light)]">
                          <span
                            className="text-2xl font-bold text-[var(--color-azul-700)] font-display"
                          >
                            {coche.precio.toLocaleString("es-ES")} €
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
            </>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="section-padding-sm bg-white border-t border-[var(--color-border-light)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="mb-3"
            >
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-7">
              Dinos qué coche necesitas y te avisamos cuando tengamos algo
              disponible. También compramos tu vehículo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${TALLER_CONFIG.phoneRaw}`}
                className="btn btn-azul btn-lg"
              >
                <Phone size={17} />
                {TALLER_CONFIG.phone}
              </a>
              <Link
                href="/contacto?asunto=coches"
                className="btn btn-outline-azul btn-lg"
              >
                Formulario de contacto
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
