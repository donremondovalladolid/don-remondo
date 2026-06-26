"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Eye, EyeOff } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";
import {
  PRODUCTOS_TODO_EL_ANO,
  PRODUCTOS_TEMPORADA,
  ESPARRAGOS_BLANCO_CATEGORIAS,
  ESPARRAGOS_TRIGUERO_VARIEDADES,
} from "@/lib/config";

export default function CatalogoAdminPage() {
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Helper to generate a normalized key from a product name
  const getKey = (nombre: string) => {
    return nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');
  };

  const allProducts = [
    ...PRODUCTOS_TODO_EL_ANO,
    ...PRODUCTOS_TEMPORADA,
    ...ESPARRAGOS_BLANCO_CATEGORIAS,
    ...ESPARRAGOS_TRIGUERO_VARIEDADES,
  ];

  useEffect(() => {
    async function fetchVisibility() {
      try {
        const res = await fetch("/api/config?type=product_visibility");
        const data = await res.json();
        
        // Default everything to visible (true)
        const initialMap: Record<string, boolean> = {};
        allProducts.forEach(p => {
          initialMap[getKey(p.nombre)] = true;
        });

        // Apply overrides
        data.forEach((item: any) => {
          if (initialMap[item.key] !== undefined) {
            initialMap[item.key] = item.value === "true";
          }
        });

        setVisibilityMap(initialMap);
      } catch (error) {
        console.error("Error loading product visibility", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVisibility();
  }, []);

  const toggleVisibility = (key: string) => {
    if (!visibilityMap) return;
    setVisibilityMap({
      ...visibilityMap,
      [key]: !visibilityMap[key]
    });
  };

  const saveAll = async () => {
    if (!visibilityMap) return;
    setSaving(true);
    try {
      const promises = Object.entries(visibilityMap).map(([key, visible]) => {
        return fetch("/api/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key,
            value: visible ? "true" : "false",
            type: "product_visibility",
          }),
        });
      });
      await Promise.all(promises);
      alert("Catálogo guardado correctamente");
    } catch (error) {
      console.error("Error saving catalog", error);
      alert("Hubo un error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !visibilityMap) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  const sections = [
    { title: "Espárrago Blanco", products: ESPARRAGOS_BLANCO_CATEGORIAS },
    { title: "Espárrago Triguero", products: ESPARRAGOS_TRIGUERO_VARIEDADES },
    { title: "Todo el año", products: PRODUCTOS_TODO_EL_ANO },
    { title: "Temporada", products: PRODUCTOS_TEMPORADA },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Catálogo de Productos</h1>
          <p className="text-gray-500">Muestra u oculta los productos en la web pública.</p>
        </div>
        <div className="flex items-center gap-4">
          <LogoutButton />
          <button
            onClick={saveAll}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Guardar Todo
          </button>
        </div>
      </div>

      <div className="space-y-10 pb-20">
        {sections.map((sec) => (
          <div key={sec.title} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">{sec.title}</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {sec.products.map(p => {
                const key = getKey(p.nombre);
                const isVisible = visibilityMap[key];
                return (
                  <div key={p.nombre} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{p.nombre}</p>
                    </div>
                    <button
                      onClick={() => toggleVisibility(key)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        isVisible 
                          ? "bg-green-100 text-green-700 hover:bg-green-200" 
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {isVisible ? (
                        <><Eye size={16} /> Visible</>
                      ) : (
                        <><EyeOff size={16} /> Oculto</>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
