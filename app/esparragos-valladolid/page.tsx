import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Phone, MapPin, Clock, Leaf,
  CalendarDays, ExternalLink, ArrowRight, Truck, ShoppingBasket,
  Sprout
} from "lucide-react";
import {
  ESPARRAGOS_CONFIG,
  ESPARRAGOS_REMONDO_CONFIG,
  SITE_CONFIG,
  ESPARRAGOS_ENVIOS,
  ESPARRAGOS_BLANCO_CATEGORIAS,
  ESPARRAGOS_TRIGUERO_VARIEDADES,
  PRODUCTOS_TODO_EL_ANO,
  PRODUCTOS_TEMPORADA,
  IMAGES,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "Espárragos y Productos Frescos Valladolid | Don Remondo",
  description:
    "Espárragos de producción propia, hortalizas frescas y fruta de calidad en Valladolid. Temporada de espárragos de final de marzo a mediados de junio. Patata Voyager, tomate RAF, naranjas NANNI y mucho más.",
  keywords: [
    "espárragos Valladolid",
    "espárragos frescos Valladolid",
    "espárragos producción propia",
    "espárragos blancos Valladolid",
    "espárragos trigueros Valladolid",
    "verdulería Valladolid",
    "productos frescos Valladolid",
    "frutas verduras Valladolid",
    "patata Voyager Valladolid",
    "tomate RAF Valladolid",
    "naranjas NANNI Valladolid",
    "espárragos Remondo Segovia",
  ],
  openGraph: {
    title: "Espárragos y Productos Frescos | Don Remondo Valladolid",
    description:
      "Espárragos de producción propia y productos frescos todo el año en Valladolid. Especialistas en espárrago blanco y triguero.",
    url: `${SITE_CONFIG.url}/esparragos-valladolid`,
    siteName: SITE_CONFIG.name,
    locale: "es_ES",
    type: "website",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Productos frescos Don Remondo",
  description: "Espárragos y productos frescos de producción propia en Valladolid",
  itemListElement: [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_CONFIG.url}/esparragos-valladolid#valladolid`,
      name: ESPARRAGOS_CONFIG.name,
      description:
        "Tienda de espárragos y productos frescos en Valladolid. Producción propia.",
      address: {
        "@type": "PostalAddress",
        streetAddress: ESPARRAGOS_CONFIG.address,
        addressLocality: ESPARRAGOS_CONFIG.city,
        postalCode: ESPARRAGOS_CONFIG.cp,
        addressCountry: "ES",
      },
      telephone: ESPARRAGOS_CONFIG.phone,
      openingHours: ESPARRAGOS_CONFIG.horario,
      url: `${SITE_CONFIG.url}/esparragos-valladolid`,
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_CONFIG.url}/esparragos-valladolid#remondo`,
      name: ESPARRAGOS_REMONDO_CONFIG.name,
      description:
        "Venta de espárragos de producción propia en Remondo (Segovia) durante la temporada.",
      address: {
        "@type": "PostalAddress",
        streetAddress: ESPARRAGOS_REMONDO_CONFIG.address,
        addressLocality: ESPARRAGOS_REMONDO_CONFIG.city,
        addressRegion: ESPARRAGOS_REMONDO_CONFIG.province,
        postalCode: ESPARRAGOS_REMONDO_CONFIG.cp,
        addressCountry: "ES",
      },
      telephone: ESPARRAGOS_REMONDO_CONFIG.phone,
      openingHours: ESPARRAGOS_REMONDO_CONFIG.horario,
      url: `${SITE_CONFIG.url}/esparragos-valladolid`,
    },
  ],
};

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

const mesesCruciferas = [
  { mes: "Ene", activo: false },
  { mes: "Feb", activo: false },
  { mes: "Mar", activo: false },
  { mes: "Abr", activo: false },
  { mes: "May", activo: false },
  { mes: "Jun", activo: false },
  { mes: "Jul", activo: false },
  { mes: "Ago", activo: false },
  { mes: "Sep", activo: true },
  { mes: "Oct", activo: true },
  { mes: "Nov", activo: true },
  { mes: "Dic", activo: true },
];

const mesesInvierno = [
  { mes: "Ene", activo: true },
  { mes: "Feb", activo: true },
  { mes: "Mar", activo: false },
  { mes: "Abr", activo: false },
  { mes: "May", activo: false },
  { mes: "Jun", activo: false },
  { mes: "Jul", activo: false },
  { mes: "Ago", activo: false },
  { mes: "Sep", activo: false },
  { mes: "Oct", activo: false },
  { mes: "Nov", activo: false },
  { mes: "Dic", activo: true },
];

export default function ProductosPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-verde-900)] via-[var(--color-verde-800)] to-[var(--color-verde-600)]">
        <Image
          src={IMAGES.esparragos.hero}
          alt=""
          aria-hidden={true}
          fill
          className="object-cover opacity-45 mix-blend-soft-light"
          priority
        />
        <div className="absolute inset-0 opacity-[0.06] pattern-diagonal-light" />

        <div className="container relative py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium tracking-wide mb-6">
              <Sprout size={13} />
              Producción propia · Valladolid
            </div>
            <h1 className="text-white mb-5">
              Productos frescos<br />
              <span className="text-[var(--color-verde-300)] italic">de producción propia</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
              Espárragos, hortalizas y fruta de calidad en Valladolid.
              Cultivamos gran parte de lo que vendemos para garantizar
              frescura y sabor desde el campo hasta tu mesa.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${ESPARRAGOS_CONFIG.phoneRaw}`}
                className="btn btn-white"
              >
                <Phone size={16} />
                {ESPARRAGOS_CONFIG.phone}
              </a>
              <Link href="#esparragos" className="btn btn-ghost-white">
                Espárragos de temporada
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS TODO EL AÑO ────────────────── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-3">
              Disponibles todo el año
            </p>
            <h2>
              Hortalizas y fruta<br />
              <span className="text-[var(--color-verde-700)] italic">en nuestra tienda de Valladolid</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] mt-4 max-w-xl mx-auto">
              Además de los espárragos de temporada, en nuestra tienda de Valladolid
              encontrarás una selección de productos frescos durante todo el año.
              Patata, puerro y zanahoria son de producción propia en la zona.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTOS_TODO_EL_ANO.map((producto) => (
              <div
                key={producto.nombre}
                className="card p-0 overflow-hidden"
              >
                {/* Imagen */}
                <div className="aspect-[3/2] bg-[var(--color-stone-50)] overflow-hidden">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg">{producto.nombre}</h3>
                    <div className="flex gap-1.5 shrink-0">
                      {"produccionPropia" in producto && producto.produccionPropia && (
                        <span className="badge badge-verde">Producción propia</span>
                      )}
                    </div>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-3">
                    {producto.descripcion}
                  </p>
                  {"variedades" in producto && producto.variedades && (
                    <div className="flex flex-wrap gap-1.5">
                      {(producto.variedades as readonly string[]).map((v) => (
                        <span
                          key={v}
                          className={`badge ${"variedadDestacada" in producto && (producto as { variedadDestacada?: string }).variedadDestacada === v ? "badge-ambar" : "badge-stone"}`}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  )}
                  {"variedadDestacada" in producto &&
                    (producto as { variedadDestacada?: string }).variedadDestacada &&
                    !("variedades" in producto) && (
                    <span className="badge badge-ambar">
                      {(producto as { variedadDestacada?: string }).variedadDestacada}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 p-4 rounded-[var(--radius-xl)] bg-[var(--color-verde-50)] border border-[var(--color-verde-200)] max-w-lg mx-auto">
            <ShoppingBasket size={18} className="text-[var(--color-verde-700)] shrink-0" />
            <p className="text-sm text-[var(--color-verde-900)]">
              <strong>Solo en nuestra tienda de Valladolid</strong> · Av. del Euro, 24 · Todos los días 05:00–10:00
            </p>
          </div>
        </div>
      </section>

      {/* ── ESPÁRRAGOS ───────────────────────────── */}
      <section id="esparragos" className="section-padding bg-[var(--color-stone-50)]">
        <div className="container">

          {/* Cabecera sección */}
          <div className="text-center mb-12">
            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-3">
              Producto estrella · Temporada
            </p>
            <h2>
              Espárragos<br />
              <span className="text-[var(--color-verde-700)] italic">de producción propia</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] mt-4 max-w-xl mx-auto">
              Cultivamos nuestros propios espárragos. Los cosechamos en su punto óptimo
              y los tienes en tienda en cuestión de horas. Sin intermediarios,
              sin cámaras de semanas: espárrago fresco de verdad.
            </p>
          </div>

          {/* Temporada + envíos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Calendario */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays size={18} className="text-[var(--color-verde-700)]" />
                <h3 className="text-base font-semibold text-[var(--color-text)]">Temporada</h3>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                {ESPARRAGOS_CONFIG.temporada}
              </p>
              <div className="grid grid-cols-6 gap-1.5">
                {meses.map((m) => (
                  <div
                    key={m.mes}
                    className={`text-center py-1.5 px-1 rounded-lg text-xs font-medium transition-colors ${
                      m.activo
                        ? "bg-[var(--color-verde-700)] text-white"
                        : "bg-[var(--color-stone-100)] text-[var(--color-text-muted)]"
                    }`}
                  >
                    {m.mes}
                  </div>
                ))}
              </div>
            </div>

            {/* Envíos */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck size={18} className="text-[var(--color-verde-700)]" />
                <h3 className="text-base font-semibold text-[var(--color-text)]">Envíos a domicilio</h3>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                {ESPARRAGOS_ENVIOS.nota}
              </p>
              <div className="flex gap-2">
                {ESPARRAGOS_ENVIOS.dias.map((dia) => (
                  <span key={dia} className="badge badge-verde">{dia}</span>
                ))}
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-3">
                Llámanos para coordinar el pedido y la entrega.
              </p>
            </div>
          </div>

          {/* Espárrago blanco */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 rounded-full bg-[var(--color-verde-600)]" />
              <h3 className="text-xl">Espárrago blanco</h3>
            </div>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-2xl">
              El clásico. Se cosecha antes de que asome a la superficie para conservar
              su color marfil y su sabor delicado. Lo clasificamos en cuatro categorías
              según calibre y presentación, identificadas por el color de la etiqueta.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ESPARRAGOS_BLANCO_CATEGORIAS.map((cat) => (
                <div
                  key={cat.nombre}
                  className="card p-0 overflow-hidden"
                >
                  {/* Franja color etiqueta */}
                  <div
                    className="h-2"
                    style={{ backgroundColor: cat.colorHex }}
                  />
                  {/* Imagen */}
                  <div
                    className="aspect-[4/3] overflow-hidden relative"
                    style={{ backgroundColor: cat.colorBg }}
                  >
                    <Image
                      src={cat.imagen}
                      alt={`Espárrago blanco categoría ${cat.nombre}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-[var(--color-text)]">
                        Categoría {cat.nombre}
                      </h4>
                      <span
                        className="inline-block w-3 h-3 rounded-full border border-[var(--color-border)]"
                        style={{ backgroundColor: cat.colorHex }}
                        title={`Etiqueta ${cat.colorEtiqueta}`}
                      />
                    </div>
                    <p className="text-xs text-[var(--color-verde-800)] font-medium mb-2 bg-[var(--color-verde-50)] px-2 py-1 rounded-md inline-block">
                      {cat.pack}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{cat.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Espárrago triguero */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 rounded-full bg-[var(--color-verde-500)]" />
              <h3 className="text-xl">Espárrago triguero</h3>
            </div>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-2xl">
              Más intenso y con mayor contenido en fibra que el blanco. Carácter pronunciado,
              ideal para la plancha, el wok o la brasa. Se vende en mazos de 300g.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              {ESPARRAGOS_TRIGUERO_VARIEDADES.map((v) => (
                <div key={v.nombre} className="card p-0 overflow-hidden">
                  <div className="aspect-[3/2] bg-[var(--color-verde-50)] overflow-hidden relative">
                    <Image
                      src={v.imagen}
                      alt={`Espárrago triguero ${v.nombre}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[var(--color-text)]">{v.nombre}</h4>
                      <span className="badge badge-verde">{v.formato}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">{v.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── OTROS PRODUCTOS DE TEMPORADA ────────── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-3">
              Según la época del año
            </p>
            <h2>
              Otros productos<br />
              <span className="text-[var(--color-verde-700)] italic">de temporada</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] mt-4 max-w-xl mx-auto">
              Crucíferas de producción propia en otoño, cardo en invierno
              y las naranjas NANNI con hoja cuando llega la temporada.
            </p>
          </div>

          {/* Crucíferas: sept–dic */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-7 rounded-full bg-[var(--color-verde-400)]" />
              <h3 className="text-lg">Crucíferas — Septiembre a Diciembre</h3>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mb-4 ml-4">
              Repollo, lombarda, coliflor, brócoli y romanesca de producción propia en la zona.
            </p>
            <div className="flex gap-1.5 mb-6 ml-4 flex-wrap">
              {mesesCruciferas.map((m) => (
                <div
                  key={m.mes}
                  className={`text-center py-1 px-2 rounded-md text-xs font-medium ${
                    m.activo
                      ? "bg-[var(--color-verde-700)] text-white"
                      : "bg-[var(--color-stone-100)] text-[var(--color-text-muted)]"
                  }`}
                >
                  {m.mes}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {PRODUCTOS_TEMPORADA.filter((p) => p.temporada === "Septiembre – Diciembre").map((p) => (
                <div key={p.nombre} className="card p-0 overflow-hidden">
                  <div className="aspect-square bg-[var(--color-stone-50)] overflow-hidden relative">
                    {p.imagen.endsWith(".svg") ? (
                      <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
                    ) : (
                      <Image src={p.imagen} alt={p.nombre} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm text-[var(--color-text)] mb-1">{p.nombre}</p>
                    <p className="text-xs text-[var(--color-text-muted)] leading-snug">{p.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invierno: dic–feb */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-7 rounded-full bg-[var(--color-ambar-400)]" />
              <h3 className="text-lg">Invierno — Diciembre a Febrero</h3>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mb-4 ml-4">
              Cardo de producción propia y naranjas NANNI con hoja, lo mejor del invierno.
            </p>
            <div className="flex gap-1.5 mb-6 ml-4 flex-wrap">
              {mesesInvierno.map((m) => (
                <div
                  key={m.mes}
                  className={`text-center py-1 px-2 rounded-md text-xs font-medium ${
                    m.activo
                      ? "bg-[var(--color-ambar-500)] text-white"
                      : "bg-[var(--color-stone-100)] text-[var(--color-text-muted)]"
                  }`}
                >
                  {m.mes}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              {PRODUCTOS_TEMPORADA.filter((p) => p.temporada === "Diciembre – Febrero").map((p) => (
                <div key={p.nombre} className="card p-0 overflow-hidden">
                  <div className="aspect-[3/2] bg-[var(--color-stone-50)] overflow-hidden relative">
                    {p.imagen.endsWith(".svg") ? (
                      <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
                    ) : (
                      <Image src={p.imagen} alt={p.nombre} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-semibold text-[var(--color-text)]">{p.nombre}</p>
                      <div className="flex gap-1.5 shrink-0">
                        {"marcaDestacada" in p && (p as { marcaDestacada?: string }).marcaDestacada && (
                          <span className="badge badge-ambar">
                            {(p as { marcaDestacada?: string }).marcaDestacada}
                          </span>
                        )}
                        {"produccionPropia" in p && (p as { produccionPropia?: boolean }).produccionPropia && (
                          <span className="badge badge-verde">Producción propia</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{p.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-[var(--color-verde-900)] via-[var(--color-verde-800)] to-[var(--color-verde-600)]">
        <div className="container text-center max-w-2xl">
          <Leaf size={32} className="text-[var(--color-verde-300)] mx-auto mb-5 opacity-80" />
          <h2 className="text-white mb-4">¿Quieres hacer un pedido?</h2>
          <p className="text-white/75 mb-6">
            Llámanos y te indicamos disponibilidad o pásate por cualquiera
            de nuestras tiendas.
          </p>
          <div className="flex items-center justify-center gap-2 mb-7 p-3 rounded-[var(--radius-lg)] bg-white/10 border border-white/20 max-w-sm mx-auto">
            <Truck size={16} className="text-[var(--color-verde-300)] shrink-0" />
            <p className="text-sm text-white/90">
              Envíos de espárragos: <strong>{ESPARRAGOS_ENVIOS.dias.join(", ")}</strong>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${ESPARRAGOS_CONFIG.phoneRaw}`}
              className="btn btn-white"
            >
              <Phone size={16} />
              {ESPARRAGOS_CONFIG.phone}
            </a>
            <Link
              href="/contacto?asunto=productos"
              className="btn btn-ghost-white"
            >
              Enviar mensaje
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PUNTOS DE VENTA ──────────────────────── */}
      <section className="section-padding bg-[var(--color-stone-50)]">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-3">
              Dónde encontrarnos
            </p>
            <h2>Nuestras tiendas</h2>
            <p className="text-[var(--color-text-secondary)] mt-3 max-w-md mx-auto text-sm">
              Horarios complementarios para que siempre puedas conseguir tus productos.
              La tienda de Valladolid ofrece todos los productos durante todo el año.
            </p>
          </div>

          <div className="space-y-10">
            {/* ── Tienda Valladolid ── */}
            <div className="card p-0 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-border-light)]">
                <div className="p-8">
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-verde-100)] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={18} className="text-[var(--color-verde-700)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--color-text)]">
                        Valladolid
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)]">Av. del Euro, 24</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        <span className="badge badge-verde">Todos los productos</span>
                        <span className="badge badge-verde">Todo el año</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                      <Clock size={14} className="text-[var(--color-text-muted)] shrink-0" />
                      {ESPARRAGOS_CONFIG.horario}
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                      <CalendarDays size={14} className="text-[var(--color-text-muted)] shrink-0" />
                      Abierto todos los días
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href={`tel:${ESPARRAGOS_CONFIG.phoneRaw}`}
                      className="btn btn-verde btn-sm"
                    >
                      <Phone size={14} />
                      {ESPARRAGOS_CONFIG.phone}
                    </a>
                    <a
                      href={ESPARRAGOS_CONFIG.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <ExternalLink size={14} />
                      Cómo llegar
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-3 p-4">
                  <div className="rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] relative h-48 lg:h-52">
                    <Image
                      src={IMAGES.tiendas.valladolid}
                      alt="Tienda Don Remondo en Valladolid"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>
                  <div className="map-container h-64 lg:h-72">
                    <iframe
                      src={ESPARRAGOS_CONFIG.mapsEmbed}
                      title="Tienda Don Remondo Valladolid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Tienda Remondo ── */}
            <div className="card p-0 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-border-light)]">
                <div className="p-8">
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-verde-100)] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={18} className="text-[var(--color-verde-700)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--color-text)]">
                        Remondo
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)]">C. Calvario, 8 · Segovia</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        <span className="badge badge-verde">Solo espárragos</span>
                        <span className="badge badge-stone">Temporada</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                      <Clock size={14} className="text-[var(--color-text-muted)] shrink-0" />
                      {ESPARRAGOS_REMONDO_CONFIG.horario}
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                      <CalendarDays size={14} className="text-[var(--color-text-muted)] shrink-0" />
                      {ESPARRAGOS_REMONDO_CONFIG.temporada}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href={`tel:${ESPARRAGOS_REMONDO_CONFIG.phoneRaw}`}
                      className="btn btn-verde btn-sm"
                    >
                      <Phone size={14} />
                      {ESPARRAGOS_REMONDO_CONFIG.phone}
                    </a>
                    <a
                      href={ESPARRAGOS_REMONDO_CONFIG.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <ExternalLink size={14} />
                      Cómo llegar
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-3 p-4">
                  <div className="rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border-light)] shadow-[var(--shadow-sm)]">
                    <img
                      src={IMAGES.tiendas.remondo}
                      alt="Tienda Don Remondo en Remondo, Segovia"
                      className="w-full h-48 lg:h-52 object-cover"
                    />
                  </div>
                  <div className="map-container h-64 lg:h-72">
                    <iframe
                      src={ESPARRAGOS_REMONDO_CONFIG.mapsEmbed}
                      title="Tienda Don Remondo Remondo Segovia"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
