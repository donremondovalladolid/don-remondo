import Link from "next/link";
import Image from "next/image";
import {
  Phone, ArrowRight, Leaf, Wrench, Car,
  CheckCircle2, MapPin, Clock, Shield, Star
} from "lucide-react";
import { SITE_CONFIG, ESPARRAGOS_CONFIG, TALLER_CONFIG, IMAGES } from "@/lib/config";

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.phoneRaw,
  description:
    "Negocio familiar en Valladolid. Productos frescos de producción propia y taller mecánico con compra-venta de coches.",
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

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-stone-700)] h-[420px] sm:h-[500px] flex flex-col justify-center">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-stone-900)]/30 to-transparent pointer-events-none" />

        <div className="container relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 lg:gap-24">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-6 animate-fade-up">
                <span className="inline-flex items-center gap-1.5 badge badge-ambar text-[0.7rem] px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ambar-500)] inline-block" />
                  Valladolid · Desde {SITE_CONFIG.founded}
                </span>
              </div>

              <h1
                className="text-white leading-[1.08] mb-6 animate-fade-up animate-delay-100"
              >
                Don Remondo
                <br />
                <span className="text-[var(--color-ambar-200)] italic">
                  sabor y oficio
                </span>
              </h1>

              <p className="text-[var(--color-stone-300)] text-lg sm:text-xl leading-relaxed max-w-xl mb-10 animate-fade-up animate-delay-200">
                Productos frescos de producción propia, taller mecánico de confianza y venta de coches.
                Dos negocios, una misma familia.
              </p>
            </div>

            {/* Logo hero */}
            <div className="hidden md:flex shrink-0 animate-fade-up animate-delay-200 items-center justify-end">
              <div className="relative w-96 lg:w-[32rem] aspect-[2.4/1] rounded-2xl overflow-hidden bg-white shadow-[0_12px_48px_rgba(0,0,0,0.45)] p-2">
                <Image
                  src={IMAGES.logo}
                  alt="Logo Don Remondo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 384px, 512px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ola inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[var(--color-bg)] wave-bottom" />
      </section>

      {/* ── DOS ACTIVIDADES ──────────────────────── */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-3">
              Dos negocios · Una familia
            </p>
            <h2>
              ¿Qué necesitas hoy?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">

            {/* ── Card Espárragos ── */}
            <Link
              href="/esparragos-valladolid"
              className="group relative card overflow-hidden block min-h-[420px]"
            >
              {/* Header visual */}
              <div className="relative px-8 pt-10 pb-14 overflow-hidden bg-[var(--color-verde-800)]">
                {/* Logo de fondo */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-4 z-0 opacity-40 pointer-events-none">
                  <img
                    src="/images/logo-esparragos-blanco.png"
                    alt=""
                    className="w-40 lg:w-48 object-contain"
                  />
                </div>
                {/* Gradiente para que destaque el texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="relative">
                  <h3
                    className="text-white text-2xl sm:text-3xl mb-2"
                  >
                    Productos Frescos
                  </h3>
                  <p className="text-white/80 text-sm font-medium">
                    Producción propia · Espárragos, hortalizas y fruta
                  </p>
                </div>
              </div>

              {/* Cuerpo */}
              <div className="px-8 pt-8 pb-7 flex flex-col flex-1">
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5">
                  Espárragos blancos y trigueros de producción propia, hortalizas frescas
                  todo el año y fruta de calidad. Sin intermediarios.
                </p>

                <ul className="space-y-2 mb-6">
                  {[
                    "Espárragos de producción propia",
                    "Patata Voyager · Tomate RAF · Naranja NANNI",
                    "Venta directa al público",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                      <CheckCircle2 size={14} className="text-[var(--color-verde-600)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                      <MapPin size={11} className="shrink-0" />
                      {ESPARRAGOS_CONFIG.addressShort}, Valladolid
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                      <Clock size={11} className="shrink-0" />
                      {ESPARRAGOS_CONFIG.horario}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[var(--color-verde-700)] font-semibold text-sm group-hover:gap-2 transition-all">
                    Ver más <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>

            {/* ── Card Taller ── */}
            <Link
              href="/taller-coches-valladolid"
              className="group relative card overflow-hidden block min-h-[420px]"
            >
              {/* Header visual */}
              <div className="relative px-8 pt-10 pb-14 overflow-hidden bg-zinc-900">
                {/* Logo de fondo */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-4 z-0 opacity-60 pointer-events-none w-48 h-48 lg:w-56 lg:h-56"
                    style={{
                      maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
                      WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)"
                    }}
                >
                  <img
                    src="/images/logo-taller.jpeg"
                    alt=""
                    className="w-full h-full object-contain mix-blend-lighten"
                  />
                </div>
                {/* Gradiente para que destaque el texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="relative">
                  <h3
                    className="text-white text-2xl sm:text-3xl mb-2"
                  >
                    Taller y Venta de Coches
                  </h3>
                  <p className="text-white/80 text-sm font-medium">
                    Mecánica multimarca · Venta de coches · Garantía
                  </p>
                </div>
              </div>

              {/* Cuerpo */}
              <div className="px-8 pt-8 pb-7 flex flex-col flex-1">
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5">
                  Taller mecánico.
                  Reparamos cualquier marca y también tenemos coches de segunda mano revisados.
                </p>

                <ul className="space-y-2 mb-6">
                  {[
                    "Mecánica general y rápida",
                    "Diagnóstico electrónico",
                    "Coches revisados con garantía",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                      <CheckCircle2 size={14} className="text-[var(--color-verde-600)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                      <MapPin size={11} className="shrink-0" />
                      {TALLER_CONFIG.addressShort}, Valladolid
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                      <Clock size={11} className="shrink-0" />
                      Lun–Vie: 09–13h / 16–20h
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[var(--color-verde-700)] font-semibold text-sm group-hover:gap-2 transition-all">
                    Ver más <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── COCHES QUICK LINK ────────────────────── */}
      <div className="bg-[var(--color-verde-50)] border-y border-[var(--color-verde-100)]">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Car size={18} className="text-[var(--color-verde-700)] shrink-0" />
              <p className="text-sm font-semibold text-[var(--color-verde-900)]">
                ¿Buscas coche? Tenemos vehículos revisados y con garantía en Valladolid.
              </p>
            </div>
            <Link
              href="/coches-segunda-mano"
              className="btn btn-verde text-[0.8rem] py-2 px-4 shrink-0"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>


      {/* ── GALERÍA DE PRODUCTOS ──────────────────── */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-3">
              Calidad y variedad
            </p>
            <h2>
              Nuestros Productos Frescos
            </h2>
            <p className="text-[var(--color-text-secondary)] mt-4 max-w-2xl mx-auto">
              Tomates Raf, pimientos de primera, verduras de temporada y fruta con el máximo sabor. Una pequeña muestra de lo que encontrarás en nuestra tienda, directamente del campo a tu mesa.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {IMAGES.productos.galeria.map((img, i) => (
              <div 
                key={img} 
                className={`relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] group ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"
                }`}
              >
                <Image
                  src={img}
                  alt={`Producto fresco Don Remondo ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/esparragos-valladolid" className="btn btn-verde">
              <Leaf size={16} />
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOBRE NOSOTROS ───────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Texto */}
            <div>
              <p className="text-[var(--color-text-muted)] text-sm font-semibold uppercase tracking-[0.1em] mb-4">
                Quiénes somos
              </p>
              <h2 className="mb-5">
                Un negocio familiar<br />
                <span className="text-[var(--color-verde-700)] italic">con raíces</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                Llevamos desde {SITE_CONFIG.founded} trabajando en lo que nos apasiona. Por un lado,
                traemos productos frescos de producción propia hasta Valladolid: espárragos, hortalizas y fruta de calidad.
                Por otro, mantenemos, reparamos y vendemos coches con honestidad y sin sorpresas.
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                Dos negocios muy distintos, pero con la misma filosofía: trabajo bien hecho,
                precio justo y trato cercano.
              </p>
            </div>

            {/* Imagen de familia */}
            <div>
              <div className="rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border-light)] shadow-[var(--shadow-sm)]">
                <img
                  src={IMAGES.home.familia}
                  alt="El equipo de Don Remondo"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────── */}
      <section className="section-padding-sm bg-[var(--color-stone-800)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-white mb-4"
            >
              ¿Podemos ayudarte?
            </h2>
            <p className="text-[var(--color-stone-300)] text-lg mb-8">
              Llámanos o escríbenos. Estaremos encantados de atenderte.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="btn btn-white btn-lg"
              >
                <Phone size={18} className="text-[var(--color-verde-600)]" />
                {SITE_CONFIG.phone}
              </a>
              <Link href="/contacto" className="btn btn-ghost-white btn-lg">
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
