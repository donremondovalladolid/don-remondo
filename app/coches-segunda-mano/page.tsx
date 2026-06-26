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
      <section className="relative overflow-hidden bg-zinc-950 h-[420px] sm:h-[500px] flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />

        {/* Decorative green glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-verde-500)] rounded-full blur-[150px] opacity-20 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-verde-600)] rounded-full blur-[120px] opacity-10 pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

        {/* Logo */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] lg:w-[50%] flex justify-center items-center opacity-30 md:opacity-100 pointer-events-none p-10 lg:p-20">
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
          <h1
            className="text-white mb-4 animate-fade-up animate-delay-100"
          >
            Coches de Segunda Mano
            <br />
            <span className="text-[var(--color-verde-400)] italic">en Valladolid</span>
          </h1>
          <p className="font-display text-zinc-300 text-lg max-w-xl leading-relaxed animate-fade-up animate-delay-200">
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
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-verde-100)] flex items-center justify-center mx-auto mb-5">
                <Car size={30} className="text-[var(--color-verde-600)]" />
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
                          <span className="absolute top-2.5 left-2.5 badge badge-verde shadow-sm">
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
                            className="text-2xl font-bold text-[var(--color-verde-700)] font-display"
                          >
                            {coche.precio.toLocaleString("es-ES")} €
                          </span>
                          <span className="text-sm text-[var(--color-verde-600)] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={`tel:${TALLER_CONFIG.phoneRaw}`}
                className="btn btn-verde btn-lg"
              >
                <Phone size={17} />
                {TALLER_CONFIG.phone}
              </a>
              <a
                href={`https://wa.me/34${TALLER_CONFIG.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-verde btn-lg"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {TALLER_CONFIG.whatsapp}
              </a>
              <a
                href={`tel:${TALLER_CONFIG.phoneFueraHorarioRaw}`}
                className="btn btn-outline-verde btn-lg"
              >
                <Phone size={17} />
                {TALLER_CONFIG.phoneFueraHorario} (Fuera de horario)
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
