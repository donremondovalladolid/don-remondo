"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Leaf, Wrench, Car, MessageSquare } from "lucide-react";
import { SITE_CONFIG, IMAGES } from "@/lib/config";

const navLinks = [
  {
    href: "/esparragos-valladolid",
    label: "Productos",
    icon: Leaf,
    accent: "verde",
    desc: "Frescos · Producción propia",
  },
  {
    href: "/taller-coches-valladolid",
    label: "Taller",
    icon: Wrench,
    accent: "verde",
    desc: "Mecánica · Valladolid",
  },
  {
    href: "/coches-segunda-mano",
    label: "Coches",
    icon: Car,
    accent: "verde",
    desc: "Segunda mano · Garantizados",
  },
  {
    href: "/contacto",
    label: "Contacto",
    icon: MessageSquare,
    accent: "verde",
    desc: "Escríbenos o llámanos",
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-[0_2px_20px_-4px_rgb(26_20_16/0.12)]"
          : "bg-white border-b border-[var(--color-border-light)]"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-[68px]">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group"
            aria-label="Don Remondo — Inicio"
          >
            {/* Emblema — logo rectangular */}
            <div className="relative h-9 w-[86px] shrink-0 rounded-xl overflow-hidden border border-[var(--color-stone-200)] bg-white transition-transform duration-200 group-hover:scale-105">
              <Image
                src={IMAGES.logo}
                alt="Don Remondo Logo"
                fill
                className="object-contain p-1"
                sizes="86px"
              />
            </div>
            <div className="flex flex-col leading-none gap-0.5">
              <span
                className="text-[1.1rem] font-normal text-[var(--color-text)] leading-none font-display"
              >
                Don Remondo
              </span>
              <span className="text-[0.65rem] text-[var(--color-text-muted)] font-semibold tracking-[0.08em] uppercase hidden sm:block">
                Productos · Taller · Coches
              </span>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--radius-md)] text-[0.875rem] font-semibold transition-all duration-200 ${
                    active
                      ? link.accent === "verde"
                        ? "text-[var(--color-verde-700)] bg-[var(--color-verde-50)]"
                        : link.accent === "azul"
                        ? "text-[var(--color-azul-700)] bg-[var(--color-azul-50)]"
                        : "text-[var(--color-stone-800)] bg-[var(--color-stone-100)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-stone-100)]"
                  }`}
                >
                  <link.icon
                    size={14}
                    className={`shrink-0 ${
                      active
                        ? link.accent === "verde"
                          ? "text-[var(--color-verde-600)]"
                          : link.accent === "azul"
                          ? "text-[var(--color-azul-600)]"
                          : "text-[var(--color-stone-700)]"
                        : "opacity-60"
                    }`}
                  />
                  {link.label}
                  {active && (
                    <span
                      className={`absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full ${
                        link.accent === "verde"
                          ? "bg-[var(--color-verde-500)]"
                          : link.accent === "azul"
                          ? "bg-[var(--color-azul-500)]"
                          : "bg-[var(--color-stone-500)]"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Hamburguesa (móvil) */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-stone-100)] transition-colors"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="border-t border-[var(--color-border-light)] bg-white">
          <nav className="container py-3 flex flex-col gap-1" aria-label="Menú móvil">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-3.5 rounded-[var(--radius-md)] transition-colors ${
                    active
                      ? link.accent === "verde"
                        ? "bg-[var(--color-verde-50)] text-[var(--color-verde-700)]"
                        : link.accent === "azul"
                        ? "bg-[var(--color-azul-50)] text-[var(--color-azul-700)]"
                        : "bg-[var(--color-stone-100)] text-[var(--color-stone-800)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-stone-100)]"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center shrink-0 ${
                      link.accent === "verde"
                        ? "bg-[var(--color-verde-100)]"
                        : link.accent === "azul"
                        ? "bg-[var(--color-azul-100)]"
                        : "bg-[var(--color-stone-100)]"
                    }`}
                  >
                    <link.icon
                      size={15}
                      className={
                        link.accent === "verde"
                          ? "text-[var(--color-verde-700)]"
                          : link.accent === "azul"
                          ? "text-[var(--color-azul-700)]"
                          : "text-[var(--color-stone-600)]"
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-none mb-0.5">{link.label}</p>
                    <p className="text-xs text-[var(--color-text-muted)] leading-none">{link.desc}</p>
                  </div>
                </Link>
              );
            })}

            {/* Divider + CTA móvil */}
            <div className="border-t border-[var(--color-border-light)] mt-2 pt-3 flex flex-col gap-2">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="btn btn-verde w-full justify-center"
              >
                <Phone size={15} />
                Llamar: {SITE_CONFIG.phone}
              </a>
              <Link
                href="/contacto"
                className="btn btn-outline-verde w-full justify-center"
              >
                Formulario de contacto
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
