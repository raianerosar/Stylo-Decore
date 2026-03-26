"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
  cover?: boolean;
}

export default function ImageLightbox({ src, alt, onClose, cover }: ImageLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ animation: "lb-fade-in 0.2s ease" }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
        aria-label="Fechar"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Image */}
      <div
        className="relative z-10"
        style={{ animation: "lb-scale-in 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile: container com aspect-ratio para preencher mais espaço */}
        <div
          className="block md:hidden w-[92vw] rounded-xl overflow-hidden"
          style={{ aspectRatio: "4/3", boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}
        >
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
        {/* Desktop: tamanho natural com restrições */}
        {cover ? (
          <div
            className="hidden md:block rounded-xl overflow-hidden"
            style={{ width: "90vw", height: "90vh", boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}
          >
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className="hidden md:block max-h-[95vh] max-w-[95vw] rounded-xl object-contain"
            style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}
          />
        )}
      </div>

      <style>{`
        @keyframes lb-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lb-scale-in {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
