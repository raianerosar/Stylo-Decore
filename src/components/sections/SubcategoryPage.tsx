"use client";

import { Check, ClipboardList, Ruler, Scissors, Wind, Shirt, Layers, Paintbrush, Shield, Droplets } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { useRef, useState } from "react";
import ImageLightbox from "@/components/ui/ImageLightbox";

interface ProductItem {
  name: string;
  image: string;
  desktopImage?: string;
  category: string;
  descriptionKey?: string;
}

interface SubcategoryPageProps {
  title: string;
  description?: string;
  category: string;
  products: ProductItem[];
  headline?: string;
  heroImage?: string;
  desktopHeroImage?: string;
  mobileHeroImage?: string;
  collectionTag?: string;
  specs?: { title: string; description: string }[];
  descriptionKey?: string;
  desktopImageClass?: string;
  mobileImageClass?: string;
  heroDesktopClass?: string;
  heroMobileClass?: string;
  heroImageStyle?: React.CSSProperties;
  mobileHeroImageStyle?: React.CSSProperties;
  titleKey?: string;
  categoryKey?: string;
  videoSrc?: string;
  videoCaption?: string;
  videoTitle?: string;
  videoObjectPosition?: string;
  videoFeatures?: { icon: "ruler" | "scissors" | "wind" | "shirt" | "layers" | "paintbrush" | "shield" | "droplets"; label: string }[];
  sectionImage?: string;
  sectionLabel?: string;
  heroHeightClass?: string;
  showCatalogNote?: boolean;
}

export default function SubcategoryPage({
  title,
  description,
  category,
  products,
  headline,
  heroImage,
  desktopHeroImage,
  mobileHeroImage,
  collectionTag,
  specs,
  descriptionKey,
  desktopImageClass,
  mobileImageClass,
  heroDesktopClass,
  heroMobileClass,
  heroImageStyle,
  mobileHeroImageStyle,
  titleKey,
  categoryKey,
  videoSrc,
  videoCaption,
  videoTitle,
  videoObjectPosition,
  videoFeatures,
  sectionImage,
  sectionLabel,
  heroHeightClass,
  showCatalogNote,
}: SubcategoryPageProps) {
  const { t } = useLanguage();
  const [longPressActive, setLongPressActive] = useState<string | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [videoIsPortrait, setVideoIsPortrait] = useState<boolean | null>(true);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const lightboxImages = products.map((p) => ({ src: p.desktopImage || p.image, alt: p.name }));

  const videoIconMap = {
    ruler: <Ruler size={28} strokeWidth={1.5} />,
    scissors: <Scissors size={28} strokeWidth={1.5} />,
    wind: <Wind size={28} strokeWidth={1.5} />,
    shirt: <Shirt size={28} strokeWidth={1.5} />,
    layers: <Layers size={28} strokeWidth={1.5} />,
    paintbrush: <Paintbrush size={28} strokeWidth={1.5} />,
    shield: <Shield size={28} strokeWidth={1.5} />,
    droplets: <Droplets size={28} strokeWidth={1.5} />,
  };

  const handleVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    setVideoIsPortrait(v.videoHeight > v.videoWidth);
  };

  const handleTouchStart = (name: string) => {
    longPressTimer.current = setTimeout(() => setLongPressActive(name), 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    setTimeout(() => setLongPressActive(null), 1500);
  };

  const defaultSpecs = [
    {
      title: t("sub.specs.spec1.title"),
      description: t("sub.specs.spec1.desc"),
    },
    {
      title: t("sub.specs.spec2.title"),
      description: t("sub.specs.spec2.desc"),
    },
    {
      title: t("sub.specs.spec3.title"),
      description: t("sub.specs.spec3.desc"),
    },
  ];

  const finalSpecs = specs || defaultSpecs;
  const tag = collectionTag || category;

  return (
    <div>
      {/* Hero - Imagem principal grande */}
      <div className={`relative w-full ${heroHeightClass ?? "min-h-[70vh] md:min-h-[80vh]"}`}>
        {desktopHeroImage ? (
          <>
            <img
              src={desktopHeroImage}
              alt={title}
              className={`absolute inset-0 hidden h-full w-full object-cover lg:block ${heroDesktopClass ?? "object-top"}`}
              style={heroImageStyle}
            />
            <img
              src={
                mobileHeroImage ||
                heroImage ||
                products[0]?.image ||
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
              }
              alt={title}
              className={`absolute inset-0 h-full w-full object-cover lg:hidden ${heroMobileClass ?? "object-top"}`}
              style={mobileHeroImageStyle}
            />
          </>
        ) : products[0]?.desktopImage ? (
          <>
            <img
              src={heroImage || products[0]?.desktopImage}
              alt={title}
              className={`absolute inset-0 hidden h-full w-full object-cover lg:block ${heroDesktopClass ?? "object-top"}`}
            />
            <img
              src={
                mobileHeroImage ||
                heroImage ||
                products[0]?.image ||
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
              }
              alt={title}
              className={`absolute inset-0 h-full w-full object-cover lg:hidden ${heroMobileClass ?? "object-top"}`}
            />
          </>
        ) : mobileHeroImage ? (
          <>
            <img
              src={
                heroImage ||
                products[0]?.image ||
                "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
              }
              alt={title}
              className={`absolute inset-0 hidden h-full w-full object-cover lg:block ${heroDesktopClass ?? "object-top"}`}
              style={heroImageStyle}
            />
            <img
              src={mobileHeroImage}
              alt={title}
              className={`absolute inset-0 h-full w-full object-cover lg:hidden ${heroMobileClass ?? "object-top"}`}
              style={mobileHeroImageStyle}
            />
          </>
        ) : (
          <img
            src={
              heroImage ||
              products[0]?.image ||
              "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            }
            alt={title}
            className={`absolute inset-0 h-full w-full object-cover ${heroDesktopClass ?? "object-top"}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Glass panel overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-xl lg:max-w-2xl">
          <div className="glass-panel rounded-2xl px-8 py-6 text-center">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-mahogany-light">
              {categoryKey ? t(categoryKey) : tag}
            </p>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl leading-tight">
              {titleKey ? t(titleKey) : title}
            </h1>
            <p className="mt-1.5 text-xs text-mahogany-light">
              {t("sub.designAutoral")}
            </p>
          </div>
        </div>
      </div>

      {/* Headline + Descrição */}
      <ScrollReveal animation="up">
        <div className="mx-auto max-w-2xl lg:max-w-3xl px-6 py-12 md:py-16 text-center">
          {headline && (
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl mb-5 leading-snug">
              {headline}
            </h2>
          )}
          <p className="text-base leading-relaxed text-mahogany-light md:text-lg">
            {descriptionKey ? t(descriptionKey) : description}
          </p>
        </div>
      </ScrollReveal>

      {/* Galeria de imagens */}
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-6 pb-10">
        <div className={`grid grid-cols-1 gap-5 lg:gap-6 ${products.length <= 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
          {products.map((product, i) => (
            <ScrollReveal key={`${product.name}-${i}`} animation="up" delay={i * 90}>
              <button
                className="group block w-full cursor-zoom-in text-left"
                onClick={() => setLightboxIdx(i)}
                onTouchStart={() => product.descriptionKey && handleTouchStart(product.name)}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                aria-label={`Ver imagem de ${product.name}`}
              >
                <div className="relative overflow-hidden">
                  {product.desktopImage ? (
                    <>
                      <img
                        src={product.desktopImage}
                        alt={product.name}
                        className={desktopImageClass ?? "hidden lg:block w-full aspect-[9/16] object-cover transition-transform duration-500 group-hover:scale-[1.02]"}
                      />
                      <img
                        src={product.image}
                        alt={product.name}
                        className={mobileImageClass ?? "lg:hidden w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.02]"}
                      />
                    </>
                  ) : (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-[4/3] lg:aspect-[9/16] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  )}
                  {/* Faixa glass — aparece no hover (desktop) ou long-press (mobile) */}
                  {product.descriptionKey && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 px-4 py-3 backdrop-blur-md transition-opacity duration-300 ${
                        longPressActive === product.name ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{ background: "rgba(241,234,218,0.82)" }}
                    >
                      <p className="text-xs leading-snug text-mahogany italic">
                        {t(product.descriptionKey)}
                      </p>
                    </div>
                  )}
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Nota de catálogos — papel de parede */}
      {showCatalogNote && (
        <ScrollReveal animation="up">
          <div className="mx-auto max-w-3xl lg:max-w-5xl px-6 pb-8">
            <div className="rounded-2xl border border-primary/40 bg-primary/8 px-7 py-5 text-center">
              <p className="text-sm font-medium leading-relaxed text-foreground">
                Para ter acesso à todos os nossos catálogos de papel de parede, entre em contato com um de nossos consultores.
              </p>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Vídeo / Imagem de destaque opcional */}
      {(videoSrc || videoTitle || videoCaption || sectionImage) && (
        <section className="mt-16 mb-4">
          {/* Separador visual */}
          <ScrollReveal animation="fade">
            <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
              <div className="flex items-center gap-4 mb-10">
                <div className="flex-1 h-px bg-tobacco/30" />
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span
                    className="text-xs font-semibold tracking-[0.2em] uppercase"
                    style={{ color: "var(--color-tobacco)" }}
                  >
                    {sectionLabel ?? t("video.processo.label")}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <div className="flex-1 h-px bg-tobacco/30" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade">
            <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
              <div
                className={
                  videoSrc
                    ? videoIsPortrait
                      ? "flex flex-col md:flex-row gap-8 items-center"
                      : "flex flex-col gap-6"
                    : sectionImage
                    ? "flex flex-col md:flex-row gap-8 items-center"
                    : "flex flex-col gap-5"
                }
              >
                {/* Legenda em cima (landscape / null) */}
                {videoSrc && !videoIsPortrait && videoCaption && (
                  <div className="flex items-start gap-3 px-1">
                    <div
                      className="mt-1 w-0.5 self-stretch rounded-full flex-shrink-0"
                      style={{ background: "var(--color-primary)", minHeight: "1.5rem" }}
                    />
                    <p
                      className="text-sm font-medium leading-relaxed italic"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {t(videoCaption)}
                    </p>
                  </div>
                )}

                {/* Imagem estática (portrait) */}
                {sectionImage && !videoSrc && (
                  <div className="relative overflow-hidden rounded-2xl shadow-lg flex-shrink-0 w-full md:w-[240px] lg:w-[280px]">
                    <img
                      src={sectionImage}
                      alt={videoTitle ?? title}
                      className="w-full aspect-[9/16] object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-tobacco/20" />
                  </div>
                )}

                {/* Vídeo */}
                {videoSrc && (
                  <div
                    className={
                      videoIsPortrait
                        ? "relative overflow-hidden rounded-2xl shadow-lg flex-shrink-0 w-full md:w-[240px] lg:w-[280px]"
                        : "relative overflow-hidden rounded-2xl shadow-xl"
                    }
                  >
                    <video
                      src={videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      onLoadedMetadata={handleVideoLoaded}
                      className={
                        videoIsPortrait
                          ? "w-full aspect-[9/16] object-cover rounded-2xl"
                          : "w-full aspect-video object-cover"
                      }
                      style={videoIsPortrait ? { objectPosition: videoObjectPosition ?? "center" } : undefined}
                    />
                    <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-tobacco/20" />
                  </div>
                )}

                {/* Conteúdo ao lado (portrait / sectionImage) ou standalone sem mídia */}
                {(videoIsPortrait || !videoSrc) && (
                  <div className={`flex flex-col justify-center gap-5 ${videoSrc ? "flex-1 w-full md:pl-2" : "w-full"}`}>
                    {/* Barra dourada vertical + título */}
                    {videoTitle && (
                      <div className="flex items-stretch gap-5">
                        <div
                          className="w-[3px] rounded-full flex-shrink-0 self-stretch"
                          style={{ background: "var(--color-primary)" }}
                        />
                        <h3
                          className="font-serif text-3xl sm:text-4xl font-bold leading-tight"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          {t(videoTitle)}
                        </h3>
                      </div>
                    )}

                    {/* Caption */}
                    {videoCaption && (
                      <p
                        className="text-sm sm:text-base leading-relaxed"
                        style={{ color: "var(--color-mahogany-light, var(--color-foreground))" }}
                      >
                        {t(videoCaption)}
                      </p>
                    )}

                    {/* Features — ícone + label, sem bordas */}
                    {videoFeatures && videoFeatures.length > 0 && (
                      <div className="flex flex-wrap gap-8 pt-2">
                        {videoFeatures.map((f, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 text-center min-w-[72px]">
                            <div
                              className="flex items-center justify-center"
                              style={{ color: "var(--color-primary)" }}
                            >
                              {videoIconMap[f.icon]}
                            </div>
                            <span
                              className="text-xs font-semibold leading-tight"
                              style={{ color: "var(--color-foreground)" }}
                            >
                              {t(f.label)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}


      {/* Especificações Premium */}
      <ScrollReveal animation="up">
        <div className="mx-auto max-w-3xl lg:max-w-5xl px-6 py-10">
          <div className="rounded-2xl border border-tobacco-light bg-white p-8">
            <h3 className="mb-6 font-serif text-xl font-bold text-foreground">
              {t("sub.specs.title")}
            </h3>
            <ul className="space-y-5 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
              {finalSpecs.map((spec) => (
                <li key={spec.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {spec.title}
                    </p>
                    <p className="mt-0.5 text-sm text-mahogany-light">
                      {spec.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollReveal>

      {/* Showroom */}
      <ScrollReveal animation="scale">
        <div className="mx-auto max-w-3xl lg:max-w-5xl px-6 pb-16">
          <div className="rounded-2xl bg-foreground p-8 text-center text-white">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
              <ClipboardList className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-2 font-serif text-xl font-bold">
              {t("sub.showroom.title")}
            </h3>
            <p className="mx-auto mb-6 max-w-sm text-sm text-white/70">
              {t("sub.showroom.desc")}
            </p>
            <a
              href={getWhatsAppUrl(
                `${t("sub.whatsapp.showroom")} ${title}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider text-background-dark transition-colors hover:bg-primary-dark"
            >
              {t("sub.showroom.cta")}
            </a>
            <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t("sub.excellence")}
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Rodapé da página */}
      <ScrollReveal animation="fade">
        <div className="border-t border-tobacco-light/40 py-6 text-center">
          <p className="text-xs tracking-wide text-mahogany-light">
            {t("sub.footer")}
          </p>
        </div>
      </ScrollReveal>

      {lightboxIdx !== null && lightboxImages[lightboxIdx] && (
        <ImageLightbox
          src={lightboxImages[lightboxIdx].src}
          alt={lightboxImages[lightboxIdx].alt}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((idx) => (idx! > 0 ? idx! - 1 : idx))}
          onNext={() => setLightboxIdx((idx) => (idx! < lightboxImages.length - 1 ? idx! + 1 : idx))}
          hasPrev={lightboxIdx > 0}
          hasNext={lightboxIdx < lightboxImages.length - 1}
          current={lightboxIdx + 1}
          total={lightboxImages.length}
        />
      )}
    </div>
  );
}
