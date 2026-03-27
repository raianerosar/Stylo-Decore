"use client";

import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/constants";
import { TAPETES_FAQ_KEYS } from "@/lib/seo";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ImageLightbox from "@/components/ui/ImageLightbox";
import { useLanguage } from "@/context/LanguageContext";

// ─── Data ────────────────────────────────────────────────────────────────────

const ESTILOS = [
  {
    id: "moderno",
    labelKey: "/tapetes/moderno",
    products: [
      {
        name: "Finger Print",
        images: [
          { src: "/images/tapetes/finger-print-01.png", objectPosition: "center 75%" },
          { src: "/images/tapetes/finger-print-02.png" },
          { src: "/images/tapetes/finger-print-03.png" },
          { src: "/images/tapetes/finger-print-04.png" },
        ],
      },
      {
        name: "Hera New",
        images: [
          { src: "/images/tapetes/hera-new-01.png", objectPosition: "center 70%" },
          { src: "/images/tapetes/hera-new-02.png" },
          { src: "/images/tapetes/hera-new-03.png" },
          { src: "/images/tapetes/hera-new-04.png" },
          { src: "/images/tapetes/hera-new-05.png" },
        ],
      },
      {
        name: "Space",
        images: [
          { src: "/images/tapetes/space-01.png", objectPosition: "center 80%" },
          { src: "/images/tapetes/space-02.png" },
          { src: "/images/tapetes/space-03.png" },
          { src: "/images/tapetes/space-04.png" },
        ],
      },
    ],
  },
  {
    id: "classico",
    labelKey: "/tapetes/classico",
    products: [
      {
        name: "Sense",
        images: [
          { src: "/images/tapetes/sense-03.png" },
          { src: "/images/tapetes/sense-01.png" },
          { src: "/images/tapetes/sense-02.png" },
        ],
      },
      {
        name: "Foffo",
        images: [
          { src: "/images/tapetes/foffo-04.png" },
          { src: "/images/tapetes/foffo-01.png" },
          { src: "/images/tapetes/foffo-02.png" },
          { src: "/images/tapetes/foffo-03.png" },
        ],
      },
      {
        name: "Klein",
        images: [
          { src: "/images/tapetes/klein-07.png" },
          { src: "/images/tapetes/klein-01.png" },
          { src: "/images/tapetes/klein-02.png" },
          { src: "/images/tapetes/klein-03.png" },
          { src: "/images/tapetes/klein-06.png" },
        ],
      },
      {
        name: "Relex N",
        images: [
          { src: "/images/tapetes/relex-n-01.png" },
          { src: "/images/tapetes/relex-n-02.png" },
          { src: "/images/tapetes/relex-n-03.png" },
          { src: "/images/tapetes/relex-n-04.png" },
        ],
      },
      {
        name: "Mariana",
        images: [
          { src: "/images/tapetes/mariana-01.png" },
          { src: "/images/tapetes/mariana-02.png" },
          { src: "/images/tapetes/mariana-03.png" },
        ],
      },
    ],
  },
  {
    id: "minimalista",
    labelKey: "gallery.tapetes.style.organico",
    products: [
      {
        name: "Carving Orgânico",
        images: [
          { src: "/images/tapetes/organico-01.png" },
          { src: "/images/tapetes/organico-02.png" },
          { src: "/images/tapetes/organico-03.png" },
          { src: "/images/tapetes/organico-04.png" },
        ],
      },
    ],
  },
  {
    id: "boho",
    labelKey: "/tapetes/boho",
    products: [
      {
        name: "Nativa",
        images: [
          { src: "/images/tapetes/nativa-03.png" },
          { src: "/images/tapetes/nativa-01.png" },
          { src: "/images/tapetes/nativa-02.png" },
          { src: "/images/tapetes/nativa-04.png" },
          { src: "/images/tapetes/nativa-05.png" },
        ],
      },
      {
        name: "Rustik",
        images: [
          { src: "/images/tapetes/rustik-02.png" },
          { src: "/images/tapetes/rustik-03.png" },
          { src: "/images/tapetes/rustik-04.png" },
        ],
      },
      {
        name: "New Bouclê",
        images: [
          { src: "/images/tapetes/new-boucle-04.png" },
          { src: "/images/tapetes/new-boucle-02.png" },
          { src: "/images/tapetes/new-boucle-03.png" },
        ],
      },
    ],
  },
  {
    id: "natural",
    labelKey: "/tapetes/natural",
    products: [
      {
        name: "Eco Terra",
        images: [
          { src: "/images/tapetes/eco-terra-05.png" },
          { src: "/images/tapetes/eco-terra-01.png" },
          { src: "/images/tapetes/eco-terra-02.png" },
          { src: "/images/tapetes/eco-terra-03.png" },
          { src: "/images/tapetes/eco-terra-04.png" },
        ],
      },
      {
        name: "Sarja",
        images: [
          { src: "/images/tapetes/sarja-06.png" },
          { src: "/images/tapetes/sarja-02.png" },
          { src: "/images/tapetes/sarja-03.png" },
          { src: "/images/tapetes/sarja-04.png" },
          { src: "/images/tapetes/sarja-05.png" },
        ],
      },
      {
        name: "Seridó N",
        images: [
          { src: "/images/tapetes/serido-n-03.png" },
          { src: "/images/tapetes/serido-n-02.png" },
          { src: "/images/tapetes/serido-n-04.png" },
          { src: "/images/tapetes/serido-n-05.png" },
        ],
      },
    ],
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type ProductImage = { src: string; objectPosition?: string };
type Product = { name: string; images: ProductImage[] };

// ─── Style section ────────────────────────────────────────────────────────────

function StyleSection({
  id,
  labelKey,
  products,
  eager,
}: {
  id: string;
  labelKey: string;
  products: Product[];
  eager?: boolean;
}) {
  const { t } = useLanguage();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Flatten all images across all products for sequential navigation
  const allImages = products.flatMap((product) =>
    product.images.map((img, i) => ({ src: img.src, alt: `${product.name} ${i + 1}` }))
  );

  // Precompute starting flat index for each product
  const productStartIdx: number[] = [];
  let running = 0;
  for (const p of products) {
    productStartIdx.push(running);
    running += p.images.length;
  }

  return (
    <div id={id} className="pt-2">
      <ScrollReveal animation="up">
        {/* Section header */}
        <div className="mb-8 flex items-center gap-4">
          <span className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            {t(labelKey)}
          </span>
          <div className="flex-1 h-px bg-tobacco-light" />
        </div>

        {/* Products */}
        <div className="space-y-10">
          {products.map((product, pi) => (
            <div key={product.name}>
              {/* Product name */}
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-mahogany-light">
                {product.name}
              </p>

              {/* Images grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[280px] md:auto-rows-[320px]">
                {product.images.map((img, i) => {
                  const flatIdx = productStartIdx[pi] + i;
                  return (
                    <button
                      key={i}
                      className="relative overflow-hidden rounded-lg group cursor-zoom-in text-left"
                      onClick={() => setLightboxIdx(flatIdx)}
                    >
                      <img
                        src={img.src}
                        alt={`${product.name} ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ objectPosition: img.objectPosition ?? "center" }}
                        loading={eager && flatIdx === 0 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {lightboxIdx !== null && allImages[lightboxIdx] && (
        <ImageLightbox
          src={allImages[lightboxIdx].src}
          alt={allImages[lightboxIdx].alt}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((idx) => (idx! > 0 ? idx! - 1 : idx))}
          onNext={() => setLightboxIdx((idx) => (idx! < allImages.length - 1 ? idx! + 1 : idx))}
          hasPrev={lightboxIdx > 0}
          hasNext={lightboxIdx < allImages.length - 1}
          current={lightboxIdx + 1}
          total={allImages.length}
        />
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TapetesGalleryPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="relative w-full min-h-[45vh] md:min-h-[55vh] overflow-hidden">
        <img
          src="/images/tapetes/tapete-sob-medida-hero-desktop.png"
          alt={t("gallery.tapetes.title")}
          className="absolute inset-0 hidden h-full w-full object-cover lg:block"
        />
        <img
          src="/images/tapetes/tapete-sob-medida-hero-mobile.png"
          alt={t("gallery.tapetes.title")}
          className="absolute inset-0 h-full w-full object-cover lg:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
        <div className="relative flex h-full min-h-[45vh] md:min-h-[55vh] items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 md:pb-16">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {t("gallery.tapetes.eyebrow")}
            </p>
            <h1 className="mb-3 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {t("gallery.tapetes.title")}
            </h1>
            <p className="max-w-xl text-lg text-white/80 lg:text-xl">
              {t("gallery.tapetes.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Anchor nav */}
      <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-tobacco-light shadow-sm">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            <a
              href="#estilos"
              className="shrink-0 rounded-full px-4 py-1.5 text-sm font-medium text-mahogany-light transition-colors hover:bg-tobacco-light hover:text-foreground"
            >
              {t("gallery.tapetes.navEstilos")}
            </a>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 space-y-20">

        {/* Estilos */}
        <section id="estilos">
          <ScrollReveal animation="up">
            <div className="mb-10 flex items-center gap-4">
              <span className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                {t("gallery.tapetes.sectionEstilos")}
              </span>
              <div className="flex-1 h-px bg-tobacco-light" />
            </div>
          </ScrollReveal>
          <div className="space-y-14">
            {ESTILOS.map((item, i) => (
              <StyleSection key={item.id} {...item} eager={i === 0} />
            ))}
          </div>
        </section>

      </div>

      {/* CTA */}
      <ScrollReveal animation="up">
        <div className="mx-auto max-w-7xl px-6 pb-16 md:pb-20">
          <div className="rounded-2xl bg-foreground px-8 py-12 md:px-16 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {t("gallery.tapetes.cta.eyebrow")}
            </p>
            <h2 className="mb-4 font-serif text-2xl font-bold text-white md:text-3xl">
              {t("gallery.tapetes.cta.title")}
            </h2>
            <p className="mb-8 text-white/70 max-w-lg mx-auto">
              {t("gallery.tapetes.cta.desc")}
            </p>
            <a
              href={getWhatsAppUrl(t("gallery.tapetes.cta.whatsapp"))}
              target="_blank"
              rel="noopener noreferrer"
              className="brushed-gold inline-flex items-center rounded-full px-8 py-3 text-sm font-semibold text-background-dark transition-all hover:shadow-lg active:scale-95"
            >
              {t("sub.showroom.cta")}
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal animation="up">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <FAQAccordion items={TAPETES_FAQ_KEYS} />
        </div>
      </ScrollReveal>
    </div>
  );
}
