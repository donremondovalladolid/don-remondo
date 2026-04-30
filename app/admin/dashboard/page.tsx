import Link from "next/link";
import { Car, Plus, CheckCircle2, Eye } from "lucide-react";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

type Coche = {
  id: number;
  slug: string;
  marca: string;
  modelo: string;
  anio: number;
  km: number;
  precio: number;
  combustible: string;
  cambio: string;
  color: string;
  puertas: number;
  descripcion: string;
  fotos: string;
  vendido: boolean;
  destacado: boolean;
  createdAt: Date;
  updatedAt: Date;
};


export default async function AdminDashboard() {
  const rawCoches = await prisma.coche.findMany({
    orderBy: [{ vendido: "asc" }, { createdAt: "desc" }],
  });
  const coches: Coche[] = rawCoches as Coche[];

  const disponibles = (coches as { vendido: boolean }[]).filter((c) => !c.vendido).length;
  const vendidos = (coches as { vendido: boolean }[]).filter((c) => c.vendido).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header admin */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Don Remondo · Admin</h1>
            <p className="text-xs text-gray-400">Panel de gestión de coches</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg"
            >
              <Eye size={14} />
              Ver web
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-gray-900">{coches.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total coches</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-blue-700">{disponibles}</p>
            <p className="text-sm text-gray-500 mt-1">Disponibles</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600">{vendidos}</p>
            <p className="text-sm text-gray-500 mt-1">Vendidos</p>
          </div>
        </div>

        {/* Botón añadir */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Catálogo de Coches</h2>
          <Link
            href="/admin/coches/new"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
          >
            <Plus size={16} />
            Añadir coche
          </Link>
        </div>

        {/* Tabla de coches */}
        {coches.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <Car size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">No hay coches en el catálogo todavía.</p>
            <Link
              href="/admin/coches/new"
              className="inline-flex items-center gap-2 mt-4 bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl text-sm hover:bg-blue-800 transition-colors"
            >
              <Plus size={15} />
              Añadir primer coche
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Vehículo</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Año</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Km</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Precio</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Estado</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {coches.map((coche) => (
                    <tr key={coche.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">
                          {coche.marca} {coche.modelo}
                        </div>
                        {coche.destacado && (
                          <span className="text-xs text-blue-600 font-medium">★ Destacado</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{coche.anio}</td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                        {coche.km.toLocaleString("es-ES")} km
                      </td>
                      <td className="px-4 py-3 font-semibold text-blue-700">
                        {coche.precio.toLocaleString("es-ES")} €
                      </td>
                      <td className="px-4 py-3">
                        {coche.vendido ? (
                          <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            <CheckCircle2 size={11} />
                            Vendido
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                            Disponible
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/coches/${coche.id}`}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
                          >
                            Editar
                          </Link>
                          <Link
                            href={`/coches-segunda-mano/${coche.slug}`}
                            target="_blank"
                            className="text-xs text-gray-400 hover:text-gray-600 font-medium hover:underline"
                          >
                            Ver
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
