"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#F1EADA]">

      {/* ── Header ── */}
      <div className="py-20 px-6 text-center">
        <ScrollReveal animation="up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block h-px w-14 bg-[#f1bf27]" />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f1bf27]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {t("about.eyebrow")}
            </span>
            <span className="block h-px w-14 bg-[#f1bf27]" />
          </div>
          <h2
            className="text-4xl md:text-5xl text-[#584738] mb-5"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            {t("about.title")}
          </h2>
          <p
            className="text-[#584738]/70 text-base leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {t("about.subtitle")}
          </p>
        </ScrollReveal>
      </div>

      {/* ── Nilza — foto esquerda, texto direita ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

        {/* Foto */}
        <ScrollReveal
          animation="left"
          className="relative overflow-hidden min-h-[560px] lg:min-h-0 order-2 lg:order-1 bg-[#F1EADA]"
        >
          <Image
            src="/images/sobre/nilza.jpeg"
            alt="Nilza Terezinha Duarte Bueno"
            fill
            className="object-contain object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </ScrollReveal>

        {/* Texto */}
        <ScrollReveal
          animation="right"
          className="flex items-center justify-start order-1 lg:order-2"
        >
          <div className="px-8 py-16 lg:px-12 lg:py-24 max-w-md w-full">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-6 h-px bg-[#f1bf27]" />
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#f1bf27]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {t("about.nilza.role")}
              </p>
            </div>
            <h3
              className="text-4xl md:text-5xl text-[#584738] leading-[1.1] mb-7"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nilza
              <br />
              <span className="italic text-[#B59E7D]">Duarte</span>
            </h3>
            <div className="w-12 h-[1.5px] bg-[#f1bf27] mb-7" />
            <p
              className="text-[#584738] text-[15px] leading-[1.9] font-normal"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {t("about.nilza.bio")}
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Clarice — texto esquerda, foto direita ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

        {/* Texto */}
        <ScrollReveal
          animation="left"
          className="flex items-center justify-end order-1 lg:order-1 bg-[#ede8dc]"
        >
          <div className="px-8 py-16 lg:px-12 lg:py-24 max-w-md w-full">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-6 h-px bg-[#f1bf27]" />
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#f1bf27]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {t("about.clarice.role")}
              </p>
            </div>
            <h3
              className="text-4xl md:text-5xl text-[#584738] leading-[1.1] mb-7"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Clarice
              <br />
              <span className="italic text-[#B59E7D]">Fontoura</span>
            </h3>
            <div className="w-12 h-[1.5px] bg-[#f1bf27] mb-7" />
            <p
              className="text-[#584738] text-[15px] leading-[1.9] font-normal"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {t("about.clarice.bio")}
            </p>
          </div>
        </ScrollReveal>

        {/* Foto */}
        <ScrollReveal
          animation="right"
          className="relative overflow-hidden min-h-[560px] lg:min-h-0 order-2 lg:order-2 bg-[#ede8dc]"
        >
          <Image
            src="/images/sobre/clarice.jpeg"
            alt="Clarice Fontoura"
            fill
            className="object-contain object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </ScrollReveal>
      </div>

    </section>
  );
}
