import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ExternalLink, Leaf, Wrench } from "lucide-react";
import { SITE_CONFIG, ESPARRAGOS_CONFIG, TALLER_CONFIG } from "@/lib/config";
import ContactForm from "@/components/contacto/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Espárragos y Taller en Valladolid",
  description:
    "Contacta con Don Remondo. Dos ubicaciones en Valladolid: tienda de espárragos y taller mecánico. Teléfono, email y formulario de contacto.",
  openGraph: {
    title: "Contacto | Don Remondo Valladolid",
    url: `${SITE_CONFIG.url}/contacto`,
  },
};

export default function ContactoPage() {
  return (
    <>
      {/* HEADER */}
      <section className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Contacto</h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Estamos en dos ubicaciones diferentes en Valladolid. Llámanos, escríbenos o
            pásate por donde prefieras.
          </p>
        </div>
      </section>

      {/* DOS CONTACTOS */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Espárragos */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-green-700 px-6 py-4">
                <div className="flex items-center gap-2 text-white">
                  <Leaf size={20} />
                  <h2 className="text-lg font-bold">Tienda de Espárragos</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Dirección</p>
                    <p className="text-gray-600 text-sm">{ESPARRAGOS_CONFIG.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Teléfono</p>
                    <a href={`tel:${ESPARRAGOS_CONFIG.phoneRaw}`} className="text-green-700 font-semibold hover:underline text-sm">
                      {ESPARRAGOS_CONFIG.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Email</p>
                    <a href={`mailto:${ESPARRAGOS_CONFIG.email}`} className="text-green-700 hover:underline text-sm">
                      {ESPARRAGOS_CONFIG.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Horario</p>
                    {ESPARRAGOS_CONFIG.horarioLineas.map((h) => (
                      <p key={h} className="text-gray-600 text-sm">{h}</p>
                    ))}
                    <p className="text-xs text-gray-400 mt-1">Temporada: {ESPARRAGOS_CONFIG.temporada}</p>
                  </div>
                </div>
                <a
                  href={ESPARRAGOS_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:text-green-800 font-medium"
                >
                  <ExternalLink size={13} />
                  Ver en Google Maps
                </a>
              </div>
              {/* Mapa espárragos */}
              <div className="h-48 bg-green-50 flex items-center justify-center border-t border-gray-100">
                <div className="text-center text-gray-400">
                  <MapPin size={24} className="mx-auto mb-1 text-green-300" />
                  <p className="text-xs">Av. del Euro, 24 · Valladolid</p>
                  <p className="text-xs text-gray-300">Insertar iframe Google Maps</p>
                </div>
              </div>
            </div>

            {/* Taller */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-blue-800 px-6 py-4">
                <div className="flex items-center gap-2 text-white">
                  <Wrench size={20} />
                  <h2 className="text-lg font-bold">Taller y Compra-Venta</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Dirección</p>
                    <p className="text-gray-600 text-sm">{TALLER_CONFIG.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Teléfono</p>
                    <a href={`tel:${TALLER_CONFIG.phoneRaw}`} className="text-blue-700 font-semibold hover:underline text-sm">
                      {TALLER_CONFIG.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Email</p>
                    <a href={`mailto:${TALLER_CONFIG.email}`} className="text-blue-700 hover:underline text-sm">
                      {TALLER_CONFIG.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Horario</p>
                    {TALLER_CONFIG.horarioLineas.map((h) => (
                      <p key={h} className="text-gray-600 text-sm">{h}</p>
                    ))}
                  </div>
                </div>
                <a
                  href={TALLER_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-800 font-medium"
                >
                  <ExternalLink size={13} />
                  Ver en Google Maps
                </a>
              </div>
              {/* Mapa taller */}
              <div className="h-48 bg-blue-50 flex items-center justify-center border-t border-gray-100">
                <div className="text-center text-gray-400">
                  <MapPin size={24} className="mx-auto mb-1 text-blue-300" />
                  <p className="text-xs">C. Villacarralón, 14 · Valladolid</p>
                  <p className="text-xs text-gray-300">Insertar iframe Google Maps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Escríbenos
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Rellena el formulario y te responderemos lo antes posible.
          </p>
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8">
            <ContactForm />
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            O llámanos directamente:{" "}
            <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-green-700 font-semibold hover:underline">
              {SITE_CONFIG.phone}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
