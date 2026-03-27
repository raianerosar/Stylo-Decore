"use client";

import { useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
  cover?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  current?: number;
  total?: number;
}

export default function ImageLightbox({
  src,
  alt,
  onClose,
  cover,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  current,
  total,
}: ImageLightboxProps) {
  const hasNav = onPrev !== undefined && onNext !== undefined;
  const touchStartX = useRef<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev && onPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta < -50 && hasNext && onNext) onNext();
    if (delta > 50 && hasPrev && onPrev) onPrev();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ animation: "lb-fade-in 0.2s ease" }}
      onClick={onClose}
      onTouchStart={hasNav ? handleTouchStart : undefined}
      onTouchEnd={hasNav ? handleTouchEnd : undefined}
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

      {/* Desktop nav — prev */}
      {hasNav && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
          disabled={!hasPrev}
          className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-primary hover:text-background-dark disabled:opacity-20 disabled:pointer-events-none"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Desktop nav — next */}
      {hasNav && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext?.(); }}
          disabled={!hasNext}
          className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-primary hover:text-background-dark disabled:opacity-20 disabled:pointer-events-none"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Desktop counter */}
      {hasNav && total !== undefined && current !== undefined && total > 1 && (
        <div className="hidden md:block absolute bottom-5 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/40 text-white/80 text-sm font-medium tabular-nums">
          {current} / {total}
        </div>
      )}

      {/* Image + mobile nav bar */}
      <div
        className="relative z-10 flex flex-col items-center gap-4"
        style={{ animation: "lb-scale-in 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile image — formato natural, sem crop */}
        <img
          key={`m-${src}`}
          src={src}
          alt={alt}
          className="block md:hidden max-h-[70vh] max-w-[94vw] rounded-xl object-contain"
          style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.5)", animation: "lb-img-in 0.18s ease" }}
        />

        {/* Mobile nav bar — below the image */}
        {hasNav && (
          <div className="flex md:hidden items-center gap-5 z-10" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
              disabled={!hasPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            {total !== undefined && current !== undefined && total > 1 && (
              <span className="min-w-[48px] text-center text-white font-medium tabular-nums">
                {current} / {total}
              </span>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onNext?.(); }}
              disabled={!hasNext}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Desktop image */}
        {cover ? (
          <div
            className="hidden md:block rounded-xl overflow-hidden"
            style={{ width: "88vw", height: "88vh", boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}
          >
            <img
              key={`dc-${src}`}
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              style={{ animation: "lb-img-in 0.18s ease" }}
            />
          </div>
        ) : (
          <img
            key={`d-${src}`}
            src={src}
            alt={alt}
            className="hidden md:block max-h-[90vh] max-w-[88vw] rounded-xl object-contain"
            style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.5)", animation: "lb-img-in 0.18s ease" }}
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
        @keyframes lb-img-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
