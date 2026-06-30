"use client";

import { useState } from "react";

export default function ContactForm({ asunto }: { asunto?: string }) {
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const nombre = (formData.get("nombre") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const telefono = (formData.get("telefono") as string)?.trim() || "";
    const asuntoVal = (formData.get("asunto") as string)?.trim() || "";
    const mensaje = (formData.get("mensaje") as string)?.trim() || "";

    if (!nombre || !email || !asuntoVal || !mensaje) {
      setFormState("error");
      setErrorMsg("Por favor, rellena todos los campos obligatorios.");
      return;
    }

    setFormState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, asunto: asuntoVal, mensaje }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error del servidor al enviar el mensaje");
      }

      setFormState("success");
    } catch (err: any) {
      setFormState("error");
      setErrorMsg(err.message || "Error al enviar. Inténtalo de nuevo.");
    }
  }

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-[var(--color-verde-100)] flex items-center justify-center mb-5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-verde-700)]">
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-[var(--color-text)] mb-2">Mensaje enviado</h3>
        <p className="text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
          Nos pondremos en contacto contigo en la mayor brevedad posible. Gracias por escribirnos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nombre + Teléfono */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5" htmlFor="cf-nombre">
            Nombre <span className="text-[var(--color-azul-600)]">*</span>
          </label>
          <input id="cf-nombre" name="nombre" type="text" placeholder="Tu nombre" className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5" htmlFor="cf-telefono">
            Teléfono
          </label>
          <input id="cf-telefono" name="telefono" type="tel" placeholder="Tu teléfono" className="input" />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5" htmlFor="cf-email">
          Email <span className="text-[var(--color-azul-600)]">*</span>
        </label>
        <input id="cf-email" name="email" type="email" placeholder="tu@email.com" className="input" />
      </div>

      {/* Asunto */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5" htmlFor="cf-asunto">
          Asunto <span className="text-[var(--color-azul-600)]">*</span>
        </label>
        <select id="cf-asunto" name="asunto" defaultValue={asunto || ""} className="input bg-white">
          <option value="" disabled>Selecciona un asunto</option>
          <option value="productos">Productos frescos</option>
          <option value="taller">Taller mecánico</option>
          <option value="coches">Compra-venta de coches</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5" htmlFor="cf-mensaje">
          Mensaje <span className="text-[var(--color-azul-600)]">*</span>
        </label>
        <textarea id="cf-mensaje" name="mensaje" rows={5} placeholder="Escribe tu mensaje aquí..." className="input resize-none" />
      </div>

      {/* Error */}
      {formState === "error" && errorMsg && (
        <div className="p-4 bg-[var(--color-rojo-50)] text-[var(--color-rojo-800)] text-sm rounded-lg">
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button type="submit" disabled={formState === "sending"} className="btn btn-verde btn-lg w-full">
        {formState === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>

      <p className="text-center text-xs text-[var(--color-text-muted)]">
        Campos marcados con <span className="text-[var(--color-verde-600)] font-medium">*</span> son obligatorios
      </p>
    </form>
  );
}
