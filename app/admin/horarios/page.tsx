"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Info } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

type ScheduleData = {
  taller: string[];
  esparragos_valladolid: string[];
};

export default function HorariosAdminPage() {
  const [schedules, setSchedules] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const res = await fetch("/api/config?type=schedule");
        const data = await res.json();
        const initialSchedules: ScheduleData = {
          taller: ["Lun – Vie: 09:00 – 13:00", "Lun – Vie: 16:00 – 20:00"],
          esparragos_valladolid: ["Todos los días: 05:00 – 10:00"],
        };

        data.forEach((item: any) => {
          try {
            if (initialSchedules[item.key as keyof ScheduleData]) {
              initialSchedules[item.key as keyof ScheduleData] = JSON.parse(item.value);
            }
          } catch (e) {}
        });

        setSchedules(initialSchedules);
      } catch (error) {
        console.error("Error loading schedules", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSchedules();
  }, []);

  const handleLineChange = (key: keyof ScheduleData, index: number, value: string) => {
    if (!schedules) return;
    const newSchedules = { ...schedules };
    newSchedules[key][index] = value;
    setSchedules(newSchedules);
  };

  const addLine = (key: keyof ScheduleData) => {
    if (!schedules) return;
    const newSchedules = { ...schedules };
    newSchedules[key].push("");
    setSchedules(newSchedules);
  };

  const removeLine = (key: keyof ScheduleData, index: number) => {
    if (!schedules) return;
    const newSchedules = { ...schedules };
    newSchedules[key] = newSchedules[key].filter((_, i) => i !== index);
    setSchedules(newSchedules);
  };

  const saveSchedule = async (key: keyof ScheduleData) => {
    if (!schedules) return;
    setSaving(key);
    try {
      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          value: JSON.stringify(schedules[key].filter(s => s.trim() !== "")),
          type: "schedule",
        }),
      });
      alert("Horario guardado correctamente");
    } catch (error) {
      console.error("Error saving schedule", error);
      alert("Hubo un error al guardar");
    } finally {
      setSaving(null);
    }
  };

  if (loading || !schedules) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  const sections = [
    { title: "Taller Mecánico", key: "taller" as const },
    { title: "Espárragos (Valladolid)", key: "esparragos_valladolid" as const },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Gestión de Horarios</h1>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex gap-3 text-blue-800 text-sm">
          <Info className="shrink-0 mt-0.5" size={18} />
          <p>
            Modifica las líneas de texto para cambiar cómo se muestra el horario en las distintas páginas de la web.
            Puedes añadir tantas líneas como necesites. No olvides pulsar Guardar en cada bloque tras realizar cambios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div key={section.key} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h2 className="font-bold text-gray-900">{section.title}</h2>
              </div>
              <div className="p-4 flex-1 flex flex-col gap-3">
                {schedules[section.key].map((line, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={line}
                      onChange={(e) => handleLineChange(section.key, idx, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      placeholder="Ej: Lun - Vie: 09:00 - 14:00"
                    />
                    <button
                      onClick={() => removeLine(section.key, idx)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                      title="Eliminar línea"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => addLine(section.key)}
                  className="text-sm text-blue-600 font-medium text-left mt-2 hover:underline"
                >
                  + Añadir línea
                </button>
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50 mt-auto">
                <button
                  onClick={() => saveSchedule(section.key)}
                  disabled={saving === section.key}
                  className="w-full flex justify-center items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-70"
                >
                  {saving === section.key ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Guardar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
