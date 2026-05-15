"use client";

import { useState, useEffect, useCallback } from "react";
import { Car, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface FotoGalleryProps {
  fotos: string[];
  alt: string;
}

export default function FotoGallery({ fotos, alt }: FotoGalleryProps) {
  const [activa, setActiva] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(() => {
    setActiva((i) => (i === 0 ? fotos.length - 1 : i - 1));
  }, [fotos.length]);

  const next = useCallback(() => {
    setActiva((i) => (i === fotos.length - 1 ? 0 : i + 1));
  }, [fotos.length]);

  // Teclado: ESC cierra, ← → navegan
  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  // Bloquear scroll del body cuando el lightbox está abierto
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  if (fotos.length === 0) {
    return (
      <div className="aspect-video bg-[var(--color-stone-100)] rounded-[var(--radius-xl)] flex items-center justify-center border border-[var(--color-border-light)]">
        <Car size={56} className="text-[var(--color-stone-300)]" />
      </div>
    );
  }

  return (
    <>
      {/* ── Foto principal ── */}
      <div
        className="aspect-video bg-[var(--color-stone-100)] rounded-[var(--radius-xl)] overflow-hidden mb-3 border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] relative group cursor-zoom-in"
        onClick={() => setLightbox(true)}
        role="button"
        aria-label="Ampliar foto"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setLightbox(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fotos[activa]}
          alt={`${alt} — foto ${activa + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {/* Overlay con icono de zoom */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 shadow-lg">
            <ZoomIn size={22} className="text-[var(--color-azul-700)]" />
          </div>
        </div>
        {/* Contador cuando hay varias fotos */}
        {fotos.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {activa + 1} / {fotos.length}
          </span>
        )}
      </div>

      {/* ── Miniaturas (siempre visibles) ── */}
      <div className="grid grid-cols-4 gap-2">
        {fotos.map((foto, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={foto}
            alt={`${alt} — miniatura ${i + 1}`}
            onClick={() => setActiva(i)}
            className={`aspect-square rounded-[var(--radius-lg)] object-cover cursor-pointer transition-all duration-200 border-2 ${
              i === activa
                ? "border-[var(--color-azul-500)] scale-[1.03] shadow-[var(--shadow-sm)]"
                : "border-[var(--color-border-light)] hover:border-[var(--color-azul-300)] hover:scale-[1.02]"
            }`}
          />
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ animation: "fadeIn 0.2s ease both" }}
        >
          {/* Fondo oscuro */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setLightbox(false)}
          />

          {/* Contenido */}
          <div className="relative z-10 max-w-5xl w-full px-4 flex flex-col items-center gap-3">
            {/* Imagen principal */}
            <div
              className="w-full"
              style={{ animation: "fadeUp 0.25s ease both" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fotos[activa]}
                alt={`${alt} — foto ${activa + 1}`}
                className="w-full max-h-[75vh] object-contain rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)]"
              />
            </div>

            {/* Contador — debajo de la imagen, nunca encima */}
            {fotos.length > 1 && (
              <p className="text-white/70 text-sm font-medium">
                {activa + 1} de {fotos.length}
              </p>
            )}

            {/* Miniaturas en el lightbox */}
            {fotos.length > 1 && (
              <div
                className="flex gap-2 max-w-full py-1 px-1"
                style={{ overflowX: "auto", scrollbarWidth: "none" }}
              >
                {fotos.map((foto, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={foto}
                    alt={`miniatura ${i + 1}`}
                    onClick={() => setActiva(i)}
                    className={`w-14 h-14 shrink-0 rounded-lg object-cover cursor-pointer transition-all duration-200 border-2 ${
                      i === activa
                        ? "border-white scale-110 opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Botón cerrar */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/25 text-white rounded-full p-2.5 transition-colors"
            aria-label="Cerrar"
          >
            <X size={22} />
          </button>

          {/* Prev / Next */}
          {fotos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors"
                aria-label="Foto anterior"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors"
                aria-label="Foto siguiente"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}


        </div>
      )}
    </>
  );
}
