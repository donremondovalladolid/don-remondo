"use client";

import { useState, useEffect } from "react";
import { Loader2, Image as ImageIcon, Upload, Check } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";
import { IMAGES } from "@/lib/config";

export default function ImagenesAdminPage() {
  const [dynamicImages, setDynamicImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/config?type=image");
        const data = await res.json();
        const overrides: Record<string, string> = {};
        data.forEach((item: any) => {
          overrides[item.key] = item.value;
        });
        setDynamicImages(overrides);
      } catch (error) {
        console.error("Error loading image configs", error);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  const handleFileUpload = async (key: string, file: File) => {
    setUploadingKey(key);
    try {
      // 1. Upload file
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { url } = await uploadRes.json();

      // 2. Update config
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

  const categories = [
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
      items: Object.entries(IMAGES.esparragos).filter(([k]) => k !== "hero" && k !== "origen").map(([k, v]) => ({
        id: `esparragos.${k}`,
        label: k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
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

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Gestión de Imágenes</h1>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-sm text-gray-600 mb-8">
          Personaliza las imágenes de productos y galerías de la web. Haz clic en cualquier imagen para subir una nueva. Las imágenes de cabecera no son editables desde aquí para mantener la estructura visual.
        </p>

        <div className="space-y-10">
          {categories.map((category) => (
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
      </div>
    </div>
  );
}
