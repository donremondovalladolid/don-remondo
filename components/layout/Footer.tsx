import Link from "next/link";
import { Phone, Mail, MapPin, Leaf, Wrench, Car, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG, ESPARRAGOS_CONFIG, TALLER_CONFIG } from "@/lib/config";

const footerLinks = {
  esparragos: [
    { href: "/esparragos-valladolid", label: "Sobre los espárragos" },
    { href: "/contacto?asunto=esparragos", label: "Pedir espárragos" },
  ],
  taller: [
    { href: "/taller-coches-valladolid", label: "Servicios del taller" },
    { href: "/coches-segunda-mano", label: "Coches en venta" },
    { href: "/contacto?asunto=taller", label: "Pedir presupuesto" },
  ],
  empresa: [
    { href: "/", label: "Inicio" },
    { href: "/contacto", label: "Contacto" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--color-stone-800)] text-[var(--color-stone-300)]">

      {/* CTA strip */}
      <div className="border-b border-[var(--color-stone-700)]">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-white text-lg font-display"
          >
            ¿Tienes alguna pregunta?
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="btn btn-white text-[0.8rem] py-2 px-4"
            >
              <Phone size={14} className="text-[var(--color-verde-600)]" />
              {SITE_CONFIG.phone}
            </a>
            <Link
              href="/contacto"
              className="btn btn-ghost-white text-[0.8rem] py-2 px-4"
            >
              Escribir mensaje
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Cuerpo principal */}
      <div className="container py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">

        {/* Marca */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
            <div className="w-8 h-8 rounded-[8px] bg-[var(--color-stone-700)] flex items-center justify-center shrink-0">
              <span
                className="text-[var(--color-ambar-200)] font-bold text-sm leading-none font-display"
              >
                DR
              </span>
            </div>
            <span
              className="text-white text-[1rem] font-display"
            >
              Don Remondo
            </span>
          </Link>
          <p className="text-sm text-[var(--color-stone-400)] leading-relaxed mb-4 max-w-[220px]">
            Negocio familiar en Valladolid desde {SITE_CONFIG.founded}. Espárragos frescos y taller mecánico de confianza.
          </p>
          <div className="space-y-1.5 text-xs text-[var(--color-stone-400)]">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail size={12} className="text-[var(--color-stone-500)] shrink-0" />
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>

        {/* Espárragos */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-[var(--color-verde-800)] flex items-center justify-center">
              <Leaf size={11} className="text-[var(--color-verde-300)]" />
            </div>
            <h3 className="text-white text-sm font-semibold tracking-wide uppercase" style={{ fontFamily: "var(--font-sans)" }}>
              Espárragos
            </h3>
          </div>
          <ul className="space-y-2.5 mb-4">
            {footerLinks.esparragos.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-[var(--color-stone-400)] hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-xs text-[var(--color-stone-500)] space-y-1">
            <div className="flex items-start gap-1.5">
              <MapPin size={11} className="mt-0.5 shrink-0" />
              <span>{ESPARRAGOS_CONFIG.addressShort}, Valladolid</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="w-[11px] shrink-0" />
              <span>Temporada: {ESPARRAGOS_CONFIG.temporada}</span>
            </div>
          </div>
        </div>

        {/* Taller */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-[var(--color-azul-900)] flex items-center justify-center">
              <Wrench size={11} className="text-[var(--color-azul-300)]" />
            </div>
            <h3 className="text-white text-sm font-semibold tracking-wide uppercase" style={{ fontFamily: "var(--font-sans)" }}>
              Taller y Coches
            </h3>
          </div>
          <ul className="space-y-2.5 mb-4">
            {footerLinks.taller.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-[var(--color-stone-400)] hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-xs text-[var(--color-stone-500)] space-y-1">
            <div className="flex items-start gap-1.5">
              <MapPin size={11} className="mt-0.5 shrink-0" />
              <span>{TALLER_CONFIG.addressShort}, Valladolid</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="w-[11px] shrink-0" />
              <span>Lun–Vie: 09–13h / 16–20h</span>
            </div>
          </div>
        </div>

        {/* Contacto directo */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-[var(--color-stone-700)] flex items-center justify-center">
              <Phone size={11} className="text-[var(--color-stone-300)]" />
            </div>
            <h3 className="text-white text-sm font-semibold tracking-wide uppercase" style={{ fontFamily: "var(--font-sans)" }}>
              Contacto
            </h3>
          </div>
          <ul className="space-y-2.5 mb-4">
            {footerLinks.empresa.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-[var(--color-stone-400)] hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="inline-flex items-center gap-2 bg-[var(--color-stone-700)] hover:bg-[var(--color-stone-600)] text-white text-sm font-semibold px-3.5 py-2.5 rounded-[var(--radius-md)] transition-colors"
          >
            <Phone size={13} className="text-[var(--color-ambar-400)]" />
            {SITE_CONFIG.phone}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-stone-700)]">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--color-stone-500)]">
            © {new Date().getFullYear()} {SITE_CONFIG.name} · Todos los derechos reservados
          </p>
          <p className="text-xs text-[var(--color-stone-600)]">
            Valladolid · Castilla y León · España
          </p>
        </div>
      </div>
    </footer>
  );
}
