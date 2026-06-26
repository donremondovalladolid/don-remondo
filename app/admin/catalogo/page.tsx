"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Eye, EyeOff, Image as ImageIcon, Upload, Check } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";
import {
  PRODUCTOS_TODO_EL_ANO,
  PRODUCTOS_TEMPORADA,
  ESPARRAGOS_BLANCO_CATEGORIAS,
  ESPARRAGOS_TRIGUERO_VARIEDADES,
  IMAGES,
} from "@/lib/config";

export default function CatalogoAdminPage() {
  const [activeTab, setActiveTab] = useState<"visibilidad" | "imagenes">("visibilidad");

  // State for Visibility
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean> | null>(null);
  const [savingVis, setSavingVis] = useState(false);

  // State for Images
  const [dynamicImages, setDynamicImages] = useState<Record<string, string>>({});
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

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
    async function fetchData() {
      try {
        const [visRes, imgRes] = await Promise.all([
          fetch("/api/config?type=product_visibility"),
          fetch("/api/config?type=image")
        ]);

        const visData = await visRes.json();
        const imgData = await imgRes.json();
        
        // Visibility
        const initialMap: Record<string, boolean> = {};
        allProducts.forEach(p => { initialMap[getKey(p.nombre)] = true; });
        visData.forEach((item: any) => {
          if (initialMap[item.key] !== undefined) {
            initialMap[item.key] = item.value === "true";
          }
        });
        setVisibilityMap(initialMap);

        // Images
        const overrides: Record<string, string> = {};
        imgData.forEach((item: any) => {
          overrides[item.key] = item.value;
        });
        setDynamicImages(overrides);
      } catch (error) {
        console.error("Error loading config", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleVisibility = (key: string) => {
    if (!visibilityMap) return;
    setVisibilityMap({
      ...visibilityMap,
      [key]: !visibilityMap[key]
    });
  };

  const saveVisibility = async () => {
    if (!visibilityMap) return;
    setSavingVis(true);
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
      alert("Visibilidad del catálogo guardada correctamente");
    } catch (error) {
      console.error("Error saving catalog", error);
      alert("Hubo un error al guardar");
    } finally {
      setSavingVis(false);
    }
  };

  const handleFileUpload = async (key: string, file: File) => {
    setUploadingKey(key);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { url } = await uploadRes.json();

      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: url, type: "image" }),
      });

      setDynamicImages(prev => ({ ...prev, [key]: url }));
    } catch (error) {
      console.error("Error updating image", error);
      alert("Error al subir la imagen");
    } finally {
      setUploadingKey(null);
    }
  };

  const productSections = [
    { title: "Espárrago Blanco", products: ESPARRAGOS_BLANCO_CATEGORIAS },
    { title: "Espárrago Triguero", products: ESPARRAGOS_TRIGUERO_VARIEDADES },
    { title: "Todo el año", products: PRODUCTOS_TODO_EL_ANO },
    { title: "Temporada", products: PRODUCTOS_TEMPORADA },
  ];

  const imageCategories = [
    {
      title: "Productos",
      prefix: "productos",
      items: Object.entries(IMAGES.productos).filter(([k]) => k !== "galeria").map(([k, v]) => ({
        id: `productos.${k}`,
        label: k.charAt(0).toUpperCase() + k.slice(1),
        defaultUrl: v as string,
      })),
    },
    {
      title: "Galería de Productos",
      prefix: "productos.galeria",
      items: IMAGES.productos.galeria.map((v, i) => ({
        id: `productos.galeria.${i}`,
        label: `Imagen Galería ${i + 1}`,
        defaultUrl: v,
      })),
    },
    {
      title: "Espárragos",
      prefix: "esparragos",
      items: Object.entries(IMAGES.esparragos).filter(([k]) => !["hero", "origen", "trigueroGrueso", "envasados", "blanco", "triguero"].includes(k)).map(([k, v]) => ({
        id: `esparragos.${k}`,
        label: k === "trigueroFino" ? "Trigueros" : k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        defaultUrl: v as string,
      })),
    },
    {
      title: "Taller (Galería)",
      prefix: "taller",
      items: Object.entries(IMAGES.taller).filter(([k]) => k !== "hero").map(([k, v]) => ({
        id: `taller.${k}`,
        label: k.charAt(0).toUpperCase() + k.slice(1),
        defaultUrl: v as string,
      })),
    },
  ];

  if (loading || !visibilityMap) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Catálogo e Imágenes</h1>
          <p className="text-gray-500">Gestiona la visibilidad de los productos y sus fotos.</p>
        </div>
        <div className="flex items-center gap-4">
          <LogoutButton />
        </div>
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-sm">
        <button
          onClick={() => setActiveTab("visibilidad")}
          className={`flex-1 flex justify-center items-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "visibilidad" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Eye size={16} />
          Visibilidad
        </button>
        <button
          onClick={() => setActiveTab("imagenes")}
          className={`flex-1 flex justify-center items-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "imagenes" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <ImageIcon size={16} />
          Imágenes
        </button>
      </div>

      {activeTab === "visibilidad" && (
        <div className="space-y-10 pb-20">
          <div className="flex justify-end mb-4">
            <button
              onClick={saveVisibility}
              disabled={savingVis}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {savingVis ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Guardar Visibilidad
            </button>
          </div>
          {productSections.map((sec) => (
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
      )}

      {activeTab === "imagenes" && (
        <div className="space-y-10 pb-20">
          <p className="text-sm text-gray-600 mb-6 bg-blue-50 border border-blue-100 p-4 rounded-lg">
            Haz clic en cualquier imagen para subir una nueva foto que reemplazará a la actual en la web.
          </p>
          {imageCategories.map((category) => (
            <div key={category.prefix}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {category.title}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {category.items.map((item) => {
                  const currentUrl = dynamicImages[item.id] || item.defaultUrl;
                  const isUploading = uploadingKey === item.id;
                  const isCustom = !!dynamicImages[item.id];

                  return (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer">
                        <img 
                          src={currentUrl} 
                          alt={item.label} 
                          className={`w-full h-full object-cover transition-opacity ${isUploading ? 'opacity-50' : 'group-hover:opacity-70'}`} 
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                          <Upload className="text-white drop-shadow-md" size={24} />
                        </div>
                        {isCustom && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-sm">
                            <Check size={12} />
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          disabled={isUploading}
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(item.id, e.target.files[0]);
                            }
                          }}
                        />
                        {isUploading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Loader2 className="animate-spin text-white" size={24} />
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-medium text-center mt-3 text-gray-700 truncate px-1" title={item.label}>
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
