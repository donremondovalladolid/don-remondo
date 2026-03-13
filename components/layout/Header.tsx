"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Leaf, Wrench } from "lucide-react";

const navLinks = [
  { href: "/esparragos-valladolid", label: "Espárragos", icon: Leaf, color: "text-green-700" },
  { href: "/taller-coches-valladolid", label: "Taller y Coches", icon: Wrench, color: "text-blue-700" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Don Remondo
              </span>
              <span className="text-[11px] text-gray-500 font-medium tracking-wide uppercase hidden sm:block">
                Espárragos · Taller · Coches
              </span>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                {link.icon && <link.icon size={15} className={link.color} />}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contacto + hamburguesa */}
          <div className="flex items-center gap-2">
            <Link
              href="/contacto"
              className="hidden sm:flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
            >
              Contacto
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
              aria-label="Menú"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {link.icon && <link.icon size={16} className={link.color} />}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
