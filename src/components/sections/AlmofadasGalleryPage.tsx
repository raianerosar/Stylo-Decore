"use client";

import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/constants";
import { ALMOFADAS_FAQ_KEYS } from "@/lib/seo";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ImageLightbox from "@/components/ui/ImageLightbox";
import { useLanguage } from "@/context/LanguageContext";


function PhotoCard({ name, image, onClick }: { name: string; image: string; onClick: () => void }) {
  return (
    <button
      className="group relative overflow-hidden rounded-xl cursor-zoom-in w-full text-left"
      onClick={onClick}
      aria-label={`Ver imagem de ${name}`}
    >
      <div className="aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </button>
  );
}

export default function AlmofadasGalleryPage() {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const KITS = [
    { nameKey: "almofadas.kit1", image: "/images/almofadas/decorativa-1.jpeg" },
    { nameKey: "almofadas.kit2", image: "/images/almofadas/decorativa-2.jpeg" },
    { nameKey: "almofadas.kit3", image: "/images/almofadas/decorativa-3.jpeg" },
    { nameKey: "almofadas.kit4", image: "/images/almofadas/decorativa-4.jpeg" },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative w-full min-h-[50vh] md:min-h-[65vh] lg:min-h-[70vh] overflow-hidden">
        {/* TODO: replace with separate desktop/mobile images when real assets are delivered */}
        <img
          src="/images/almofadas/almofadas-hero.png"
          alt={t("almofadas.hero.title")}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative flex h-full min-h-[50vh] md:min-h-[65vh] lg:min-h-[70vh] items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 md:pb-16 lg:pb-20">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {t("almofadas.hero.tag")}
            </p>
            <h1 className="mb-3 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {t("almofadas.hero.title")}
            </h1>
            <p className="max-w-xl text-lg text-white/80 lg:text-2xl">
              {t("almofadas.hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <ScrollReveal animation="up">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="mx-auto max-w-3xl text-center text-xl leading-relaxed text-mahogany-light md:text-2xl">
            {t("almofadas.intro")}
          </p>
        </div>
      </ScrollReveal>

      {/* Kits de Almofadas */}
      <ScrollReveal animation="up" threshold={0.05}>
        <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-20">
          <h2 className="mb-8 font-serif text-3xl font-bold text-mahogany md:text-4xl">
            {t("almofadas.kits.title")}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {KITS.map((item) => {
              const name = t(item.nameKey);
              return <PhotoCard key={item.nameKey} name={name} image={item.image} onClick={() => setLightbox({ src: item.image, alt: name })} />;
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Combinação para Sofá */}
      <ScrollReveal animation="up" threshold={0.05}>
        <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-20">
          <h2 className="mb-8 font-serif text-3xl font-bold text-mahogany md:text-4xl">
            {t("almofadas.sofa.title")}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4">
            <PhotoCard
              name={t("almofadas.sofa.item")}
              image="/images/almofadas/kit-sala-boho.png"
              onClick={() => setLightbox({ src: "/images/almofadas/kit-sala-boho.png", alt: t("almofadas.sofa.item") })}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Combinação para Cama */}
      <ScrollReveal animation="up" threshold={0.05}>
        <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-20">
          <h2 className="mb-8 font-serif text-3xl font-bold text-mahogany md:text-4xl">
            {t("almofadas.cama.title")}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4">
            <PhotoCard
              name={t("almofadas.cama.item")}
              image="/images/almofadas/combinacao-cama.png"
              onClick={() => setLightbox({ src: "/images/almofadas/combinacao-cama.png", alt: t("almofadas.cama.item") })}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* CTA WhatsApp */}
      <ScrollReveal animation="up">
        <div className="mx-auto max-w-7xl px-6 pb-16 md:pb-20">
          <div className="rounded-2xl bg-foreground p-10 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {t("almofadas.cta.tag")}
            </p>
            <h3 className="mb-4 font-serif text-2xl font-bold text-white md:text-3xl">
              {t("almofadas.cta.title")}
            </h3>
            <p className="mx-auto mb-8 max-w-md text-white/70">
              {t("almofadas.cta.desc")}
            </p>
            <a
              href={getWhatsAppUrl(t("almofadas.cta.whatsapp"))}
              target="_blank"
              rel="noopener noreferrer"
              className="brushed-gold inline-flex items-center rounded-full px-8 py-3 text-sm font-semibold text-background-dark transition-all hover:shadow-lg active:scale-95"
            >
              {t("almofadas.cta.btn")}
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal animation="up">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <FAQAccordion items={ALMOFADAS_FAQ_KEYS} />
        </div>
      </ScrollReveal>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
