"use client";

import { useEffect, useRef } from "react";

export default function ContactForm({ asunto }: { asunto?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const btn = container.querySelector<HTMLButtonElement>("#cf-submit-btn");
    if (!btn) return;

    function handleClick() {
      const nombre = (document.getElementById("cf-nombre") as HTMLInputElement)?.value?.trim() || "";
      const email = (document.getElementById("cf-email") as HTMLInputElement)?.value?.trim() || "";
      const telefono = (document.getElementById("cf-telefono") as HTMLInputElement)?.value?.trim() || "";
      const asuntoVal = (document.getElementById("cf-asunto") as HTMLSelectElement)?.value?.trim() || "";
      const mensaje = (document.getElementById("cf-mensaje") as HTMLTextAreaElement)?.value?.trim() || "";

      const errorDiv = document.getElementById("cf-error");
      const successDiv = document.getElementById("cf-success");
      const formDiv = document.getElementById("cf-form");

      if (!nombre || !email || !asuntoVal || !mensaje) {
        if (errorDiv) {
          errorDiv.textContent = "Por favor, rellena todos los campos obligatorios.";
          errorDiv.style.display = "block";
        }
        return;
      }

      // Disable button and show loading
      btn.disabled = true;
      btn.textContent = "Enviando...";
      if (errorDiv) errorDiv.style.display = "none";

      fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, asunto: asuntoVal, mensaje }),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().catch(() => ({})).then((data) => {
              throw new Error(data.error || "Error de servidor al enviar el mensaje");
            });
          }
          // Success
          if (formDiv) formDiv.style.display = "none";
          if (successDiv) successDiv.style.display = "flex";
        })
        .catch((err) => {
          if (errorDiv) {
            errorDiv.textContent = err.message || "Error al enviar. Inténtalo de nuevo.";
            errorDiv.style.display = "block";
          }
          btn.disabled = false;
          btn.textContent = "Enviar mensaje";
        });
    }

    btn.addEventListener("click", handleClick);
    return () => btn.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={containerRef}>
      {/* Success message (hidden by default) */}
      <div
        id="cf-success"
        style={{ display: "none" }}
        className="flex flex-col items-center justify-center py-12 text-center animate-fade-up"
      >
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

      {/* Form (visible by default) */}
      <div id="cf-form" className="space-y-5">
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
        <div
          id="cf-error"
          style={{ display: "none" }}
          className="p-4 bg-[var(--color-rojo-50)] text-[var(--color-rojo-800)] text-sm rounded-lg"
        />

        {/* Submit */}
        <button id="cf-submit-btn" type="button" className="btn btn-verde btn-lg w-full">
          Enviar mensaje
        </button>

        <p className="text-center text-xs text-[var(--color-text-muted)]">
          Campos marcados con <span className="text-[var(--color-verde-600)] font-medium">*</span> son obligatorios
        </p>
      </div>

      {/* Fallback: raw inline script that works even if React hydration fails */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  function init() {
    var btn = document.getElementById('cf-submit-btn');
    if (!btn || btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', function() {
      var nombre = (document.getElementById('cf-nombre') || {}).value || '';
      var email = (document.getElementById('cf-email') || {}).value || '';
      var telefono = (document.getElementById('cf-telefono') || {}).value || '';
      var asuntoVal = (document.getElementById('cf-asunto') || {}).value || '';
      var mensaje = (document.getElementById('cf-mensaje') || {}).value || '';
      var errorDiv = document.getElementById('cf-error');
      var successDiv = document.getElementById('cf-success');
      var formDiv = document.getElementById('cf-form');

      if (!nombre.trim() || !email.trim() || !asuntoVal.trim() || !mensaje.trim()) {
        if (errorDiv) { errorDiv.textContent = 'Por favor, rellena todos los campos obligatorios.'; errorDiv.style.display = 'block'; }
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Enviando...';
      if (errorDiv) errorDiv.style.display = 'none';

      fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), email: email.trim(), telefono: telefono.trim(), asunto: asuntoVal.trim(), mensaje: mensaje.trim() })
      })
      .then(function(res) {
        if (!res.ok) return res.json().catch(function(){return {};}).then(function(d){throw new Error(d.error||'Error del servidor');});
        if (formDiv) formDiv.style.display = 'none';
        if (successDiv) successDiv.style.display = 'flex';
      })
      .catch(function(err) {
        if (errorDiv) { errorDiv.textContent = err.message || 'Error al enviar.'; errorDiv.style.display = 'block'; }
        btn.disabled = false;
        btn.textContent = 'Enviar mensaje';
      });
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
  // Also try after a delay in case of late hydration
  setTimeout(init, 1000);
  setTimeout(init, 3000);
})();
          `,
        }}
      />
    </div>
  );
}
