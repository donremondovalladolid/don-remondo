import Link from "next/link";
import { Home, Leaf, Wrench, Car, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[var(--color-bg)] min-h-[70vh] flex items-center">
      <div className="container py-16 text-center">

        {/* Número decorativo */}
        <p
          className="font-display leading-none text-[var(--color-stone-200)] select-none mb-6"
          style={{ fontSize: "clamp(6rem, 20vw, 12rem)" }}
        >
          404
        </p>

        <h1 className="text-3xl sm:text-4xl text-[var(--color-stone-900)] mb-3">
          Página no encontrada
        </h1>
        <p className="text-[var(--color-text-secondary)] max-w-md mx-auto mb-10 leading-relaxed">
          La dirección que buscas no existe o ha cambiado. Puedes volver al inicio
          o ir directamente a lo que necesitas.
        </p>

        {/* Links de recuperación */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link href="/" className="btn btn-azul btn-lg">
            <Home size={17} />
            Volver al inicio
          </Link>
          <Link href="/contacto" className="btn btn-outline-azul btn-lg">
            Contactar
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Accesos directos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
          {[
            {
              href: "/esparragos-valladolid",
              icon: Leaf,
              label: "Espárragos",
              accent: "verde",
            },
            {
              href: "/taller-coches-valladolid",
              icon: Wrench,
              label: "Taller",
              accent: "azul",
            },
            {
              href: "/coches-segunda-mano",
              icon: Car,
              label: "Coches",
              accent: "azul",
            },
          ].map(({ href, icon: Icon, label, accent }) => (
            <Link
              key={href}
              href={href}
              className="card p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 ${
                  accent === "verde"
                    ? "bg-[var(--color-verde-100)]"
                    : "bg-[var(--color-azul-100)]"
                }`}
              >
                <Icon
                  size={16}
                  className={
                    accent === "verde"
                      ? "text-[var(--color-verde-700)]"
                      : "text-[var(--color-azul-700)]"
                  }
                />
              </div>
              <span className="text-sm font-semibold text-[var(--color-text)]">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
