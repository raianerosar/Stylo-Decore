"use client";

import { useEffect, useRef } from "react";
import { getWhatsAppUrl } from "@/lib/constants";
import { useParallax } from "@/hooks/useParallax";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const videoContainerRef = useParallax<HTMLDivElement>(0.4);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = desktopVideoRef.current;
    if (!video) return;

    let reversing = false;
    let animId: number;
    let lastTimestamp = 0;

    const reverseFrame = (timestamp: number) => {
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (delta > 0.1) {
        animId = requestAnimationFrame(reverseFrame);
        return;
      }

      const next = video.currentTime - delta;
      if (next <= 0) {
        video.currentTime = 0;
        reversing = false;
        video.play();
      } else {
        video.currentTime = next;
        animId = requestAnimationFrame(reverseFrame);
      }
    };

    const handleTimeUpdate = () => {
      if (!reversing && video.duration && video.currentTime >= video.duration - 0.05) {
        reversing = true;
        video.pause();
        lastTimestamp = performance.now();
        animId = requestAnimationFrame(reverseFrame);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Video container — parallax target */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 will-change-transform"
      >
        {/* Mobile image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-mobile.png"
          alt="Cortinas sob medida Stylo Decore"
          className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
        />
        {/* Desktop video — ping-pong loop */}
        <video
          ref={desktopVideoRef}
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
          src="/videos/hero-0310.mp4"
          autoPlay
          muted
          playsInline
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/65" />

      {/* Center: Brand name */}
      <div className="relative z-10 flex min-h-[85vh] w-full flex-col items-center justify-center text-center">
        <h1 className="font-serif text-7xl font-bold uppercase tracking-[0.3em] text-primary drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] md:text-8xl lg:text-9xl">
          Stylo Decore
        </h1>
        {/* Decorative gold line */}
        <div className="mt-6 h-px w-24 bg-primary/60" />
      </div>

      {/* Bottom: tagline + buttons */}
      <div className="absolute bottom-12 left-0 right-0 z-10 flex flex-col items-center px-6 text-center">
        <p className="mb-1 text-sm font-semibold text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] md:text-base">
          {t("hero.title")}
        </p>
        <p className="mb-8 text-xs text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] md:text-sm">
          {t("hero.subtitle")}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={getWhatsAppUrl(t("hero.whatsapp"))}
            target="_blank"
            rel="noopener noreferrer"
            className="brushed-gold inline-flex items-center rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-background-dark transition-opacity hover:opacity-90"
          >
            {t("hero.ctaPrimary")}
          </a>
          <a
            href="#colecoes"
            className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-background-dark transition-all hover:bg-background"
          >
            {t("hero.ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
