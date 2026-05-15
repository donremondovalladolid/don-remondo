"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Trash2, Upload, X, Link2, ImagePlus } from "lucide-react";
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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = !!initialData?.id;

  function set(key: keyof CocheFormData, value: string | boolean | string[]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  // ── Upload de ficheros al servidor ──
  async function uploadFiles(files: FileList | File[]) {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (fileArray.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      fileArray.forEach((f) => formData.append("files", f));

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Error en el servidor");

      const { urls } = await res.json() as { urls: string[] };
      set("fotos", [...data.fotos, ...urls]);
    } catch {
      setError("Error al subir las fotos. Comprueba que son imágenes válidas.");
    } finally {
      setUploading(false);
    }
  }

  // ── Drag & drop handlers ──
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setDragging(false), []);

  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      await uploadFiles(e.dataTransfer.files);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.fotos]);

  // ── Añadir por URL ──
  function addUrl() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    set("fotos", [...data.fotos, trimmed]);
    setUrlInput("");
  }

  // ── Eliminar foto ──
  function removePhoto(index: number) {
    set("fotos", data.fotos.filter((_, i) => i !== index));
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
              className="cursor-pointer flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg"
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

          {/* ── FOTOS ── */}
          <div>
            <h2 className="font-bold text-gray-900 mb-3">Fotos</h2>

            {/* Zona de drop / selección */}
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors ${
                dragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-400 hover:bg-gray-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && uploadFiles(e.target.files)}
              />
              {uploading ? (
                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Subiendo fotos...
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <ImagePlus size={22} className="text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Arrastra fotos aquí o <span className="text-blue-600 underline">selecciona archivos</span>
                  </p>
                  <p className="text-xs text-gray-400">JPG, PNG, WEBP · Varias a la vez</p>
                </>
              )}
            </div>

            {/* Añadir por URL */}
            <div className="mt-3 flex gap-2">
              <div className="relative flex-1">
                <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className={`${inputClass} pl-8`}
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
                  placeholder="O pega una URL de imagen externa..."
                />
              </div>
              <button
                type="button"
                onClick={addUrl}
                disabled={!urlInput.trim()}
                className="cursor-pointer flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded-xl transition-colors"
              >
                <Upload size={14} />
                Añadir
              </button>
            </div>

            {/* Previsualizaciones */}
            {data.fotos.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {data.fotos.map((foto, i) => (
                  <div key={i} className="relative group aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={foto}
                      alt={`Foto ${i + 1}`}
                      className="w-full h-full object-cover rounded-xl border border-gray-200"
                    />
                    {/* Badge de posición */}
                    {i === 0 && (
                      <span className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                        Principal
                      </span>
                    )}
                    {/* Botón borrar */}
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="cursor-pointer absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      aria-label="Eliminar foto"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {data.fotos.length === 0 && (
              <p className="mt-2 text-xs text-gray-400 text-center">
                La primera foto será la imagen principal del coche.
              </p>
            )}
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
            disabled={loading || uploading}
            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            <Save size={16} />
            {loading ? "Guardando..." : isEdit ? "Guardar cambios" : "Añadir coche"}
          </button>
        </form>
      </div>
    </div>
  );
}
