import Link from "next/link";
import {
  Phone, ArrowRight, Leaf, Wrench, Car,
  CheckCircle2, MapPin, Clock, Shield, Star
} from "lucide-react";
import { SITE_CONFIG, ESPARRAGOS_CONFIG, ESPARRAGOS_REMONDO_CONFIG, TALLER_CONFIG, IMAGES } from "@/lib/config";

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

const confianzaItems = [
  {
    value: "+7",
    label: "años de experiencia",
    icon: Star,
    color: "ambar",
  },
  {
    value: "2",
    label: "puntos de venta",
    icon: MapPin,
    color: "verde",
  },
  {
    value: "100%",
    label: "presupuesto sin compromiso",
    icon: Shield,
    color: "azul",
  },
  {
    value: "Garantía",
    label: "en cada reparación",
    icon: CheckCircle2,
    color: "stone",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-stone-800)]">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 opacity-[0.04] pattern-diagonal-light" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-stone-900)]/30 to-transparent pointer-events-none" />

        <div className="container relative py-20 sm:py-28 lg:py-32">
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
              Espárragos frescos de Tudela de Duero y taller mecánico de confianza.
              Dos negocios, una misma familia.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up animate-delay-300">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="btn btn-white btn-lg"
              >
                <Phone size={17} className="text-[var(--color-verde-600)]" />
                {SITE_CONFIG.phone}
              </a>
              <Link href="/contacto" className="btn btn-ghost-white btn-lg">
                Escríbenos
                <ArrowRight size={16} />
              </Link>
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
              <div className="relative bg-gradient-to-br from-[var(--color-verde-800)] via-[var(--color-verde-700)] to-[var(--color-verde-500)] px-8 pt-10 pb-14 overflow-hidden">
                {/* Imagen de fondo */}
                <img
                  src={IMAGES.home.esparragosCard}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-soft-light"
                />
                {/* Patrón decorativo */}
                <div className="absolute inset-0 opacity-10 pattern-dots-light" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-5">
                    <Leaf size={28} className="text-white" />
                  </div>
                  <h3
                    className="text-white text-2xl sm:text-3xl mb-2"
                  >
                    Espárragos Frescos
                  </h3>
                  <p className="text-[var(--color-verde-200)] text-sm font-medium">
                    Tudela de Duero · Temporada Marzo–Junio
                  </p>
                </div>
              </div>

              {/* Cuerpo */}
              <div className="px-8 pt-8 pb-7 flex flex-col flex-1">
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5">
                  Espárragos blancos y verdes directamente del campo de la Ribera del Duero.
                  Solo producto de temporada, máxima frescura garantizada.
                </p>

                <ul className="space-y-2 mb-6">
                  {[
                    "Origen Tudela de Duero",
                    "Blanco y verde · Cosecha anual",
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
              <div className="relative bg-gradient-to-br from-[var(--color-azul-900)] via-[var(--color-azul-700)] to-[var(--color-azul-500)] px-8 pt-10 pb-14 overflow-hidden">
                <img
                  src={IMAGES.home.tallerCard}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-soft-light"
                />
                <div className="absolute inset-0 opacity-10 pattern-dots-light" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-5">
                    <Wrench size={28} className="text-white" />
                  </div>
                  <h3
                    className="text-white text-2xl sm:text-3xl mb-2"
                  >
                    Taller y Coches
                  </h3>
                  <p className="text-[var(--color-azul-200)] text-sm font-medium">
                    Mecánica multimarca · Compra-Venta · Garantía
                  </p>
                </div>
              </div>

              {/* Cuerpo */}
              <div className="px-8 pt-8 pb-7 flex flex-col flex-1">
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5">
                  Taller mecánico con más de {SITE_CONFIG.experience} años de experiencia.
                  Reparamos cualquier marca y también tenemos coches de segunda mano revisados.
                </p>

                <ul className="space-y-2 mb-6">
                  {[
                    "Mecánica general y rápida",
                    "Diagnóstico electrónico",
                    "Coches revisados con garantía",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                      <CheckCircle2 size={14} className="text-[var(--color-azul-600)] shrink-0" />
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
                  <div className="flex items-center gap-1 text-[var(--color-azul-700)] font-semibold text-sm group-hover:gap-2 transition-all">
                    Ver más <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── COCHES QUICK LINK ────────────────────── */}
      <div className="bg-[var(--color-azul-50)] border-y border-[var(--color-azul-100)]">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-azul-100)] flex items-center justify-center shrink-0">
                <Car size={17} className="text-[var(--color-azul-700)]" />
              </div>
              <p className="text-sm font-semibold text-[var(--color-azul-900)]">
                ¿Buscas coche? Tenemos vehículos revisados y con garantía en Valladolid.
              </p>
            </div>
            <Link
              href="/coches-segunda-mano"
              className="btn btn-azul text-[0.8rem] py-2 px-4 shrink-0"
            >
              Ver catálogo
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── CONFIANZA / STATS ────────────────────── */}
      <section className="section-padding-sm bg-[var(--color-surface-raised)] border-b border-[var(--color-border-light)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {confianzaItems.map(({ value, label, icon: Icon, color }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-2 py-4"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 ${
                    color === "verde"
                      ? "bg-[var(--color-verde-100)]"
                      : color === "azul"
                      ? "bg-[var(--color-azul-100)]"
                      : color === "ambar"
                      ? "bg-[var(--color-ambar-100)]"
                      : "bg-[var(--color-stone-100)]"
                  }`}
                >
                  <Icon
                    size={18}
                    className={
                      color === "verde"
                        ? "text-[var(--color-verde-700)]"
                        : color === "azul"
                        ? "text-[var(--color-azul-700)]"
                        : color === "ambar"
                        ? "text-[var(--color-ambar-500)]"
                        : "text-[var(--color-stone-600)]"
                    }
                  />
                </div>
                <p className="stat-value text-[1.8rem]">{value}</p>
                <p className="stat-label text-center">{label}</p>
              </div>
            ))}
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
                traemos hasta Valladolid los mejores espárragos de Tudela de Duero, frescos y de temporada.
                Por otro, mantenemos y reparamos coches con honestidad y sin sorpresas.
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
                Dos negocios muy distintos, pero con la misma filosofía: trabajo bien hecho,
                precio justo y trato cercano.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/esparragos-valladolid" className="btn btn-verde">
                  <Leaf size={15} />
                  Espárragos
                </Link>
                <Link href="/taller-coches-valladolid" className="btn btn-outline-azul">
                  <Wrench size={15} />
                  Taller
                </Link>
              </div>
            </div>

            {/* Imagen + Tarjetas de ubicación */}
            <div className="space-y-4">
              <div className="rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border-light)] shadow-[var(--shadow-sm)]">
                <img
                  src={IMAGES.home.familia}
                  alt="El equipo de Don Remondo"
                  className="w-full h-auto"
                />
              </div>
              {[
                {
                  label: "Espárragos · Valladolid",
                  address: ESPARRAGOS_CONFIG.address,
                  horario: ESPARRAGOS_CONFIG.horario,
                  extra: "Temporada: " + ESPARRAGOS_CONFIG.temporada,
                  color: "verde",
                  icon: Leaf,
                },
                {
                  label: "Espárragos · Remondo (Segovia)",
                  address: ESPARRAGOS_REMONDO_CONFIG.address,
                  horario: ESPARRAGOS_REMONDO_CONFIG.horario,
                  extra: "Temporada: " + ESPARRAGOS_REMONDO_CONFIG.temporada,
                  color: "verde",
                  icon: Leaf,
                },
                {
                  label: "Taller Mecánico · Valladolid",
                  address: TALLER_CONFIG.address,
                  horario: TALLER_CONFIG.horario,
                  color: "azul",
                  icon: Wrench,
                },
              ].map((loc) => (
                <div
                  key={loc.label}
                  className={`flex items-start gap-4 p-4 rounded-[var(--radius-lg)] border ${
                    loc.color === "verde"
                      ? "border-[var(--color-verde-200)] bg-[var(--color-verde-50)]"
                      : "border-[var(--color-azul-200)] bg-[var(--color-azul-50)]"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 mt-0.5 ${
                      loc.color === "verde"
                        ? "bg-[var(--color-verde-100)]"
                        : "bg-[var(--color-azul-100)]"
                    }`}
                  >
                    <loc.icon
                      size={16}
                      className={
                        loc.color === "verde"
                          ? "text-[var(--color-verde-700)]"
                          : "text-[var(--color-azul-700)]"
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold mb-0.5 ${
                        loc.color === "verde"
                          ? "text-[var(--color-verde-800)]"
                          : "text-[var(--color-azul-800)]"
                      }`}
                    >
                      {loc.label}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {loc.address}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {loc.horario}
                    </p>
                    {loc.extra && (
                      <p className="text-xs text-[var(--color-text-muted)]">{loc.extra}</p>
                    )}
                  </div>
                </div>
              ))}
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
