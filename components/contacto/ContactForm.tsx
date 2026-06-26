"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type FormState = { status: "idle" | "loading" | "success" | "error", message?: string };

export default function ContactForm({ asunto }: { asunto?: string }) {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: "loading" });
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

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Error de servidor al enviar el mensaje");
      }

      setState({ status: "success" });
      form.reset();
    } catch (err: any) {
      setState({ status: "error", message: err.message });
    }
  }

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-[var(--color-verde-100)] flex items-center justify-center mb-5">
          <CheckCircle2 size={32} className="text-[var(--color-verde-700)]" />
        </div>
        <h3 className="font-display text-2xl text-[var(--color-text)] mb-2">
          Mensaje enviado
        </h3>
        <p className="text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
          Nos pondremos en contacto contigo en la mayor brevedad posible.
          Gracias por escribirnos.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-6 text-sm text-[var(--color-azul-700)] font-medium hover:text-[var(--color-azul-800)] underline underline-offset-2 transition-colors"
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
            className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
            htmlFor="nombre"
          >
            Nombre <span className="text-[var(--color-azul-600)]">*</span>
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
            className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
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
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
          htmlFor="email"
        >
          Email <span className="text-[var(--color-azul-600)]">*</span>
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
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
          htmlFor="asunto"
        >
          Asunto <span className="text-[var(--color-azul-600)]">*</span>
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
          <option value="productos">Productos frescos</option>
          <option value="taller">Taller mecánico</option>
          <option value="coches">Compra-venta de coches</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label
          className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5"
          htmlFor="mensaje"
        >
          Mensaje <span className="text-[var(--color-azul-600)]">*</span>
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
      {state.status === "error" && (
        <div className="p-4 bg-[var(--color-rojo-50)] text-[var(--color-rojo-800)] text-sm rounded-lg flex items-start gap-3">
          <AlertCircle size={18} className="shrink-0 mt-0.5 text-[var(--color-rojo-600)]" />
          <p>
            {state.message || "Algo ha salido mal. Por favor, intenta enviarlo de nuevo o contáctanos directamente por teléfono."}
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state.status === "loading"}
        className="btn btn-verde btn-lg w-full"
      >
        {state.status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar mensaje"
        )}
      </button>

      <p className="text-center text-xs text-[var(--color-text-muted)]">
        Campos marcados con{" "}
        <span className="text-[var(--color-verde-600)] font-medium">*</span> son obligatorios
      </p>
    </form>
  );
}
