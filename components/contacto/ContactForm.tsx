"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm({ asunto }: { asunto?: string }) {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const form = e.currentTarget;
    const data = {
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      telefono: (form.elements.namedItem("telefono") as HTMLInputElement).value,
      asunto: (form.elements.namedItem("asunto") as HTMLSelectElement).value,
      mensaje: (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-verde-100 flex items-center justify-center mb-5">
          <CheckCircle2 size={32} className="text-verde-700" />
        </div>
        <h3 className="font-display text-2xl text-stone-900 mb-2">
          Mensaje enviado
        </h3>
        <p className="text-stone-500 max-w-sm leading-relaxed">
          Nos pondremos en contacto contigo en la mayor brevedad posible.
          Gracias por escribirnos.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-6 text-sm text-azul-700 font-medium hover:text-azul-800 underline underline-offset-2 transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nombre + Teléfono */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium text-stone-700 mb-1.5"
            htmlFor="nombre"
          >
            Nombre <span className="text-azul-600">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            placeholder="Tu nombre"
            className="input"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-stone-700 mb-1.5"
            htmlFor="telefono"
          >
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            placeholder="Tu teléfono"
            className="input"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          className="block text-sm font-medium text-stone-700 mb-1.5"
          htmlFor="email"
        >
          Email <span className="text-azul-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="tu@email.com"
          className="input"
        />
      </div>

      {/* Asunto */}
      <div>
        <label
          className="block text-sm font-medium text-stone-700 mb-1.5"
          htmlFor="asunto"
        >
          Asunto <span className="text-azul-600">*</span>
        </label>
        <select
          id="asunto"
          name="asunto"
          required
          defaultValue={asunto || ""}
          className="input bg-white"
        >
          <option value="" disabled>
            Selecciona un asunto
          </option>
          <option value="esparragos">Espárragos</option>
          <option value="taller">Taller mecánico</option>
          <option value="coches">Compra-venta de coches</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label
          className="block text-sm font-medium text-stone-700 mb-1.5"
          htmlFor="mensaje"
        >
          Mensaje <span className="text-azul-600">*</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          placeholder="Escribe tu mensaje aquí..."
          className="input resize-none"
        />
      </div>

      {/* Error */}
      {state === "error" && (
        <div className="flex items-center gap-2.5 text-red-700 text-sm bg-red-50 border border-red-100 p-3.5 rounded-xl">
          <AlertCircle size={16} className="shrink-0" />
          <span>
            Error al enviar el mensaje. Por favor llámanos directamente.
          </span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "loading"}
        className="btn btn-azul btn-lg w-full"
      >
        {state === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={18} />
            Enviar mensaje
          </>
        )}
      </button>

      <p className="text-center text-xs text-stone-400">
        Campos marcados con{" "}
        <span className="text-azul-600 font-medium">*</span> son obligatorios
      </p>
    </form>
  );
}
