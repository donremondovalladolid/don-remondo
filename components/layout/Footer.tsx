import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Leaf, Wrench } from "lucide-react";
import { SITE_CONFIG, ESPARRAGOS_CONFIG, TALLER_CONFIG, IMAGES } from "@/lib/config";

const footerLinks = {
  productos: [
    { href: "/esparragos-valladolid", label: "Nuestros productos" },
    { href: "/contacto?asunto=productos", label: "Pedir productos" },
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

      {/* Cuerpo principal */}
      <div className="container py-10 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-8 lg:gap-10">

        {/* Marca */}
        <div className="lg:max-w-[260px]">
          <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
            <div className="relative h-8 w-[76px] shrink-0 bg-white rounded-md overflow-hidden">
              <Image
                src={IMAGES.logo}
                alt="Don Remondo Logo"
                fill
                className="object-contain"
                sizes="76px"
              />
            </div>
            <span
              className="text-white text-[1rem] font-display"
            >
              Don Remondo
            </span>
          </Link>
          <p className="text-sm text-[var(--color-stone-400)] leading-relaxed mb-4">
            Negocio familiar en Valladolid desde {SITE_CONFIG.founded}. Productos frescos y taller mecánico de confianza.
          </p>
        </div>

        {/* Productos */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-white text-sm font-semibold tracking-wide uppercase font-sans">
              Productos
            </h3>
          </div>
          <ul className="space-y-2.5 mb-4">
            {footerLinks.productos.map((l) => (
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
              <span>Espárragos: {ESPARRAGOS_CONFIG.temporada}</span>
            </div>
          </div>
        </div>

        {/* Taller */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-white text-sm font-semibold tracking-wide uppercase font-sans">
              Taller y Venta de Coches
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
            <h3 className="text-white text-sm font-semibold tracking-wide uppercase font-sans">
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
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-stone-700)]">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--color-stone-500)]">
            © {new Date().getFullYear()} {SITE_CONFIG.name} · Todos los derechos reservados
          </p>
          <p className="text-xs text-[var(--color-stone-400)]">
            Valladolid · Castilla y León · España
          </p>
        </div>
      </div>
    </footer>
  );
}
