import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Leaf, Wrench } from "lucide-react";
import { SITE_CONFIG, ESPARRAGOS_CONFIG, TALLER_CONFIG } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Columna empresa */}
          <div>
            <h3 className="text-white text-xl font-bold mb-2">{SITE_CONFIG.name}</h3>
            <p className="text-sm text-gray-400 mb-4">
              Negocio familiar en Valladolid con más de {SITE_CONFIG.experience} años de experiencia.
              Espárragos frescos y taller mecánico de confianza.
            </p>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-green-400 transition-colors"
            >
              <Phone size={16} />
              {SITE_CONFIG.phone}
            </a>
          </div>

          {/* Espárragos */}
          <div>
            <h4 className="flex items-center gap-2 text-white font-semibold mb-4">
              <Leaf size={16} className="text-green-400" />
              Espárragos
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-green-400 mt-0.5 shrink-0" />
                <span>{ESPARRAGOS_CONFIG.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-green-400 mt-0.5 shrink-0" />
                <span>{ESPARRAGOS_CONFIG.horario}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-green-400 mt-0.5 shrink-0" />
                <a href={`mailto:${ESPARRAGOS_CONFIG.email}`} className="hover:text-white transition-colors">
                  {ESPARRAGOS_CONFIG.email}
                </a>
              </li>
            </ul>
            <Link
              href="/esparragos-valladolid"
              className="inline-block mt-4 text-sm text-green-400 hover:text-green-300 transition-colors font-medium"
            >
              Ver espárragos →
            </Link>
          </div>

          {/* Taller */}
          <div>
            <h4 className="flex items-center gap-2 text-white font-semibold mb-4">
              <Wrench size={16} className="text-blue-400" />
              Taller y Coches
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <span>{TALLER_CONFIG.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <span>{TALLER_CONFIG.horario}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <a href={`mailto:${TALLER_CONFIG.email}`} className="hover:text-white transition-colors">
                  {TALLER_CONFIG.email}
                </a>
              </li>
            </ul>
            <Link
              href="/taller-coches-valladolid"
              className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Ver taller y coches →
            </Link>
          </div>
        </div>

        {/* Nav links */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
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
