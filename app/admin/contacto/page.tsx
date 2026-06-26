"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Phone, Mail, MessageSquare } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";
import { ESPARRAGOS_CONFIG, TALLER_CONFIG } from "@/lib/config";

export default function ContactoAdminPage() {
  const [contacts, setContacts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("/api/config?type=contact");
        const data = await res.json();
        
        const initialContacts = {
          esparragos: {
            phone: ESPARRAGOS_CONFIG.phone,
            phoneRaw: ESPARRAGOS_CONFIG.phoneRaw,
            email: ESPARRAGOS_CONFIG.email,
          },
          taller: {
            phone: TALLER_CONFIG.phone,
            phoneRaw: TALLER_CONFIG.phoneRaw,
            phoneFueraHorario: TALLER_CONFIG.phoneFueraHorario,
            phoneFueraHorarioRaw: TALLER_CONFIG.phoneFueraHorarioRaw,
            whatsapp: TALLER_CONFIG.whatsapp,
            whatsappRaw: TALLER_CONFIG.whatsappRaw,
            email: TALLER_CONFIG.email,
          }
        };

        // Apply overrides
        data.forEach((item: any) => {
          if (item.key.startsWith("esparragos.")) {
            const field = item.key.replace("esparragos.", "");
            if (initialContacts.esparragos[field as keyof typeof initialContacts.esparragos] !== undefined) {
              initialContacts.esparragos[field as keyof typeof initialContacts.esparragos] = item.value;
            }
          } else if (item.key.startsWith("taller.")) {
            const field = item.key.replace("taller.", "");
            if (initialContacts.taller[field as keyof typeof initialContacts.taller] !== undefined) {
              initialContacts.taller[field as keyof typeof initialContacts.taller] = item.value;
            }
          }
        });

        setContacts(initialContacts);
      } catch (error) {
        console.error("Error loading contacts", error);
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, []);

  const handleChange = (section: 'esparragos' | 'taller', field: string, value: string) => {
    if (!contacts) return;
    setContacts({
      ...contacts,
      [section]: {
        ...contacts[section],
        [field]: value
      }
    });
  };

  const saveAll = async () => {
    if (!contacts) return;
    setSaving(true);
    try {
      const promises: Promise<Response>[] = [];
      
      // Esparragos
      Object.entries(contacts.esparragos).forEach(([field, value]) => {
        promises.push(fetch("/api/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: `esparragos.${field}`, value, type: "contact" }),
        }));
      });

      // Taller
      Object.entries(contacts.taller).forEach(([field, value]) => {
        promises.push(fetch("/api/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: `taller.${field}`, value, type: "contact" }),
        }));
      });

      await Promise.all(promises);
      alert("Datos de contacto guardados correctamente");
    } catch (error) {
      console.error("Error saving contacts", error);
      alert("Hubo un error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !contacts) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Datos de Contacto</h1>
          <p className="text-gray-500">Modifica los teléfonos y correos que aparecen en la web.</p>
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

      <div className="space-y-8 pb-20">
        
        {/* Esparragos / Productos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">Contacto General / Productos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (para mostrar)</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={contacts.esparragos.phone}
                  onChange={(e) => handleChange('esparragos', 'phone', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: 650 900 134"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (enlace llamada)</label>
              <input
                type="text"
                value={contacts.esparragos.phoneRaw}
                onChange={(e) => handleChange('esparragos', 'phoneRaw', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: +34650900134"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Productos</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={contacts.esparragos.email}
                  onChange={(e) => handleChange('esparragos', 'email', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: info@donremondo.es"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Taller / Coches */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">Contacto Taller / Coches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono Principal (mostrar)</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={contacts.taller.phone}
                  onChange={(e) => handleChange('taller', 'phone', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono Principal (enlace)</label>
              <input
                type="text"
                value={contacts.taller.phoneRaw}
                onChange={(e) => handleChange('taller', 'phoneRaw', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuera Horario (mostrar)</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={contacts.taller.phoneFueraHorario}
                  onChange={(e) => handleChange('taller', 'phoneFueraHorario', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuera Horario (enlace)</label>
              <input
                type="text"
                value={contacts.taller.phoneFueraHorarioRaw}
                onChange={(e) => handleChange('taller', 'phoneFueraHorarioRaw', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (mostrar)</label>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={contacts.taller.whatsapp}
                  onChange={(e) => handleChange('taller', 'whatsapp', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (enlace - sin prefijo)</label>
              <input
                type="text"
                value={contacts.taller.whatsappRaw}
                onChange={(e) => handleChange('taller', 'whatsappRaw', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 650900134"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Taller</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={contacts.taller.email}
                  onChange={(e) => handleChange('taller', 'email', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
