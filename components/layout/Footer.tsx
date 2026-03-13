import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <Link href="/esparragos-valladolid" className="hover:text-white transition-colors">Espárragos</Link>
            <Link href="/taller-coches-valladolid" className="hover:text-white transition-colors">Taller</Link>
            <Link href="/coches-segunda-mano" className="hover:text-white transition-colors">Coches en venta</Link>
            <Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link>
          </nav>
          <p className="text-xs text-gray-600 text-center">
            © {new Date().getFullYear()} {SITE_CONFIG.name} · Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
