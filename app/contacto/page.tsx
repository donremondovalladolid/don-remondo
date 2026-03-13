import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";
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
            Llámanos, escríbenos o pásate por donde prefieras.
          </p>
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
