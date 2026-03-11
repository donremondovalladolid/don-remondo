"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

type CocheFormData = {
  id?: number;
  marca: string;
  modelo: string;
  anio: string;
  km: string;
  precio: string;
  combustible: string;
  cambio: string;
  color: string;
  puertas: string;
  descripcion: string;
  fotos: string[];
  vendido: boolean;
  destacado: boolean;
};

const defaultValues: CocheFormData = {
  marca: "",
  modelo: "",
  anio: String(new Date().getFullYear()),
  km: "",
  precio: "",
  combustible: "Gasolina",
  cambio: "Manual",
  color: "",
  puertas: "5",
  descripcion: "",
  fotos: [],
  vendido: false,
  destacado: false,
};

export default function CocheForm({ initialData }: { initialData?: Partial<CocheFormData> & { id?: number } }) {
  const router = useRouter();
  const [data, setData] = useState<CocheFormData>({ ...defaultValues, ...initialData });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!initialData?.id;

  function set(key: keyof CocheFormData, value: string | boolean | string[]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isEdit ? `/api/admin/coches/${initialData!.id}` : "/api/admin/coches";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError("Error al guardar. Comprueba los datos e inténtalo de nuevo.");
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("¿Eliminar este coche definitivamente?")) return;
    await fetch(`/api/admin/coches/${initialData!.id}`, { method: "DELETE" });
    router.push("/admin/dashboard");
    router.refresh();
  }

  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="text-gray-400 hover:text-gray-700">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-lg font-bold text-gray-900">
              {isEdit ? "Editar coche" : "Añadir coche"}
            </h1>
          </div>
          {isEdit && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg"
            >
              <Trash2 size={14} />
              Eliminar
            </button>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
          {/* Datos básicos */}
          <div>
            <h2 className="font-bold text-gray-900 mb-4">Datos del vehículo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Marca *</label>
                <input
                  className={inputClass}
                  value={data.marca}
                  onChange={(e) => set("marca", e.target.value)}
                  placeholder="Ej: Volkswagen"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Modelo *</label>
                <input
                  className={inputClass}
                  value={data.modelo}
                  onChange={(e) => set("modelo", e.target.value)}
                  placeholder="Ej: Golf"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Año *</label>
                <input
                  className={inputClass}
                  type="number"
                  min="1990"
                  max="2030"
                  value={data.anio}
                  onChange={(e) => set("anio", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Kilómetros *</label>
                <input
                  className={inputClass}
                  type="number"
                  min="0"
                  value={data.km}
                  onChange={(e) => set("km", e.target.value)}
                  placeholder="Ej: 85000"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Precio (€) *</label>
                <input
                  className={inputClass}
                  type="number"
                  min="0"
                  value={data.precio}
                  onChange={(e) => set("precio", e.target.value)}
                  placeholder="Ej: 9500"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Color</label>
                <input
                  className={inputClass}
                  value={data.color}
                  onChange={(e) => set("color", e.target.value)}
                  placeholder="Ej: Blanco"
                />
              </div>
              <div>
                <label className={labelClass}>Combustible *</label>
                <select
                  className={inputClass}
                  value={data.combustible}
                  onChange={(e) => set("combustible", e.target.value)}
                  required
                >
                  <option>Gasolina</option>
                  <option>Diésel</option>
                  <option>Híbrido</option>
                  <option>Eléctrico</option>
                  <option>GLP</option>
                  <option>Gas Natural</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Cambio</label>
                <select
                  className={inputClass}
                  value={data.cambio}
                  onChange={(e) => set("cambio", e.target.value)}
                >
                  <option>Manual</option>
                  <option>Automático</option>
                  <option>Semiautomático</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Puertas</label>
                <select
                  className={inputClass}
                  value={data.puertas}
                  onChange={(e) => set("puertas", e.target.value)}
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className={labelClass}>Descripción</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={4}
              value={data.descripcion}
              onChange={(e) => set("descripcion", e.target.value)}
              placeholder="Descripción detallada del vehículo, equipamiento, estado, etc."
            />
          </div>

          {/* Fotos — URLs */}
          <div>
            <label className={labelClass}>URLs de fotos (una por línea)</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              value={data.fotos.join("\n")}
              onChange={(e) =>
                set(
                  "fotos",
                  e.target.value
                    .split("\n")
                    .map((u) => u.trim())
                    .filter(Boolean)
                )
              }
              placeholder="https://ejemplo.com/foto1.jpg&#10;https://ejemplo.com/foto2.jpg"
            />
            <p className="text-xs text-gray-400 mt-1">
              Sube las fotos a Cloudinary, Google Drive o cualquier servicio y pega las URLs aquí.
            </p>
          </div>

          {/* Estado */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.vendido}
                onChange={(e) => set("vendido", e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm text-gray-700">Marcar como vendido</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.destacado}
                onChange={(e) => set("destacado", e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm text-gray-700">Destacar en portada</span>
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            <Save size={16} />
            {loading ? "Guardando..." : isEdit ? "Guardar cambios" : "Añadir coche"}
          </button>
        </form>
      </div>
    </div>
  );
}
